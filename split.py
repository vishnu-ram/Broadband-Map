import fiona

original = fiona.open("cb_2014_us_county_20m.shp")

filtered = filter(lambda x:x['properties']['STATEFP']=='15', original)

with fiona.open("hawaii.shp", 'w', driver=original.driver, crs=original.crs, schema=original.schema) as out:
	for item in filtered:
		out.write(item)	
