var router = require("plugins/router"),
  app = require("durandal/app");

module.exports = {
  router: router,
  activate: function () {
    router.map([
      {
        route: '',
        title: "Welcome",
        moduleId: 'fmf/viewmodels/welcome',
        nav: true
      },
      {
        route: 'start',
        title: "Start a connection",
        moduleId: 'fmf/viewmodels/start',
        nav: true
      }
    ]);
  }
};
