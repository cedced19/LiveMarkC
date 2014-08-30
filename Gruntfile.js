module.exports = function(grunt) {

var config = {
    copy: {
      src: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'package.json',
            'vendor/**/*',
            'cli.js',
            'README.md'
          ],
          dest: 'dist/'
        }]
      }
    },
    useminPrepare: {
          html: 'index.html'
    },
    usemin: {
        html: 'dist/index.html'
    },
    cssmin: {
      print: {
        files: {
          'dist/vendor/css/print.css': ['dist/vendor/css/print.css']
        }
      }
    },
    htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true
            },
            files: {
              'dist/index.html': 'dist/index.html'
            }
        }
    }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin', 'htmlmin']);
};