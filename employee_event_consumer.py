from kafka import KafkaConsumer
from kafka.errors import KafkaError
import json
from json import loads

consumer = KafkaConsumer('employees', bootstrap_servers=['localhost:9092'],
                         value_deserializer=lambda m:
                         loads(m).encode('utf-8'), api_version=(0, 10))


for message in consumer:
    message = message.value
    print(message)
