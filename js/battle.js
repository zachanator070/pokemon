var wildPokemon = null;
var battleMusic = null;

function generatePokemon(num,level){
  var name = pokemon[num].name;
  name[0] = name.charAt(0).toUpperCase();
  var bulbasaur = {
    "name": name,
    "level": level,
    "stats":pokemon[num].stats,
    "type" :pokemon[num].types,
    "moves":[],
    "number":num
  };
  pokemon[num].stats.forEach(function(stat){
    if(stat.stat.name == "hp"){
      bulbasaur.hp = stat.base_stat;
      bulbasaur.max_hp = stat.base_stat;
    }
  });

  return bulbasaur;
}

function playBattleAnimation(){
  var battle = "<div id='battle'>";
  battle += "<div class='wildPokemon animated slideinRight container'></div>";
  battle += "<div class='myPokemon animated slideinLeft container'></div>'";
  battle += "</div>";

  $("#screen").append(battle);

  var wildInfo = "<div class='row'>";
  wildInfo += "<div class='col-md-8'>"+wildPokemon.name +"</br>LV:"+wildPokemon.level+"   <div id='wildhp'>HP:"+wildPokemon.hp+"/"+wildPokemon.max_hp+"</div></div>";
  wildInfo += "<div class='col-md-4'><img src='"+pokemon[wildPokemon.number].sprites.front_default+"' class='wildIcon'/></div>";
  wildInfo += "</div>";
  $('#wildPokemon').append(wildInfo);

  var myPokemonInfo = "<div class='row'>";
  wildInfo += "<div class='col-md-4'><img src='"+pokemon[party[0].number].sprites.back_default+"' class='wildIcon'/></div>";
  wildInfo += "<div class='col-md-8'>"+party[0].name +"</br>LV:"+party[0].level+"   <div id='myhp'HP:"+party[0].hp+"/"+party[0].max_hp+"</div></div>";
  wildInfo += "</div>";
  $("#myPokemon").append(myPokemonInfo);

}

function startBattle(pokemon){
  worldMusic.pause();
  battleMusic = new Audio('sounds/battle.mp3');
  battleMusic.play();
  battleMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  resetBindings();
  $("#screen").addClass('animated flash');
  $('#screen').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    playBattleAnimation();
  });
}
