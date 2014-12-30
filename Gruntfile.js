'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var projectConfig = {
        app: './',
        dist: 'build'
    };
    // Project configuration.
    grunt.initConfig({
        project: projectConfig,
        jshint: {
            all: [
                //'Gruntfile.js',
                //'<%= project.app %>/js/{,*/}*.js'
                '<%= project.app %>PizzaToppingsAnalyzer.js',
                '<%= project.app %>app.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('build', [
        'jshint'
    ]);


    grunt.registerTask('default', ['build']);

};

