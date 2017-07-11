'use strict';

angular.module('myApp.completeTransfer', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/complete-transfer', {
      templateUrl: 'complete-transfer/complete-transfer.html',
      controller: 'completeTransferCtrl'
    });
  }])

.controller('completeTransferCtrl', [
  '$scope', '$http', function($scope, $http) {
    $scope.accounts = [];

    //populate bank with account #1
    function init() {
      var toParse = localStorage.getItem('receiveNumbers');

      $scope.accounts = parseAccountNumbers(toParse);

      fillAccounts($scope.accounts);
    }
    init();

    function fillAccounts(accountNumbers) {
      accountNumbers.forEach(function(num, index) {
        $http({
          method: 'GET',
          url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/' + num
        }).then(function successCallback(response) {
          $scope.accounts[index] = {};
          $scope.accounts[index].accountNumber = num;
          $scope.accounts[index].balance = response.data.balance;
        });
      })
    }

    function parseAccountNumbers(nums) {
      return nums.split(',');
    }

  }]);
