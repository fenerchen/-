var http = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  loading:true
    // movieList:{}
    containerShow: true,
    searchPanel: false,
    moreMovieList:[],//搜索
    movieList:[],//电影三大块列表
    inputValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })
    var in_theaters = app.globalData.doubanBase + '/v2/movie/in_theaters' + "?start=0&count=3", coming_soon = app.globalData.doubanBase + '/v2/movie/coming_soon' + "?start=0&count=3", top250 = app.globalData.doubanBase + '/v2/movie/top250' + "?start=0&count=3"

    //请求数据
    http.httpMoviesData(in_theaters, this.setMovieData)
    http.httpMoviesData(coming_soon, this.setMovieData)
    http.httpMoviesData(top250, this.setMovieData)
  },
  //input输入框事件
  onBindFocus: function (e) {
    this.setData({
      containerShow: false,
      searchPanel: true

    })
  },
  //完成输入触发
  onBindConfirm:function(e) {
    // console.log(e)
    var value = e.detail.value
    var searchUrl = app.globalData.doubanBase +'/v2/movie/search?q='+value
    http.httpMoviesData(searchUrl, this.setSearchMovie)
    
  },
  setSearchMovie:function(movies){
    this.data.moreMovieList=movies
    this.setData({
      moreMovieList: this.data.moreMovieList//更新查询的电影
    })  
  },
  // onchange: function (e) {
  //   var value = e.detail.value
  //   var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + value
  //   http.httpMoviesData(searchUrl, this.setSearchMovie)

  // },
  onClearTap: function (e) {
    this.setData({
      containerShow: true,
      searchPanel: false,
      moreMovieList:[] ,
      inputValue:''  
    })
  },
  //设置电影数据，更新数据实时显示在页面
  setMovieData: function (movies, title) {
    if (title == "正在上映的电影-北京") {
      this.setMovieTypeOrder("正在热映", 0, movies)

    } else if (title == "即将上映的电影") {
      this.setMovieTypeOrder("即将上映", 1, movies)

    } else {
      this.setMovieTypeOrder("口碑电影", 2, movies)

    }
    this.setData({
      movieList: app.globalData.movieList
    })
  },
  //设置电影类型的出场顺序
  setMovieTypeOrder: function (str, num, movies) {
    var list = {
      movies: movies,
      header: str
    }
    app.globalData.movieList[num] = list
  },
  //展示更多电影
  onMoreTap: function (e) {
    var movieType = e.target.dataset.type
    //点击更多，跳转到新页面并把电影类型传递过去
    wx.navigateTo({
      url: './more/more?movieType=' + movieType,
    })
  },
  onMovieDetail:function(e){
    var movieid=e.currentTarget.dataset.id
    wx.navigateTo({
      url: './moviedetail/moviedetail?id=' + movieid,
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

  }
})