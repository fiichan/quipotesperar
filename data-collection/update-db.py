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

stmt = "UPDATE toilets SET category = %s, sub_category = %s WHERE address = %s"

source = pd.read_csv('raw-data/categories.csv', sep=",", quotechar='"', lineterminator='\n')
print(source)
for i, row in source.iterrows():
    data = row.to_list()
    # print(data)
    data.append(data[0])
    del data[0]
    data = tuple(data)
    print(data)
    cursor.execute(stmt, data)

cnx.commit()
cursor.close()
cnx.close()