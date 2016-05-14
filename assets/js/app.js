'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap']);

todoApp.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/todo.html',
      controller: 'TodoCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

todoApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
  $scope.formData = {};
  $scope.todos = [];

  $scope.refreshTodos = function() {
    TodoService.getTodos().then(function(response) {
      $scope.todos = response;
    });
  }

  $scope.addTodo = function() {
    $("button").button('loading');
    TodoService.addTodo($scope.formData).then(function(response) {
      $scope.todos.push(response)
      $scope.formData = {};
      $("button").button('reset');
    });
  }

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
    });
  }

  $scope.refreshTodos()
  TodoService.subscribeTodos($scope.refreshTodos);
}]);
