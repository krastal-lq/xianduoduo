//app.js
App({
	onLaunch: function () {
		var that = this;
		that.urls();
		wx.getSystemInfo({
			success: function (res) {
				if (res.model.search("iPhone X") != -1) {
					that.globalData.iphone = true;
				}
				if (res.model.search("MI 8") != -1) {
					that.globalData.iphone = true;
				}
			}
		});

    var token = wx.getStorageSync('token');
		// console.log(token)
		if (token) {
			// console.log(1)
			// 校验token有效性
			this.checkLogin(token);
		} else {
			// console.log(2)
			this.login(); // 微信登录获取code，并发送到服务端更新token
		}
	},
	urls: function () {
		var that = this;
		that.globalData.urls = that.siteInfo.url + that.siteInfo.subDomain;
		that.globalData.share = that.siteInfo.shareProfile;
	},
	siteInfo: require("config.js"),

	// 发送token到服务端校验
	checkLogin: function (token) {
		wx.request({
			url: 'http://127.0.0.1:8080/xianDD/CheckLogin',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			data: {
				token: token
			},
			success: res => {
				if (res.data.success) { // token有效
					this.globalData.token = token;
					// 全局变量赋值后，执行回调函数，完成index中的操作
				} else { // token无效
					this.globalData.token = null;
					this.login();
				}
			}
		})
	},

	// 登录
	login: function () {
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取登录凭证token
				wx.request({
					url: 'http://127.0.0.1:8080/xianDD/Login',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'
					},
					data: {
						code: res.code
					},
					method: 'POST',
					success: res => {
						// console.log(res.data)
						if (!res.data.success) {
							// 登录不成功
							this.globalData.usinfo = 0;
							wx.hideLoading();
							wx.showModal({
								title: "提示",
								content: "无法登录，请重试",
								showCancel: false
							});
							return;
						}
						//判别登录是否成功
						this.globalData.usinfo = 1;
						var token = res.data.data.token;
						// 将token设置为全局变量
						this.globalData.token = res.data.data.token;
						this.globalData.uid = res.data.data.userId;
						// 同时将token存入数据缓存storage中
						wx.setStorage({
							data: token,
							key: 'token'
						})
					}
				})
			}
		})
	},
	sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString) {
		var that = this;
		wx.request({
			url: that.globalData.urls + "/template-msg/put",
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			data: {
				token: that.globalData.token,
				type: 0,
				module: "order",
				business_id: orderId,
				trigger: trigger,
				template_id: template_id,
				form_id: form_id,
				url: page,
				postJsonString: postJsonString
			}
		});
	},
	sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
		var that = this;
		wx.request({
			url: that.globalData.urls + "/template-msg/put",
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			data: {
				token: that.globalData.token,
				type: 0,
				module: "immediately",
				template_id: template_id,
				form_id: form_id,
				url: page,
				postJsonString: postJsonString
			}
		});
	},
	fadeInOut: function (that, param, opacity) {
		var animation = wx.createAnimation({
			//持续时间800ms
			duration: 300,
			timingFunction: 'ease',
		})
		animation.opacity(opacity).step()
		var json = '{"' + param + '":""}'
		json = JSON.parse(json);
		json[param] = animation.export()
		that.setData(json)
	},
	isStrInArray: function (item, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == item) {
				return true;
			}
		}
		return false;
	},
	//获取购物车商品数量
	getShopCartNum: function () {
		var that = this
		wx.getStorage({
			key: 'shopCarInfo',
			success: function (res) {
				if (res.data) {
					if (res.data.shopNum > 0) {
						wx.setTabBarBadge({
							index: 2,
							text: '' + res.data.shopNum + ''
						})
					} else {
						wx.removeTabBarBadge({
							index: 2,
						})
					}
				} else {
					wx.removeTabBarBadge({
						index: 2,
					})
				}
			}
		})
	},
	// 全局变量
	globalData: {
		token: null,
		userInfo: null
	}
})