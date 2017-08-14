angular.module('app')
.directive('list', function() {
  return {
    scope: {
      items: '<',
      clickhandler: '<'
    },
    restrict: 'E',
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/list.html'
  };
});