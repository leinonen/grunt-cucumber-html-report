/*
 * grunt-cucumber-html-report
 * https://github.com/leinonen/grunt-cucumber-html-report
 *
 * Copyright (c) 2015 Peter Leinonen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('cucumber_html_report', 'Generate HTML reports from Cucumber json reports', function() {
    // Merge options with these defaults.
    var options = this.options({
      src: './cucumber_report.json',
      dst: './cucumber_report'
    });
    var Report = require('cucumber-html-report');
    var generator = new Report({
      source: options.src,
      dest: options.dst
    });

    return generator.createReport(options, grunt);
  });

};
