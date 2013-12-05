module.exports = function(grunt) {
  "use strict";

  var REQUIREJS_CONFIG_PATH = "requirejs.config.js",
    OUTPUT_DIR = "out",
    TEMP_DIR = "temp",
    LIVERELOAD_PORT = 35729,
    liveReload = require('connect-livereload')({
      port: LIVERELOAD_PORT
    }),
    addFolder = function(connect, dir) {
      var path = require("path");
      return connect.static(path.resolve(dir));
    };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      options: {
        mainConfigFile: REQUIREJS_CONFIG_PATH,
        convert: true,
        out: [OUTPUT_DIR, "js", "fmf.js"].join("/"),
        cjsTranslate: true,
        include: "fmf",
        generateSourceMaps: true,
        preserveLicenseComments: false,
        useStrict: true
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
      out: [ OUTPUT_DIR, TEMP_DIR ].map(function(dir) {
        return dir + "/*";
      })
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
          dest: OUTPUT_DIR,
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
          middleware: function(connect) {
            return [liveReload, addFolder(connect, "./out")];
          }
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
        tasks: [ "pre-dev" ],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
    },

    less: {
      build: {
        files: [{
          cwd: "src/css",
          src: "**/*.less",
          dest: [OUTPUT_DIR, "css"].join("/"),
          expand: true,
          ext: ".css"
        }],
        options: {
          report: 'gzip',
          compress: true,
          cleancss: true,
          ieCompat: false
        }
      },
      dev: {
        files: [{
          cwd: "src/css",
          src: "**/*.less",
          dest: [OUTPUT_DIR, "css"].join("/"),
          expand: true,
          ext: ".css"
        }],
        options: {
          compress: false,
          cleancss: false,
          ieCompat: false
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-requirejs");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask("common", ["jshint", "jade"]);

  grunt.registerTask("pre-build", ["common", "requirejs:build", "less:build"]);
  grunt.registerTask("build", ["pre-build", "connect:build", "open:build", "watch:build"]);

  grunt.registerTask("pre-dev", ["common", "requirejs:dev", "less:dev"]);
  grunt.registerTask("dev", ["pre-dev", "connect:dev", "open:dev", "watch:dev"]);

  grunt.registerTask("default", ["dev"]);
};
