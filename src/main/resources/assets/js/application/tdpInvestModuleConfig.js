define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/directives/tdpInvestCalendarDirective'
    , 'application/directives/tdpInvestTableDirective'
    , 'application/directives/tdpInvestChartDirective'
    , 'application/directives/tdpInvestInterestDirective'
    , 'application/directives/tdpInvestAddDirective'
    , 'application/controllers/tdpInvestUploadController'
    , 'application/directives/tdpInvestNavbarDirective'

], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestCompareController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            })
            .state("compare", {
                url: "/compare",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-compare.html",
                        controller: "tdpInvestCompareController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            })
            .state("upload", {
                url: "/upload",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-upload.html",
                        controller: "tdpInvestUploadController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            });

//       function _redirectIfNotAuthenticated($q, $state, $cookieStore) {
//            var defer = $q.defer();
//            if ($cookieStore.get('currentUser')) {
//                defer.resolve();
//            } else {
//                $timeout(function () {
//                    $state.go("login");
//                });
//                defer.reject();
//            }
//            return defer.promise;
//        }
    });

    function _redirectIfNotAuthenticated($cookieStore, $window, $http) {
        var user = $cookieStore.get('currentUser') || {};

        if (!user) {
            $window.location.href = "/auth";
        } else {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line

            return $http.get('/api/login').then(undefined, function () {
                $window.location.href = "/auth";
            });
        }
    }

    return tdpInvestModule;
});
