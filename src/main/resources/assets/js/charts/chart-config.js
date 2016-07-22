var chartConfig = {
    options: {
        lang:{
            noData: "No data uploaded"
        },
        chart: {
            zoomType: 'x'
        },
        rangeSelector: {
            inputEnabled: false
        },
        navigator: {
            enabled: true
        }
    },
    series: [
        {
            name: "Fund",
            data: [],
            tooltip: {
            valueDecimals: 2,
            valuePrefix: "$",
            xDateFormat: '%y-%m-%d'
            }
        },
        {
            name: "Fund",
            data: [],
            tooltip: {
                valueDecimals: 2,
                valuePrefix: "$",
                xDateFormat: '%y-%m-%d'
            }
        }],
    title: {
        text: 'Time series'
    },
    useHighStocks: true
};