angular.module('shortly.nav', [])

.controller('NavController', function($scope, Links, $location, $rootScope) {
  $scope.data = {};
  $scope.data.path = $location.path();

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
     $scope.data.path = $location.path();
  });
});
