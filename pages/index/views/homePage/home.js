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
      'http://qubj0g32q.hd-bkt.clouddn.com/1.jpg',
      'http://qubj0g32q.hd-bkt.clouddn.com/2.jpg',
      'http://qubj0g32q.hd-bkt.clouddn.com/3.jpg',
      'http://qubj0g32q.hd-bkt.clouddn.com/4.jpg'
    ],
    menus: [{
        icon: 'http://qubj0g32q.hd-bkt.clouddn.com/youxuan.png',
        title: '优选商城',
        color:'#BEE570'
      },
      {
        icon: 'http://qubj0g32q.hd-bkt.clouddn.com/nongshi.png',
        title: '逛农市',
        color:'#F8CEB4'
      },
      {
        icon: 'http://qubj0g32q.hd-bkt.clouddn.com/zhengce.png',
        title: '看政策',
        color:'#9DBAE1'
      },
      {
        icon: 'http://qubj0g32q.hd-bkt.clouddn.com/funong.png',
        title: '消费帮扶',
        color:'#B4DDFF'
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})