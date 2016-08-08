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
		vm.cargarElementos  = cargarElementos;

		
		$scope.$on('$viewContentLoaded', 
			function(event){ 
				cargarElementos()
			 });

		//

		function cargarElementos(){
			$(document).ready(function(){
				console.log('carga');

				$('.modal-trigger').leanModal();
				
				 $('.dropdown-button').dropdown({
				      inDuration: 300,
				      outDuration: 225,// Activate on hover
				      gutter: 0, // Spacing from edge
				      belowOrigin: true, // Displays dropdown below the button
				      alignment: 'bottom' // Displays dropdown with edge aligned to the left of button
				    }
				  );

		    	 $('ul.tabs').tabs();
			});
			
		}
    	

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