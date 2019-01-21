from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql.connector
from kafka import KafkaConsumer

consumer = KafkaConsumer('employees')

cnx = mysql.connector.connect(
    user='root', database='employees', password='6jyYXlOD71*4Ug3m')
cursor = cnx.cursor()

for message in consumer:
    data_employee = ()
    print("key:%s value:%s" %
          (message.key, message.value))
    add_employee = ("INSERT INTO employees "
                    "(f_name, l_name, hire_date) "
                    "VALUES (%s, %s, %s)")
    cursor.execute(add_employee, data_employee)
    emp_no = cursor.lastrowid

# Make sure data is committed to the database
    cnx.commit()

KafkaConsumer(auto_offset_reset='earliest', enable_auto_commit=False)

KafkaConsumer(consumer_timeout_ms=1000)


tomorrow = datetime.now().date() + timedelta(days=1)


cursor.close()
cnx.close()
