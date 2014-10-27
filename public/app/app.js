/**
 * Set the angular module
 */
angular.module('panelando', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/receitas', {
			templateUrl: 'views/receita.html',
			controller: 'ReceitasController'
		})

		.when('/receitas/:id', {
			templateUrl: 'views/receita.html',
			controller: 'ReceitaController'
		})

		.otherwise({redirectTo: '/'});
}])