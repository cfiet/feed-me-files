module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      options: {
        convert: true,
        out: "dist/build/fmf.js",
        cjsTranslate: true,
        include: "fmf",
        generateSourceMaps: true,
        preserveLicenseComments: false,
        packages: [
          {
            name: "fmf",
            location: "src"
          }
        ]
      },
      build: {
        options: {
          optimize: "uglify2",
          uglify2: {
            output: {
              beautify: false
            },
            compress: {
              sequences: true
            },
            warnings: true,
            mangle: false
          }
        }
      },
      dev: {
        options: {
          optimize: "none",
        }
      }
    },

    jshint: {
      all: [
        "Gruntfile.js",
        "src/**/*.js"
      ]
    },

    clean: {
      dist: ["dist/*"]
    }
  });

  grunt.loadNpmTasks("grunt-requirejs");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask("build", ["jshint", "requirejs:build"]);
  grunt.registerTask("dev", ["jshint", "requirejs:dev"]);

  grunt.registerTask("default", ["dev"]);
};
