'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
				url: '/',
				templateUrl: 'modules/core/views/home.client.view.html'
			})
		.state('homeV2', {
				url: '/view2',
				templateUrl: 'modules/core/views/home-v2.client.view.html'
		});

	}
]);