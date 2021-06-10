//index.js

Page({
  data: {
    slides: [
      "https://t1.picb.cc/uploads/2021/06/10/wflN77.png",
      "https://t1.picb.cc/uploads/2021/06/10/wfIgUT.png",
      "https://t1.picb.cc/uploads/2021/06/10/wf6hVJ.png"
    ],
    bargainList: [
      {
        title: "贵妃芒10斤芒果新鲜水果现摘当季热带整箱批发包邮",
        img: "https://t1.picb.cc/uploads/2021/06/10/wfc6qs.png",
        desc: "海南贵妃芒",
        basePrice: "98.88",
        originalPrice: "120.88",
        limit: "18"
      },
      {
        title: "圣女果酸甜自然熟新鲜现摘生吃小番茄即食当季水果云南5斤包邮",
        img: "https://t1.picb.cc/uploads/2021/06/10/wfcnZ6.png",
        desc: "云南圣女果",
        basePrice: "45.88",
        originalPrice: "60.88",
        limit: "18"
      },
      {
        title: "陕西新鲜土豆 农家沙地黄皮黄心洋芋农产品新鲜蔬菜马铃薯土豆10斤包邮",
        img: "https://t1.picb.cc/uploads/2021/06/10/wfclXM.png",
        desc: "陕西新鲜土豆",
        basePrice: "32.88",
        originalPrice: "45.88",
        limit: "18"
      },
      {
        title: "新疆库尔勒香梨 一级中果 总重约2kg 新鲜水果",
        img: "//img12.360buyimg.com/mobilecms/s500x500_jfs/t17515/256/1947534381/244203/f54cd223/5adef415Nf7a0a895.jpg",
        desc: "新疆香梨",
        basePrice: "68.88",
        originalPrice: "88.88",
        limit: "18"
      }
    ],
    topicList: [
      {
        img: "https://t1.picb.cc/uploads/2021/06/10/wfiKbe.png",
        title: "新疆红枣",
        subTitle: "新疆红枣和田大枣骏枣2500g特大红枣",
        price: "59.88"
      },
      {
        img: "https://t1.picb.cc/uploads/2021/06/10/wfeWsd.png",
        title: "土鸡蛋",
        subTitle: "九华山柴鸡蛋正宗土鸡蛋农家散养鸡蛋新鲜40枚",
        price: "119.88"
      },
      {
        img: "https://t1.picb.cc/uploads/2021/06/10/wflrTX.png",
        title: "苹果",
        subTitle: "山东烟台红富士苹果水果新鲜当季整箱10斤包邮",
        price: "68.99"
      }
    ]

  },
  goDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: './goodsDetail/goodsDetail'
    })
  }
})