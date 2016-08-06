(function(){
	'use strict'
	angular.module('app.administrador')
	.controller('EncuestaController',EncuestaController);

	EncuestaController.$inject = ['$scope'];
	function EncuestaController($scope){
		var vm = this;


		//Elementos jQuery
		$('.tooltipped').tooltip({delay: 50});
		
		var datos = [1,2,3,4,5]
		vm.arreglo = arreglo(datos);

		

	    function arreglo(data){
	      	var nuevoArreglo = [];
		    for (var i=0; i<data.length; i+=2) {
		        nuevoArreglo.push(data.slice(i, i+2));
		    }
		    return nuevoArreglo;

	    }
	}

})();