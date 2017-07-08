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
        $scope.accounts = [];

        function init() {
            $http({
                method: 'GET',
                url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/1'
            }).then(function successCallback(response) {
                $scope.bank = response.data.balance;
            });
        }

        init();

        $scope.mixCoins = function () {

        };

        $scope.addAddress = function () {
            var found = false;
            var accounts = $scope.accounts;
            for(var i = 0; i < accounts.length; i++) {
                if (accounts[i].Address === $scope.toAdd) {
                    found = true;
                    break;
                }
            }

            if (!angular.isNumber(parseInt($scope.toAdd)) || found) {
                $scope.errorMessage = 'Please enter a valid address';
                return;
            }

            $http({
                method: 'GET',
                url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/' + $scope.toAdd
            }).then(function successCallback(response) {
                var newAccount = {
                    accountNumber: $scope.toAdd,
                    balance: response.data.balance,
                    transactions: response.data.transactions
                };

                $scope.accounts.push(newAccount);
            });
        }
}]);