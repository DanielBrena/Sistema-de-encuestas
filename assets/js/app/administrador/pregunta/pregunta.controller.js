(function(){
	'use strict';
	angular.module('app.administrador')
	.controller('PreguntaController',PreguntaController);

	PreguntaController.$inject = ['$scope'];
	function PreguntaController($scope){
		//jQuery
		var vm = this;
		vm.btnModalRespuestas = mostrarRespuestas;
		vm.btnModalOrden = mostrarOrden;

		$('.modal-trigger').leanModal();
		$('.collapsible').collapsible({
      		accordion : true 
    	});


    	

    	function mostrarRespuestas(id){
    		console.log(id);
    		 $('#modalRespuesta').openModal();
    	}

    	function mostrarOrden(){
    		$('#modalOrden').openModal({
      dismissible: false,
      opacity: .5, 
    		});
    	}
	}
	
})();