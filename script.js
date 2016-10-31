//TODO

//vishnu: 
//tooltip on hover
//legend
//animations on hover (change opacity, outline county, stuff like that)
//add state layer **probably can't happen until later 
//styling maybe?

//kexin:
//search functionality -- make this smoother
//FIX zoom, click and drag, pan, etc 
//reduce svg file size / decrease load times/add UI for loading -- IMPORTANT
//make responsive for all screen widths ESPECIALLY MOBILE 
//crop out alaska's really small islands? 
//styling

var map = kartograph.map('#map');

map.loadMap('allv3.svg', function() {
	map.addLayer('countylayer');

	//outlines + colors
	map.getLayer('countylayer').style('stroke', '#6C7A89').style('stroke-opacity', 0.6).style('stroke-width', 0.7);
	colors();

	//tooltip on hover
	map.getLayer('countylayer', {
		tooltips: function(data) {
			return [data.county, 'Digital Divide: ' + data.ddi];
		}
	});

	//initPanZoom();

	resetZoom();
	map.paper.setSize('100%', '100%');	

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


//rewrite this!
//pan + zoom function
// function initPanZoom() {
// 	var panZoom = map.paper.panzoom();
// 	panZoom.enable()

//     setInterval(function() {
//     	$('h1').html(panZoom.currZoom +' x:'+panZoom.currPos.x.toFixed(0)+' y:'+panZoom.currPos.y.toFixed(0));
//     }, 50);
//     var css = '<style type="text/css">.grabbing { cursor: url(data:image/x-icon;base64,AAACAAEAICACAAcABQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAfwAAAP+AAAH/gAAB/8AAAH/AAAB/wAAA/0AAANsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gH///4B///8Af//+AD///AA///wAH//+AB///wAf//4AH//+AD///yT/////////////////////////////8=), pointer !important; } .map-controls div { cursor:pointer; font-size: 20px; color: #777; font-weight:bold; font-family: Helvetica; line-height: 28px; text-align:center;border: 1px solid #bbb; } .map-controls div:hover { border: 1px solid #999; color: #000; }</style>';
//     $('body').append(css);

//     // init pan zoom controls
//     var ctrls = $('<div />'), up = $('<div>+</div>'), down = $('<div>-</div>');
//     ctrls
//     	.addClass('map-controls')
//     	.css({ position: 'relative', top: -80, left: 30, 'z-index': 1000 })
//     	.append(up).append(down);
//     up.css({ 'border-radius': '14px 14px 0 0', width: 28, height: 28, position: 'absolute',
//     	top: 0, left: 0, background: '#fff' });
//    	down.css({ 'border-radius': '0 0 14px 14px', width: 28, height: 28, position: 'absolute',
//     	top: 29, left: 0, background: '#fff' })
//     $('#map').parent().append(ctrls);
//     up.click(function (e) {
//         panZoom.zoomIn(1);
//         e.preventDefault();
//     });
//     down.click(function (e) {
//         panZoom.zoomOut(1);
//         e.preventDefault();
//     });
// }

function resetZoom() {
	map.paper.setViewBox(0, 0, map.paper.width, map.paper.height);
}

$(document).ready(function() {
	//init search bar with choices
	$.getJSON("counties_list.json", function(d){
		//console.log(d);
		$('input.autocomplete').autocomplete({
			data: d
		});
	});

	//function triggered when search option is clicked
	//TO DO: add animation for zooming in?
	$(document).on('click', 'li', function(){
		var county = $(this).text().trim();
		var pathData = map.getLayer('countylayer').getPaths({'county': county});
		var id = pathData[0].svgPath.id;
		var coords = map.paper.getById(id).getBBox();
		//think about edge cases for this.. e.g. if county is by edge of map
		map.paper.setViewBox(coords['x']-2, coords['y']-2, coords['width']+4, coords['height']+4, true)
	})

	$('#search').blur(function() {
		if ($(this).val().trim() == '') {
			resetZoom();
		}
	});

	$('#search').keydown(function(e) {
		if (e.which == 13) {
			resetZoom();
		}
	})
})
