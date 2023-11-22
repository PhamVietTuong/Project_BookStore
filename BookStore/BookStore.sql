CREATE DATABASE BookStore

GO

USE BookStore

GO
-- CREATE TABLE
	--Author
CREATE TABLE Author (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id),
);

	--CATEGORY 
CREATE TABLE Category (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id),
);

	--PUBLISHER
CREATE TABLE Publisher (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id)
);

	-- BOOK
CREATE TABLE Book (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	PublisherId uniqueidentifier NOT NULL,
	AuthorId uniqueidentifier NOT NULL,
	CategoryId uniqueidentifier NOT NULL,
	Name varchar(50) NOT NULL,
	Quantity int NOT NULL,
	Description varchar(250) NOT NULL,
	Price float NOT NULL,
	Favourite bit NOT NULL,
	Star float NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (PublisherId) REFERENCES [Publisher](Id),
	FOREIGN KEY (AuthorId) REFERENCES [Author](Id),
	FOREIGN KEY (CategoryId) REFERENCES [Category](Id)
);

	--USERTYPE
CREATE TABLE UserType (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id)
);

	--USER
CREATE TABLE [User] (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	UserTypeId uniqueidentifier NOT NULL,
	FullName varchar(100) NOT NULL,
	UserName varchar(50) NOT NULL,
	Password varchar(50) NOT NULL,
	Address varchar(250) NOT NULL,
	Phone varchar(20) NOT NULL,
	Email varchar(100) NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (UserTypeId) REFERENCES [UserType](id)
);

	--CART
CREATE TABLE Cart (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	UserId uniqueidentifier NOT NULL,
	BookId uniqueidentifier NOT NULL,
	Quantity int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (UserId) REFERENCES [User](id),
	FOREIGN KEY (BookId) REFERENCES [Book](id)
);

	--PROMOTION
CREATE TABLE Promotion (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	DateFrom datetime NOT NULL,
	DateTo datetime NOT NULL,
	PromotionLevel float NOT NULL,
	reduce float NOT NULL,
	PRIMARY KEY (Id),
);
	--INVOICE
CREATE TABLE Invoice (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	UserTypeId uniqueidentifier NOT NULL,
	PromotionId uniqueidentifier NOT NULL, 
	Code varchar(255) NOT NULL,
	IssuedDate datetime NOT NULL,
	ShippingAddress varchar(50) NOT NULL,
	ShippingPhone varchar(50) NOT NULL,
	Total float NOT NULL,
	Status int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (UserTypeId) REFERENCES [UserType](id),
	FOREIGN KEY (PromotionId) REFERENCES [Promotion](id)
);

	--INVOICEDetail
CREATE TABLE InvoiceDetail (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	InvoiceId uniqueidentifier NOT NULL,
	BookId uniqueidentifier NOT NULL,
	UnitPrice float NOT NULL,
	Quantity int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (InvoiceId) REFERENCES [Invoice](id),
	FOREIGN KEY (BookId) REFERENCES [Book](id),
);

	--COMMENT
CREATE TABLE Comment (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	CommentId uniqueidentifier NOT NULL,
	BookId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	Content varchar(50) NOT NULL,
	Date datetime NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (CommentId) REFERENCES [comment](id),
	FOREIGN KEY (BookId) REFERENCES [Book](id),
	FOREIGN KEY (UserId) REFERENCES [User](id),
);

	--RATING
CREATE TABLE Rating (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	BookId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	RatingLevel int NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (BookId) REFERENCES [Book](id),
	FOREIGN KEY (UserId) REFERENCES [User](id)
);

	--IMAGE
CREATE TABLE Image (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	BookId uniqueidentifier NOT NULL,
	FilePDF varchar(100) NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (BookId) REFERENCES [Book](id),
);

	--SLIDESHOW
CREATE TABLE SlideShow (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	Name varchar(50) NOT NULL,
	UserId uniqueidentifier NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (UserId) REFERENCES [User](id),
);

	--REVIEW
CREATE TABLE Review (
	Id uniqueidentifier NOT NULL DEFAULT newid(),
	BookId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	Content varchar(255) NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (BookId) REFERENCES [Book](id),
	FOREIGN KEY (UserId) REFERENCES [User](id)
);