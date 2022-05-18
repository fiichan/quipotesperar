import mysql.connector as mysql
import pandas as pd
import json

meta_file = open('meta.json')
meta = json.load(meta_file)

cnx = mysql.connect(
    host="localhost",
    user="root",
    password="root",
    database="quipotesperar"
)
cursor = cnx.cursor()

fields_full = meta['required-fields']
field_csv = []
for field in fields_full: 
    field_csv.append(field['csv_field_name'])


stmt = "INSERT INTO toilets (lat, lon, category, address, name) VALUES (%s, %s, %s, %s, %s)"

for src in meta['data-sources']:
    source_file = pd.read_csv(src['file'])
    source = pd.DataFrame(source_file, columns=field_csv)
    null_ref = source.isna()

    for i, row in source.iterrows():
        house_num = " " + str(int(row['addresses_start_street_number'])) if not null_ref.at[i,'addresses_start_street_number'] else ""
        address = str(row['addresses_road_name']) + house_num
        data = (row['geo_epgs_4326_x'], row['geo_epgs_4326_y'], row['secondary_filters_name'], address, row['name'])
        cursor.execute(stmt, data)


cnx.commit()
cursor.close()
cnx.close()
