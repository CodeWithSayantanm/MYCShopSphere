CREATE DATABASE IF NOT EXISTS order_service;
USE order_service;

-- Table: TBL_ORDERS
CREATE TABLE IF NOT EXISTS TBL_ORDERS (
    order_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the order
    user_id VARCHAR(255) NOT NULL,                   -- User key to the user placing the order
    order_date DATETIME NOT NULL,           -- Date and time when the order was placed
    status VARCHAR(50) NOT NULL,            -- Current status of the order (e.g., pending, shipped, delivered, cancelled, updated)
    total_amount DECIMAL(10,2) NOT NULL,    -- Total cost of the order
    shipping_address_id VARCHAR(255) NOT NULL, -- Shipping address id
    billing_address_id VARCHAR(255) NOT NULL,  -- Billing address id for the order
    payment_status VARCHAR(50) NOT NULL,    -- Payment status (e.g., pending, paid)
    effective_date DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_ORDER_ITEMS
CREATE TABLE IF NOT EXISTS TBL_ORDER_ITEMS (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES TBL_ORDERS(order_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_ORDER_PAYMENT
CREATE TABLE IF NOT EXISTS TBL_ORDER_PAYMENT (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date DATETIME NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES TBL_ORDERS(order_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_SHIPPING
CREATE TABLE IF NOT EXISTS TBL_SHIPPING (
    shipping_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_date DATETIME NOT NULL,
    delivery_date DATETIME NULL,
    shipping_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES TBL_ORDERS(order_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_CART
CREATE TABLE IF NOT EXISTS TBL_CART (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_CART_ITEMS
CREATE TABLE IF NOT EXISTS TBL_CART_ITEMS (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES TBL_CART(cart_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_WISHLIST
CREATE TABLE IF NOT EXISTS TBL_WISHLIST (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: TBL_WISHLIST_ITEMS
CREATE TABLE IF NOT EXISTS TBL_WISHLIST_ITEMS (
    wishlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
    wishlist_id INT NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES TBL_WISHLIST(wishlist_id)
);

