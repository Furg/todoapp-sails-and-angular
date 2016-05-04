todoApp.service('TodoService', function($http, $q) {
  return {
    'getTodos': function() {
      var defer = $q.defer();
      io.socket.get('/todo', function serverResponded (body, JWR) {
        defer.resolve(body);
      });
      return defer.promise;
    },
    'addTodo': function(todo) {
      var defer = $q.defer();
      $http.post('/todo/create', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeTodo': function(todo) {
      var defer = $q.defer();
      $http.delete('/todo/' + todo.id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
