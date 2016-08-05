
(function(){
  'use strict'
  angular.module('app.administrador.routes',[])
  .run(appRun);

  function appRun(routerHelper){
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
        {
            state: 'administrador',
            config: {
                url: '/administrador',
               // templateUrl:'templates/administrador.html',
                templateUrl: 'js/app/administrador/principal/principal.html',
                controller:'PrincipalController',
                controllerAs:'vm'
            }
        },
        {
            state:'encuesta',
            config:{
                url:'/encuesta',
                templateUrl:'js/app/administrador/encuesta/encuesta.html',
                controller:'EncuestaController',
                controllerAs:'vm'
            }
        }/*,
        {
            state:'encuesta-categoria',
            config:{
                url:'/encuesta/categoria',
                templateUrl:'js/app/administrador/encuesta/encuesta-categorias.html',
              //  controller:'EncuestaCategoriaController',
                //controllerAs:'vm'
            }
        }*/

    ];
}

})();