const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		const exchange = 'ex_logs';

		ch.assertExchange(exchange, 'fanout', {durable: false});

		ch.assertQueue('', {exclusive: true}, (err, q) => {
			console.log(`[*] Waiting for messages in %s`, q.queue);

			ch.bindQueue(q.queue, exchange, '');

			ch.consume(q.queue, (msg) => {
				console.log(`[x] %s`, msg.content.toString());
			}, {noAck: true});
		});
	});
});