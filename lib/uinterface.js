function Uinterface(keyCode){
  
  var directions = [];
  directions[37] = '-x';
  directions[39] = '+x';
  directions[38] = '-y';
  directions[40] = '+y';
  
  if(directions[keyCode] !== undefined){
    Scene.SNAKES[0].setDirection(directions[keyCode]);
  }  
}