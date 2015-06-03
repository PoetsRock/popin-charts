'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller'),
		chart1 = require('../models/data/stats-1-day.json'),
		chart2 = require('../models/data/stats-2-hour.json');
	app.route('/').get(core.index);

	// Chart 1 Data Route
	app.route('/chart1')
		.get(function (req, res) {
			res.jsonp(chart1);
		});

	// Chart 2 Data Route
	app.route('/chart2')
		.get(function (req, res) {
			res.jsonp(chart2);
		});
};
