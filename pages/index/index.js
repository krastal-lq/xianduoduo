//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		indicatorDots: true,
		autoplay: true,
		interval: 6000,
		duration: 800,
		swiperCurrent: 0,
		iphone: false,
		loadingHidden: false, // loading
		wxlogin: true,
		loadingMoreHidden: true,
		showSearch: true,
	},
	onShow() {
		var that = this
		// app.fadeInOut(this,'fadeAni',0)
		setTimeout(function () {
			if (app.globalData.usinfo == 0) {
				that.setData({
					wxlogin: false
				})
				wx.hideTabBar();
			}
		}, 800)
		//获取购物车商品数量
		app.getShopCartNum()
	},
	onLoad: function () {
		var that = this;
		app.fadeInOut(this, 'fadeAni', 0)
		if (app.globalData.iphone == true) {
			that.setData({
				iphone: true
			})
		}

		// 获取商品信息
		wx.request({
			url: 'http://127.0.0.1:8080/xianDD/goods/RndGoods',
			method: 'GET',
			success: (res) => {
				this.setData({
					goods: [],
					loadingMoreHidden: true
				});
				var goods = [];
				if (!res.data.success || res.data.rows.length == 0) {
					this.setData({
						loadingMoreHidden: false,
					});
					return;
				}
				for (var i = 0; i < res.data.rows.length; i++) {
					goods.push(res.data.rows[i]);
				}
				console.log(goods)
				this.setData({
					goods: goods,
				});
			}
		})

	// 	//获取推荐商品信息
	// 	wx.request({
	// 		url: app.globalData.urls + '/shop/goods/list',
	// 		data: {
	// 			recommendStatus: 1,
	// 			pageSize: 10
	// 		},
	// 		success: function (res) {
	// 			console.log(res.data)
	// 			that.setData({
	// 				goods: [],
	// 				loadingMoreHidden: true
	// 			});
	// 			var goods = [];
	// 			if (res.data.code != 0 || res.data.data.length == 0) {
	// 				that.setData({
	// 					loadingMoreHidden: false,
	// 				});
	// 				return;
	// 			}
	// 			for (var i = 0; i < res.data.data.length; i++) {
	// 				goods.push(res.data.data[i]);
	// 			}
	// 			that.setData({
	// 				goods: goods,
	// 			});
	// 		}
	// 	})

	},
	// swiperchange: function (e) {
	// 	this.setData({
	// 		swiperCurrent: e.detail.current
	// 	})
	// },
	toDetailsTap: function (e) {
		wx.navigateTo({
			url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
		})
	},
	tapBanner: function (e) {
		if (e.currentTarget.dataset.id != 0) {
			wx.navigateTo({
				url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
			})
		}
	},
	tapSales: function (e) {
		if (e.currentTarget.dataset.id != 0) {
			wx.navigateTo({
				url: e.currentTarget.dataset.id
			})
		}
	},
	// userlogin: function (e) {
	// 	var that = this;
	// 	var iv = e.detail.iv;
	// 	var encryptedData = e.detail.encryptedData;
	// 	wx.login({
	// 		success: function (wxs) {
	// 			wx.request({
	// 				url: app.globalData.urls + '/user/wxapp/register/complex',
	// 				data: {
	// 					code: wxs.code,
	// 					encryptedData: encryptedData,
	// 					iv: iv
	// 				},
	// 				success: function (res) {
	// 					if (res.data.code != 0) {
	// 						wx.showModal({
	// 							title: '温馨提示',
	// 							content: '需要您的授权，才能正常使用哦～',
	// 							showCancel: false,
	// 							success: function (res) {}
	// 						})
	// 					} else {
	// 						that.setData({
	// 							wxlogin: true
	// 						})
	// 						app.login();
	// 						wx.showToast({
	// 							title: '授权成功',
	// 							duration: 2000
	// 						})
	// 						app.globalData.usinfo = 1;
	// 						wx.showTabBar();
	// 					}
	// 				}
	// 			})
	// 		}
	// 	})
	// }
})