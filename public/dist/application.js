'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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
'use strict';

// Admins controller
angular.module('core').controller('d3DataController', ['$scope', '$http', '$interval', 'DataService', '$window',
	function ($scope, $http, $interval, DataService, $window) {

		//data for center of donut
		$scope.test = function () {
			var centerGraphic = 'variable';
			return centerGraphic
		};

	//check window size on resize in order to resize charts
	/** (not working / in progress) **/
		//var lineChart1 = null,
		//	lineChart2 = null;
		//
		//$scope.$watch(function () {
		//		angular.element($window).on('resize', function () {
		//			console.log('window size: ', $window.innerWidth);
		//			if ($window.innerWidth <= 320) {
		//				lineChart1.resize({width: 300});
		//				lineChart2.resize({width: 300});
		//			} else if ($window.innerWidth <= 768){
		//				lineChart1.resize({width: 600});
		//				lineChart2.resize({width: 600});
		//			} else if ($window.innerWidth > 768 && lineChart1.width < 600){
		//				lineChart1.resize({width: '100%'});
		//				lineChart2.resize({width: '100%'});
		//			}
		//		});
		//	}
		//);


		/**
		 *
		 * Users Logged In Chart
		 *
		 **/

		DataService.chart1Data()
			.success(function (chart1Data) {
				$scope.usersInvited = chart1Data.summary.total_users_invited;
				$scope.usersLoggedIn = chart1Data.summary.total_users_logged_in;
				var labelData = ($scope.usersLoggedIn / $scope.usersInvited * 100).toFixed(1);
				$scope.chart1Data = chart1Data;


				var donutChart = c3.generate({
					bindto: '#donutChart1',
					data: {
						columns: [
							['# of Users Not Logged In', $scope.usersInvited - $scope.usersLoggedIn],
							['# of Users Logged In', $scope.usersLoggedIn]
						],
						type: 'donut', onclick: function (d, i) {
							console.log("onclick", d, i);
						},
						onmouseover: function (d, i) {
							console.log("onmouseover", d, i);
						},
						onmouseout: function (d, i) {
							console.log("onmouseout", d, i);
						},
						colors: {
							'# of Users Not Logged In': 'rgba(0,0,0,0)',
							'# of Users Logged In': '#00B4F0'
						},
						color: function (color, d) {
							// d will be 'id' when called for legends
							return d.id && d.id === 'data2' ? d3.rgb(color).darker(d.value / 150) : color;
						}
					},
					legend: {
						hide: true
						//or hide: 'data1'
						//or hide: ['data1', 'data2']
					},
					tooltip: {
						format: {
							value: function (value, ratio, id, index) {
								return value;
							}
						}
					},
					donut: {
						label: {
							show: false
						},
						width: 5.5,
						'border-radius': 100,
						title: labelData + '%',
						expand: false
					},
					transition: {
						duration: 3500
					},
					size: {
						height: '100%'
					}
				});

			});


		/**
		 *
		 * Active Users Chart
		 *
		 **/

		DataService.chart1Data()
			.success(function (chart1Data) {
				$scope.usersInvited = chart1Data.summary.total_users_invited;
				$scope.activeUsers = chart1Data.summary.total_users_voted;
				var labelData = ($scope.activeUsers / $scope.usersInvited * 100).toFixed(1);
				$scope.chart1Data = chart1Data;

				var donutChart = c3.generate({
					bindto: '#donutChart2',
					data: {
						columns: [
							['# of Inactive Users', $scope.usersInvited - $scope.activeUsers],
							['# of Active Users', $scope.activeUsers]
						],
						type: 'donut', onclick: function (d, i) {
							console.log("onclick", d, i);
						},
						onmouseover: function (d, i) {
							console.log("onmouseover", d, i);
						},
						onmouseout: function (d, i) {
							console.log("onmouseout", d, i);
						},
						colors: {
							'# of Inactive Users': 'rgba(0,0,0,0)',
							'# of Active Users': '#00B4F0'
						}
					},
					legend: {
						hide: true
					},
					tooltip: {
						format: {
							value: function (value, ratio, id, index) {
								return value;
							}
						}
					},
					duration: {
						transition: 3500
					},
					donut: {
						label: {
							show: false
						},
						width: 5.5,
						title: labelData + '%',
						expand: false
					},
					size: {
						height: '100%'
					}
				});

			});


		/**
		 *
		 * Traffic Source Chart
		 *
		 **/

		DataService.chart1Data()
			.success(function (chart1Data) {
				var chromeStats = 33.51,
					firefoxStats = 14.45,
					ieStats = 30.03,
					safariStats = 16.8,

					pieChart = c3.generate({
						bindto: '#pieChart1',
						data: {
							columns: [
								['Chrome', chromeStats],
								['Firefox', firefoxStats],
								['IE', ieStats],
								['Safari', safariStats],
								['Other', 100 - chromeStats - firefoxStats - ieStats - safariStats]
							],
							type: 'pie',
							onclick: function (d, i) {
								console.log("onclick", d, i);
							},
							onmouseover: function (d, i) {
								console.log("onmouseover", d, i);
							},
							onmouseout: function (d, i) {
								console.log("onmouseout", d, i);
							}
						},
						pie: {
							label: {
								format: function (value, ratio, id) {
									return d3.format('%')(ratio);
								},
								show: false
								//threshold: 0.15
							},
							expand: false
						}
						//size: {
						//	r: '100%'
						//}
					});
			});


		/**
		 *
		 * Hours Remaining Chart
		 *
		 **/
		$scope.toggleGauge = null;
		$scope.isGaugeChart = true;
		DataService.chart2Data()
			.success(function (chart2Data) {
				var startTime = moment.unix(chart2Data.segments[1].start_time).toDate(),
					segmentsLength = chart2Data.segments.length - 1,
					endTime = moment.unix(chart2Data.segments[segmentsLength].start_time + chart2Data.info.segment_duration).toDate(),
					fakeEndTime = moment().add(50400, 'seconds').toDate(), //to set an end time in the future,
					totalDuration = moment(fakeEndTime).diff(startTime, 'hours');
				$scope.timeRemaining = moment(fakeEndTime).diff(moment(), 'hours');


				var gaugeChart1 = c3.generate({
					bindto: '#gaugeChart1',
					data: {
						columns: [
							['Hours Remaining', $scope.timeRemaining]
						],
						type: 'gauge',
						onclick: function (d, i) {
							//console.log("onclick", d, i);

							/** will transition between two chart types -- in progress **/
							//$scope.toggleGauge = function() {
							//function toggleGauge () {
							//	if ($scope.isGaugeChart === 'true'){
							//		gaugeChart1.transform('line');
							//		console.log('check!', $scope.isGaugeChart);
							//	} else {
							//		gaugeChart1.transform('line');
							//		console.log('nope!', $scope.isGaugeChart);
							//	}
							//	$scope.isGaugeChart = !$scope.isGaugeChart;
							//},
						},
						onmouseover: function (d, i) {
							//console.log("onmouseover", d, i);
						},
						onmouseout: function (d, i) {
							//console.log("onmouseout", d, i);
						}
					},
					gauge: {
						label: {
							format: function (value, ratio) {
								return value;
							},
							show: false // to turn off the min/max labels.
						},
						min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
						max: 17, // 100 is default
						units: 'h',
						width: 8.5 // for adjusting arc thickness
					},
					//legend: {
					//	format: function (value, ratio, id) {
					//		return d3.format('hours')(value);
					//	},
					//	//show: false
					//	//threshold: 0.15
					//},
					color: {
						pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
						threshold: {
							unit: '%X', // percentage is default
							max: totalDuration, // 100 is default
							values: [totalDuration * 0.3, totalDuration * 0.6, totalDuration * 0.9, totalDuration]
						}
					},
					size: {
						height: '100%'
					}
				});
			});


		/**
		 *
		 * Participation Over Time Chart
		 *
		 **/

		DataService.chart2Data()
			.success(function (chart2Data) {

				var segmentTimeArray = ['x'],
					segmentParticipantsArray = ['Total Participants'];
				$scope.chartTitle = chart2Data.info.event_name;

				var segmentTimeData = function () {
					for (var i = 1; i < chart2Data.segments.length; i++) {  //i begins at 1, since we want to skip the data label at index 0
						var unixTimeToDate = moment.unix(chart2Data.segments[i].start_time).toDate(); //use momentjs to parse unix timestamp
						segmentTimeArray.push(unixTimeToDate);
						segmentParticipantsArray.push(chart2Data.segments[i].total_users_participated);
					}
				}();

				var tempTimeChart2Array = [moment.unix(1428339912).toDate(), moment.unix(1428426312).toDate(), moment.unix(1428519912).toDate(), moment.unix(1428613512).toDate(), moment.unix(1428743112).toDate()];

				var lineChart1 = c3.generate({
					bindto: '#lineChart1',
					padding: {
						top: 40,
						right: 100,
						bottom: 40,
						left: 100
					},
					data: {
						x: 'x',
						columns: [
							segmentTimeArray, //x-axis data
							segmentParticipantsArray //the following lines are array of data
						],
						type: 'spline'
					},
					zoom: {
						enabled: true
					},
					axis: {
						x: {
							type: 'timeseries',
							tick: {
								culling: {
									max: 6 // the number of tick texts will be adjusted to less than this value
								},
								values: tempTimeChart2Array,
								format: '%b %e %I:%M%p' //d3 time format
							}
						}
					}
				});

			});


		/**
		 *
		 * Time vs. Activity
		 *
		 **/


		DataService.chart2Data()
			.success(function (chart2Data) {

				var segmentTimeArray = ['x'];
				//var segmentParticipantsArray = ['Total Participants'];
				var segmentVotesArray = ['Votes'];
				var segmentCommentsArray = ['Comments'];
				var segmentIdeasArray = ['Ideas'];


				var segmentTimeData = function () {
					for (var i = 1; i < chart2Data.segments.length; i++) {  //i begins at 1, since we want to skip the data label at index 0
						var unixTimeToDate = moment.unix(chart2Data.segments[i].start_time).toDate();
						segmentTimeArray.push(unixTimeToDate);
						//segmentParticipantsArray.push(chart2Data.segments[i].total_users_participated);
						segmentVotesArray.push(chart2Data.segments[i].total_votes);
						segmentCommentsArray.push(chart2Data.segments[i].total_comments);
						segmentIdeasArray.push(chart2Data.segments[i].total_ideas);
					}
				}();

				//function (in progress) will return dynamic tick marks for calendar
				//problem is that you don't want to include all tick marks with larger data sets
				//but you all don't want to have to hard code them.
				//this fn will return first and last timestamps and then find the timestamps in the array that ensure
				//x-axis ticks will be spaced evenly, so the scale looks correct at a glance
				var timeSetArray = [];
				var timeTicks = function () {
					segmentTimeArray.shift(); //discard axis label
					timeSetArray = segmentTimeArray.shift(); //include first time segment
					var temp = segmentTimeArray.pop(); //include last time segment
					Array.prototype.push.apply(timeSetArray, temp);
					var multiplier = segmentTimeArray / 3;  //find number of indicies to skip through
					if (segmentTimeArray < 6) {
						return segmentTimeArray;
					} else {
						for (var i = 1; i <= timeSetArray.length; i * multiplier) {
							timeSetArray.push(segmentTimeArray[Math.floor(i)]);
						}
					}
				};

				var tempTimeChart2Array = [moment.unix(1428339912).toDate(), moment.unix(1428426312).toDate(), moment.unix(1428519912).toDate(), moment.unix(1428613512).toDate(), moment.unix(1428743112).toDate()];
				var lineChart2 = c3.generate({
					bindto: '#lineChart2',
					padding: {
						top: 40,
						right: 100,
						bottom: 40,
						left: 100
					},
					data: {
						x: 'x',
						//xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
						columns: [
							segmentTimeArray, //x-axis data
							segmentVotesArray, //the following lines are array of data
							//segmentParticipantsArray,
							segmentCommentsArray,
							segmentIdeasArray
						],
						type: 'spline'
					},
					zoom: {
						enabled: true
					},
					axis: {
						x: {
							type: 'timeseries',
							tick: {
								culling: {
									max: 6 // the number of tick texts will be adjusted to less than this value
								},
								//values: timeTickFilter,
								values: tempTimeChart2Array,
								format: '%b %e %I:%M%p'
								//format: function (x) {
								//	if (x.getDate() === 1) {
								//		return x.toLocaleDateString();
								//	}
								//rotate: 75,
								//multiline: false
							}
							//height: 130
						},
						y: {
							show: false
						}
					}
				});

			});


		/**
		 *
		 * Bar Chart
		 *
		 **/

		var barChart1 = c3.generate({
			bindto: '#barChart1',
			data: {
				columns: [
					['Reasons to Hire Chris', 6],
					['Reasons Not To', 2],
					['Reasons Why This Approach Is a Good Idea', 3],
					['Reasons Why This Might Backfire', 9]
				],
				type: 'bar',
				labels: {
					color: "#00ff00",
					format: {
						y: d3.format("1%")
					}
				}
			},
			axis: {
				y: {
					max: 10,
					min: 0,
					padding: {top: 15, bottom: 0},
					tick: {
						format: d3.format("#")
						//format: function (d) { return "$" + d; }
					}
				}
			},
			bar: {
				width: {
					ratio: 0.5

				}
			}
		});
	}
]);
/**
 *
 *   THIS IS FOR A FUTURE ITERATION
 *
 */

'use strict';

angular.module('core').directive('chartDirective', [,
	function () {
		return {
			restrict: "EA",
			scope: {config: "="},
			template: "<div></div>",
			replace: !0,
			link: function (scope) {
			}
		}
	}
]);
/**
 *
 *  Will detect when user resizes window, check for certain width thresholds and, if met, will resize charts
 *
 */

'use strict';

angular.module('core').directive('onResize', ['$window',
	function ($window) {

		return {
			link: function (scope, el, attrs) {
				var initialWidth = $window.innerWidth,
					smallClass   = attrs.resizeClass,
					smallAttr    = attrs.resizeAttr,
					smallWidth   = attrs.resizeWidth;

				var setSmall = function () {
					el.addClass(smallClass);
					el.attr(smallAttr, smallAttr);
				};

				var setLarge = function () {
					el.removeClass(smallClass);
					el.removeAttr(smallAttr);
				};

				if (initialWidth < smallWidth) {
					setSmall();
				} else {
					setLarge();
				}

				angular.element($window).on('resize', function () {
					if ($window.innerWidth <= smallWidth) {
						setSmall();
					} else {
						setLarge();
					}
				});
			}
		};

	}
]);
/**
 *
 *   THIS IS FOR A FUTURE ITERATION
 *
 */

'use strict';

angular.module('core').factory('ChartService', ["$http", function ($http) {
	function ChartService() {

		this.donutChart = function() {
			return c3.generate({
				bindto: '#donutChart',
				data: {
					columns: [
						['data1', donutChartData1],
						['data2', donutChartData2]
					],
					type: 'donut', onclick: function (d, i) {console.log("onclick", d, i);},
					onmouseover: function (d, i) {console.log("onmouseover", d, i);},
					onmouseout: function (d, i) {console.log("onmouseout", d, i);}
				},
				donut: {
					title: $scope.test
				}
			});
		};

		this.gaugeChart = function () {
			return c3.generate({
				data: {
					columns: [
						['data', gaugeChartData]
					],
					type: 'gauge',
					onclick: function (d, i) {
						console.log("onclick", d, i);
					},
					onmouseover: function (d, i) {
						console.log("onmouseover", d, i);
					},
					onmouseout: function (d, i) {
						console.log("onmouseout", d, i);
					}
				},
				gauge: {
					label: {
						format: function (value, ratio) {
							return value;
						},
						show: false // to turn off the min/max labels.
					},
					min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
					max: 100, // 100 is default
					units: ' %',
					width: 39 // for adjusting arc thickness
				},
				color: {
					pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
					threshold: {
						unit: 'value', // percentage is default
						max: 200, // 100 is default
						values: [30, 60, 90, 100]
					}
				},
				size: {
					height: 180
				}
			});


		};


	}

	return new ChartService();

}]);
/**
 *
 *  SERVICE TO RETURN .JSON DATA FROM BACKEND (app/models/data)
 *
 */

'use strict';

angular.module('core').factory('DataService', ["$http", function($http) {
	function DataService() {
		var data = [];
		var numDataPoints = 60;
		var maxNumber = 200;

		function randomNumber() {
			return Math.floor((Math.random() * maxNumber) + 1);
		}
		
		this.loadData = function(callback) {
			if (data.length > numDataPoints) {
				data.shift();
			}
			data.push({
				'x': new Date(),
				'data1':randomNumber(),
				'data2':randomNumber()
			});
			callback(data);
		};

		this.chart1Data = function () {
			return $http.get('/chart1');
		};

		this.chart2Data = function () {
			return $http.get('/chart2');
		};

	}
	return new DataService();

}]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);