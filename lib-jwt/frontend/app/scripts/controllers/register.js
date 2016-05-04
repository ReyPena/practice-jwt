angular.module('jwtApp').controller('RegisterCtrl', function($scope, $http, alert, API_URL, authToken) {
  $scope.submit = function () {
    var url = API_URL + "register";
    var user = {
      email: $scope.email,
      password: $scope.password
    };

    // alert verification register
    $http.post(url, user)
      .success(function (res) {
        alert("success", "OK!", "Account Created! Wellcome, " + res.user.email + "!");
        authToken.setToken(res.token);
      })
      .error(function (err) {
        alert("warning", "Opps!", "Could not register");
      });
  };
});
