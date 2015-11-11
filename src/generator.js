var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');

function loadTemplate(template) {
  return fs.readFileSync(path.join(__dirname, '../templates', template + '.html')).toString();
}

function fixFilename(name) {
	return name.split(' ').join('_').toLowerCase();
}

function writeImage(fileName, data) {
  fs.writeFileSync(fileName, new Buffer(data, 'base64'));
}

function writeImages(grunt, destPath, element, steps) {
	steps.forEach(function(step) {
		if (step.embeddings) {
			step.embeddings.forEach(function(embedding) {
				if (embedding.mime_type === 'image/png') {
          var imageName = fixFilename(element.name) + '.png';
          var fileName = path.join(destPath, imageName);
          // Save imageName on element so we use it in HTML
          element.imageName = imageName;
          writeImage(fileName, embedding.data);
          grunt.log.writeln('Wrote ' + fileName);
				}
			});
		}
	});
}

function parseTags(report) {
  if (report.tags !== undefined) {
    return report.tags.map(function(tag) {
      return tag.name;
    }).join(', ');
  } else {
    return '';
  }
}

function transformStep(step) {
  if (step.name === undefined) {
    if (step.keyword.indexOf('Before') !== -1) {
      step.name = 'Setup test';
    } else if (step.keyword.indexOf('After') !== -1) {
      step.name = 'Teardown / cleanup';
    } else {
      step.name = '';
    }
    step.line = '';
  }
  return step;
}

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code !== 'EEXIST' ) {
      throw e;
    }
  }
}

function mkdirpSync(dirpath) {
  var parts = dirpath.split(path.sep);
  for( var i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply(null, parts.slice(0, i)) );
  }
}

exports.createReport = function(options, grunt) {

  // Make sure we have input file!
  if (!fs.existsSync(options.src)){
    grunt.log.error('Input file "'+ options.src + '" does not exist! Aborting');
    return false;
  }

  // Create output directory if not exists
  if (!fs.existsSync(options.dst)){
    mkdirpSync(options.dst);
    grunt.log.writeln(options.dst + ' directory created.');
  }

  var reportData = fs.readFileSync(options.src, 'utf-8').toString();
  var reports = JSON.parse(reportData);

  var processElement = function(element) {
    writeImages(grunt, options.dst, element, element.steps);
    // Transform steps to look nice
    //element.steps = element.steps.map(transformStep);
    element.steps = element.steps.filter(function(step) {
      return step.name !== undefined;
    });
  };

  reports.forEach(function(report) {
    grunt.log.writeln(report.keyword + ': ' + report.name);
    report.tags = parseTags(report);
    report.elements.forEach(processElement);
  });

  var imageHandler = function () {
    return function (text, render) {
      var src = render(text);
      if (src.length > 0) {
        return '<img src="' + src + '"/>';
      } else {
        return '';
      }
    };
  };

  var html = Mustache.to_html(loadTemplate('template'), {
    reports: reports,
    image: imageHandler
  });
  
  var destFile = path.join(options.dst, 'index.html');
  fs.writeFileSync(destFile, html);
  grunt.log.writeln('Created report: ' + destFile);

  return true;
};
