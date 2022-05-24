import mysql.connector as mysql
import csv
import pandas as pd

cnx = mysql.connect(
    host="localhost",
    user="root",
    password="root",
    database="quipotesperar"
)
cursor = cnx.cursor()

stmt = "UPDATE toilets SET name = %s, times = %s, price = %s, gender = %s, is_accessible = %s, is_cabin_toilet = %s, has_baby_changer = %s, has_hand_dryer = %s, has_sanitary_bin = %s, has_standup_aid = %s, has_handicapped_toilet = %s, has_sink = %s, has_sink_in_cabin = %s, has_soap_dispenser = %s, has_lock = %s, has_urinal = %s, out_of_order = %s, category = %s, notes = %s WHERE address = %s"

source = pd.read_csv('raw-data/test.csv', sep=";", quotechar='"', lineterminator='\n')
for i, row in source.iterrows():
    data = row.to_list()
    del data[2]
    data.append(data[0])
    del data[0]
    data = tuple(data)
    print(i)
    cursor.execute(stmt, data)

cnx.commit()
cursor.close()
cnx.close()