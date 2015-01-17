angular.module('shortly.shorten', [])

.controller('ShortenController', function($scope, $location, Links) {
  $scope.link = {};
  $scope.data = {};
  $scope.data.path = $location.path();
  $scope.addLink = function() {
    Links.postLinks({
      url: $scope.link.url
    }).success(function(data) {
      $scope.link = data;
    }).error(function(err) {
      console.log(err);
    })
  };
});
