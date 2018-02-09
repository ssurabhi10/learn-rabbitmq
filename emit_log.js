const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		const exchange = 'ex_logs';

		const msg = process.argv.slice(2).join(' ') || 'Hello World!';

		ch.assertExchange(exchange, 'fanout', {durable: false});

		ch.publish(exchange, '', new Buffer(msg));

		console.log(`[x] Sent %s`, msg);
	});

	setTimeout(() => { conn.close(); process.exit(0) }, 3000);
});
