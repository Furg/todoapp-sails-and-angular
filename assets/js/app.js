'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap']);
todoApp.run(function ($templateCache, $http) {
        $http.get('/templates/todo.html', { cache: $templateCache });
    });

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
