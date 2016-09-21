
var convo = [];
var convoIndex = 0;
var chatCallback = null;

function nextConvo(){

  if(convoIndex +1 <convo.length){
    convoIndex++;
    $('#chat').text(convo[convoIndex]);
  }
  else{
    hideTextBox();
  }

}

function hideTextBox(){

  $('#chat').remove();
  convoIndex = 0;
  chatCallback();

}

function showTextBox(){
  var chatString = "<div id='chat' class='chat'>"+convo[0]+"</div>";

  $('#screen').append(chatString);

}

var switchToChatControls = function(text,callback){

  resetBindings();


  xdown = nextConvo;
  zdown = nextConvo;
  convo = text;
  chatCallback = callback;
  showTextBox();
};
