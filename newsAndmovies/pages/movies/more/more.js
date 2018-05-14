var http = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieType: '',
    moviesurl: '',
    moreMovieList:[],
    scrolly: true,
    scrollx: false,
    flag: false,
    start: 0,//请求电影的开始下标
    count: 18,//每次请求的电影数量,
    addMoreMovie: [],
    scrollHeight:1200
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieType = options.movieType, moviesurl = '', moviesallurl = '', baseurl = app.globalData.doubanBase, parse = "?start=" + this.data.start + "&count=18"
    this.setData({
      movieType: movieType
    })
    wx.showLoading({
      title: 'loading',
    })
    if (movieType == '正在热映') {
      moviesurl = app.globalData.doubanBase + '/v2/movie/in_theaters'
      moviesallurl = moviesurl + parse
    } else if (movieType == '即将上映') {
      moviesurl = app.globalData.doubanBase + '/v2/movie/coming_soon'
      moviesallurl = moviesurl + parse
    } else {
      moviesurl = app.globalData.doubanBase + '/v2/movie/top250'
      moviesallurl = moviesurl + parse
    }
    this.setData({
      moviesurl: moviesurl
    })
    http.httpMoviesData(moviesallurl, this.setMoviesData, 'loading')
  },
 
  setMoviesData:function(movies){
    //上划加载更多电影，addMoreMovie是上次加载后的所有电影集合
    var addMoreMovie = this.data.addMoreMovie.slice(), len = addMoreMovie.length
    //第一次上划加载
    if (len == 0) {
      addMoreMovie = movies
    } else {//非第一次上划加载
      addMoreMovie = addMoreMovie.concat(movies)
    }
    this.setData({
      moreMovieList: addMoreMovie,
      addMoreMovie: addMoreMovie
    })
    //请求成功，更新start的值
    this.setData({
      start: this.data.start + 18,
    })
  },
  onMovieDetail: function (e) {
    // console.log(this.data.movieList)
    // console.log(e)
    var movieid = e.currentTarget.dataset.id
    // console.log(movieid)

    wx.navigateTo({
      url: '../moviedetail/moviedetail?id=' + movieid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.movieType,
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
    var moviesurl = this.data.moviesurl
    //每次刷新，清除历史电影数据
    this.setData({
     addMoreMovie: []
    })
    var moviesallurl = moviesurl +'?start=0&count=18'
    http.httpMoviesData(moviesallurl, this.setMoviesData, 'pulldown')
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var nexturl = this.data.moviesurl
    var nextallurl = nexturl + "?start=" + this.data.start + "&count=" + 18
    wx.showNavigationBarLoading()
    http.httpMoviesData(nextallurl, this.setMoviesData, 'reachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})