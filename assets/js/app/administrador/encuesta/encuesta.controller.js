(function(){
	'use strict'
	angular.module('app.administrador')
	.controller('EncuestaController',EncuestaController);

	EncuestaController.$inject = ['$scope','$state','Encuesta'];
	function EncuestaController($scope,$state,Encuesta){
		var vm = this;
		vm.encuestasAux = [];
		

		vm.btnAgregarPreguntas = agregarPreguntas;
		vm.encuesta = {};

		vm.btnModalEncuesta = mostrarEncuesta;
		vm.btnCrearEncuesta = crearEncuesta;
		//vm.btnRuta = rutaPreguntas;




		$scope.$on('$viewContentLoaded', 
			function(event){ 
				cargarElementos()
		});
		
		fecha();
		/////////////////////

		

		function fecha(){
	      	var currentTime = new Date();
	    	vm.encuesta.fechaInicio = currentTime;
	    	vm.encuesta.fechaTermino = currentTime;
	    	vm.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	    	vm.monthShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
	    	vm.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	    	vm.weekdaysLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
	    	vm.today = 'Hoy';
	    	vm.clear = 'Limpiar';
	    	vm.close = 'Cerrar';
	      	var days = 15;

	    }

	    function rutas(id){
	    	$state.go('pregunta',{id:id});
	    }

	    function mostrarEncuesta(encuesta){
	    	if(typeof encuesta === 'object'){
	    		fecha();
	    	}
	    	$('#modalEncuesta').openModal({
		    	dismissible: false,
		    	opacity: .5, 
		    });
		    vm.encuesta = encuesta
		    
	    }
	    
	    //Elementos jQuery
		function cargarElementos(){
			$(document).ready(function(){

				io.socket.get('/encuestas', function(resData, jwres) {
					console.info('Datos en tiempo real');
					console.log(resData);
					vm.encuestasAux = resData;
					vm.encuestas = arreglo(vm.encuestasAux);
					$scope.$apply(); 

					$('.dropdown-button').dropdown({
					   	inDuration: 300,
					    outDuration: 225,
					    gutter: 0, 
					    belowOrigin: true, 
					    alignment: 'bottom' 
					});

					 $('.tooltipped').tooltip({delay: 50});
				});
				 
				

				io.socket.on('encuestas', function(event){
					vm.encuestasAux.push(event.data);
					vm.encuestas = arreglo(vm.encuestasAux);
					$scope.$apply(); 
					
					$('.tooltipped').tooltip({delay: 50});

				});

				

				//cargarEncuestas();

				

			});
			
		}


		function agregarPreguntas(id){
			$('.tooltipped').tooltip('remove');
			$state.go('pregunta',{id:id});
		}

	    function arreglo(data){
	      	var nuevoArreglo = [];
		    for (var i=0; i<data.length; i+=2) {
		        nuevoArreglo.push(data.slice(i, i+2));
		    }
		    return nuevoArreglo;

	    }

	    function crearEncuesta(encuesta){
	    	Encuesta.crear(encuesta).then(function(data){
	    		  Materialize.toast('Encuesta creada', 3000);
	    		  $('#modalEncuesta').closeModal();

	    	}).catch(function(e){
	    		console.error(e)
	    	});
	    }

	    function actualizarEncuesta(encuesta){
	    	Encuesta.actualizar(encuesta).then(function(data){
	    		Materialize.toast('Encuesta actualizada', 3000);
	    		$('#modalEncuesta').closeModal();
	    	});
	    }

	    function cargarEncuestas(){
	    	Encuesta.obtenerTodo().then(function(data){
	    		vm.encuestasAux = data;
	    		vm.encuestas = arreglo(data);
	    	}).catch(function(e){
	    		console.error(e);
	    	});
	    }
	}

})();