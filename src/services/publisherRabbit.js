import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBIT_EXCHANGE = "client_created";

export async function clientCreated(client) {
    try {
        const connection = await amqp.connect(process.env.RABBIT_HOST);
        const channel = await connection.createChannel();

        await channel.assertExchange(RABBIT_EXCHANGE, "topic", { durable: true });

        const message = JSON.stringify(client);
        channel.publish(RABBIT_EXCHANGE, "client.new", Buffer.from(message), { persistent: true });

        console.log("Mensaje enviado a RabbitMQ: ", message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error enviando mensaje a RabbitMQ:", error);
    }
}
