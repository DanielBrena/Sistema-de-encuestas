(function() {
'use strict';

    angular
        .module('app.administrador')
        .controller('PrincipalController', PrincipalController);

    //PrincipalController.$inject = ['$scope','$mdSidenav'];
    function PrincipalController() {
        var vm = this;
        $(".button-collapse").sideNav();
         //$mdSidenav('left').close();
        // $(".button-collapse").sideNav();

    }
})();