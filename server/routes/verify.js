exports.generate=function(length){
  var str = ""
  for (var i = 0; i < length; i++)
    str += Math.floor(Math.random() * 10)
  return str
}