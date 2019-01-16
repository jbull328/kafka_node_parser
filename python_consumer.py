from kafka import KafkaConsumer

consumer = KafkaConsumer('test')

for message in consumer:
    print("key:%s value:%s" %
          (message.key, message.value))

KafkaConsumer(auto_offset_reset='earliest', enable_auto_commit=False)

KafkaConsumer(consimer_timeout_ms=1000)
