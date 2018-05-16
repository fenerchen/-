function setTimeHalf() {
  var curTime = formatTime(new Date()), timeRange = getTimesRange(), index = 0, len = timeRange.length
  for(let i=0;i<len;i++){
    var timer = timeRange[i].split(':')
    if (timer[0] >=curTime[0]) {
      // console.log(Number(curTime[1]))
      index = Number(curTime[1]) <=30 ? i : (i+1)
      // console.log(i)
      // console.log(i+1)
      // return index
      break
    }
  }
  if (curTime[0]<10){
    curTime[0] = '0'+curTime[0]
  }
  if (curTime[1]<10){
    curTime[1] = '0' + curTime[1]
    
  }
  var range = timeRange.slice(index + 1), firstTime =curTime[0] + ':' + curTime[1]
  range.unshift(firstTime)
  return range
}
function formatTime(data) {
  let year = data.getFullYear(),
    month = data.getMonth() + 1,
    day = data.getDate(),
    hour = data.getHours(),
    minute = data.getMinutes(),
    second = data.getSeconds()


  return [hour, minute]
}
function timeTosTring(t){
  var hour=t.toString()
  return hour[1]?hour:'0'+hour
}
function getTimesRange() {
  var timeArr = []
  for (let i = 0; i < 48; i++) {
      if(i%2==0){
        timeArr.push(timeTosTring(i/2)+':'+'00')
      }else{
        timeArr.push(timeTosTring(Math.floor(i / 2)) + ':' + '30')   
      }
  }
  return timeArr
}
module.exports = {
  formatTime: formatTime,
  getTimesRange: getTimesRange,
  setTimeHalf: setTimeHalf
}