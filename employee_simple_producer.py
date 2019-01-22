from kafka import KafkaProducer, KafkaClient
from kafka.errors import KafkaError
from json import dumps
import csv
import pandas as pd


producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x:
                         dumps(x).encode('utf-8'), api_version=(0, 10))


topic = 'employees'

employee_data = pd.read_csv('MOCK_Employee_DATA.csv')
employee_data.insert(0, "event_id", "emp_chng_00")
employee_data_json = employee_data.to_json(
    orient='records', lines=True)

print(employee_data)

# producer.send(topic, key=employee_data, value=employee_data)
producer = KafkaProducer(
    value_serializer=lambda m: json.dumps(m).encode('ascii'))
producer.send(topic, {'key': 'value'})
metrics = producer.metrics()

print(metrics)
