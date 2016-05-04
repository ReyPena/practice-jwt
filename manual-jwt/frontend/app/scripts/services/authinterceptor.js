// this is the interceptor that will attach the token to every http call
angular.module('jwtApp').factory('authInterceptor', function(authToken) {
  return {
    request: function (config) {
      var token = authToken.getToken();

      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },
    response: function (response) {
      return response;
    }

  };
});
