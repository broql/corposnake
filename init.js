Scene = {

  DELAY: 200,
  ELEMENT: null,
  ELEMENT_ATTRS: {},
  ELEMENT_SCORE: null,
  ELEMENT_COORDS: {},  
  CONTEXT: null,
  SNAKE_FOOD: null,
  SQUARE_SIZE: 20,
  SNAKES: {},
  INTERVAL_ID: null,
  USER_KEY_BUFFER: [],
  SOCKET: null,
  
  init: function(id, score_id){

    //prepare the stage!
    this.ELEMENT = document.getElementById(id);
    this.ELEMENT_SCORE = document.getElementById(score_id);
    this.CONTEXT = this.ELEMENT.getContext('2d');
    
    //extract obscene attributes
    for(i = 0; i < this.ELEMENT.attributes.length; i++) {
      this.ELEMENT_ATTRS[this.ELEMENT.attributes[i].name] = this.ELEMENT.attributes[i].value;
    }
    
    //create initial food
    this.SNAKE_FOOD = Food.generate();
   
    //controls init
    document.addEventListener("keydown", function(e) {			
      e.preventDefault();
      Uinterface(e.keyCode);
    }, true);
    
    //multiplayer part
    this.SOCKET = new io.Socket('192.168.1.104', {port: 8080});
    this.SOCKET.connect();
    
    this.SOCKET.on('connect', function(){
      var snake = Scene.addSnake({'sessionId': Scene.SOCKET.transport.sessionid});
      Scene.SOCKET.send({'flag': 'new', 'data': snake});
      Scene.start();
    });

    this.SOCKET.on('message', function(packet){

      switch(packet.flag) {

        case 'new':
          Scene.pause();
          for(client in packet.data){
            if(Scene.SNAKES[client] === undefined) {
              Scene.addSnake({'sessionId': client, 'data': packet.data[client]});
            }
          }
          Scene.start();
        break;
      
        case 'move':
          Scene.USER_KEY_BUFFER.push(packet.data.move);
        break;
      
        case 'disconnected':
          for(snake in Scene.SNAKES) {
            if(Scene.SNAKES[snake].session_id === packet.data) {
                Scene.removeSnake(snake);
              break;
            }
          }             
        break;
      }
      
    });
        
    this.SOCKET.on('disconnect', function(){
      Scene.pause();
    });
  },
  
  start: function(){
    this.INTERVAL_ID = setInterval(this.render, this.DELAY);
  },
  
  pause: function(){
    clearInterval(this.INTERVAL_ID);
  },
  
  changeSpeed: function(delay){
    this.DELAY = delay;
    this.pause();
    this.start();
  },
  
  gameOver: function(){
    this.pause();
    alert('Game Over ;( Your score is: '+Score.value);
  },
  
  render: function(){
    
    //set the props
    Scene.SNAKE_FOOD.draw();
    
    //bring the protagonists in!
    for(snake in Scene.SNAKES) {
      if(Scene.USER_KEY_BUFFER.length) {
        Scene.SNAKES[snake].setDirection(Scene.USER_KEY_BUFFER.shift());  
      }
      Scene.SNAKES[snake].move();
      Scene.SNAKES[snake].draw();
    }
  },
  
  addFood: function(){
    
    this.SNAKE_FOOD = Food.generate();
    this.SNAKE_FOOD.draw();
  },
  
  addSnake: function(packet){
    
    snake = (packet.data !== undefined) ? new Snake(packet.data.current) : new Snake();    
    Scene.SNAKES[packet.sessionId] = snake;
    
    return snake;
  },
  
  removeSnake: function(snake){

    for(var i=0; i<Scene.SNAKES[snake].squares.length; i++) {
      Scene.CONTEXT.clearRect(Scene.SNAKES[snake].squares[i].x,Scene.SNAKES[snake].squares[i].y,Scene.SQUARE_SIZE,Scene.SQUARE_SIZE);
    }
    
    delete Scene.SNAKES[snake];    
  }
};