/**
 *
 *  SERVICE TO RETURN .JSON DATA FROM BACKEND (app/models/data)
 *
 */

'use strict';

angular.module('core').factory('DataService', function($http) {
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

});