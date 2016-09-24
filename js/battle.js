var wildPokemon = null;
var battleMusic = new Audio('sounds/battle.mp3');
var victoryMusic = new Audio('sounds/success.mp3');
var attackIndex = 0;

function generatePokemon(num,level){
  var name = pokemon[num].name;
  var letter = name.charAt(0).toUpperCase()
  name = letter+name.substring(1);
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
  // add some moves to the pokemon
  var newMoves = [];
  pokemon[num].moves.forEach(function(move){
    if(newMoves.length < 4 && move.level < 5){
      newMoves.push(Object.assign(move));
    }
  });
  bulbasaur.moves = newMoves;

  return bulbasaur;
}

function endBattle(icon){
  resetBindings();

  battleMusic.pause();
  victoryMusic = new Audio('sounds/success.mp3');
  victoryMusic.play();
  $("#"+icon).animate({top:"-=50px"},1000,function(){
    $("#"+icon).animate({'transform' : 'rotate(60deg)',"top":"+=50px"},1000,function(){
      setTimeout(function(){
        $("#battle").fadeOut(3000,function(){
        victoryMusic.pause();
        startWorldMusic();
        party[0].hp = party[0].max_hp;
        $("#battle").remove();
        switchToWorldControls();
      });},2000);
    });
  });


}

function doDamage(moveName, attacker,defender){

  var move = moves[moveName];
  console.log(move.power);
  console.log(moveName);
  console.log(move);
  if(move.power != 0){
    var max = 100;
    var min = 0;
    var accuracy =Math.floor(Math.random() * (max - min + 1)) + min;
    if(accuracy < move.accuracy){
      var bonus = 0;
      if(move.damage_class == 'physical'){
        var attack = 0;
        attacker.stats.forEach(function(stat){
          if(stat.stat == "attack"){
            attack = stat.stat.base_stat;
          }
        });
        var defense = 0;
        defender.stats.forEach(function(stat){
          if(stat.stat == "defense"){
            defense = stat.stat.base_stat;
          }
        });
        bonus += attacker.level/100 * attack;
        bonus -= defender.level/100 * defense;
      }
      var damage = Math.floor(attacker.level/100 * move.power + bonus);
      if(damage < 0){
        damage = 0;
      }
      defender.hp -= damage;
      if(defender.hp <0){
        defender.hp = 0;
      }
      return true;
    }
    else{
      return false;
    }
  }
  return false;
}

function attackTurn(move){

  var attackTime = 300;
  var attackDelay = 500;
  var scuffLifeSpan = 200;
  // do my pokemon animation
  $("#myPokemonIcon").animate({
    bottom: "225px",
    left: "200px"
    },attackTime,'swing',function(){
      //apply damage
      var hit = doDamage(move, party[0], wildPokemon);
      if(hit){
        $("#battle").append("<div id = 'pow1'></div>");
        $("#wildhp").text("HP:"+wildPokemon.hp+"/"+wildPokemon.max_hp);
        // remove scuff
        setTimeout(function(){
          $("#pow1").remove();
        },scuffLifeSpan);
      }
      else{
        $("#battle").append("<div id='miss1'></div>");
        setTimeout(function(){
          $("#miss1").remove();
        },400);
      }

      // my pokemon return
      $("#myPokemonIcon").animate({
        bottom:"0px",
        left:"0px"
      },attackTime,'linear',function(){
        // wait for the enemy
        setTimeout( function(){
          // if wild fainted, end battle
          if(wildPokemon.hp ==0){
            endBattle("wildPokemonIcon");
            return;
          }
          // enemy pokemon attacks
          $("#wildPokemonIcon").animate({
            top:"215px",
            right:"200px"
            },attackTime,'swing',function(){

              // apply damage to my pokemon
              var max = wildPokemon.moves.length-1;
              var min = 0;
              var random = Math.floor(Math.random() * (max - min + 1)) + min
              console.log(random);
              var attack = wildPokemon.moves[random].name;
              var otherhit = doDamage(attack, wildPokemon, party[0]);

              if(otherhit){
                $("#battle").append("<div id = 'pow2'></div>");
                var hp = "HP:"+party[0].hp+"/"+party[0].max_hp;
                $("#myhp").text(hp);

                setTimeout(function(){
                  $("#pow2").remove();
                },scuffLifeSpan);
              }
              else{
                $("#battle").append("<div id='miss2'></div>");
                setTimeout(function(){
                  $("#miss2").remove();
                },400);
              }

              $("#wildPokemonIcon").animate({
                top:"0px",
                right:"0px"
              },attackTime,'linear',function(){
                setTimeout(function(){
                  if(party[0].hp ==0){
                    endBattle("myPokemonIcon");
                    return;
                  }
                  showAttacks();
                },attackDelay);
              });
            });
          },attackDelay);
        });
      });
}

function showAttacks(){
  attackIndex = 0;

  var attacks = "<div id='attacks'>";
  attacks += "<ul id='attacksList'>";

  party[0].moves.forEach(function(move){
    attacks += "<li>"+move.name+"</li>";
  });
  attacks += "</ul>";
  attacks += "<div id='attackSelector'></div>";
  attacks += "</div>";

  $("#battle").append(attacks);

  downarrowdown = function(){
    if(attackIndex < party[0].moves.length - 1){
      $("#attackSelector").animate({top:"+=26"},200,'linear');
      attackIndex++;
    }

  };

  uparrowdown = function(){
    if(attackIndex > 0 ){
      $("#attackSelector").animate({top:"-=26"},200,'linear');
      attackIndex--;
    }
  };

  zdown = function(){
    resetBindings();
    $("#attacks").remove();
    var move = party[0].moves[attackIndex].name;
    attackTurn(move);
  }

}

function playBattleAnimation(){
  var battle = "<div id='battle'>";
  battle += "<div id='wildPokemon' class='container'></div>";
  battle += "<div id='myPokemon' class='container'></div>";
  battle += "</div>";

  $("#screen").append(battle);

  var wildInfo = "<div class='row'>";
  wildInfo += "<div class='col-md-6 wildInfo'>"+wildPokemon.name +"</br>LV:"+wildPokemon.level+"   <div id='wildhp'>HP:"+wildPokemon.hp+"/"+wildPokemon.max_hp+"</div></div>";
  wildInfo += "<div class='col-md-6'><img src='"+pokemon[wildPokemon.number].sprites.front_default+"' id='wildPokemonIcon'></div>";
  wildInfo += "</div>";
  $('#wildPokemon').append(wildInfo);

  var myPokemonInfo = "<div class='row'>";
  myPokemonInfo += "<div class='col-md-6'><img src='"+pokemon[party[0].number].sprites.back_default+"' id='myPokemonIcon'></div>";
  myPokemonInfo += "<div class='col-md-6 wildInfo'>"+party[0].name +"</br>LV:"+party[0].level+"   <div id='myhp'>HP:"+party[0].hp+"/"+party[0].max_hp+"</div></div>";
  myPokemonInfo += "</div>";
  $("#myPokemon").append(myPokemonInfo);

  setTimeout(function(){
    showAttacks();
  }, 2000);

}

function startBattle(pokemon){
  wildPokemon = pokemon;
  worldMusic.pause();
  battleMusic = new Audio('sounds/battle.mp3');
  battleMusic.play();
  battleMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

  resetBindings();

  var duration = 400;

  $("#screen").fadeOut(duration,function(){
    $("#screen").fadeIn(duration,function(){
      $("#screen").fadeOut(duration,function(){
        $("#screen").fadeIn(duration,function(){
          $("#screen").fadeOut(duration,function(){
            $("#screen").fadeIn(duration,function(){
              playBattleAnimation();
            });
          });
        });
      });
    });
  });
}
