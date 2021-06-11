//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    goodsList: [],
    isNeedLogistics: 0, // 是否需要物流信息
    allGoodsPrice: 0,
    yunPrice: 0,
    allGoodsAndYunPrice: 0,
    goodsJsonStr: "",
    orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，

    hasNoCoupons: true,
    coupons: [],
    youhuijine: 0, //优惠券金额
    curCoupon: null // 当前选择使用的优惠券
  },
  onShow: function () {
    //console.log(this.data.orderType)
    var that = this;
    var shopList = [];

    //立即购买下单
    if ("buyNow" == that.data.orderType) {
      var buyNowInfoMem = wx.getStorageSync('buyNowInfo');
      if (buyNowInfoMem && buyNowInfoMem.shopList) {
        shopList = buyNowInfoMem.shopList
      }
    } else {
      //购物车下单
      var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
      if (shopCarInfoMem && shopCarInfoMem.shopList) {
        // shopList = shopCarInfoMem.shopList
        shopList = shopCarInfoMem.shopList.filter(entity => {
          return entity.active;
        });
      }
    }
    that.setData({
      goodsList: shopList,
    });
    // console.log("shopList")
    // console.log(this.data.goodsList)

    that.initShippingAddress();
  },

  onLoad: function (e) {
    // console.log('this.data.addressInfo')
    // console.log(this.data.addressInfo)
    // console.log(e)
    // console.log(e.orderType)
    var that = this;
    if (app.globalData.iphone == true) {
      that.setData({
        iphone: 'iphone'
      })
    }
    //显示收货地址标识
    that.setData({
      isNeedLogistics: 1,
      orderType: e.orderType
    });
  },

  getDistrictId: function (obj, aaa) {
    if (!obj) {
      return "";
    }
    if (!aaa) {
      return "";
    }
    return aaa;
  },
  createOrderList: function (e) {
    var that = this;
    var loginToken = app.globalData.token // 用户登录 token
    var remark = ""; // 备注信息
    if (e) {
      remark = e.detail.value.remark; // 备注信息
    }
    if (!that.data.addressInfo) {
      wx.hideLoading();
      wx.showModal({
        title: '友情提示',
        content: '请先设置您的收货地址！',
        showCancel: false
      })
      return;
    }
    //组建传输的数据
    var postData = {
      token: loginToken,
      goodsJsonStr: that.data.goodsJsonStr,
      remark: remark
    };
    var addr = this.data.addressInfo;
    var address = addr.province + addr.city + addr.district + addr.address; 
    postData.address = address;
    postData.name = addr.linkMan;
    postData.telephone = addr.mobile;
    postData.totalPrice = this.data.allGoodsAndYunPrice;

    wx.request({
      url: app.globalData.urls + '/order/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的 参数
      success: (res) => {

      }
    })
    wx.redirectTo({
      url: "/pages/success/success?order=" + 1 + "&money=" + this.data.allGoodsAndYunPrice + "&id=" + 1
    });
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/user/shipping-address/default',
      data: {
        token: app.globalData.token
      },
      success: (res) => {
        if (res.data.code == 0) {
          that.setData({
            curAddressData: res.data.data
          });
        } else {
          that.setData({
            curAddressData: null
          });
        }
      }
    })
    that.processYunfei();
  },
  processYunfei: function () {
    var that = this;
    var goodsList = this.data.goodsList;
    // console.log('goodsList')
    // console.log(goodsList)
    var goodsJsonStr = "[";
    var isNeedLogistics = 0;
    var allGoodsPrice = 0;

    var yunPrice = 0;
    var allGoodsPrice = 0;

    for (let i = 0; i < goodsList.length; i++) {
      let carShopBean = goodsList[i];
      isNeedLogistics = 1;
      yunPrice += carShopBean.freight;
      allGoodsPrice += carShopBean.price * carShopBean.number;

      var goodsJsonStrTmp = '';
      if (i > 0) {
        goodsJsonStrTmp = ",";
      }
      goodsJsonStrTmp += '{"goodsId":' + carShopBean.goodsId + ',"num":' + carShopBean.number + '"price":' + carShopBean.price + ',"totalPrice":' + (carShopBean.price * carShopBean.number + carShopBean.freight).toFixed(2) + '}';
      goodsJsonStr += goodsJsonStrTmp;
    }
    var allGoodsAndYunPrice = allGoodsPrice + yunPrice;
    goodsJsonStr += "]";
    that.setData({
      isNeedLogistics: isNeedLogistics,
      goodsJsonStr: goodsJsonStr,
      allGoodsPrice: allGoodsPrice.toFixed(2),
      allGoodsAndYunPrice: allGoodsAndYunPrice.toFixed(2),
      yunPrice: yunPrice
    });
    // that.createOrderList();
  },
  addAddress: function () {
    wx.navigateTo({
      url: "/pages/address-add/address-add"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url: "/pages/address/address"
    })
  },
  getMyCoupons: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/discounts/my',
      data: {
        token: app.globalData.token,
        status: 0
      },
      success: function (res) {
        if (res.data.code == 0) {
          var coupons = res.data.data.filter(entity => {
            return entity.moneyHreshold <= that.data.allGoodsAndYunPrice;
          });
          if (coupons.length > 0) {
            that.setData({
              hasNoCoupons: false,
              coupons: coupons
            });
          }
        }
      }
    })
  },
  bindChangeCoupon: function (e) {
    const selIndex = e.detail.value[0] - 1;
    if (selIndex == -1) {
      this.setData({
        youhuijine: 0,
        curCoupon: null
      });
      return;
    }
    //console.log("selIndex:" + selIndex);
    this.setData({
      youhuijine: this.data.coupons[selIndex].money,
      curCoupon: this.data.coupons[selIndex]
    });
  }
})