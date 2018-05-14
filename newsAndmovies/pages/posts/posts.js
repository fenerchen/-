// pages/posts/posts.js
var postsData = require("../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 100,
    eye_num: 1
    // position:"left"
  },
  onPostTap: function (e) {
    var postid = e.currentTarget.dataset.postid;
    var numsCollected = wx.getStorageSync('collected')
    numsCollected[postid]++
    postsData.postList[postid].eye_num = numsCollected[postid]
    wx.setStorageSync('collected', numsCollected)
    // console.log(postid)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    })
  },

  onSwiperTap: function (e) {
    var swiperid = e.target.dataset.swiperid + 3
    // console.log(e)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + swiperid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载的时候获取reading的次数，并显示
    var len = postsData.postList.length
    var numsCollected = wx.getStorageSync('collected')
    if (numsCollected) {
      for (let i = 0; i < len; i++) {
        postsData.postList[i].eye_num = numsCollected[i]
      }
    } else {
      var numsCollected = {}
      for (let i = 0; i < len; i++) {

        postsData.postList[i].eye_num = 0
        numsCollected[i] = 0
        wx.setStorageSync('collected', numsCollected)
      }
    }
    this.setData({
      newsimgUrls: postsData.postList
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
//展示的时候，对比reading数量是否发生变化，若是则更新数值，存在一个问题，无法局部更新reading数量，更新的时候所有的都更新了
    var len = postsData.postList.length
    var numsCollected = wx.getStorageSync('collected')
    for (let i = 0; i < len; i++) {
      if (postsData.postList[i].eye_num != numsCollected[i]){
        postsData.postList[i].eye_num = numsCollected[i]   
      } 
    }
    this.setData({
      newsimgUrls: postsData.postList
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('hide')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('unload')

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