module.exports = function (grunt) {

  var files = [
    // All .js + .json files
    './**/*.js*',
    // Exclude node_modules
    '!./node_modules/**/*.js*',
  ];

  grunt.initConfig({
    jshint: {
      all: files,
      options: {
        jshintrc: './config/.jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: files,
        options: {
          config: './config/.jsbeautifyrc'
        }
      },
      verify: {
        src: files,
        options: {
          mode: 'VERIFY_ONLY',
          config: './config/.jsbeautifyrc'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 10000
        },
        src: [
          './test/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('clean', [
    'jsbeautifier:modify',
    'jshint'
  ]);

  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'clean',
    'test'
  ]);
};
