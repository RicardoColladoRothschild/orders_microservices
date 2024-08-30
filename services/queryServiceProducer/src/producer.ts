import {Client} from 'pg';
import amqp from 'amqplib';


const DATABASE_URL = process.env.DATABASE_URL || '';
const AMQP_URL = process.env.AMQP_URL || 'amqp://rabbitmq';


async function main(){
    /*
        POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin12344
    */
    const client = new Client({
        user: 'admin',
        host: 'postgres', 
        database: 'ordersdb',
        password: 'admin12344',
        port: 5432,
      });
    // const client = new Client({connectionString: DATABASE_URL});
    await client.connect();

        const connection = await amqp.connect(AMQP_URL);
        const channel = await connection.createChannel();
        const queue = 'ordersQueue';
        await channel.assertQueue(queue, {durable:true});

        client.on('notification', async(msg)=>{
            if(msg.channel === 'new_order'){
                console.log('Received notification from PostgreSQL:', msg.payload);
                const order = JSON.parse(msg.payload!);
                console.log('new order detected', order);
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {persistent:true});
            }
        });

        await client.query('Listen new_order');
        console.log('listening for new orders (this comes from producer)');
}
main().catch(console.error);