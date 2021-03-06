angular.module('jwtApp').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "/views/main.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/views/register.html",
      controller: "RegisterCtrl"
    })
    .state("jobs", {
      url: "/jobs",
      templateUrl: "/views/jobs.html",
      controller: "JobsCtrl"
    })
    .state("logout", {
      url: "/logout",
      controller: "LogoutCtrl"
    });
    $urlRouterProvider.otherwise("/");

    $httpProvider.interceptors.push("authInterceptor");
})

.constant("API_URL", "http://localhost:3000/");
