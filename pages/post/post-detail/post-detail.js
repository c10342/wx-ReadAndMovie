
import { local_database} from '../../../data/post-data.js';
// 获取小程序实例
var app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   获取前一个页面跳转过来的时候传递的参数
    var postId=options.id;
    // console.log(postId)
    var postDetailData = local_database[postId];
    // 同步,这个只能在onLoad生命周期函数中这样写，其他地方只能用异步方法
    // this.data.postDetailData = postDetailData
    // 异步
    this.setData({
        postDetailData,
        postId
    });

    // 读取缓存中的数据
    var post_collection=wx.getStorageSync('post_collection')
    if(post_collection){
        var postCollection=post_collection[postId];
        // 有数据说明用户已经收藏，没有就是没有收藏
        var collected=postCollection?true:false
        this.setData({
            collected
        });
    }else{
        // 用户第一次访问小程序，或者是清空了缓存
        var postCollectionArr={};
        // 第一次访问时应该是没有收藏
        postCollectionArr[postId]=false;
        wx.setStorageSync('post_collection', postCollectionArr);
        this.setData({
            collected:false
        })
    }
    this.setPlayingState();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

// 点击收藏图片，收藏文章
  onCollectionTap(event){
    //   设置缓存，所有涉及缓存的方法都有同步和异步2种方法,所有缓存如果不清除将会永久存在，但是上限是10MB；
    // 同步方法。
    //   wx.setStorageSync('key', '小明');
    //   wx.setStorageSync('val', {
    //       username:'zhangsan',
    //       age:18
    //   })

    var postCollectionArr=wx.getStorageSync('post_collection');
    // 根据传递过来的id读取用户是否收藏过的数据
    var postCollection=postCollectionArr[this.data.postId.toString()];
    // 取反
    postCollectionArr[this.data.postId.toString()]=!postCollection;
    wx.setStorageSync('post_collection', postCollectionArr);
    this.setData({
        collected:!postCollection
    });

    // 显示消息提示框
    wx.showToast({
        title: postCollection?'取消收藏':'收藏成功',
        icon:'success',
        duration:1000
    })

  },
// 点击分享图片，分享图片
  onShareTap(event){
    //   清除单个缓存
    //   wx.removeStorageSync('key');
    // 清除所有缓存
    // wx.clearStorageSync();

    var itemList=[
        '分享给朋友',
        '分享到朋友圈',
        '分享给qq好友',
        '分享到微博'
    ]
    wx.showActionSheet({
        itemList,
        itemColor:'#405F80',
        success:function(res){
            wx.showModal({
                title: '用户点击了'+itemList[res.tapIndex],
                content: itemList[res.tapIndex],
            })
        }
    })
  },

// 点击顶部图片中的音乐播放图片
  onMusicTap(){
    //   音乐播放可以使用audio组件，但该组件本质上是使用媒体播放api
    // 微信音乐如果不手动停止，即使是跳转了页面也不会停止播放，但是如果退出了小程序返回微信首页就会有一个总的音乐播放开关
      var music = local_database[this.data.postId.toString()]
      if(this.data.isPlaying){
        //   停止音乐播放
          wx.pauseBackgroundAudio();
          this.setData({
              isPlaying:false
          })
      }else{
        //   播放音乐
          wx.playBackgroundAudio({
            //   播放地址
              dataUrl: music.music.url,
            //   播放的标题
              title:music.music.title,
            //   播放时的封面
              coverImgUrl: music.music.coverImg
          })
          this.setData({
              isPlaying: true
          })
      }
  },

// 设置音乐播放状态
  setPlayingState(){
      if (app.globalData.g_isPlaying && app.globalData.g_currentMusicPostId==this.data.postId){
          this.setData({
              isPlaying:true
          })
      }
      // 监听背景音乐播放事件，这里主要为了让在点击总的音乐播放控制器时让页面跟他同步
      wx.onBackgroundAudioPlay(() => {
          this.setData({
              isPlaying: true
          });
        //   把全局音乐播放状态设置为true
          app.globalData.g_isPlaying=true;
          app.globalData.g_currentMusicPostId=this.data.postId;
      });
      wx.onBackgroundAudioPause(() => {
          this.setData({
              isPlaying: false
          })
          app.globalData.g_isPlaying=false;
          app.globalData.g_currentMusicPostId=null;
      });
    //   音乐播放停止，歌曲自动播放结束后
      wx.onBackgroundAudioStop(()=>{
          this.setData({
              isPlaying: false
          })
          app.globalData.g_isPlaying = false;
          app.globalData.g_currentMusicPostId = null;
      })
  }
})