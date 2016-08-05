(function() {
'use strict';

    angular
        .module('app.administrador')
        .factory('Categoria', Categoria);

    Categoria.$inject = ['$http'];
    function Categoria($http) {

        var service = {
            obtenerTodo:getAll,
            obtener:get,
            actualizar:update,
            crear:create,
            eliminar:delete_
        };
        
        return service;

        ////////////////
       

        function getAll(){
            return $http.get('/categorias').then(success).catch(error);
        }

        function get(id){
            return $http.get('/categorias/'+id).then(success).catch(error);
        }

        function update(categoria){
            return $http.put('/categorias/'+categoria.id,categoria).then(success).catch(error);
        }

        function create(categoria){
            return $http.post('/categorias',categoria).then(success).catch(error);
        }

        function delete_(id){
            return $http.delete('/categorias/'+id).then(success).catch(error);
        }


        ///////
        function success(response){
            return response.data;
        }
        function error(error){
            console.log(error);
        }



    }
})();