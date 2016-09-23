

function showParty(){

  var partyString = "<div id='party'></div>";

  $("#screen").append(partyString);

  party.forEach(function(member){

      var pokemonString = "<div class='partyItem container'>";
      pokemonString += "<div class='row'>";
      pokemonString += "<div class='col-md-4'><img src='"+pokemon[member.number].sprites.front_default+"' class='partyIcon'/></div>";
      pokemonString += "<div class='col-md-8 partyInfo'>"+member.name +"</br>LV:"+member.level+"   HP:"+member.hp+"/"+member.max_hp+"</div>";
      pokemonString += "</div>";
      pokemonString += "</div>";
      $("#party").append(pokemonString)
  });


}

function hideParty(){
  $("#party").remove();
  switchToMenuControls();
}


function switchToPartyControls(){

  resetBindings();
  showParty();
  zdown = hideParty;
  xdown = hideParty;

}
