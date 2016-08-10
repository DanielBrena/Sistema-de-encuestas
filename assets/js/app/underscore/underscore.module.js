(function(){
	'use strict';
	angular.module('underscore',[]).
	factory('_',_);

	_.$inject = ['$window'];
	function _($window){
		return $window._
	}

})();