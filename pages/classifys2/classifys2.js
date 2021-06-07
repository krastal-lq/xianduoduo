Page({
  data: {
    category: [{
        name: '水果',
        id: 'guowei'
      },
      {
        name: '蔬菜',
        id: 'shucai'
      },
      {
        name: '果干',
        id: 'chaohuo'
      },
      {
        name: '粮油',
        id: 'dianxin'
      },
      {
        name: '牛肉',
        id: 'cucha'
      },
      {
        name: '羊肉',
        id: 'danfan'
      },
      {
        name: '蛋类',
        id: 'danlei'
      },
      {
        name: '菌菇',
        id: 'jungu'
      },
      {
        name: '葱姜蒜',
        id: 'chongjiangs'
      },
      {
        name: '配料',
        id: 'peiliao'
      },
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei'
  },
  onReady() {
    var self = this;
    self.setData({
      detail: [{
          id: "guowei",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E6%A9%99%E5%AD%90.png",
          cate: "水果",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E6%A9%99%E5%AD%90.png",
            name: "橙子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%91%A1%E8%90%84.png",
            name: "葡萄"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E6%9F%A0%E6%AA%AC.png",
            name: "柠檬"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8B%B9%E6%9E%9C.png",
            name: "苹果"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8F%A0%E8%90%9D.png",
            name: "菠萝"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E6%A8%B1%E6%A1%83.png",
            name: "樱桃"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8A%92%E6%9E%9C.png",
            name: "芒果"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8D%94%E6%9E%9D.png",
            name: "荔枝"
          }]
        },
        {
          id: "shucai",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/fenleic1.png",
          cate: "蔬菜",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E5%9C%9F%E8%B1%86.png",
            name: "土豆"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%A5%BF%E7%BA%A2%E6%9F%BF.png",
            name: "西红柿"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E5%B0%8F%E7%99%BD%E8%8F%9C.png",
            name: "小白菜"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%A5%BF%E7%BA%A2%E6%9F%BF.png",
            name: "西红柿"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%A5%BF%E7%BA%A2%E6%9F%BF.png",
            name: "西红柿"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8C%84%E5%AD%90.png",
            name: "茄子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E5%9C%9F%E8%B1%86.png",
            name: "土豆"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E7%BA%A2%E8%96%AF.png",
            name: "红薯"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%83%A1%E8%90%9D%E5%8D%9C.png",
            name: "胡萝卜"
          }]
        },
        {
          id: "chaohuo",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/fenleic1.png",
          cate: "果干",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E6%A0%B8%E6%A1%83.png",
            name: "核桃桃"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%85%B0%E6%9E%9C.png",
            name: "腰果"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%8A%B1%E7%94%9F.png",
            name: "花生"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%85%B0%E6%9E%9C.png",
            name: "腰果"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goods%E8%85%B0%E6%9E%9C.png",
            name: "腰果"
          }, ]
        },
        {
          id: "dianxin",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/fenleic1.png",
          cate: "分类1",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc4.png",
            name: "猕猴桃"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }]
        },
        {
          id: "cucha",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/fenleic1.png",
          cate: "分类2",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc3.png",
            name: "红枣"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }]
        },
        {
          id: "danfan",
          banner: "http://qubj0g32q.hd-bkt.clouddn.com/images/fenleic1.png",
          cate: "分类3",
          detail: [{
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }, {
            thumb: "http://qubj0g32q.hd-bkt.clouddn.com/images/classify-goodsc2.png",
            name: "梨子"
          }]
        },
      ]
    })
    // wx.request({
    //     url:'',
    //     success(res){
    //         self.setData({
    //             detail : res.data
    //         })
    //     }
    // });

  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  }

})