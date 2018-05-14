//请求数据
function httpMoviesData(url, fn,eventype) {
  var that = this
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: { 'content-type': 'application/xml' },
    success: function (res) {
      processDoubanData(res.data,fn)
      if (eventype == 'pulldown') {
        wx.stopPullDownRefresh()
      } else if (eventype == 'reachBottom') {
        wx.hideNavigationBarLoading()
      }
      else {
        wx.hideLoading()
      }
    },
    fail: function (err) {
      console.log(err)
    },
  })
    
}
//处理豆瓣数据，变成需要的易用于项目读写的形式
function processDoubanData(movieData,fn) {
  var movies = []
  for (var index in movieData.subjects) {
    var subject = movieData.subjects[index]
    var title = subject.title
    if (title.length > 6) {
      title = title.substring(0, 6) + "..."
    }
    var score = subject.rating.average, lentrue = Math.ceil(parseInt(score) / 2), starsNum = []
    for (let i = 0; i < lentrue; i++) {
      starsNum.push(true)
    }
    for (let j = 0; j < (5 - lentrue); j++) {
      starsNum.push(false)
    }
    var temp = {
      title: title,
      imageUrl: subject.images.large,
      score: { score, starsNum },
      movieId: subject.id
    }
    movies.push(temp)
  }
  //更新数据，实时显示在页面
  fn(movies, movieData.title)
}

module.exports = {
  httpMoviesData: httpMoviesData,
  processDoubanData: processDoubanData
}
