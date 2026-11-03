import ampqlib from 'amqplib';

const QUEUE = "auth_notification_queue";

// it will create a connection to the RabbitMQ server and create a channel for sending messages to the queue which is Auth this time
const connection = await ampqlib.connect(process.env.RABBITMQ_URL);

// create a channel for sending messages to the queue which is Auth this time
const channel = await connection.createChannel();

// create a queue for sending messages to the queue which is Auth this time.
channel.assertQueue(QUEUE, { durable: true }); // durable: until the queue is deleted, it will survive a RabbitMQ node restart

export default channel;