// {name: '', eye: {x: , y: }, edge: {x: , y: }}
var albums = [
	{name: '10day.jpg', eye: { x: -0.048 , y: 0.172 }, edge: { x: -0.044 , y: 1.0 , side: 1 }, perp: { slope: -0.0048309178744 , yint: 0.171768115942 }},
	{name: 'coloringbook.jpeg', eye: { x: 0.158203125 , y: -0.298828125 }, edge: { x: 0.453125 , y: -1.0 , side: 0 }, perp: { slope: 0.42061281337 , yint: -0.36537038649 }},
	{name: 'nwts.jpg', eye: { x: -0.44 , y: -0.0506666666667 }, edge: { x: -1.0 , y: -0.0533333333333 , side: 0 }, perp: { slope: -210.0 , yint: -92.4506666667 }},
	{name: 'motm2.jpg', eye: { x: -0.032 , y: 0.212 }, edge: { x: -0.529333333333 , y: -1.0 , side: 0 }, perp: { slope: -0.410341034103 , yint: 0.198869086909 }},
	// {name: 'readytodie.jpg', eye: { x: 0.0333333333333 , y: 0.193333333333 }, edge: { x: 1.0 , y: -0.423333333333 , side: 0 }, perp: { slope: 1.56756756757 , yint: 0.141081081081 }},
	{name: 'mbdtf.jpg', eye: { x: -0.186666666667 , y: 0.151666666667 }, edge: { x: 1.0 , y: -0.323333333333 , side: 0 }, perp: { slope: 2.49824561404 , yint: 0.618005847953 }},
	{name: 'rodeo.jpg', eye: { x: 0.0946666666667 , y: 0.805333333333 }, edge: { x: 1.0 , y: 0.302666666667 , side: 0 }, perp: { slope: 1.80106100796 , yint: 0.634832891247 }},
	{name: 'blueprint.jpg', eye: { x: -0.293333333333 , y: 0.505333333333 }, edge: { x: 0.216 , y: 1.0 , side: 1 }, perp: { slope: -1.02964959569 , yint: 0.203302785265 }},
	{name: 'trapsoul.jpg', eye: { x: 0.514 , y: 0.64 }, edge: { x: 1.0 , y: 0.654 , side: 1 }, perp: { slope: -34.7142857143 , yint: 18.4831428571 }},
	{name: 'barter6.jpg', eye: { x: -0.005 , y: 0.0766666666667 }, edge: { x: -0.00166666666667 , y: -1.0 , side: 0 }, perp: { slope: 0.0030959752322 , yint: 0.0766821465428 }},
	{name: 'graduation.jpg', eye: { x: -0.808 , y: 0.768 }, edge: { x: -1.0 , y: 1.0 , side: 1 }, perp: { slope: 0.827586206897 , yint: 1.43668965517 }},
	{name: 'mykrazylife.jpg', eye: { x: -0.008 , y: 0.376 }, edge: { x: 1.0 , y: 0.36 , side: 0 }, perp: { slope: 63.0 , yint: 0.88 }},
	{name: 'toohightoriot.jpg', eye: { x: -0.53 , y: -0.00857142857143 }, edge: { x: -1.0 , y: 0.242857142857 , side: 1 }, perp: { slope: 1.86931818182 , yint: 0.982167207792 }}
];

$(document).ready(function() {
	$("#album-img").mousemove(function(event) {
		offset = $("#album-img").offset();
		pointer = calcPixel(event.pageX - offset.left, event.pageY - offset.top);
		closest = {dist: 2, img: 'acidrap.jpg'};
		if (Math.abs(pointer.x) < 0.2 && Math.abs(pointer.y) < 0.2) {
			$("#album-img").attr("src", "img/acidrap.jpg");
		}
		else {
			albums.forEach(function(i) {
				distance = distToSegment(pointer, i.eye, i.edge);
				if (isOnSameSide(pointer, i) && distance < closest.dist) {
					closest = {dist: distance, img: i.name};
				}
			});
			$("#album-img").attr("src", "img/" + closest.img);
		}
	});
});

// scale the pointer to -1, 1 coordinates
function calcPixel(xp, yp) {
	mid = Math.min($(window).height(), $(window).width()) / 2;
	return {x: (xp - mid) / mid, y: (mid - yp) / mid};
}

// lame name, but it needs to be between the eye and the edge, not on the other side of the line
function isOnSameSide(p, album) {
	side = p.y - album.perp.slope * p.x > album.perp.yint ? 1 : 0;
	return side == album.edge.side;
}

// http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function sqr(x) { return x * x; }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y); }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 === 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }