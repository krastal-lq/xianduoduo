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
    that.initShippingAddress();
  },

  onLoad: function (e) {
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
    postData.status = "待发货";
    postData.totalPrice = this.data.allGoodsAndYunPrice;
    postData.orderTime = this.nowTime();
    postData.sequence = "dd" + new Date().getTime();
    // console.log(postData)
    wx.request({
      url: 'http://127.0.0.1:8080/xianDD/order/Create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的 参数
      success: (res) => {
        if (e && "buyNow" != that.data.orderType) {
          // 清空购物车数据
          wx.removeStorageSync('shopCarInfo');
        }
        var addressInfo = JSON.stringify(this.data.addressInfo);
        var orderId = res.data.msg
        wx.redirectTo({
          url: "/pages/success/success?order=" + postData.sequence + "&money=" + this.data.allGoodsAndYunPrice + "&addressInfo=" + addressInfo + "&id=" + orderId
        });
      },
    })
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
      goodsJsonStrTmp += '{"goodsId":' + carShopBean.goodsId + ',"num":' + carShopBean.number + ',"price":' + carShopBean.price + ',"totalPrice":' + (carShopBean.price * carShopBean.number + carShopBean.freight).toFixed(2) + '}';
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
  },
  nowTime: function () { //获取当前时间
    let now = new Date();
    let _month = (10 > (now.getMonth() + 1)) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let _day = (10 > now.getDate()) ? '0' + now.getDate() : now.getDate();
    let _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
    let _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
    let _second = (10 > now.getSeconds()) ? '0' + now.getSeconds() : now.getSeconds();
    return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
  }

})