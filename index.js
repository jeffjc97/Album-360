// {name: '', eye: {x: , y: }, edge: {x: , y: }}
var albums = [
	{artist: 'Chance the Rapper', album: '#10Day', name: '10day', eye: { x: -0.048 , y: 0.172 }, edge: { x: -0.044 , y: 1.0 , side: 1 }, perp: { slope: -0.0048309178744 , yint: 0.171768115942 }},
	{artist: 'Chance the Rapper', album: 'Coloring Book', name: 'coloringbook', eye: { x: 0.158203125 , y: -0.298828125 }, edge: { x: 0.453125 , y: -1.0 , side: 0 }, perp: { slope: 0.42061281337 , yint: -0.36537038649 }},
	{artist: 'Drake', album: 'Nothing Was the Same', name: 'nwts', eye: { x: -0.44 , y: -0.0506666666667 }, edge: { x: -1.0 , y: -0.0533333333333 , side: 0 }, perp: { slope: -210.0 , yint: -92.4506666667 }},
	{artist: 'Kid Cudi', album: 'Man on the Moon II', name: 'motm2', eye: { x: -0.032 , y: 0.212 }, edge: { x: -0.529333333333 , y: -1.0 , side: 0 }, perp: { slope: -0.410341034103 , yint: 0.198869086909 }},
	{artist: 'Kanye West', album: 'My Beautiful Dark Twisted Fantasy', name: 'mbdtf', eye: { x: -0.186666666667 , y: 0.151666666667 }, edge: { x: 1.0 , y: -0.323333333333 , side: 0 }, perp: { slope: 2.49824561404 , yint: 0.618005847953 }},
	{artist: 'Travis Scott', album: 'Rodeo', name: 'rodeo', eye: { x: 0.0946666666667 , y: 0.805333333333 }, edge: { x: 1.0 , y: 0.302666666667 , side: 0 }, perp: { slope: 1.80106100796 , yint: 0.634832891247 }},
	{artist: 'Jay-Z', album: 'The Blueprint', name: 'blueprint', eye: { x: -0.293333333333 , y: 0.505333333333 }, edge: { x: 0.216 , y: 1.0 , side: 1 }, perp: { slope: -1.02964959569 , yint: 0.203302785265 }},
	{artist: 'Bryson Tiller', album: 'Trapsoul', name: 'trapsoul', eye: { x: 0.514 , y: 0.64 }, edge: { x: 1.0 , y: 0.654 , side: 1 }, perp: { slope: -34.7142857143 , yint: 18.4831428571 }},
	{artist: 'Young Thug', album: 'Barter 6', name: 'barter6', eye: { x: -0.005 , y: 0.0766666666667 }, edge: { x: -0.00166666666667 , y: -1.0 , side: 0 }, perp: { slope: 0.0030959752322 , yint: 0.0766821465428 }},
	{artist: 'Kanye West', album: 'Graduation', name: 'graduation', eye: { x: -0.808 , y: 0.768 }, edge: { x: -1.0 , y: 1.0 , side: 1 }, perp: { slope: 0.827586206897 , yint: 1.43668965517 }},
	{artist: 'YG', album: 'My Krazy Life', name: 'mykrazylife', eye: { x: -0.008 , y: 0.376 }, edge: { x: 1.0 , y: 0.36 , side: 0 }, perp: { slope: 63.0 , yint: 0.88 }},
	{artist: 'Bas', album: 'Too High to Riot', name: 'toohightoriot', eye: { x: -0.53 , y: -0.00857142857143 }, edge: { x: -1.0 , y: 0.242857142857 , side: 1 }, perp: { slope: 1.86931818182 , yint: 0.982167207792 }},
	{artist: 'Public Enemy', album: 'It Takes a Nation of Millions to Hold Us Back', name: 'ittakesanation', eye: { x: -0.106 , y: 0.152 }, edge: { x: 1.0 , y: 0.462 , side: 1 }, perp: { slope: -3.56774193548 , yint: -0.226180645161 }},
	{artist: 'Common', album: 'Be', name: 'be', eye: { x: -0.04 , y: 0.347142857143 }, edge: { x: 1.0 , y: -0.122857142857 , side: 0 }, perp: { slope: 2.21276595745 , yint: 0.435653495441 }},
	{artist: 'Young Thug', album: 'Slime Season 3', name: 'ss3', eye: { x: -0.584285714286 , y: 0.251428571429 }, edge: { x: -1.0 , y: 0.382857142857 , side: 1 }, perp: { slope: 3.16304347826 , yint: 2.09954968944 }},
	{artist: 'Kanye West', album: 'Late Registration', name: 'lateregistration', eye: { x: -0.138 , y: -0.096 }, edge: { x: -1.0 , y: -0.132 , side: 0 }, perp: { slope: -23.9444444444 , yint: -3.40033333333 }}
];

var mute = false;

$(document).ready(function() {
	$('.close').click(function() {
		console.log("??")
		init();
	});
	$('#infoModal').modal('show');
});

function init() {
	$("#album-snippet")[0].play().catch(errorHandler);

	$(".play-music").click(function() {
		if (mute) {
			mute = false;
			$(this).css("color", "white");
		}
		else {
			mute = true;
			$(this).css("color", "red");
			$("#album-snippet")[0].pause();
		}
	});

	$("#album-img").mousemove(function(event) {
		offset = $("#album-img").offset();
		pointer = calcPixel(event.pageX - offset.left, event.pageY - offset.top);
		curclosest = $("#album-img").attr("src").substr(4, ($("#album-img").attr("src").length - 8));
		closest = {dist: 2, img: 'straightouttacompton.jpg'};
		if (Math.abs(pointer.x) < 0.2 && Math.abs(pointer.y) < 0.2) {
			closest = {name: "straightouttacompton", text: "N.W.A - Straight Outta Compton"};
		}
		else {
			albums.forEach(function(i) {
				distance = distToSegment(pointer, i.eye, i.edge);
				if (isOnSameSide(pointer, i) && distance < closest.dist) {
					closest = {dist: distance, name: i.name, text: i.artist + " - " + i.album};
				}
			});
		}
		if (closest.name != curclosest) {
			$("#album-img").attr("src", "img/" + closest.name + ".jpg");
			$("#album-text").text(closest.text);
			if (!mute) {
				$("#album-snippet")[0].pause();
				$("#album-snippet").attr("src", "music/" + closest.name + ".m4a");
				$("#album-snippet")[0].play().catch(errorHandler);
			}
		}
	});
}

// this seems really bad but the error isn't affecting anything
function errorHandler(error) {
	return;
}

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