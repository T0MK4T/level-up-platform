let data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
let options = {

}

function createChart(){
	let myDoughnutChart = new Chart(
		$(".chart-js"),
			{type: 'doughnut',
	    	data: data,
	    	options: options
		});
}

function handlePage(){
	createChart();
}
$(handlePage);