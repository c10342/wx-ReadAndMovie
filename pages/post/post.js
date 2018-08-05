
// 不能用绝对路径
import { local_database } from '../../data/post-data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   相当于往data中添加数据
      this.setData({ postList:local_database });
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

// 点击文章列表跳转到文章详情页面
  goToDetail:function(event){
      var postId=event.currentTarget.dataset.postid;
      wx.navigateTo({
          url: 'post-detail/post-detail?id='+postId,
      })
  },

// 点击轮播图跳转到文章详情页面
  onSwiperTap(event){
    //   target和currentTarget区别，target是点击的组件，currentTarget是事件捕获的组件
    // 这里target是image组件，currentTarget是swiper组件
      var postId = event.target.dataset.postid;
      wx.navigateTo({
          url: 'post-detail/post-detail?id=' + postId,
      })
  }
})