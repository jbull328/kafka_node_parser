from kafka import KafkaConsumer
from kafka.errors import KafkaError
import json
from json import dumps
import threading
import logging
import time


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest',
                                 value_deserializer=lambda m: json.dumps(m.decode('utf-8')))
        consumer.poll(['employees'])
        for message in consumer:
            print(message)
            if message.value == "event_id":
                print("its a message")


def main():
    threads = [
        Consumer()
    ]
    for t in threads:
        t.start()
    time.sleep(10)


if __name__ == "__main__":
    logging.basicConfig(
        format='%(asctime)s.%(msecs)s:%(name)s:%(thread)d:' +
               '%(levelname)s:%(process)d:%(message)s',
        level=logging.INFO
    )
    main()
