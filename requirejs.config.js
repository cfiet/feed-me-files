requirejs.config({
  baseUrl: './',
  packages: [
    {
      name: 'fmf',
      location: 'src/js/fmf'
    }
  ],
  paths: {
    durandal: 'bower_components/durandal/js',
    plugins: 'bower_components/durandal/js/plugins',
    transitions: 'bower_components/durandal/js/transitions',
    jquery: 'bower_components/jquery/jquery',
    knockout: 'bower_components/knockout.js/knockout',
    text: 'bower_components/requirejs-text/text',
    requirejs: 'bower_components/requirejs/require',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap'
  },
  shim: {
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.modal"
    }
  }
});
