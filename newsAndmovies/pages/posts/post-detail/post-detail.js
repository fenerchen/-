var postsData = require("../../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var id = options.id
    this.data.currentId = id
    var list = postsData.postList
    for (var key in list) {
      if (list[key].postid == id) {//显示点击的新闻详情
        this.setData({
          detail: list[key]                                                                                   
        })
      }
    }
    var postsCollected = wx.getStorageSync('post_Collected')//获取所有文章的收藏对象
    if (postsCollected) {
      var Collected = postsCollected[id]//获取当前文章的收藏状态
      if (typeof Collected == 'undefined') {//当前的文章是第一次浏览，那么得更新缓存
        postsCollected[id] = false
        Collected = postsCollected[id]
        wx.setStorageSync('post_Collected', postsCollected)
      }
      this.setData({
        collected: Collected
      })
    } else {//没有postsCollected，创建
      var postsCollected = {}
      postsCollected[id] = false
      wx.setStorageSync('post_Collected', postsCollected)
      //  console.log(1)
    }
    //监听音乐启动
    var that = this
    wx.onBackgroundAudioPlay(function(){
      that.setData({isPlayMusic:true})
    })
    //监听音乐暂停
    wx.onBackgroundAudioPause(function () {    
      that.setData({ isPlayMusic: false})
    })
    //监听音乐停止
    this.musicStop()
  },
  musicStop:function(){
    var that = this    
    wx.onBackgroundAudioStop(function () {
      that.setData({ isPlayMusic: false })
    })
  },
  //异步获取缓存收藏状态，暂时不用，业务逻辑不复杂，不要异步
  getPostsCollectedAsy:function(){
    var that=this
    wx.getStorage({
      key: 'post_Collected',
      success: function(res) {
        var postsCollected = res.data
        var collectedState = postsCollected[that.data.currentId]//获取当前文章的收藏状态
        //显示toast
        that.showToast(postsCollected, collectedState)      
      },
    })
  },
  onCollectionTap: function (e) {
     var postsCollected = wx.getStorageSync('post_Collected')//获取所有文章的收藏对象
     var collectedState = postsCollected[this.data.currentId]//获取当前文章的收藏状态 
    //收藏是否显示Toast提示框
      this.showToast( postsCollected,collectedState)

     //this.getPostsCollectedAsy(),异步获取缓存，暂时不用

     //显示模态框,暂时不用，用toast更方便一些
    //this.showModal(postsCollected, collectedState) 
  },
  showToast: function (postsCollected, collectedState){
       
    this.data.collected = !collectedState//更改状态
    this.setData({
      collected: this.data.collected//更新数据
    })
    postsCollected[this.data.currentId] = this.data.collected//重新设置缓存
    wx.setStorageSync('post_Collected', postsCollected)
    wx.showToast({
      title: this.data.collected ? "收藏成功" : "取消收藏",
    })
  },
  //自定义模态框
  showModal: function (postsCollected, collectedState){
    var that=this
    wx.showModal({
      title: '收藏文章',
      content: collectedState?'您要取消收藏吗？':'您确定要收藏吗？',
      confirmText: "确定",
      cancelText: '取消',
      success:function(res){
        if(res.confirm){
          that.data.collected = !collectedState//更改状态
          that.setData({
            collected: that.data.collected//更新数据
          })
          postsCollected[that.data.currentId] = that.data.collected//重新设置缓存
          wx.setStorageSync('post_Collected', postsCollected)
        } 
      }

    })
  },
  //分享点击
  onShareTap: function (e) {
    var shareList = ['分享到微信好友', '分享到朋友圈', '分享到QQ', '分享到微博']
    wx.showActionSheet({
      itemList: shareList,
      itemColor:'#405f80',
      success:function(res){
        // console.log(res)
        wx.showModal({
          title: '用户' + shareList[res.tapIndex],
          content: '精彩的东西分享给好友',
        })
      }
    })
  },
  //点击音乐播放
  onMusicTap:function(e){
    var isPlay = this.data.isPlayMusic
    this.data.isPlayMusic=!isPlay
    if (this.data.isPlayMusic){
      wx.playBackgroundAudio({
        dataUrl: this.data.detail.music.dataUrl,
        title: this.data.detail.music.title,
        // coverImgUrl: '../../../img/food4.jpg无法显示本地图片
        coverImgUrl: this.data.detail.music.coverImgUrl
      })
    }else{
      wx.pauseBackgroundAudio()
    }
   this.setData({
     isPlayMusic: this.data.isPlayMusic
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
    //页面卸载停止播放音乐
    wx.stopBackgroundAudio()

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