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
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'highcharts': 'http://code.highcharts.com/highcharts.src',
//        'angular-bootstrap': 'http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.1.min',
        'ui-bootstrap' : 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'angularMocks': 'lib/angular-mocks/angular-mocks',
        'eonasdan-bootstrap-datetimepicker' : 'lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'requireJS': 'lib/requirejs/require',
        'karma-requireJS': 'lib/karma-require'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angularMocks': ['angular'],
      'highcharts-ng': ['angular', 'highcharts'],
      'uiRouter' : ['angular'],
      'ui-bootstrap' : ['angular'],
      'ngCookies': ['angular']
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
