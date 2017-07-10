'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [
    '$scope', '$http', function($scope, $http) {
      $scope.accounts = [];

      //populate bank with account #1
      function init() {
        $scope.send = localStorage.getItem('sendAddress');
        var accountNumbers = localStorage.getItem('accountNumbers');
        accountNumbers = parseAccountNumbers(accountNumbers);
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

      }

}]);