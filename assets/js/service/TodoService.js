todoApp.service('TodoService', function($http, $q) {
  return {
    'subscribeTodos':function(callback){
      io.socket.get('/todo');
      io.socket.on('todo', function serverResponded (body, JWR){
        callback();
      });
    },
    'getTodos': function() {
      var defer = $q.defer();
      $http.get('/todo').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
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
