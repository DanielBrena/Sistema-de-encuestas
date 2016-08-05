(function () {
    'use strict';

    angular
        .module('app.administrador')
        .controller('EncuestaController', EncuestaController);

    /**
     * @ngInject
     */
    EncuestaController.$inject = ['$scope', '$mdDialog', '$log', '$mdSidenav', '$mdMedia','$mdToast','Encuesta'];
    function EncuestaController($scope, $mdDialog, $log, $mdSidenav, $mdMedia,$mdToast,Encuesta) {
        var vm = this;
        vm.encuesta = {};
        vm.encuesta.fechaInicio = new Date();
        vm.encuesta.fechaFinal = new Date();
        vm.toggleList = toggleUsersList;


        vm.abrirDialog = dialog;
        vm.cerrarDialog = cancel;
        vm.abrirMenu = menu;
        vm.abrirCompartir = compartir;
        vm.abrirConfirmacion = eliminar;

        vm.crear = crearEncuesta;

        obtenerEncuestas();

        ////////////////

        function obtenerEncuestas() {
            Encuesta.obtenerTodo().then(function(data){
                console.log(data);
                vm.encuestas = data;
            });
         }



        function dialog(ev) {
            $mdDialog.show({
                controller: EncuestaController,
                controllerAs: 'vm',
                templateUrl: 'js/app/administrador/encuesta/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            })
                .then(function (answer) {
                }, function () {

                });


        }

        function menu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function cancel() {
            $mdDialog.cancel();
        };

        function compartir(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title('Compartir')
                    .textContent('http://www.encuestas.com')
                    .ok('Cerrar')
                    .targetEvent(ev)
            );
        }

        function eliminar(ev) {
            var confirm = $mdDialog.confirm()
                .title('¿Desea eliminar la encuesta?')
                .textContent('Al eliminar la encuesta, todas las preguntas y respuestas tambien serán eliminadas.')
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function () {
                console.log('Eliminado');
            }, function () {
                console.log('Cancelado');
            });
        }


        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        function crearEncuesta(encuesta){
            console.log(encuesta);
            Encuesta.crear(encuesta).then(function(data){
                mostrarMensaje('Encuesta creada');
            });
        }

        function actualizarEncuesta(encuesta){
            console.log(encuesta);
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