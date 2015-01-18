angular.module('shortly.links', [])

.controller('LinksController', function($scope, Links, $location) {
  $scope.data = {};
  $scope.getLinks = function() {
    Links.getLinks().success(function(data) {
      $scope.data.links = data;
    }).error(function(err) {
      console.log(err);
    });
  };

  $scope.getLinks();
});
