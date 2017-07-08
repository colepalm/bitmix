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

      //populate bank with account #1
      function init() {
        // var stored = localStorage.getItem('accounts');
        // if (stored)
        //   $scope.accounts = stored;

        $http({
            method: 'GET',
            url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/1'
        }).then(function successCallback(response) {
            $scope.bank = response.data.balance;
        });
      }
      init();

      //used to store accounts after pageload
      $scope.$on('$locationChangeStart', function() {
        localStorage.setItem('accounts', $scope.accounts)
      });

      $scope.request = function (i) {
        var returnAddress;

        $http({
          method: 'GET',
          url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/' + i
        }).then(function successCallback(response) {
          if (response.data.balance === '0')
            return i;
          returnAddress = $scope.request(Math.floor( Math.random() * ( 1 + 200 - 100 ) ) + 100);
          console.log(returnAddress);
        });

      };

      $scope.addAddress = function () {
        var found = false;
        var accounts = $scope.accounts;
        if (accounts) {
          for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].Address === $scope.toAdd) {
              found = true;
              break;
            }
          }
        }

        if (!angular.isNumber(parseInt($scope.toAdd)) || found || $scope.toAdd === '1') {
          $scope.errorMessage = 'Please enter a valid address (address 1 is the bank)';
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
          $scope.toAdd = '';
        });
      }
}]);