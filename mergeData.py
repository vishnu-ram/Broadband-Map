import csv, shapefile

#read data into dictionary format
with open("us2014.csv") as f:
	reader = csv.reader(f)
	data = {row[0]: [float(row[7]), float(row[12]), float(row[13])] for row in reader if row[0] != 'FIPS'}
	#SE, INFA, DDI scores

sf = shapefile.Reader("Nation_Template/Nation_Template.shp")
w = shapefile.Writer()
w.fields = list(sf.fields)

w.field("SE", 'F', 5, 3)
w.field("INFA", 'F', 5, 3)
w.field("DDI", 'F', 5, 3)

print 'looping through records'
for record in sf.records():
	fips = record[0]
	try:
		info = data[fips]
	except Exception, e:
		print str(e)
		record.extend([0, 0, 0])
		w.records.append(record)
	else:
		record.extend(info)
		w.records.append(record)

w._shapes.extend(sf.shapes())
w.save("Nation_edited")
