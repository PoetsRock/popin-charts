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