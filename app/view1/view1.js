'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [
    '$scope', '$http', function($scope, $http) {
        $scope.addresses = [];
        $scope.addresses[0] = {};

        function init() {
            $http({
                method: 'GET',
                url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/1'
            }).then(function successCallback(response) {
                $scope.bank = response.data.balance;
            }, function errorCallback(response) {
                console.warn(response);
            });

            $http({
                method: 'GET',
                url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/2'
            }).then(function successCallback(response) {
                $scope.userCoins = response.data.balance;
            }, function errorCallback(response) {
                console.warn(response);
            });
        }

        init();

        $scope.mixCoins = function () {

        };

        $scope.handleRowChange = function (index) {
            if ($scope.addresses[index].address > 0 && !$scope.address[index+1]) {
                $scope.addresses[index+1] = {};
            }
        }
}]);