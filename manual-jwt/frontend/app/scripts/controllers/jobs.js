angular.module('jwtApp').controller('JobsCtrl', function($scope, $http, alert, API_URL) {

  $http.get(API_URL + "jobs").success(function (jobs) {
    $scope.jobs = jobs;
  }).error(function (err) {
    console.log(err);
    alert("warning", "Unable to get Jobs ", err.message);
  });

});
