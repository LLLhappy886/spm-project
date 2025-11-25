 //封装一个函数：获取一个结果：当前时间是上午还是下午
export const getTime = () =>{
  let message = '';
  //通过内置构造函数Date
  let hours = new Date().getHours();
  if( hours <= 6 ) {
    message = '凌晨';
  }else if ( hours <= 9 ) {
    message = '早上';
  }else if ( hours <=12 ) {
    message = '上午';
  }else if ( hours <= 18 ) {
    message = '下午';
  }else {
    message = '晚上';
  }
  return message;
}