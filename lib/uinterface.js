function Uinterface(keyCode){
  
  var directions = [];
  directions[37] = '-x';
  directions[39] = '+x';
  directions[38] = '-y';
  directions[40] = '+y';
  
  if(directions[keyCode] !== undefined){
    Scene.USER_KEY_BUFFER.push(directions[keyCode]);
  }  
}