Page({
  data: {
      category: [
          {name:'水果',id:'guowei'},
          {name:'蔬菜',id:'shucai'},
          {name:'果干',id:'chaohuo'},
          {name:'粮油',id:'dianxin'},
          {name:'牛肉',id:'cucha'},
          {name:'羊肉',id:'danfan'},
          {name:'蛋类',id:'danlei'},
          {name:'菌菇',id:'jungu'},
          {name:'葱姜蒜',id:'chongjiangs'},
          {name:'配料',id:'peiliao'},
      ],
      detail:[],
      curIndex: 0,
      isScroll: false,
      toView: 'guowei'
  },
  onReady(){
      var self = this;
      self.setData({
        detail : [
          {id:"guowei",banner:"/images/橙子.png",cate:"水果",detail:[{thumb:"/images/classify-goods/橙子.png",name:"橙子"},{thumb:"/images/classify-goods/c2.png",name:"梨子"},{thumb:"/images/classify-goods/葡萄.png",name:"葡萄"},{thumb:"/images/classify-goods/柠檬.png",name:"柠檬"},{thumb:"/images/classify-goods/苹果.png",name:"苹果"},{thumb:"/images/classify-goods/菠萝.png",name:"菠萝"},{thumb:"/images/classify-goods/樱桃.png",name:"樱桃"},{thumb:"/images/classify-goods/芒果.png",name:"芒果"},{thumb:"/images/classify-goods/荔枝.png",name:"荔枝"}]},
          {id:"shucai",banner:"/images/c1.png",cate:"蔬菜",detail:[{thumb:"/images/classify-goods/土豆.png",name:"土豆"},{thumb:"/images/classify-goods/西红柿.png",name:"西红柿"},{thumb:"/images/classify-goods/小白菜.png",name:"小白菜"},{thumb:"/images/classify-goods/西红柿.png",name:"西红柿"},{thumb:"/images/classify-goods/西红柿.png",name:"西红柿"},{thumb:"/images/classify-goods/茄子.png",name:"茄子"},{thumb:"/images/classify-goods/土豆.png",name:"土豆"},{thumb:"/images/classify-goods/红薯.png",name:"红薯"},{thumb:"/images/classify-goods/胡萝卜.png",name:"胡萝卜"}]},
          {id:"chaohuo",banner:"/image/c1.png",cate:"果干",detail:[{thumb:"/images/classify-goods/核桃.png",name:"核桃桃"},{thumb:"/images/classify-goods/腰果.png",name:"腰果"},{thumb:"/images/classify-goods/花生.png",name:"花生"},{thumb:"/images/classify-goods/腰果.png",name:"腰果"},{thumb:"/images/classify-goods/腰果.png",name:"腰果"},]},
          {id:"dianxin",banner:"/images/c1.png",cate:"分类1",detail:[{thumb:"/images/classify-goods/c4.png",name:"猕猴桃"},{thumb:"/images/classify-goods/c2.png",name:"梨子"},{thumb:"/images/classify-goods/c2.png",name:"梨子"}]},
          {id:"cucha",banner:"/images/c1.png",cate:"分类2",detail:[{thumb:"/images/classify-goods/c3.png",name:"红枣"},{thumb:"/images/classify-goods/c2.png",name:"梨子"},{thumb:"/images/classify-goods/c2.png",name:"梨子"}]},
          {id:"danfan",banner:"/images/c1.png",cate:"分类3",detail:[{thumb:"/images/classify-goods/c2.png",name:"梨子"},{thumb:"/images/classify-goods/c2.png",name:"梨子"},{thumb:"/images/classify-goods/c2.png",name:"梨子"}]},
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
  switchTab(e){
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function(){
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    },0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    },1)
      
  }
  
})