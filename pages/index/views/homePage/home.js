// pages/home/pages/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiper: [
      'https://img13.360buyimg.com/babel/s1420x960_jfs/t1/137619/20/8754/126775/5f641dd4Ef9250fa5/3c1e14895f42caef.jpg!cc_1420x960.webp',
      'https://img13.360buyimg.com/babel/s1420x960_jfs/t1/132255/11/5541/76551/5f1e6d10E98a2e832/8c9c5fd6acf32e8e.png!cc_1420x960.webp',
      'https://img11.360buyimg.com/babel/s1420x960_jfs/t1/132846/11/6851/179116/5f334ffdEda434cfe/99d008d50f83096a.png!cc_1420x960.webp',
      'https://img30.360buyimg.com/babel/s1420x960_jfs/t1/122421/7/8067/75888/5f1e6cf0E30279d66/895260b7a591fe62.png!cc_1420x960.webp'
    ],
    menus: [{
        icon: '/images/iconimg/fruit.png',
        title: '水果蔬菜'
      },
      {
        icon: '/images/iconimg/beef.png',
        title: '禽畜蛋类'
      },
      {
        icon: '/images/iconimg/liang.png',
        title: '粮油米面'
      },
      {
        icon: '/images/iconimg/snack.png',
        title: '零食坚果'
      },
      {
        icon: '/images/iconimg/seafood.png',
        title: '海鲜水产'
      }
    ],
    djxy: [{
        title: '厨房配件',
        subTitle: '厨房神器',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/74597/14/712/109477/5cef91a9Ec5b4246a/e70a600428c55b0e.jpg!q70.jpg.dpg'
      },
      {
        title: '烹饪美食',
        subTitle: '美好味蕾',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/144767/37/8596/239462/5f61d261Ea01d3b1e/3b8875bb45f51bf7.jpg!q70.jpg.dpg'
      },
      {
        title: '吃货必备',
        subTitle: '缤纷水果趴',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/127336/33/7836/132475/5f1a4ecfE5ba7e964/661309816ded52d5.jpg!q70.jpg.dpg'
      },
      {
        title: '烘焙时光',
        subTitle: '烘焙时光',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/38465/5/6797/211663/5cd3b754E107cd897/e733efdd080cf918.jpg!q70.jpg.dpg'
      },
    ],
    everyDay: [{
        title: '免息星球',
        titleColor: 'title-color1',
        subTitle: '白条免息购',
        img: '//m.360buyimg.com/n1/s150x150_jfs/t29566/227/1464891645/10350/a5b133e2/5ce20cdcNd9cdd972.jpg!q70.jpg.dpg'
      },
      {
        title: '每日特价',
        titleColor: 'title-color2',
        subTitle: '9块9疯抢',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/89676/29/5758/20628/5def37a2Eff165a1c/b41fe7c9ac32f16f.jpg!q70.jpg.dpg'
      },
      {
        title: '品牌闪购',
        titleColor: 'title-color3',
        subTitle: '汇大牌好价',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/88638/33/5675/28468/5def3b04E728e691f/8997a8bf07db66b7.png!q70.jpg.dpg'
      },
      {
        title: '京东直播',
        titleColor: 'title-color4',
        subTitle: '边看边买',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/80435/12/13755/37856/5daeb76bEc10eb013/177eb658079595d1.jpg!q70.jpg.dpg'
      },
      {
        title: '排行榜',
        titleColor: 'title-color5',
        subTitle: '专属购物指南',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t10675/97/2254709219/9497/6ba245fd/59f14a23N0594b89c.jpg!q70.jpg.dpg'
      },
      {
        title: '拍拍好物',
        titleColor: 'title-color6',
        subTitle: 'iphone 5折起 ',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/76945/35/760/26244/5cef9705E501242ee/c56b89c0946438ef.jpg!q70.jpg.dpg'
      },
      {
        title: '新品首发',
        titleColor: 'title-color7',
        subTitle: '京东小魔方  ',
        img: '//m.360buyimg.com/n1/s150x150_jfs/t1/116252/24/2308/43604/5ea1359fE61a06adb/6cef94529cd1cf09.png!q70.jpg.dpg'
      },
      {
        title: '发现好货',
        titleColor: 'title-color8',
        subTitle: '发现品质生活',
        img: '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/38988/36/7707/54292/5cefa2b0E1cce5cfa/64e76ed6c67568bf.png!q70.jpg.dpg'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})