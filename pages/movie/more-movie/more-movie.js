var app = getApp();

import { http } from '../../../utils/utils.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: '',
        baseUrl:'',
        // 是否第一次发送请求,即是点击更多按钮跳转到该页面时
        isFirst:true,
        // 下拉刷新时是否已经没有更多数据了
        isEmpty:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category;
        this.setData({
            navigateTitle: category
        })

        var url = app.globalData.baseUrl;
        switch (category) {
            case '正在热映':
                url += '/v2/movie/in_theaters';
                break;
            case '即将上映':
                url += '/v2/movie/coming_soon';
                break;
            case '豆瓣Top250':
                url += '/v2/movie/top250';
                break;
        }
        this.setData({
            baseUrl:url
        })
        // 发送网络请求
        http(url, this.getMoreListData);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        //   设置导航栏标题只能在onReady生命周期函数中设置
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
        })
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

    // 请求网络数据后的回调函数
    getMoreListData(data){
        var that=this;
        // 判断是否已经没有更多数据
        if(data.count==0){
            this.setData({
                // 没有更多数据
                isEmpty:true
            })
        }
        if (this.data.isFirst) {
            this.setData({
                movies: this.formatData(data),
                // 是否第一次发送请求
                isFirst:false,
                // 第一次请求回来多少条数据
                count:data.count,
                // 数据总量
                total:data.total
            })
        }else{
            // 上拉加载更多
            this.setData({
                movies: that.data.movies.concat(that.formatData(data)),
            })
        }
        // 隐藏 loading 提示框
        wx.hideLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
        // 隐藏导航条加载动画。
        wx.hideNavigationBarLoading();
    },

    // 整理数据
    formatData(data) {
        var movies = [];
        var subject = data.subjects;
        for (var i = 0; i < subject.length; i++) {
            var item = subject[i];
            var title = item.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + '...';
            }
            movies.push({
                title,
                stars: parseInt(item.rating.stars / 10),
                average: item.rating.average,
                coverageUrl: item.images.large,
                movieId: item.id,
            })

        }
        return movies;
    },

// 上拉加载更多
    onScrollToLower(){
        if (this.data.isEmpty) {
            return;
        }
        // 显示 loading 提示框
        wx.showLoading({
            title: '正在加载中',
            mask:true
        })
        var url=this.data.baseUrl;
        url += '?start=' + this.data.count +'&count=10'
        http(url, this.getMoreListData);
        this.setData({
            count: this.data.count + 10
        });
    },

// 下拉刷新，必须在json文件中开启"enablePullDownRefresh": true
    onPullDownRefresh(){
        // 显示导航条加载动画。
        wx.showNavigationBarLoading()
        var url = this.data.baseUrl;
        url += '?start=0&count=20';
        this.setData({
            isEmpty:false,
            movies:{},
            isFirst:true
        })
        http(url, this.getMoreListData);
    },

    // 上拉触底,上拉加载更多，必须在json文件中开启"enablePullDownRefresh": true,
    onReachBottom(){
        this.onScrollToLower();
    },

    // 跳转到电影详情页面
    goToMovieDetail(event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
        })
    }

})