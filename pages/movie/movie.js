
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters:null,
        comingSoon:null,
        top250:null,
        // 控制搜索面板或者电影面板的显示
        isShow:true,
        // 搜索结果
        searchResult:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var in_theatersUrl = '/v2/movie/in_theaters'+'?start=0&count=3';
        var coming_soonUrl = '/v2/movie/coming_soon' + '?start=0&count=3';
        var top250Url = '/v2/movie/top250' + '?start=0&count=3';

        this.getMovieListData(in_theatersUrl,'inTheaters','正在热映');
        this.getMovieListData(coming_soonUrl,'comingSoon','即将上映');
        this.getMovieListData(top250Url,'top250','豆瓣Top250');
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

    // 发送网络请求
    getMovieListData(url,key,category) {
        var that=this;
        wx.request({
            url: app.globalData.baseUrl + url,
            method: 'GET',
            success(res) {
                // 根据传递过来的key动态的往data中添加数据
                var temp ={};
                temp[key] = that.formatData(res,category)
                that.setData(temp)
            },
            fail(err) {
                console.log('fail')
            }
        })
    },

// 整理数据
    formatData(data, category){
        var movies=[];
        var subject =data.data.subjects;
        for(var i=0;i<subject.length;i++){
            var item = subject[i];
            var title= item.title;
            if(title.length>=6){
                title=title.substring(0,6)+'...';
            }
            movies.push({
                title,
                stars: parseInt(item.rating.stars/10),
                average:item.rating.average,
                coverageUrl:item.images.large,
                movieId:item.id,
                category
            })

        }
        return movies;
    },

// 跳转到更多页面
    onMoreTap(event){
        var category=event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category='+category
        })
    },

// 输入框获取焦点
    onFocusTap(){
        console.log(1)
        this.setData({
            isShow:false
        })
    },

// 点击搜索栏的关闭按钮
    onCloseTap(){
        this.setData({
            isShow: true,
            searchResult:[]
        });
    },

    // 点击完成按钮时触发，event.detail = { value: value }
    onConfirmTap(event){
        // 获取文本框中的内容
        var text= event.detail.value;
        var searchUrl ='/v2/movie/search?q='+text;
        this.getMovieListData(searchUrl, 'searchResult', 'text');
    },

// 跳转到电影详情页面
    goToMovieDetail(event){
        var movieId=event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id='+movieId,
        })
    }
})