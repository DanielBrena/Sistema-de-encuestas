(function(){
	'use strict';
	angular.module('app.administrador')
	.factory('Pregunta',Pregunta);

	Pregunta.$inject = ['$http'];
	function Pregunta($http){
		var service = {
			obtenerTodos:get,
			obtener:getId,
			obtenerEncuesta:getEncuesta,
			crear:create,
			actualizar:update,
			eliminar:delete_
		};

		return service;

		////////

		function create(pregunta){
			return $http.post('/preguntas',pregunta).then(success).catch(error);
		}

		function update(pregunta){
			return $http.put('/preguntas/'+pregunta.id,pregunta).then(success).catch(error);
		}

		function delete_(id){

		}

		function get(){

		}

		function getId(id){

		}

		function getEncuesta(id){
			return $http.get('/preguntas/encuesta/'+id).then(success).catch(error);
			
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