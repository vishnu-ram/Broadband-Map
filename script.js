var map = kartograph.map('#map');

map.loadMap('all_simplified.svg', function() {
	map.addLayer('countylayer');
});