angular.module('jwtApp').controller('LogoutCtrl', function($scope, $state, authToken) {
  authToken.removeToken();
  $state.go("main");
});
