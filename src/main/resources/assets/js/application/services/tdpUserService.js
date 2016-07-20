define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.factory("tdpUserService", function(Restangular) {
        var login = function(user) {
            return Restangular.all('auth').customPOST(user, "login");
        };
        var register = function(user) {
            return Restangular.all('auth/register').post(user);
        }
        return {
            login: login,
            register: register
        };
    });
});