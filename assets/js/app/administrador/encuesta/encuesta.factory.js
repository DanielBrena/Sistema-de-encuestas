(function() {
'use strict';

    angular
        .module('app.administrador')
        .factory('Encuesta', Encuesta);

    Encuesta.$inject = ['$http'];
    function Encuesta($http) {
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
            return $http.get('/encuestas').then(success).catch(error);
        }

        function get(id){
            return $http.get('/encuestas/'+id).then(success).catch(error);
        }

        function update(encuesta){
            return $http.put('/encuestas/'+encuesta.id,encuesta).then(success).catch(error);
        }

        function create(encuesta){
            return $http.post('/encuestas',encuesta).then(success).catch(error);
        }

        function delete_(id){
            return $http.delete('/encuestas/'+id).then(success).catch(error);
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