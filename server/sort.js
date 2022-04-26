var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var localISOTime = new Date(Date.now()-tzoffset).toISOString()
const d = new Date(localISOTime) 
console.log(d.getTime())  // => '2015-01-26T06:40:36.181'