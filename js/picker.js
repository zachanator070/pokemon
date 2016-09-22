
var pokemonToPick = ['Bulbasaur','Squirtle','Charmander'];
var pickerIndex = 0;

var pickerItemHeight = 30;

var pickerTransitionTime = 50;

var showPicker = function(){
  var menuString = "<div id='picker'></div>"
  var items = "<ul class='pickerList'>";
  menuItems.forEach(function(item){
    items += "<li>"+item+"</li>";
  });
  items += "</ul>";

  $('#screen').append(menuString);

  var pickerPicture = "<div id='pickerPic'></div>";
  $('#picker').append(pickerPicture);

  $('#picker').append(items);

  var selectorString = "<div id='pickerselector'></div>";
  $('#picker').append(selectorString);
};


var pickerUpKey = function(){
  if(menuIndex > 0){
    menuIndex--;
    $('#selector').animate({
      top : "-="+pickerItemHeight
    }, menuTransitionTime, 'linear');
  }
};

var pickerDownKey = function(){
  if(menuIndex <menuItems.length-1){
    menuIndex++;
    $('#selector').animate({
      top : "+="+pickerItemHeight
    }, menuTransitionTime, 'linear');
  }
};

var menuzDown = function(){
  if(index == 0){
    var bulbasaur = {
      "name": "Bulbasaur",
      "level": 5,
      "stats":pokemon[1].stats,
      "type" :pokemon[1].types,
      "moves":[],
      "number":1
    };
    party.push(bulbasaur);
  }
  else if(index == 1){
    var squirtle = {
      "name": "Squirtle",
      "level": 5,
      "stats":pokemon[4].stats,
      "type" :pokemon[4].types,
      "moves":[],
      "number":4
    };
    party.push(squirtle);
  }
  else if(index == 2){
    var charmander = {
      "name": "Charmander",
      "level": 5,
      "stats":pokemon[7].stats,
      "type" :pokemon[7].types,
      "moves":[],
      "number":7
    };
    party.push(squirtle);
  }

  // add some moves to the pokemon
  var newMoves = [];
  pokemon[party[0].number].moves.forEach(function(move){
    if(newMoves.length < 4 && move.level < 5){
      newMoves.push(Object.assign(move));
    }
  });
  party[0].moves = newMoves;
};

var menuxDown = function(){
  $('#menu').remove();
  $('selector').remove();
  menuIndex = 0;
  switchToWorldControls();
};

var switchToMenuControls = function(){

  resetBindings();
  showMenu();
  uparrowdown = menuUpKeyDown;
  downarrowdown = menuDownKeyDown;
  zdown = menuzDown;
  xdown = menuxDown;
}
