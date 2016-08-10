(function(){
	'use strict';
	angular.module('app.administrador')
	.factory('Respuesta',Respuesta);

	Respuesta.$inject = ['$http'];
	function Respuesta($http){
		var service = {
			crear:create,
			obtenerPregunta:getPregunta,
			eliminar:delete_
		}

		return service;

		///////////

		function create(respuesta){
			return $http.post('/respuestas',respuesta).then(success).catch(error);
		}

		function getPregunta(id){
			return $http.get('/respuestas/pregunta/'+id).then(success).catch(error);
		}

		function delete_(){
			
		}



		//////
		function success(response){
			return response.data;
		}

		function error(e){
			console.error(e);
		}

	}
})();