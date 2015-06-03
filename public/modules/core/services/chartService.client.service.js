/**
 *
 *   THIS IS FOR A FUTURE ITERATION
 *
 */

'use strict';

angular.module('core').factory('ChartService', function ($http) {
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

});