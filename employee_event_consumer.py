from kafka import KafkaConsumer
from kafka.errors import KafkaError
import json
from json import loads
import threading
import logging
import time


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest',
                                 value_deserializer=lambda m: json.loads(m.decode('utf-8')))
        consumer.subscribe(['employees'])
        for message in consumer:
            # print(message)
            if message.key == "event_id":
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
