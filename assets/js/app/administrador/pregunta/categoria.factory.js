(function(){
	'use strict';
	angular.module('app.administrador')
	.factory('Categoria',Categoria);

	Categoria.$inject = ['$http'];
	function Categoria($http){
		var service = {
			crear:create,
			obtenerEncuesta:getEncuesta
		}

		return service;


		/////

		function create(categoria){
			return $http.post('/categorias',categoria).then(success).catch(error);
		}

		function getEncuesta(id){
			return $http.get('/categorias/encuesta/'+id).then(success).catch(error);
		}


		/////
		function success(response){
			return response.data;
		}

		function error(error){
			console.error(error);
		}



	}


})();