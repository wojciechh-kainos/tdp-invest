define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('UserService', ['$cookieStore','$http',function($cookieStore, $http) {
        this.user = {};

        this.storeToSession = function() {
            $cookieStore.put('userHeader', this.user.header);
        };

        this.loadFromSession = function() {
            var userHeader = $cookieStore.get('userHeader');
            if ( userHeader ) {
                this.loadCurrentUser(userHeader);
            }
        };

        this.loadCurrentUser = function(loadCurrentUser) {
            /* $http get to load user info with given header */
        };

        this.login = function(email, password, ctrl) {
            var userIn = {
                username: username,
                password: password
            }
            var that = this;
            $http.post('./login', userIn).success(function(data) {
                if (data.success === true) {
                    that.user.username = userIn.username;
                    that.user.header = btoa(userIn.username + ':' + userIn.password);
                    ctrl.errorMessage = '';
                    that.storeToSession();
                } else {
                    /* show error and logout user */
                }
            }).error(function(arg) {
                /* show error and logout user */
            });
        }

        this.logout = function() {
            this.user = {};
            this.storeToSession();
        }

        this.loadFromSession();
    }])
});
