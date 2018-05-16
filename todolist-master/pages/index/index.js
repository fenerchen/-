var util = require("../../utils/util.js")
//更改数组 第三个参数是对象
function editArr(arr, i, editCnt) {
  console.log(arr)
  let newArr = arr, editingObj = newArr[i];
  for (var x in editCnt) {
    newArr[i][x] = editCnt[x]

    // console.log(editingObj[x])

  }

  return newArr;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userinfo_nickname: 'gg',
    curIpt: '',
    curBegin: 0,
    curRange: [],
    curFinish: 1,
    lists: [],
    showAll: true
  },
  tologin: function (e) {
    this.setData({
      userinfo_nickname: e.detail.userInfo.nickName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.setTimeHalf(new Date()))
  },
  toChange: function (e) {
    let i = e.target.dataset.id
    this.setData({
      lists: editArr(this.data.lists, i, { editing: true })
    })
  },
  iptChange: function (e) {
    let range = util.setTimeHalf(new Date())
    this.setData({
      curIpt: e.detail.value,
      curRange: range
    })
  },
  iptEdit(e) {
    let i = e.target.dataset.id
    var value = e.detail.value
    // console.log(e.detail.value)
    this.setData({
      lists: editArr(this.data.lists, i, { content: value })
    })
  },
  setDone: function (e) {
    let i = e.target.dataset.id
    // console.log(e.detail.value)
    this.setData({
      lists: editArr(this.data.lists, i, { done: true })
    })
  },
  toDelete: function (e) {  
    let i = e.target.dataset.id, newLists = this.data.lists;
    newLists.map(function (l, index) {
      if (l.id == i) {
        newLists.splice(index, 1);
      }
    })
    this.setData({
      lists: newLists
    })

  },
  saveEdit: function (e) {
    let i = e.target.dataset.id
    var flag = this.data.lists[i].done

    this.setData({
      lists: editArr(this.data.lists, i, { editing: !flag })
    })
  },
  beginChange: function (e) {
    console.log(e.detail.value+1)
    var begin = Number(e.detail.value) 
    this.setData({
      curBegin: begin,
      curFinish: begin+1
    })
  },
  finishChange: function (e) {
    this.setData({
      curFinish: e.detail.value
    })
  },
  formSubmit: function (e) {
    let cnt = this.data.curIpt,
      newList = this.data.lists,
      i = newList.length,
      begin = this.data.curRange[this.data.curBegin],
      finish = this.data.curRange[this.data.curFinish]
    if (cnt) {
      newList.push({ id: i, content: cnt, done: false, beginTime: begin, finishTime: finish, editing: false })
      this.setData({
        lists: newList,
        curIpt: ''
      })
    }
  },
  formRest: function (e) {
    this.setData({
      curIpt: '',
      curRange: []
    })
  },
  showUnfinished(e) {
    this.setData({
      showAll: false
    })
  },
  showAll: function (e) {
    this.setData({
      showAll: true
    })
  },
  doneAll: function (e) {
    let ll = this.data.lists

    ll.forEach(function (item, i) {
      item.done = true
      // console.log(item)
    })
    this.setData({
      lists: ll
    })
  },
  saveData: function (e) {
    let ll = this.data.lists
    wx.setStorageSync('lists', ll)
  },
  deleteAll: function (e) {
    this.setData({
      lists: []
    })
  },
  /**
   *    * 生命周期函数--监听页面初次渲染完成
   *    */
  //  onReady: function () {},
  //  */
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