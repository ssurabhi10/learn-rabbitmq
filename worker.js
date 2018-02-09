const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		const q = 'task_queue';

		ch.assertQueue(q, { durable: true });

		ch.prefetch(1);

		console.log(`[*] Waiting for messages in %s`, q);

		ch.consume(q, (msg) => {
			const secs = msg.content.toString().split('.').length - 1;

			console.log(`[*] Received %s`, msg.content.toString());

			setTimeout(() => {
				console.log(`[x] Done`);
				ch.ack(msg);
			}, secs * 1000);

		}, { noAck: false });
	});
});

