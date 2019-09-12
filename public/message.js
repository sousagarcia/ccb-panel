const socket = io('http://localhost:3000');
//const socket = io('http://192.168.15.30:3000');

function beep(){

  //https://marcgg.com/blog/2016/11/01/javascript-audio/
  const context = new AudioContext();

  const o = context.createOscillator();

  o.type = "square";
  o.connect(context.destination);
  o.start();
  setTimeout(function(){ 
          o.stop();
  }, 200);
}

function renderSenha(message) {

  if (message.painel == 1){ 
    beep();
    document.getElementById('painel-ficha').innerHTML = message.message;    
  }
  if (message.painel == 2){ 
    beep();
    document.getElementById('painel-reserva').innerHTML = message.message;    
  }
  
}

socket.on('previousMessages', function(messages){

  for (message of messages) {
    renderSenha(message);  
  }
});

socket.on('receivedMessage', function(message){
  renderSenha(message);
});


// Enviando Senha
$('#chat').submit(function(event) {
  
  event.preventDefault();

  // Identifica o Controle de Fichas
  if (document.getElementById('form-ficha')) {  
    
    const message = document.getElementById('painel-ficha').innerText;  

    if (message.length) {

      var messageObject1 = {      
        painel: 1,
        message: message
      };

      renderSenha(messageObject1);

      socket.emit('sendMessage', messageObject1);
    }   

  }

  // Identificando o Controle Reserva
  if (document.getElementById('form-reserva')) {
  
    var message = document.getElementById('painel-reserva').innerText;  

    if (message.length) {
      var messageObject2 = {      
        painel: 2,
        message: message
      };

      renderSenha(messageObject2);

      socket.emit('sendMessage', messageObject2);
    }

  }


});