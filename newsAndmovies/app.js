//app.js
App({
   onLaunch: function () {
      //  wx.clearStorageSync();//清除所有缓存
    //  var x = wx.getStorageInfoSync()
// var y=wx.getStorageSync()
// console.log(x)
// console.log(y)
     wx.getSetting({
       success:res=>{
        //  console.log(res)
         if (res.authSetting['scope.userInfo']){
           wx.getUserInfo({

             success:res=>{
              //  console.log(res)
               this.globalData.userInfo=res.userInfo
               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
               // 所以此处加入 callback 以防止这种情况
               if (this.userInfoReadyCallback) {
                 this.userInfoReadyCallback(res)
               }
             }
           })
         }
       }
     })
  },
  globalData: {
    doubanBase:"https://douban.uieee.com",
    // movieList: []
    movieList:[1,2,3],
    userInfo: null
  },
  
})