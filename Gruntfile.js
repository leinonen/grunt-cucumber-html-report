/*
 * grunt-cucumber-html-report
 * https://github.com/leinonen/grunt-cucumber-html-report
 *
 * Copyright (c) 2015 Peter Leinonen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    cucumber_html_report: {
      options: {
        src: './test/cucumber_report.json',
        dst: './report/whatever/slask'
      },
      files: {
      }      
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // By default, lint and run
  grunt.registerTask('default', ['jshint', 'cucumber_html_report']);

};
