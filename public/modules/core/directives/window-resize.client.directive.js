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