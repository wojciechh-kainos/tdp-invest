var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule)
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
      'angular': 'lib/angular/angular',
      'angularMocks': 'lib/angular-mocks/angular-mocks',
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
      'ngCookies': 'lib/angular-cookies/angular-cookies',
      'requireJS': 'lib/requirejs/require',
      'karma-requireJS': 'lib/karma-require',
      'highcharts': 'lib/highcharts/highcharts',
      'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
      'ui-bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angularMocks': ['angular'],
      'uiRouter' : ['angular'],
      'ngCookies': ['angular']
      'highcharts-ng': ['angular' , 'highcharts'],
      'ui-bootstrap': ['angular'],
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
