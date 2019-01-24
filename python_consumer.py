from __future__ import print_function
from datetime import date, datetime, timedelta
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer('employees')


for message in consumer:
    employee_data_message = json.loads(message.value)
    print(employee_data_message)

# Make sure data is committed to the database

KafkaConsumer(auto_offset_reset='earliest', enable_auto_commit=False)

KafkaConsumer(consumer_timeout_ms=1000)
