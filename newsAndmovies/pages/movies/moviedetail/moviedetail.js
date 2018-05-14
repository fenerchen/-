var http = require("../../../utils/util.js")
var baseurl = getApp().globalData.doubanBase

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetailTitle: '暂无信息',
    movieDetailImg: 'https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png',
    movieDetailTime: '暂无信息',
    movieDetailplace: '暂无信息',
    score: {
      score: '暂无信息',
      starsNum: [1, 1, 1, 1, 0]
    },
    likes: '暂无信息',
    comment: '暂无信息',
    director: '暂无信息',
    actors: '暂无信息',
    movietype: '暂无信息',
    summary: '暂无信息',
    brife: '',
    allsummary: '',
    imgUrls: ['https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png'],
    down_up: "更多"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(baseurl)
    var movieid = options.id
    var movieDetailUrl = baseurl + "/v2/movie/subject/" + movieid
    wx.showLoading({
      title: 'loading',
    })
    this.httpMoviesData(movieDetailUrl)
  },
  httpMoviesData: function (url) {
    var that = this
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        wx.hideLoading()
        // console.log(res)
        var data = res.data
        wx.hideLoading()
        if (data.images.small) {
          var movieDetailImg = data.images.small
          that.setData({
            movieDetailImg: movieDetailImg
          })
        }
        if (data.title) {
          var movieDetailTitle = data.title

          that.setData({
            movieDetailTitle: movieDetailTitle
          })
        }
        if (data.countries) {
          var movieDetailplace = data.countries[0]
          that.setData({
            movieDetailplace: movieDetailplace
          })

        }
        if (data.pubdate) {
          var movieDetailTime = data.pubdate
          that.setData({
            movieDetailTime: movieDetailTime
          })

        }
        if (data.collect_count) {
          var likes = data.collect_count
          that.setData({
            likes: likes
          })
        }
        if (data.comments_count) {
          var comment = data.comments_count
          that.setData({
            comment: comment
          })
        }
        if (data.genres) {
          var movietype = data.genres.join('|')
          that.setData({
            movietype: movietype
          })
        }
        if (data.directors[0]) {
          var director = data.directors[0].name
          that.setData({
            director: director
          })
        }
        if (data.summary) {
          var allsummary = data.summary
          if (allsummary.length > 80) {
            var summary = allsummary.slice(0, 60) + '...'
          }
          that.setData({
            summary: summary,
            allsummary: allsummary,
            brife: summary
          })
        }
        if (data.casts) {
          var actors = '', imgUrls = []
          data.casts.forEach(function (item) {
            if (item.name) {
              actors += item.name + '、'
            }
            if (item.avatars) {
              let temp = {}
              let name = item.name, url = item.avatars.small
              temp = {
                name: name,
                url: url
              }
              // console.log(temp)
              imgUrls.push(temp)
            }
          })
          if (actors.length > 10) {
            actors = actors.slice(0, 10) + '...'
          }
          that.setData({
            actors: actors,
            imgUrls: imgUrls
          })
        }
        if (data.rating) {
          var score = data.rating.average, lentrue = Math.ceil(parseInt(score) / 2), starsNum = []
          for (let i = 0; i < lentrue; i++) {
            starsNum.push(true)
          }
          for (let j = 0; j < (5 - lentrue); j++) {
            starsNum.push(false)
          }

          var scores = { score, starsNum }

          // console.log(scores)
          that.setData({
            score: scores
          })
        }

      },
      fail: function (err) {
        console.log(err)
      },
    })

  },
  onSummaryMoreTap: function (e) {
    // console.log(this.data.allsummary)
    var text = this.data.down_up
    if (text == "更多") {
      this.setData({
        down_up: "收起",
        summary: this.data.allsummary
      })
    } else {
      this.setData({
        down_up: "更多",
        summary: this.data.brife
      })
    }

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