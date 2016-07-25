var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
      'angular': 'lib/angular/angular.min',
      'angularMocks': 'lib/angular-mocks/angular-mocks',
      'restangular': 'lib/restangular/dist/restangular.min',
      'lodash': 'lib/lodash/dist/lodash.min',
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
      'highcharts': 'lib/highcharts/highcharts',
      'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
      'ngTable': 'lib/ng-table/dist/ng-table.min',
      'highchart-theme': 'lib/highcharts/themes/dark-unica',
      'ngCookies': 'lib/angular-cookies/angular-cookies',
      'ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls.min',
      'flow': 'lib/ng-flow/dist/ng-flow-standalone.min',
      'toastr': 'lib/angular-toastr/dist/angular-toastr.tpls'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'restangular': ['angular', 'lodash'],
      'lodash': {
        exports: '_'
      },
      'angularMocks': ['angular'],
      'uiRouter' : ['angular'],
      'highcharts-ng': ['angular', 'highcharts'],
      'ngTable': ['angular'],
      'ngCookies': ['angular'],
      'highchart-theme': ['highcharts'],
      'ui.bootstrap': ['angular'],
      'flow': ['angular'],
      'toastr': ['angular'],

  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
