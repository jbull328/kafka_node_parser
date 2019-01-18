from kafka import KafkaProducer, KafkaClient
from kafka.errors import KafkaError
from json import dumps
# from confluent_kafka import avro
# from confluent_kafka.avro import AvroProducer
import csv
import pandas as pd


producer = KafkaProducer(
    bootstrap_servers='localhost:9092', value_serializer=str.encode, api_version=(0, 10))


topic = 'employees'

employee_data = pd.read_csv('MOCK_Employee_DATA.csv').to_json(
    orient='records', lines=True)
print(employee_data)

producer.send(topic, value=employee_data)

metrics = producer.metrics()

print(metrics)
