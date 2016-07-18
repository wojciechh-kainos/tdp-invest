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
<<<<<<< HEAD
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
      'highcharts' : 'lib/highcharts/highcharts',
      'highcharts-ng' : 'lib/highcharts-ng/dist/highcharts-ng.min',
      'ngMaterial' : 'lib/angular-material/angular-material',
      'ngAnimate' : 'lib/angular-aria/angular-aria',
      'ngAria' : 'lib/angular-animate/angular-animate',
=======
      'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
      'ngCookies': 'lib/angular-cookies/angular-cookies',
      'requireJS': 'lib/requirejs/require',
      'karma-requireJS': 'lib/karma-require'
>>>>>>> origin/master
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angularMocks': ['angular'],
      'uiRouter' : ['angular'],
<<<<<<< HEAD
      'highcharts-ng' : ['angular', 'highcharts'],
      'ngAnimate' : ['angular'],
      'ngAria' : ['angular'],
      'ngMaterial' : ['angular','ngAria', 'ngAnimate']
=======
      'ngCookies': ['angular']
>>>>>>> origin/master
  },
  // dynamically load all test files
  deps:  allTestFiles,


  // we have to kickoff jasmine, as it is asynchronous
<<<<<<< HEAD
  callback:  window.__karma__.start

})
=======
  callback: window.__karma__.start
});
>>>>>>> origin/master
