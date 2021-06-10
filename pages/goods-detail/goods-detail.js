//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    autoplay: true,
    interval: 10000,
    duration: 500,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: true,
    selectSize: "选择规格：",
    selectSizePrice: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 20,
    favicon: 0,
    selectptPrice: 0,
    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: true, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    wxlogin: true,
    sharecode: true,
    sharebox: true,
    title: "商品详情",
    barBg: 'red',
    color: '#ffffff'
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onLoad: function (e) {
    var that = this;

    if (!e.id) { //扫码进入
      var scene = decodeURIComponent(e.scene);
      if (scene.length > 0 && scene != undefined) {
        var scarr = scene.split(',');
        var dilist = [];
        for (var i = 0; i < scarr.length; i++) {
          dilist.push(scarr[i].split('='))
        }
        if (dilist.length > 0) {
          var dict = {};
          for (var j = 0; j < dilist.length; j++) {
            dict[dilist[j][0]] = dilist[j][1]
          }
          var id = dict.i;
          var vid = dict.u;
          var sid = dict.s;
          that.setData({
            id: id
          })
          if (vid) {
            wx.setStorage({
              key: 'inviter_id_' + id,
              data: vid
            })
          }
          if (sid) {
            that.setData({
              share: sid
            });
          }
        }
      }
    }
    if (!e.scene) { //链接进入
      if (e.inviter_id) {
        wx.setStorage({
          key: 'inviter_id_' + e.id,
          data: e.inviter_id
        })
      }
      if (e.share) {
        that.setData({
          share: e.share
        });
      }
      that.setData({
        id: e.id
      })
    }

    this.getfav();
    // 获取购物车数据
    wx.getStorage({
      key: 'shopCarInfo',
      success: function (res) {
        that.setData({
          shopCarInfo: res.data,
          shopNum: res.data.shopNum
        });
      }
    })
    wx.request({
      url: 'http://127.0.0.1:8080/xianDD/goods/Detail',
      data: {
        id: that.data.id
      },
      success: function (res) {
        that.data.goodsDetail = res.data.rows[0];
        console.log(that.data.goodsDetail)
        that.setData({
          goodsDetail: res.data.rows[0],
          selectSizePrice: res.data.rows[0].promotPrice,
          selectptPrice: res.data.rows[0].promotPrice
        });
        // WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
      }
    });
    // wx.request({
    //   url: app.globalData.urls + '/shop/goods/detail',
    //   data: {
    //     id: that.data.id
    //   },
    //   success: function (res) {
    // 		console.log(res.data)
    //     var selectSizeTemp = "";
    //     if (res.data.data.properties) {
    //       for (var i = 0; i < res.data.data.properties.length; i++) {
    //         selectSizeTemp = selectSizeTemp + " " + res.data.data.properties[i].name;
    //       }
    //       that.setData({
    //         hasMoreSelect: true,
    //         selectSize: that.data.selectSize + selectSizeTemp,
    //         selectSizePrice: res.data.data.basicInfo.minPrice,
    //         selectptPrice: res.data.data.basicInfo.pingtuanPrice
    //       });
    //     }
    //     that.data.goodsDetail = res.data.data;
    //     if (res.data.data.basicInfo.videoId) {
    //       that.getVideoSrc(res.data.data.basicInfo.videoId);
    //     }
    //     that.setData({
    //       goodsDetail: res.data.data,
    //       selectSizePrice: res.data.data.basicInfo.minPrice,
    //       buyNumMax: res.data.data.basicInfo.stores,
    //       buyNumber: (res.data.data.basicInfo.stores > 0) ? 1 : 0,
    //       selectptPrice: res.data.data.basicInfo.pingtuanPrice
    //     });
    //     WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
    //   }
    // });

    // this.reputation(that.data.id);
  },

  goShopCar: function () {
    wx.reLaunch({
      url: "/pages/cart/cart"
    });
  },
  toAddShopCar: function () {
    this.setData({
      shopType: "addShopCar"
    })
    this.bindGuiGeTap();
  },
  tobuy: function () {
    this.setData({
      shopType: "tobuy"
    });
    this.bindGuiGeTap();
  },

  /**
   * 规格选择弹出框
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function () {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  /**
   * 加入购物车
   */
  addShopCar: function () {
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
    //组建购物车
    var shopCarInfo = this.bulidShopCarInfo();

    this.setData({
      shopCarInfo: shopCarInfo,
      shopNum: shopCarInfo.shopNum
    });
    // 写入本地存储
    wx.setStorage({
      key: "shopCarInfo",
      data: shopCarInfo
    })
    //更新tabar购物车数字角标
    app.getShopCartNum()
    this.closePopupTap();
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
    //console.log(shopCarInfo);

    //shopCarInfo = {shopNum:12,shopList:[]}
  },
  /**
   * 立即购买
   */
  buyNow: function () {
    var that = this;
    if (that.data.buyNumber < 1) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
    setTimeout(function () {
      wx.hideLoading();
      //组建立即购买信息
      var buyNowInfo = that.buliduBuyNowInfo();
      // 写入本地存储
      wx.setStorage({
        key: "buyNowInfo",
        data: buyNowInfo
      })
      that.closePopupTap();

      wx.navigateTo({
        url: "/pages/pay-order/pay-order?orderType=buyNow"
      })
    }, 1000);
    wx.showLoading({
      title: '商品准备中...',
    })

  },
  /**
   * 组建购物车信息
   */
  bulidShopCarInfo: function () {
    // 加入购物车
    var shopCarMap = {};
    shopCarMap.goodsDetail = this.data.goodsDetail;
    shopCarMap.goodsId = this.data.goodsDetail.id;
    shopCarMap.freight = this.data.goodsDetail.freight;
    shopCarMap.place = this.data.goodsDetail.place;
    shopCarMap.pic = this.data.goodsDetail.goodsimageList[0].url;
    shopCarMap.name = this.data.goodsDetail.name;
    shopCarMap.label=this.data.goodsDetail.number+this.data.goodsDetail.unit; //规格尺寸 
    shopCarMap.price = this.data.selectSizePrice;
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;
    // shopCarMap.logisticsType = this.data.goodsDetail.basicInfo.logisticsId;
    // shopCarMap.logistics = this.data.goodsDetail.logistics;
    // shopCarMap.weight = this.data.goodsDetail.basicInfo.weight;

    var shopCarInfo = this.data.shopCarInfo;
    if (!shopCarInfo.shopNum) {
      shopCarInfo.shopNum = 0;
    }
    if (!shopCarInfo.shopList) {
      shopCarInfo.shopList = [];
    }
    var hasSameGoodsIndex = -1;
    for (var i = 0; i < shopCarInfo.shopList.length; i++) {
      var tmpShopCarMap = shopCarInfo.shopList[i];
      if (tmpShopCarMap.goodsId == shopCarMap.goodsId && tmpShopCarMap.propertyChildIds == shopCarMap.propertyChildIds) {
        hasSameGoodsIndex = i;
        shopCarMap.number = shopCarMap.number + tmpShopCarMap.number;
        break;
      }
    }

    shopCarInfo.shopNum = shopCarInfo.shopNum + this.data.buyNumber;
    if (hasSameGoodsIndex > -1) {
      shopCarInfo.shopList.splice(hasSameGoodsIndex, 1, shopCarMap);
    } else {
      shopCarInfo.shopList.push(shopCarMap);
    }
    return shopCarInfo;
  },
  /**
   * 组建立即购买信息
   */
  buliduBuyNowInfo: function () {
    var shopCarMap = {};
    console.log(this.data)
    shopCarMap.goodsDetail = this.data.goodsDetail;
    shopCarMap.goodsId = this.data.goodsDetail.id;
    shopCarMap.freight = this.data.goodsDetail.freight;
    shopCarMap.place = this.data.goodsDetail.place;
    shopCarMap.pic = this.data.goodsDetail.goodsimageList[0].url;
    shopCarMap.name = this.data.goodsDetail.name;
    shopCarMap.label=this.data.goodsDetail.number+this.data.goodsDetail.unit; //规格尺寸 
    shopCarMap.goodsId = this.data.goodsDetail.id;
    shopCarMap.pic = this.data.goodsDetail.goodsimageList[0].url;
    shopCarMap.name = this.data.goodsDetail.name;
    // shopCarMap.label=this.data.goodsDetail.basicInfo.id; 规格尺寸 
    shopCarMap.propertyChildIds = this.data.propertyChildIds;
    shopCarMap.label = this.data.propertyChildNames;
    shopCarMap.price = this.data.selectSizePrice;
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;
    // shopCarMap.logisticsType = this.data.goodsDetail.basicInfo.logisticsId;
    // shopCarMap.logistics = this.data.goodsDetail.logistics;
    // shopCarMap.weight = this.data.goodsDetail.basicInfo.weight;

    var buyNowInfo = {};
    if (!buyNowInfo.shopNum) {
      buyNowInfo.shopNum = 0;
    }
    if (!buyNowInfo.shopList) {
      buyNowInfo.shopList = [];
    }
    buyNowInfo.shopList.push(shopCarMap);
    return buyNowInfo;
  },
  bulidupingTuanInfo: function () {
    var shopCarMap = {};
    shopCarMap.goodsId = this.data.goodsDetail.basicInfo.id;
    shopCarMap.pingtuanId = this.data.pingtuanOpenId;
    shopCarMap.pic = this.data.goodsDetail.basicInfo.pic;
    shopCarMap.name = this.data.goodsDetail.basicInfo.name;
    // shopCarMap.label=this.data.goodsDetail.basicInfo.id; 规格尺寸 
    shopCarMap.propertyChildIds = this.data.propertyChildIds;
    shopCarMap.label = this.data.propertyChildNames;
    shopCarMap.price = this.data.selectptPrice;
    //this.data.goodsDetail.basicInfo.pingtuanPrice;
    shopCarMap.left = "";
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;
    shopCarMap.logisticsType = this.data.goodsDetail.basicInfo.logisticsId;
    shopCarMap.logistics = this.data.goodsDetail.logistics;
    shopCarMap.weight = this.data.goodsDetail.basicInfo.weight;

    var buyNowInfo = {};
    if (!buyNowInfo.shopNum) {
      buyNowInfo.shopNum = 0;
    }
    if (!buyNowInfo.shopList) {
      buyNowInfo.shopList = [];
    }
    buyNowInfo.shopList.push(shopCarMap);
    return buyNowInfo;
  },
  onShareAppMessage: function () {
    var that = this;
    that.setData({
      sharebox: true
    })
    return {
      title: this.data.goodsDetail.basicInfo.name,
      path: '/pages/goods-detail/goods-detail?id=' + this.data.goodsDetail.basicInfo.id + '&inviter_id=' + app.globalData.uid + '&share=1',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  reputation: function (goodsId) {
    var that = this;
    wx.request({
      url: app.siteInfo.url + app.siteInfo.subDomain + '/shop/goods/reputation',
      data: {
        goodsId: goodsId
      },
      success: function (res) {
        if (res.data.code == 0) {
          //console.log(res.data.data);
          that.setData({
            reputation: res.data.data
          });
        }
      }
    })
  },
  getfav: function () {
    //console.log(e)
    var that = this;
    var id = that.data.id
    wx.request({
      url: app.globalData.urls + '/shop/goods/fav/list',
      data: {
        //nameLike: this.data.goodsDetail.basicInfo.name,
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0 && res.data.data.length) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].goodsId == parseInt(id)) {
              that.setData({
                favicon: 1
              });
              break;
            }
          }
        }
      }
    })
  },
  fav: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/shop/goods/fav/add',
      data: {
        goodsId: this.data.goodsDetail.id,
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 2000) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            favicon: 1
          });
        }
      }
    })
  },
  del: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/shop/goods/fav/delete',
      data: {
        goodsId: this.data.goodsDetail.id,
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 2000) {
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            favicon: 0
          });
        }
      }
    })
  },
  gohome: function () {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },
  tabFun: function (e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onPullDownRefresh: function (e) {
    var that = this;
    that.goPingtuan();
    that.goPingList();
    wx.stopPullDownRefresh();
  },
  onShow: function () {
    var that = this;
    setTimeout(function () {
      if (app.globalData.usinfo == 0) {
        that.setData({
          wxlogin: false
        })
      }
    }, 1000)
  },
  getShareBox: function () {
    this.setData({
      sharebox: false
    })
  },
  getcode: function () {
    var that = this;
    wx.showLoading({
      title: '生成中...',
    })
    wx.request({
      url: app.globalData.urls + '/qrcode/wxa/unlimit',
      data: {
        scene: "i=" + that.data.goodsDetail.basicInfo.id + ",u=" + app.globalData.uid + ",s=1",
        page: "pages/goods-detail/goods-detail",
        expireHours: 1
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.downloadFile({
            url: res.data.data,
            success: function (res) {
              wx.hideLoading()
              that.setData({
                codeimg: res.tempFilePath,
                sharecode: false,
                sharebox: true
              });
            }
          })
        }
      }
    });
  },
  savecode: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.codeimg,
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    that.setData({
      sharecode: true,
    })
  },
  closeshare: function () {
    this.setData({
      sharebox: true,
      sharecode: true
    })
  },
})