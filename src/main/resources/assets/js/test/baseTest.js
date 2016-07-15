define(['angular', 'angularMocks',  'application/controllers/tdpInvestDateController', 'ui-bootstrap'], function(angular) {

    describe('tdpInvestDateController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        var id = 4;

        describe('Test createDateFunction()', function() {
                    it('true should pass', function() {
                        var $scope = {};
                        var controller = $controller('tdpInvestDateController', { $scope: $scope });

                        $scope.dates = [
                            {
                                p : '2016-01-01',
                                k : '2016-02-01'
                            },

                             {
                                 p : '2016-06-01',
                                 k : '2016-08-01'
                             },
                             {
                                 p : '2016-03-01',
                                 k : '2016-04-01'
                             },
                             {
                                 p : '2016-09-05',
                                 k : '2016-09-20'
                             }
                        ];

                        $scope.start_date = '2015-08-13';
                        $scope.end_date = '2017-01-21';

                        var data = $scope.createDateRequest($scope.dates, $scope.start_date, $scope.end_date);
                        var expectDates = [
                            {
                                p : '2015-08-13',
                                k : '2017-01-21'
                            }
                        ];
                        var expectRequests = [
                            {
                                p : '2015-08-13',
                                k : '2016-01-01'
                            },
                            {
                                p : '2016-04-01',
                                k : '2016-06-01'
                            },
                            {
                                p : '2016-08-01',
                                k : '2016-09-01'
                            },
                            {
                                p : '2016-09-20',
                                k : '2017-01-21'
                            }
                        ];

                        expect(data).toEqual({dates : expectDates, requests : expectRequests});
                     });
        });
        });



});

