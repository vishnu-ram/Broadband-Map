var map = kartograph.map('#map');

map.loadMap('allv3.svg', function() {
	map.addLayer('countylayer');

	//outlines + colors
	map.getLayer('countylayer').style('stroke', '#6C7A89').style('stroke-opacity', 0.6);
	colors();

	//TODO
	//tooltip on hover
	//legend
	//zoom, click and drag, pan, etc
	//animations on hover (change opacity, outline county, stuff like that)
	//search functionality
	//loading icon before map comes up?

});

//colors assinged by quartiles 
function colors() { 
	map.getLayer('countylayer').style('fill', function(data) {
		var ddi = parseFloat(data.ddi);
		if (ddi <= 38.12357875) { //1st quartile
			return "#fef0d9";
		} else if (ddi <= 50.8602104) {
			return "#fdcc8a";
		} else if (ddi <= 64.03133336 ) {
			return "#fc8d59";
		} else { //4th quartile
			return "#d7301f";
		}
	});
}
