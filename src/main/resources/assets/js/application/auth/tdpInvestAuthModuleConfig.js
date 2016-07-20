define(['angular'
    , 'application/auth/tdpInvestAuthModule'
    , 'application/auth/controllers/tdpInvestLoginController'
    , 'application/auth/controllers/tdpInvestRegisterController'
], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                views: {
                    "@": {
                        templateUrl: "/js/application/auth/views/tdp-invest-login.html",
                        controller: "tdpInvestLoginController"
                    }
                }
            }).state("register", {
            url: "/register",
            views: {
                "@": {
                    templateUrl: "/js/application/auth/views/tdp-invest-register.html",
                    controller: "tdpInvestRegisterController"
                }
            }
        });
        $urlRouterProvider.otherwise("/login");
    });

    return tdpInvestAuthModule;
});
