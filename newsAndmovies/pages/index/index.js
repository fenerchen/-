//index.js
Page({
  data: {
    src: "../../img/food8.jpg"
  },

  onTap: function (e) {
    wx.switchTab({
      url: '../posts/posts'
    })

  },
  onLoad: function () {
    
  },
 
})

