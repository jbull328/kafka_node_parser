from __future__ import print_function
from datetime import date, datetime, timedelta
from kafka import KafkaConsumer

consumer = KafkaConsumer('employees')


for message in consumer:
    data_employee = ()
    print(message.key, message.value)

# Make sure data is committed to the database

KafkaConsumer(auto_offset_reset='earliest', enable_auto_commit=False)

KafkaConsumer(consumer_timeout_ms=1000)
