var Console = {
  
  ELEMENT: null,
  ELEMENT_CONTENT: null,
  
  init: function(id, content) {
    
    this.ELEMENT = document.getElementById(id);
    this.ELEMENT_CONTENT = document.getElementById(content);
    
    if(window.console && window.console.firebug) {
     this.FIREBUG = true;
     this.log = function(message) {
       console.log(message);
     }
    }
    else {
      this.add('Firebug is not present.');
    }
  },
  
  add: function(message) {
    messageContainer = document.createElement("p");
    messageContainer.innerHTML = message;

    this.ELEMENT_CONTENT.appendChild(messageContainer);    
    this.ELEMENT_CONTENT.scrollTop = this.ELEMENT_CONTENT.scrollHeight;
    
    return messageContainer;
  },
  
  hide: function() {
    this.ELEMENT.style.display = "none";
  },
  
  show: function() {
    this.ELEMENT.style.display = "block";
  },
  
  line: function(messageContainer) {
    messageContainer.style.borderBottom = "1px dashed #aeaeae";
  }
}