angular.module('app')
.controller('AppCtrl', function(itemsService) {
  // itemsService.getAll((data) => {
  //   this.items = [{name:'bulbasaur', description: 'a bulb pokemon', url: 'https://vignette1.wikia.nocookie.net/pokepages/images/5/51/Bulbasaur.jpg/revision/latest?cb=20100801170934'},
  //   {name:'charizard', description: 'my tail is on fire', url: 'https://vignette1.wikia.nocookie.net/ultimate-pokemon-fanon/images/f/f2/Charmander.jpg/revision/latest?cb=20130323020609'}];
  // });
  this.items = [{name:'bulbasaur', description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'},
  {name:'ivysaur', description: 'There is a bud on this Pokémon’s back. To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon.', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'},
  {name:'venusaur', description: 'There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people.', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'},
  {name:'charmander', description: '"The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged,\nthe flame burns fiercely."', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'}];

  this.clickhandler = (text) => {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };
})

  

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'AppCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/app.html'
  };

 
});