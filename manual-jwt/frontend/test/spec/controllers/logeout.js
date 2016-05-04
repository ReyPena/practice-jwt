'use strict';

describe('Controller: LogeoutCtrl', function () {

  // load the controller's module
  beforeEach(module('jwtApp'));

  var LogeoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogeoutCtrl = $controller('LogeoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LogeoutCtrl.awesomeThings.length).toBe(3);
  });
});
