-- Customers
CREATE TABLE customers (
    CustomerID SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Customer_Name VARCHAR(255) NOT NULL,
    Phone_No VARCHAR(15) NOT NULL UNIQUE,
    Address_ VARCHAR(255) NOT NULL,
	Pass_Word VARCHAR (255) NOT NULL
);
drop table customers
 SELECT dl.Loginvalue, dl.Pass_Word
FROM datalogincus dl

-- Admin Logins
CREATE TABLE dataloginadmin (
    admin_ID VARCHAR (255) PRIMARY KEY,
    Pass_Word VARCHAR (255) NOT NULL 
);

-- Customer Logins
CREATE TABLE datalogincus (
    LoginID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    LoginValue VARCHAR(255) NOT NULL UNIQUE,
    Pass_Word VARCHAR (255) NOT NULL,
    LoginType VARCHAR(10) NOT NULL CHECK (LoginType IN ('email', 'phone')), 
    FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID) 
);
drop table  datalogincus 
-- Books 
CREATE TABLE books (
    BookID VARCHAR(255) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock_Quantity INT NOT NULL,
    Sold_Quantity INT NOT NULL DEFAULT 0,
    Genre VARCHAR(255)
   
);

-- Orders 
CREATE TABLE orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    Order_Date DATE NOT NULL,
    Total_Price DECIMAL(10, 2) NOT NULL,
    Payment_Status VARCHAR(255) NOT NULL,
    Order_Status VARCHAR(255) NOT NULL, -- Add Order_Status
    Shipping_Address VARCHAR(255),
    FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID)
);

-- Order Items 
CREATE TABLE order_items (
    OrderItemID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    BookID VARCHAR(255) NOT NULL, -- Match BookID data type with 'books' table
    Quantity INT NOT NULL,
    Price_Per_Item DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES orders(OrderID),
    FOREIGN KEY (BookID) REFERENCES books(BookID)
);

select * from customers
select * from	datalogincus

ALTER TABLE logincredentials DROP CONSTRAINT logincredentials_userid_fkey;

ALTER TABLE customers ALTER COLUMN pass_word SET DEFAULT 'some_default_password';

CREATE TABLE images (
    ImageID SERIAL PRIMARY KEY,
    ImageName VARCHAR(255) NOT NULL,
    ImageData BYTEA NOT NULL -- Lưu trữ dữ liệu ảnh dưới dạng BLOB (Binary Large Object)
);