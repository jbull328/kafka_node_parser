from kafka import KafkaConsumer

consumer = KafkaConsumer('test', group_id='my_group',
                         bootstrap_servers=['localhost:9092'])

for message in consumer:
    print("%s:%d:%d: key:%s value:%s" %
          (message.topic, message.key, message.partition, message.offset, message.value))

KafkaConsumer(auto_offset_reset='earliest', enable_auto_commit=False)

KafkaConsumer(consimer_timeout_ms=1000)
