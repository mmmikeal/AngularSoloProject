angular.module('app')
.controller('AppCtrl', function(itemsService) {
  // itemsService.getAll((data) => {
  //   this.items = [{name:'bulbasaur', description: 'a bulb pokemon', url: 'https://vignette1.wikia.nocookie.net/pokepages/images/5/51/Bulbasaur.jpg/revision/latest?cb=20100801170934'},
  //   {name:'charizard', description: 'my tail is on fire', url: 'https://vignette1.wikia.nocookie.net/ultimate-pokemon-fanon/images/f/f2/Charmander.jpg/revision/latest?cb=20130323020609'}];
  // });
  this.items = [{name:'bulbasaur', description: 'a bulb pokemon', url: 'https://vignette1.wikia.nocookie.net/pokepages/images/5/51/Bulbasaur.jpg/revision/latest?cb=20100801170934'},
    {name:'charizard', description: 'my tail is on fire', url: 'https://vignette1.wikia.nocookie.net/ultimate-pokemon-fanon/images/f/f2/Charmander.jpg/revision/latest?cb=20130323020609'}];

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