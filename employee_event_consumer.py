from kafka import KafkaConsumer, KafkaClient
from kafka.errors import KafkaError

consumer = KafkaConsumer('employees', bootstrap_servers=['localhost:9092'])

for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    print("%s: key=%s value=%s" % (message.topic,
                                   message.key,
                                   message.value))
