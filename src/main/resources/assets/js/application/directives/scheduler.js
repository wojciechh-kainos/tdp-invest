  define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('dhxScheduler', function() {
      return {
          restrict: 'A',
          scope: false,
          transclude: true,
          templateUrl: 'html/partials/scheduler.html',

          link:function ($scope, $element, $attrs, $controller){
            //default state of the scheduler
              if (!$scope.scheduler)
                $scope.scheduler = {};

            // 0 refers to Sunday, 6 - to Saturday
            scheduler.ignore_month = function(date){
                if (date.getDay() == 6 || date.getDay() == 0) //hides Saturdays and Sundays
                    return true;
            };

           scheduler.config.xml_date="%Y-%m-%d %H:%i";
           scheduler.config.first_hour = 8;
           scheduler.config.last_hour = 17;
           scheduler.config.start_on_monday = true;
              $scope.scheduler.mode = $scope.scheduler.mode || "week";
              $scope.scheduler.date = $scope.scheduler.date || new Date();


///////////////////////////////
              //watch data collection, reload on changes
              $scope.$watch($attrs.data, function(collection){
                scheduler.clearAll();
                scheduler.parse(collection, "json");
              }, true);

              //watch mode and date
              $scope.$watch(function(){
                return $scope.scheduler.mode + $scope.scheduler.date.toString();
              }, function(nv, ov) {
                var mode = scheduler.getState();
                if (nv.date != mode.date || nv.mode != mode.mode)
                  scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
              }, true);

              //size of scheduler
              $scope.$watch(function() {
                return $element[0].offsetWidth + "." + $element[0].offsetHeight;
              }, function() {
                scheduler.setCurrentView();
              });

              //styling for dhtmlx scheduler
              $element.addClass("dhx_cal_container");

              //init scheduler
              scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
          }
      };
    });
  });