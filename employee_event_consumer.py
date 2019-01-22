from kafka import KafkaConsumer
from kafka.errors import KafkaError
import json
from json import dumps

consumer = KafkaConsumer('employees', bootstrap_servers=['localhost:9092'],
                         value_deserializer=lambda m:
                         dumps(m).encode('utf-8'), api_version=(0, 10))


consumer = KafkaConsumer(
    value_deserializer=lambda m: json.dumps(m).encode('ascii')).fetch_messages()

print(consumer.messages)
