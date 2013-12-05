require("./includes");

var system = require("durandal/system"),
  app = require("durandal/app"),
  viewLocator = require("durandal/viewLocator");

system.debug(true);

app.title = "Feed me files!";

app.configurePlugins({
  router: true,
  dialog: true,
  widget: true
});

app.start().then(function () {
  viewLocator.useConvention();
  app.setRoot("fmf/shell", "entrance");
});
