define([],
	function(){
        var data = [{
          date:885423600000,
          id:1,
          value: 99.86}, {
          date:885510000000,
          id:2,
          value: 99.86}, {
          date:885769200000,
          id:3,
          value: 99.80}, {
          date:885855600000,
          id:4,
          value: 99.46}, {
          date:885942000000,
          id:5,
          value: 100.46}, {
          date:886028400000,
          id:6,
          value: 101.46}
        ];

		var getData = function() {
		  return data;
		};

		var getDataWithinRange = function() {
          return data.slice(1, 4);
        };

        var stubUnitData = {
          getData: getData,
          getDataWithinRange: getDataWithinRange
        };

        return stubUnitData;

	}
);