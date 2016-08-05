(function () {
    'use strict';

    angular
        .module('app.administrador')
        .controller('EncuestaCategoriaController', EncuestaCategoriaController);

    EncuestaCategoriaController.$inject = ['Categoria', '$mdToast','$mdDialog'];
    function EncuestaCategoriaController(Categoria, $mdToast,$mdDialog) {
        var vm = this;
        vm.categorias = [];
        vm.categoria = {};

        vm.crear = crearCategoria;
        vm.obtener = obtenerCategoria;
        vm.actualizar = actualizarCategoria;
        vm.eliminar = eliminarCategoria;



        obtenerCategorias();

        ////////////////



        function crearCategoria(categoria) {
            Categoria.crear(categoria).then(function(data){
                mostrarMensaje('Categoría creada');
                obtenerCategorias();
            });
        }

        function obtenerCategoria(id) {
            Categoria.obtener(id).then(function (data) {
                vm.categoria = data;
            });
        }

        function obtenerCategorias() {
            Categoria.obtenerTodo().then(function (data) {
                vm.categorias = data;
            });
        }

        function actualizarCategoria(categoria) {
            console.log(categoria);
            Categoria.actualizar(categoria).then(function (data) {
                mostrarMensaje("Categoría actualizada");
                obtenerCategorias();
            });
        }

        

        function eliminarCategoria(id,ev) {
            var confirm = $mdDialog.confirm()
                .title('Alerta')
                .textContent('¿Deseas eliminar la categoría?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Si, deseo eliminarla')
                .cancel('No por el momento');
            $mdDialog.show(confirm).then(function () {
               Categoria.eliminar(id).then(function(){
                   mostrarMensaje('Categoría eliminada');
                   obtenerCategorias();
               });
            }, function () {
               
            });
        }

        function mostrarMensaje(mensaje) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(mensaje)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }

        

    }
})();