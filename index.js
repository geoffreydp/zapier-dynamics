const prospect = require('./creates/prospect');
const xml = require('pixl-xml');
// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  beforeRequest: [
  ],

  afterResponse: [
    (response, z, bundle) => {
      response.xml = xml.parse(response.content);
      return response;
    }
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [prospect.key]: prospect
  }
};

// Finally, export the app.
module.exports = App;
