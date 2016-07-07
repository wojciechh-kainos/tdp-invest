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
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
      'angular-material': 'lib/angular-material/angular-material',
      'angular-aria': 'lib/angular-aria/angular-aria.min',
      'angular-animate': 'lib/angular-animate/angular-animate.min',
      'angular-chart' : 'lib/angular-chart.js/dist/angular-chart',
      'chart': 'lib/Chart.js/Chart'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'chart':{
          exports: 'Chart'
      },
      'angularMocks': ['angular'],
      'uiRouter' : ['angular'],
      'angular-material' : ['angular', 'angular-animate', 'angular-aria'],
      'angular-aria': ['angular'],
      'angular-animate': ['angular'],
      'angular-chart': ['angular','chart']
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
