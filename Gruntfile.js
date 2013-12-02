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
            location: "src/fmf"
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
    },

    jade: {
      assets: {
        options: {
          client: false,
          pretty: true,
          namespace: false,
        },
        files: [{
          cwd: "src/assets",
          src: "**/*.jade",
          dest: "dist/build",
          expand: true,
          ext: ".html"
        }]
      }
    }

  });

  grunt.loadNpmTasks("grunt-requirejs");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-open");


  grunt.registerTask("common", ["jshint", "jade"]);
  grunt.registerTask("build", ["common", "requirejs:build"]);
  grunt.registerTask("dev", ["common", "requirejs:dev"]);

  grunt.registerTask("default", ["dev"]);
};
