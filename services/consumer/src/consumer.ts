import amqp from 'amqplib';

const AMQP_URL = process.env.AMQP_URL || 'amqp://rabbitmq';

async function main(){
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();
    const queue = 'ordersQueue';

        await channel.assertQueue(queue, {durable:true});

        console.log('waiting for message in, ', queue);


        channel.consume(queue, (message)=>{
            if(message!==null){
                const order = JSON.parse(message.content.toString());
                console.log(order);
                console.log('processing order');
                channel.ack(message);
            }
        },{noAck:false});
}

main().catch(console.error);