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
    jquery: 'bower_components/jquery/jquery',
    knockout: 'bower_components/knockout.js/knockout',
    'requirejs-text': 'bower_components/requirejs-text/text',
    requirejs: 'bower_components/requirejs/require'
  }
});
