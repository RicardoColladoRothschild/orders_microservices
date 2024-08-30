CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (customer_name, product_name, quantity, price)
VALUES ('John Doe', 'Product A', 1, 19.99),
       ('Jane Smith', 'Product B', 2, 29.99);


-- following is a triger i create to notify the producer servicer anytime an insertion is made to orders table:
CREATE OR REPLACE FUNCTION notify_new_order()
RETURNS trigger AS $$
BEGIN
    PERFORM pg_notify(
        'new_order',
        json_build_object(
            'orderId', NEW.id,  
            'item', NEW.product_name, 
            'customer_Name', NEW.customer_name  
        )::text
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_order_trigger
AFTER INSERT ON "orders"   
FOR EACH ROW
EXECUTE FUNCTION notify_new_order();
