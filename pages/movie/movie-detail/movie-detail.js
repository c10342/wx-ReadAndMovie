// pages/movie/movie-detail/movie-detail.js


var app = getApp();
import { http, convertToCastInfos, convertToCastString, convertToStarsArray } from '../../../utils/utils.js';
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
        var movieId = options.id;
        var url = app.globalData.baseUrl + '/v2/movie/subject/' + movieId;
        http(url, this.getMovieDetailData);
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

    // 处理电影详情数据
    getMovieDetailData(data) {
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large

            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: convertToCastString(data.casts),
            castsInfo: convertToCastInfos(data.casts),
            summary: data.summary
        }
        // 影人图片地址数组
        var imgUrlArr = [];
        for (var i = 0; i < movie.castsInfo.length; i++) {
            console.log(i)
            imgUrlArr.push(movie.castsInfo[i].img);
        }
        console.log(imgUrlArr)
        this.setData({
            movie,
            imgUrlArr
        })
    },

    // 点击上方封面小图片然后查看图片大图
    onLookImgTap(event) {
        var imgUrl = event.currentTarget.dataset.src;
        wx.previewImage({
            urls: [imgUrl],
            current: imgUrl
        })
    },

    //   点击下方影人图片
    onImgTap(event) {
        var that=this;
        var currentImgUrl = event.currentTarget.dataset.currentimg;
        wx.previewImage({
            urls: that.data.imgUrlArr,
            current: currentImgUrl
        })
    }
})