Package.describe({
  name: 'example-movies',
});

Package.onUse(function (api) {

  api.use([

    'promise',

    // vulcan core
    'vulcan:core@1.13.1',

    // vulcan packages
    'vulcan:forms@1.13.1',
    'vulcan:accounts@1.13.1',
    'vulcan:ui-bootstrap@1.13.1',
    
  ]);

  api.addFiles('lib/stylesheets/bootstrap.min.css');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
