Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userAvatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.login({
    //     success(){

    //     }
    // })
    var that=this;
    wx.getUserInfo({
        withCredentials:false,
        success(Info){
            that.setData({
                username: Info.userInfo.nickName,
                userAvatarUrl: Info.userInfo.avatarUrl
            })
        }
    })
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

// 跳转到文章列表
  onTap:function(){
    //   wx.navigateTo意思是从父页面跳转到子页面，子页面导航栏左侧有个返回按钮，父页面隐藏，触发onHide生命周期函数
    //   wx.navigateTo({
    //       url: '../post/post'
    //   })
    //   wx.redirectTo意思是进行平级跳转，不存在父子关系，导航栏左侧没有返回按钮，原本的页面销毁，触发onUnload生命周期函数
    // wx.redirectTo({
    //     跳转页面的路径，与app.json中的pages中的一样，加载所有名为post的文件
    //     url: '../post/post',
    // })

    //wx.navigateTo或者wx.redirectTo需要跳转的应用内非 tabBar 的页面的路径
    //wx.switchTab需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
    //   app.json 的 tabBar 字段定义的页面中，在list在出现的组件都会有tabBar导航栏，没有出现的组件不会有tabBar导航栏
    wx.switchTab({
        url: '../post/post'
    })
  }
})