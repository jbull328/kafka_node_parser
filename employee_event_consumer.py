from kafka import KafkaConsumer
from kafka.errors import KafkaError
import json

consumer = KafkaConsumer('employees', bootstrap_servers=['localhost:9092'])

KafkaConsumer(value_deserializer=lambda m: json.loads(m.decode('ascii')))

for message in consumer:
    print(message.value)
