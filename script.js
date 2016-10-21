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

function colors() { 
	map.getLayer('countylayer').style('fill', function(data) {
		var ddi = parseInt(data.ddi);
		if (ddi >= 80) {
			return "#1a9641";
		} if (ddi >= 60) {
			return "#a6d96a";
		} if (ddi >= 40 ) {
			return "#ffffbf";
		} if (ddi >= 20 ) {
			return "#fdae61";
		}
		return "#d7191c";
	});
}