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

function renderCourses(course){
    return `
            <div class='card'>
            <img class='card-img' src="${course.img}">
            <div class='card-details'>
                <h2 class="card-title">${course.title}</h2>
                <p class="card-category">${course.category}</p>
                <p class="card-description">${course.description}</p>
            </div>
    `
}

function displayCourses(data){
    const results = data.items.map 
}

function handlePage(){
	createChart();
    displayCourses();
}
$(handlePage);