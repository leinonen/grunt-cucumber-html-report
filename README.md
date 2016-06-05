# grunt-cucumber-html-report

Create HTML reports from cucumber json report files. Uses mustache to transform json to HTML.
Also writes embeddings (base64 encoded PNG images) to disk and includes them in the HTML, 
useful for showing screenshots from Protractor for example.

![](http://www.pharatropic.eu/images/3a84dd33ba7fab98dc62cc272a38258f.jpg)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cucumber-html-report --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cucumber-html-report');
```

## The "cucumber_html_report" task

### Overview
In your project's Gruntfile, add a section named `cucumber_html_report` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cucumber_html_report: {
      options: {
        src: './cucumber_report.json', // input file
        dst: './report' // output directory
      },
      files: {
      }  
  },
});
```

### Options

#### options.src
Type: `String`
Default value: `./cucumber_report.json`

Input file to be processed.

#### options.dst
Type: `String`
Default value: `./report`

Output directory

## Author
Written by Peter Leinonen, 2016.