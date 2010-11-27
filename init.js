var Scene = {

  DELAY: 200,
  ELEMENT: null,
  ELEMENT_ATTRS: {},
  ELEMENT_SCORE: null,
  CONTEXT: null,
  SNAKE_FOOD: null,
  ELEMENT_COORDS: {},
  SQUARE_SIZE: 20,
  SNAKES: [],
  INTERVAL_ID: null,
  
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
    
    //snake init
    this.SNAKES[0] = new Snake();

    //controls init
    document.addEventListener("keydown", function(e) {			
      e.preventDefault();
      Uinterface(e.keyCode);
    }, true);

    this.start();
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
  
  gameOver: function() {
    this.pause();
    alert('Game Over ;( Your score is: '+Score.value);
  },
  
  render: function(){
    
    //set the props
    Scene.SNAKE_FOOD.draw();
    
    //bring the protagonist in!
    Scene.SNAKES[0].move();
    Scene.SNAKES[0].draw(); 
  },
  
  addFood: function(){
    
    this.SNAKE_FOOD = Food.generate();
    this.SNAKE_FOOD.draw();
  }
};