var voteChannel = "ice_cream_flavor_votes"; // Channel for counting votes.

pubnub = new PubNub({ // Your PubNub keys here. Get them from https://dashboard.pubnub.com.
  publishKey : 'demo',
  subscribeKey : 'demo'
});

Highcharts.chart('chart-container', { // Build the chart.
    colors: ['#660000', '#DDAABB', '#D02129'],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'What\'s your favorite ice cream?'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Flavors',
        colorByPoint: true,
        data: [{
            name: 'Chocolate',
            y: 10
        }, {
            name: 'Vanilla',
            y: 8
        }, {
            name: 'Strawberry',
            y: 7
        }]
    }]
});

function publishVote(flavor) { // Publish a vote with PubNub.
    var publishConfig = {
        channel: voteChannel, 
        message: flavor // Send the flavor of the vote.
    };
    pubnub.publish(publishConfig, function(status, response) { // Publish message.
        console.log(status, response);
    });
};
