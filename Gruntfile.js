module.exports = function(grunt) {
  "use strict";

  var REQUIREJS_CONFIG_PATH = "requirejs.config.js",
    OUTPUT_DIRECTORY = "out";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      options: {
        mainConfigFile: REQUIREJS_CONFIG_PATH,
        convert: true,
        out: [OUTPUT_DIRECTORY, "fmf.js"].join("/"),
        cjsTranslate: true,
        include: "fmf",
        generateSourceMaps: true,
        preserveLicenseComments: false
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

    bower: {
      all: {
        rjsConfig: REQUIREJS_CONFIG_PATH
      }
    },

    jshint: {
      all: [
        "Gruntfile.js",
        "src/**/*.js"
      ]
    },

    clean: {
      out: [
        OUTPUT_DIRECTORY + "/*"
      ]
    },

    jade: {
      assets: {
        options: {
          client: false,
          pretty: true,
          namespace: false,
        },
        files: [{
          cwd: "src/html",
          src: "**/*.jade",
          dest: OUTPUT_DIRECTORY,
          expand: true,
          ext: ".html"
        }]
      }
    },

    connect: {
      build: {
        options: {
          port: 10112,
          hostname: 'localhost',
          base: 'out'
        }
      },
      dev: {
        options: {
          port: 10112,
          hostname: 'localhost',
          base: 'out'
        }
      },
    },

    open: {
      build: {
        path: "http://localhost:<%= connect.dev.options.port %>/"
      },
      dev: {
        path: "http://localhost:<%= connect.dev.options.port %>/"
      }
    },

    watch: {
      build: {
        files: [
          "src/js/**/*.js",
          "src/html/**/*.jade",
          "src/css/**/*.less",
          "bower.json",
          "package.json",
          "requirejs.config.js"
        ],
        tasks: [ "pre-build" ]
      },

      dev: {
        files: [
          "src/js/**/*.js",
          "src/html/**/*.jade",
          "src/css/**/*.less",
          "bower.json",
          "package.json",
          "requirejs.config.js"
        ],
        tasks: [ "pre-dev" ]
      },
    }
  });

  grunt.loadNpmTasks("grunt-requirejs");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask("common", ["jshint", "jade", "bower"]);

  grunt.registerTask("pre-build", ["common", "requirejs:build"]);
  grunt.registerTask("build", ["pre-build", "open:build", "watch:build"]);

  grunt.registerTask("pre-dev", ["common", "requirejs:dev"]);
  grunt.registerTask("dev", ["pre-dev", "connect:dev", "open:dev", "watch:dev"]);

  grunt.registerTask("default", ["dev"]);
};
