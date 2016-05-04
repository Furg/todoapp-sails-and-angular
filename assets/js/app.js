'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap']);
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

  TodoService.getTodos().then(function(response) {
    $scope.todos = response;
  });

  io.socket.on('todo', function serverResponded (body, JWR) {
    TodoService.getTodos().then(function(response) {
      $scope.todos = response;
    });
  });

  $scope.addTodo = function() {
    TodoService.addTodo($scope.formData).then(function(response) {
      $scope.todos.push(response)
      $scope.formData = {};
    });
  }

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
    });
  }
}]);
