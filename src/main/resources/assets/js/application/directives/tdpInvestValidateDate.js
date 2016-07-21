define(['angular', 'application/tdpInvestModule', 'ngModule'], function (angular, tdpInvestModule, ngModule) {
    tdpInvestModule.directive("validateDate", function () {
        return {
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.validateDate = function (value) {
                    var status = false;

                    var first = new Date(attrs.min).setHours(0);
                    var last = new Date(attrs.max).setHours(0);
                    var actual = new Date(value);

                    if (actual >= first && actual <= last) {
                        status = true;
                    }

                    return status;
                };
            }
        }
    });
});
