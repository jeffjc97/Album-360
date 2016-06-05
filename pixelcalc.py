def calc_pixel(dim, x, y):
	mid = float(dim) / 2
	x_calc = (x - mid) / mid
	y_calc = (mid - y) / mid
	return {'x': x_calc, 'y': y_calc}


# workaround for vertical up/down - change x coord by 1
def get_perp(eye, edge):
	perp_slope = -1 / (float(eye['y'] - edge['y']) / (eye['x'] - edge['x']))
	y_int = eye['y'] - perp_slope * eye['x']
	return {'perp_slope': perp_slope, 'y_int': y_int}


def get_sign_edge(edge, perp):
	return 1 if edge['y'] - perp['perp_slope'] * edge['x'] > 0 else 0


def album_stats(name, dim, eye_x, eye_y, edge_x, edge_y):
	scaled_eye = calc_pixel(dim, eye_x, eye_y)
	scaled_edge = calc_pixel(dim, edge_x, edge_y)
	perp = get_perp(scaled_eye, scaled_edge)
	print "{name: '" + name + "', eye: { x:", scaled_eye['x'], ", y:", scaled_eye['y'], "}, edge: { x:", scaled_edge['x'], ", y:", scaled_edge['y'], ", side:", get_sign_edge(scaled_edge, perp), "}, perp: { slope:", perp['perp_slope'], ", yint:", perp['y_int'], "}}"

# album_stats('10day.jpg', 500, 238, 207, 239, 0)
# album_stats('coloringbook.jpeg', 1024, 593, 665, 744, 1024)
# album_stats('nwts.jpg', 1500, 420, 788, 0, 790)
# album_stats('motm2.jpg', 1500, 726, 591, 353, 1500)
# album_stats('readytodie.jpg', 600, 310, 242, 600, 427)
# album_stats('mbdtf.jpg', 1200, 488, 509, 1200, 794)
# album_stats('rodeo.jpg', 1500, 821, 146, 1500, 523)
# album_stats('blueprint.jpg', 1500, 530, 371, 912, 0)
# album_stats('trapsoul.jpg', 1000, 757, 180, 1000, 173)
# album_stats('barter6.jpg', 1200, 597, 554, 599, 1200)
# album_stats('graduation.jpg', 1000, 96, 116, 0, 0)
# album_stats('mykrazylife.jpg', 1000, 496, 312, 1000, 320)
album_stats('toohightoriot.jpg', 1400, 329, 706, 0, 530)




