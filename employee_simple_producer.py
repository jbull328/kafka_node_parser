from kafka import KafkaProducer, KafkaClient
from kafka.errors import KafkaError
# from confluent_kafka import avro
# from confluent_kafka.avro import AvroProducer
import csv
import pandas as pd

kafka = KafkaClient('localhost:9092')
producer = KafkaProducer(kafka)

topic = 'employees'

employee_data = pd.read_csv('MOCK_Employee_DATA.csv')

producer.send(employee_data)
