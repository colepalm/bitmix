'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [
    '$scope', '$http',
    function($scope, $http) {
    $scope.getData = function () {
        $http({
            method: 'GET',
            url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/1'
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
}]);