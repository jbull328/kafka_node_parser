from kafka import KafkaProducer, KafkaClient
from kafka.errors import KafkaError
from json import dumps
# from confluent_kafka import avro
# from confluent_kafka.avro import AvroProducer
import csv
import pandas as pd


producer = KafkaProducer(bootstrap_servers=['127.0.0.1:9092'])


topic = 'employees'

employee_data = pd.read_csv('MOCK_Employee_DATA.csv')

producer.send(topic, value=employee_data)

metrics = producer.metrics()
