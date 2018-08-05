// 整个小程序的生命周期，这里可以用来写一些全局用到的东西，然后在其他页面通过getApp()来获取小程序实例，然后调用这里面的方法
App({
    // 全局变量
    globalData:{
        // 音乐是否在播放
        g_isPlaying:false,
        // 记录当前正在播放歌曲的id
        g_currentMusicPostId:null,
        // 发送网络数据的公共url
        baseUrl:'http://t.yushu.im'
    },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
      
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
      
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
      
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
      
  }
})
