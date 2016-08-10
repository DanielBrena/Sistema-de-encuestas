(function(){
	'use strict';
	angular.module('app.administrador')
	.controller('PreguntaController',PreguntaController);

	PreguntaController.$inject = ['$scope','$stateParams','Pregunta','Categoria','Respuesta','_'];
	function PreguntaController($scope,$stateParams,Pregunta,Categoria,Respuesta,_){
		var vm = this;

		vm.idEncuesta = $stateParams.id;

		vm.preguntasAux = [];
		vm.categorias = [];

		console.log($stateParams.id);
		//obtenerPreguntas(vm.idEncuesta);
		
		
		vm.btnModalRespuestas = mostrarRespuestas;
		vm.btnModalOrden = mostrarOrden;
		vm.btnMostrarCategoria = mostrarCategoria;
		vm.btnMostrarPregunta = mostrarPregunta;

		vm.btnCrearCategoria = crearCategoria;
		vm.btnCrearPregunta = crearPregunta;
		vm.btnActualizarPregunta = actualizar;
		vm.btnActualizarOrden = actualizar;

		vm.btnCrearRespuesta = crearRespuesta;
		vm.btnCerrarRespuestas = cerrarRespuestas;

		
		
		$scope.$on('$viewContentLoaded', 
			function(event){ 
				cargarElementos();
			 });

		////////////

		function cargarElementos(){
			$(document).ready(function(){

				io.socket.get('/preguntas/encuesta/'+vm.idEncuesta, function(resData, jwres) {
					console.info('Datos en tiempo real');
					vm.preguntasAux = resData;
					vm.preguntas = vm.preguntasAux;
					$scope.$apply(); 

					$('.dropdown-button').dropdown({
				      inDuration: 300,
				      outDuration: 225,
				      gutter: 0, 
				      belowOrigin: true, 
				      alignment: 'bottom' 
				    });

				});

				//$('.modal-trigger').leanModal();
				obtenerCategorias(vm.idEncuesta,true);
				
				
				
				 

		    	 $('ul.tabs').tabs();
		    	 $scope.$apply();

		    	 io.socket.on('preguntas-'+vm.idEncuesta, function(data){
		    	 	vm.preguntasAux = orden(vm.preguntas);
					vm.preguntasAux.push(data);
					vm.preguntas = vm.preguntasAux;
					//vm.preguntas = orden(vm.preguntas);
					$scope.$apply(); 

					$('.dropdown-button').dropdown({
				      inDuration: 300,
				      outDuration: 225,
				      gutter: 0, 
				      belowOrigin: true, 
				      alignment: 'bottom' 
				    });
					

				});
			});
			
		}
    	
    	function obtenerPreguntas(id){
    		Pregunta.obtenerEncuesta(id).then(function(data){
    			console.log(data);
    			vm.preguntas = orden(data);
    		}).catch(function(e){
    			console.error(e);
    		})
    	}

    	function crearCategoria(categoria){
    		categoria.encuesta = vm.idEncuesta;
    		Categoria.crear(categoria).then(function(data){
    			Materialize.toast('Categoría creada', 3000);
    			$('#modalCategoria').closeModal();
    		}).catch(function(e){
    			console.error(e);
    		});
    	}

    	function crearPregunta(pregunta){
    		pregunta.encuesta = vm.idEncuesta;
    		Pregunta.crear(pregunta).then(function(data){
    			Materialize.toast('Pregunta creada', 3000);
    			$('#modalPregunta').closeModal();

    		}).catch(function(e){
    			console.error(e);
    		})
    	}

    	function crearRespuesta(respuesta){
    		respuesta.pregunta = vm.pregunta.id;
    		Respuesta.crear(respuesta).then(function(data){
    			Materialize.toast('Respuesta creada',2000);
    			vm.respuesta = {};
    			vm.respuesta.pregunta = vm.pregunta.id;
    			obtenerRespuestas(vm.pregunta.id);
    		}).catch(function(e){
    			console.error(e);
    		});
    	}

    	function actualizar(pregunta){
    		Pregunta.actualizar(pregunta).then(function(data){
    			Materialize.toast('Pregunta actualizada', 3000);
    			$('#modalOrden').closeModal();
    			$('#modalPregunta').closeModal();
    			obtenerPreguntas(vm.idEncuesta);

    		}).catch(function(e){
    			console.error(e);
    		});
    	}

    	function obtenerCategorias(id,default_){
    		Categoria.obtenerEncuesta(id).then(function(data){

    			vm.categorias = data;
    			console.log(data);
    			if(default_ == true){
    				vm.categorias.push({id:'todos',nombre:'todos'});

    			}
    		}).catch(function(e){
    			console.error(e);
    		});
    	}

    	function obtenerRespuestas(id){
    		Respuesta.obtenerPregunta(id).then(function(data){
    			vm.respuestas = data;
    		}).catch(function(e){
    			console.error(e);
    		});
    	}

    	function mostrarRespuestas(pregunta){
    		 $('#modalRespuesta').openModal({
    			dismissible:false,
    			opacity:.5
    		});
    		 vm.respuestas = pregunta.respuestas;
    		 vm.pregunta = pregunta;
    		 console.log(pregunta);
    	}

    	function cerrarRespuestas(){
    		obtenerPreguntas(vm.idEncuesta);
    		$('#modalRespuesta').closeModal();
    	}

    	function mostrarCategoria(){
    		 $('#modalCategoria').openModal({
    		 	dismissible: false,
      			opacity: .5, 
    		 });
    	}

    	function mostrarPregunta(pregunta){
    		$('#modalPregunta').openModal({
    			dismissible:false,
    			opacity:.5
    		});
    		console.log('pregunta id ' + pregunta) 

    		obtenerCategorias(vm.idEncuesta);
    		pregunta.tipo = 'cerrada';
    		vm.pregunta = pregunta;
    	}

    	function mostrarOrden(pregunta){
    		$('#modalOrden').openModal({
      			dismissible: false,
      			opacity: .5, 
    		});
    		vm.pregunta = pregunta;
    	}

    	function orden(arreglo){
    		return _.sortBy(arreglo,'posicion');
    	}

	}
	
})();