
var pokemonToPick = ['Bulbasaur','Charmander','Squirtle'];
var pickerIndex = 0;

var pickerItemHeight = 42;

var pickerTransitionTime = 50;

var showPicker = function(){
  var menuString = "<div id='picker'></div>"
  var items = "<ul id='pickerList'>";
  pokemonToPick.forEach(function(item){
    items += "<li>"+item+"</li>";
  });
  items += "</ul>";

  $('#screen').append(menuString);

  var pickerPicture = "<div id='pickerPic'></div>";
  $('#picker').append(pickerPicture);

  $('#picker').append(items);

  var selectorString = "<div id='pickerselector'></div>";
  $('#picker').append(selectorString);

  $("#pickerPic").css({'background-image':"url('"+pokemon[1].sprites.front_default+"')"});
};

var hidePicker = function(){
  $("#picker").remove();
};


var pickerUpKey = function(){
  if(pickerIndex > 0){
    pickerIndex--;
    $('#pickerselector').animate({
      top : "-="+pickerItemHeight
    }, pickerTransitionTime, 'linear');
    $("#pickerPic").css({'background-image':"url('"+pokemon[pickerIndex*3+1].sprites.front_default+"')"});
  }
};

var pickerDownKey = function(){
  if(pickerIndex <pokemonToPick.length-1){
    pickerIndex++;
    $('#pickerselector').animate({
      top : "+="+pickerItemHeight
    }, pickerTransitionTime, 'linear');
    $("#pickerPic").css({'background-image':"url('"+pokemon[pickerIndex*3+1].sprites.front_default+"')"});
  }
};

var pickerzDown = function(){
  if(pickerIndex == 0){
    party.push(generatePokemon(1,5));
  }
  else if(pickerIndex == 2){
    party.push(generatePokemon(5,5));
  }
  else if(pickerIndex == 1){
    party.push(generatePokemon(7,5));
  }

  // add some moves to the pokemon
  var newMoves = [];
  pokemon[party[0].number].moves.forEach(function(move){
    if(newMoves.length < 4 && move.level < 5){
      newMoves.push(Object.assign(move));
    }
  });
  party[0].moves = newMoves;

  hidePicker();

  var chat = [party[0].name+' huh?','That\'s a fine choice there.','Have fun out there!'];
  switchToChatControls(chat,switchToWorldControls);

};

var pickerxDown = function(){

};

var switchToPickerControls = function(){

  resetBindings();
  showPicker();
  uparrowdown = pickerUpKey;
  downarrowdown = pickerDownKey;
  zdown = pickerzDown;
  xdown = pickerxDown;
}
