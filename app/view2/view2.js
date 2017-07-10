'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [
    '$scope', '$http', '$location', function($scope, $http, $location) {
      $scope.accounts = [];

      //populate bank with account #1
      function init() {
        $scope.send = localStorage.getItem('sendAddress');
        var accountNumbers = localStorage.getItem('accountNumbers');
        var recieveNumbers = localStorage.getItem('recieveNumbers');
        accountNumbers = parseAccountNumbers(accountNumbers);
        $scope.recieveNumbers = parseAccountNumbers(recieveNumbers);
        fillAccounts(accountNumbers);
      }
      init();

      function parseAccountNumbers(nums) {
        return nums.split(',');
      }

      function fillAccounts(accountNumbers) {
        accountNumbers.forEach(function(num, index) {
          $http({
            method: 'GET',
            url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/' + num
          }).then(function successCallback(response) {
            $scope.accounts[index] = {};
            $scope.accounts[index].accountNumber = num;
            $scope.accounts[index].balance = response.data.balance;
            $scope.accounts[index].hasTransferred = false;
          });
        })
      }

      $scope.transfer = function (index) {
        var account = $scope.accounts[index];

        $http({
          method: 'POST',
          url: 'http://jobcoin.projecticeland.net/incumber/api/transactions',
          params: {
            fromAddress: account.accountNumber,
            toAddress: $scope.send,
            amount: account.balance
          }
        });

        $scope.accounts[index].hasTransferred = true;
      };

      $scope.mix = function () {
        $http({
          method: 'GET',
          url: 'http://jobcoin.projecticeland.net/incumber/api/addresses/' + $scope.send
        }).then(function successCallback(response) {
          distribute(response.data.balance);
          $location.path('/complete-transfer');
        });
      };

      function distribute(balance) {
        var recieveNum = $scope.recieveNumbers;
        balance = balance - Math.floor(balance * .1);

        for (var i=0; i<recieveNum.length; i++) {
          var toSend = getRandomArbitrary(balance, 0);
          var num = recieveNum[i];
          var fromAddress = $scope.send;

          if (balance - toSend === 1)
            toSend += 1;

          $http({
            method: 'POST',
            url: 'http://jobcoin.projecticeland.net/incumber/api/transactions',
            params: {
              fromAddress: 1,
              toAddress: num,
              amount: toSend
            }
          });

          $http({
            method: 'POST',
            url: 'http://jobcoin.projecticeland.net/incumber/api/transactions',
            params: {
              fromAddress: fromAddress,
              toAddress: 1,
              amount: toSend
            }
          });

          balance = balance - toSend;
          console.log(balance);
        }
      }

    function getRandomArbitrary(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    }
}]);