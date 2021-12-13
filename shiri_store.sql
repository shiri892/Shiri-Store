-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2021 at 09:56 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shiri_store`
--
CREATE DATABASE IF NOT EXISTS `shiri_store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shiri_store`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `cart_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `cart_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`, `cart_date`) VALUES
(5, 123456777, '2021-10-17 11:56:28'),
(6, 123456789, '2021-10-19 10:53:51');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `cart_item_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  PRIMARY KEY (`cart_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `product_id`, `quantity`, `cart_id`) VALUES
(1, 18, 2, 1),
(2, 20, 1, 1),
(3, 28, 1, 1),
(4, 44, 1, 2),
(5, 48, 1, 2),
(6, 24, 1, 2),
(7, 26, 1, 2),
(8, 4, 1, 3),
(9, 9, 1, 3),
(10, 12, 1, 4),
(11, 26, 1, 4),
(12, 24, 1, 4),
(13, 5, 1, 4),
(14, 6, 1, 4),
(15, 5, 1, 5),
(16, 7, 1, 5),
(17, 4, 6, 5),
(18, 42, 1, 5),
(19, 41, 3, 5),
(20, 5, 1, 6),
(21, 103, 1, 6),
(22, 35, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
CREATE TABLE IF NOT EXISTS `categorys` (
  `category_id` int(10) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`category_id`, `category_name`) VALUES
(1, 'Fruits'),
(2, 'Vegetables'),
(3, 'Pastries'),
(4, 'Dairy'),
(5, 'Alcohol'),
(6, 'Soft-Drinks'),
(7, 'Ice-Creams');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `cart_id` int(10) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `received_city` varchar(20) NOT NULL,
  `received_adress` varchar(40) NOT NULL,
  `received_date` date NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `credit_card` int(4) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `cart_id`, `total_price`, `received_city`, `received_adress`, `received_date`, `order_date`, `credit_card`) VALUES
(1, 123456789, 124, '1747.90', 'haifa', 'qqq', '2021-11-03', '2021-10-13 10:13:06', 5555),
(2, 123456789, 129, '1747.90', 'rishon letsion', 'qqq', '2021-10-27', '2021-10-13 10:36:18', 1111),
(3, 123456789, 132, '1747.90', 'jerusalem', 'qqq', '2021-10-27', '2021-10-13 10:43:23', 1111),
(4, 123456789, 133, '16.20', 'haifa', 'qqq', '2021-10-27', '2021-10-13 12:17:06', 1111),
(5, 123456789, 136, '35.10', 'ashdod', 'qqq', '2021-11-04', '2021-10-16 12:49:29', 1111),
(6, 123456789, 1, '31.20', 'jerusalem', 'qqq', '2021-10-21', '2021-10-19 10:53:19', 1111);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(80) NOT NULL,
  `category_id` int(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(40) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category_id`, `price`, `img`) VALUES
(1, 'Melons', 1, '1.90', 'img-Melons.jpg'),
(2, 'Strawberries', 1, '12.90', 'img-Strawberries.jpg'),
(3, 'Bananas', 1, '2.90', 'img-Bananas.jpg'),
(4, 'White Cabbages', 2, '2.90', 'img-cabbage.jpg'),
(5, 'Rugelach Strawberry', 3, '5.90', 'img-Rugelach Strawberry.jpg'),
(6, 'Rugelach Chocolate', 3, '4.90', 'img-Rugelach Chocolate.jpg'),
(7, 'Rugelach Cinnamon', 3, '4.90', 'img-Rugelach Cinnamon.jpeg'),
(8, 'Butter Croissant', 3, '2.50', 'img-Butter Croissant.jpg'),
(9, 'Chocolate Croissant', 3, '3.90', 'img-Chocolate Croissant.JPG'),
(10, 'Vanilla Chocolate Croissant', 3, '5.90', 'img-Vanilla Chocolate Croissant.JPG'),
(11, 'Vanilla Croissant', 3, '3.90', 'img-Vanilla Croissant.jpeg'),
(12, 'Almond Croissant', 3, '6.50', 'img-Almond Croissant.jpg'),
(13, 'Purple Cabbages', 2, '3.90', 'img-Purple cabbage.jpg'),
(14, 'Tnuva Cottage 5 Percent', 4, '7.90', 'img-Tnuva Cottage 5 Percent.JPG'),
(15, 'Tnuva Cottage 9 Percent', 4, '7.90', 'img-Tnuva Cottage 9 Percent.JPG'),
(16, 'Halva Croissant', 3, '3.90', 'img-Halva Croissant.JPG'),
(17, 'Cheese Burekas', 3, '2.90', 'img-Cheese Burekas.JPG'),
(18, 'Tnuva Cottage 3 Percent', 4, '7.90', 'img-Tnuva Cottage 3 Percent.JPG'),
(19, 'Carrots', 2, '2.50', 'img-Carrot.jpg'),
(20, 'Burikits', 3, '3.50', 'img-Burikits.JPG'),
(21, 'Potato Burekas', 3, '2.50', 'img-Potato Burekas.JPG'),
(22, 'Mushrooms Burekas', 3, '4.90', 'img-Mushrooms Burekas.JPG'),
(23, 'Squashs', 2, '4.90', 'img-Squash.jpg'),
(24, 'Zucchinis', 2, '5.90', 'img-Zucchini.jpg'),
(25, 'Eggplants', 2, '7.90', 'img-Eggplant.jpg'),
(26, 'Tomatoes', 2, '1.90', 'img-Tomatoes.jpg'),
(27, 'Cucumbers', 2, '3.90', 'img-Cucumbers.jpg'),
(28, 'Butternut Squashs', 2, '11.90', 'img-Butternut Squashs.jpg'),
(29, 'Pumpkins', 2, '5.90', 'img-Pumpkins.jpg'),
(30, 'Beets', 2, '8.50', 'img-Beets.jpeg'),
(31, 'Onions', 2, '2.90', 'img-Onions.jpg'),
(32, 'Green Peppers', 2, '5.90', 'img-Green Peppers.jpg'),
(33, 'Red Peppers', 2, '4.90', 'img-Red Peppers.jpeg'),
(34, 'Pears', 1, '6.90', 'img-Pears.jpeg'),
(35, 'Green Grapes', 1, '3.90', 'img-Green Grapes.jpg'),
(36, 'Purple Grapes', 1, '4.90', 'img-Purple Grapes.jpg'),
(37, 'Watermelons', 1, '1.90', 'img-Watermelons.jpg'),
(38, 'Peaches', 1, '2.50', 'img-Peaches.jpg'),
(39, 'Nectarines', 1, '3.90', 'img-Nectarines.jpg'),
(40, 'Cherries', 1, '11.90', 'img-Cherries.jpg'),
(41, 'Pizza Burekas', 3, '4.90', 'img-Pizza Burekas.JPG'),
(42, 'Kashkabel Burekas', 3, '9.90', 'img-Kashkabel Burekas.JPG'),
(43, 'Spinach Burekas', 3, '7.90', 'img-Spinach Burekas.JPG'),
(44, 'Tnuva Cottage 1 Percent', 4, '7.90', 'img-Tnuva Cottage 1 Percent.JPG'),
(45, 'Tnuva Milk 3 Percent', 4, '11.90', 'img-Tnuva Milk 9 Percent.JPG'),
(46, 'Tnuva Milk 3.8 Percent', 4, '12.90', 'img-Tnuva Milk 3.8 Percent.jpg'),
(47, 'Tnuva Milk Vanila 1 Percent', 4, '11.90', 'img-Tnuva Milk Vanila 1 Percent.jpg'),
(48, 'Tnuva Milk for coffee 3 Percent ', 4, '13.90', 'img-Tnuva Milk for coffee 3 Percent.jpg'),
(49, 'Yotvata Mocha Milk 2 Percent ', 4, '9.90', 'img-Yotvata Mocha 2 Percent.jpg'),
(50, 'Yotvata Chocolate Milk 2 Percent', 4, '8.90', 'img-Yotvata Chocolate Milk 2 Percent.JPG'),
(51, 'Yotvata Bazuka Milk 2 Percent', 4, '12.90', 'img-Yotvata Bazuka Milk 2 Percent.JPG'),
(52, 'Yotvata Chocolate-Banana Milk 2 Percent', 4, '12.90', 'img-Yotvata Chocolate-Banana Milk.JPG'),
(53, 'Tara Banana Milk 2 Percent', 4, '11.90', 'img-Tara Banana Milk 2 Percent.jpeg'),
(54, 'Tara Chocolate Milk 2 Percent', 4, '9.90', 'img-Tara Chocolate Milk 2 Percent.jpeg'),
(55, 'Tara Vanila-Cookies Milk 1.5 Percent', 4, '12.90', 'img-Tara Vanila-Cookies Milk.jpeg'),
(56, 'Tnuva Cream Cheese 5 Percent', 4, '5.90', 'img-Tnuva Cream Cheese 5 Percent.jpg'),
(57, 'Tnuva Cream Cheese 3 Percent', 4, '5.90', 'img-Tnuva Cream Cheese 3 Percent.jpg'),
(58, 'Pireus Labane 9 Percent', 4, '9.90', 'img-Pireus Labane 9 Percent.jpg'),
(59, 'Jack Daniels Honey', 5, '99.90', 'img-Jack Daniels Honey.jpg'),
(60, 'Jack Daniels Classic', 5, '89.90', 'img-Jack Daniels Classic.jpg'),
(61, 'Grey Goose Vodka Classic', 5, '129.90', 'img-Grey Goose Vodka Classic.jpg'),
(62, 'Grey Goose Vodka Le Melon', 5, '139.90', 'img-Grey Goose Vodka Le Melon.jpg'),
(63, 'Grey Goose Vodka Strawberry ', 5, '139.90', 'img-Grey Goose Vodka Strawberry.jpg'),
(64, 'Grey Goose Vodka Le Citron', 5, '139.90', 'img-Grey Goose Vodka Le Citron.jpg'),
(65, 'Grey Goose Vodka Le Orenge', 5, '139.90', 'img-Grey Goose Vodka Le Orenge.jpeg'),
(66, 'Grey Goose Vodka Cherries Noir', 5, '139.90', 'img-Grey Goose Vodka Cherries Noir.jpg'),
(67, 'Van Gogh Vodka Blue', 5, '179.90', 'img-Van Gogh Vodka Blue.jpg'),
(68, 'Van Gogh Vodka Dutch Caramel ', 5, '129.90', 'img-Van Gogh Vodka Dutch Caramel.jpg'),
(69, 'Van Gogh Blueberry Acai Vodka ', 5, '129.90', 'img-Van Gogh Blueberry Acai Vodka.jpg'),
(70, 'Van Gogh Vodka Peanut Butter and Jelly ', 5, '129.90', 'img-Van Gogh Peanut Butter Jelly.jpg'),
(71, 'Van Gogh Vodka Double Espresso', 5, '129.90', 'img-Van Gogh Vodka Double Espresso.jpg'),
(72, 'Van Gogh Vodka Chocolate', 5, '129.90', 'img-Van Gogh Vodka Chocolate.jpg'),
(73, 'Van Gogh Vanilla Vodka', 5, '129.90', 'img-Van Gogh Vanilla Vodka.jpg'),
(74, 'Van Gogh Vodka Classic', 5, '99.90', 'img-Van Gogh Vodka Classic.jpeg'),
(75, 'Jagermeister', 5, '139.90', 'img-Jagermeister.jpg'),
(76, 'Sheridan', 5, '149.90', 'img-Sheridan.jpg'),
(77, 'Amaretto Disaronno', 5, '169.90', 'img-Amaretto Disaronno.jpg'),
(78, 'Chambord', 5, '229.90', 'img-Chambord.jpg'),
(79, 'Fireball', 5, '189.90', 'img-Fireball.jpg'),
(80, 'Aperol', 5, '89.90', 'img-Aperol.jpg'),
(81, 'Grant’s', 5, '89.90', 'img-Grant’s.jpg'),
(82, 'Persimmons', 1, '3.90', 'img-Persimmons.jpg'),
(83, 'Pinky Lady Apples', 1, '5.90', 'img-Pinky Lady Apples.jpg'),
(84, 'Green Apples', 1, '3.90', 'img-Green Apples.jpg'),
(85, 'Red Apples', 1, '3.90', 'img-Red Apples.jpg'),
(86, 'Orenge Peppers', 2, '5.90', 'img-Orenge Peppers.jpeg'),
(87, 'Celery', 2, '2.90', 'img-Celery.jpeg'),
(88, 'Cauliflower', 2, '3.90', 'img-Cauliflowers.jpg'),
(89, 'Brookley', 2, '3.90', 'img-Brookley.jpg'),
(90, 'Coca Cola Bottle', 6, '3.90', 'img-Coca Cola Bottle.jpg'),
(91, 'Coca Cola Ziro Bottle', 6, '3.90', 'img-Coca Cola Ziro Bottle.jpg'),
(92, 'Sprite Bottle', 6, '2.50', 'img-Sprite Bottle.jpg'),
(93, '7UP Bottle', 6, '7.90', 'img-7UP Bottle.jpg'),
(94, 'Fanta Bottle', 6, '6.50', 'img-Fanta Bottle.jpg'),
(95, 'Nestea Bottle', 6, '7.00', 'img-Nestea Bottle.png'),
(96, 'Nestea Lemon Bottle', 6, '7.50', 'img-Nestea Lemon Bottle.jpeg'),
(97, 'Rita Bottle', 6, '4.90', 'img-Rita Bottle.jpg'),
(98, 'Tropical Banana Bottle', 6, '11.90', 'img-Tropical Banana Bottle.png'),
(99, 'Crush Bottle', 6, '12.90', 'img-Crush Bottle.jpg'),
(100, 'Mirinda Bottle', 6, '8.00', 'img-Mirinda Bottle.jpg'),
(101, 'Saborsazo Mango Bottle', 6, '5.90', 'img-Saborsazo Mango Bottle.jpg'),
(102, 'Magnum Almond Brown Butter', 7, '12.90', 'img-Magnum Almond Brown Butter.jpg'),
(103, 'Magnum White Ice Cream', 7, '13.50', 'img-Magnum White Ice Cream.jpg'),
(104, 'Magnum Ice Cream Tub Classic', 7, '9.90', 'img-Magnum Ice Cream Tub Classic.jpg'),
(105, 'Magnum Mini Ruby Ice Cream Bars', 7, '24.90', 'img-Magnum Mini Ruby Ice Cream Bars.jpeg'),
(106, 'Magnum Gold', 7, '29.90', 'img-Magnum Gold.jpg'),
(107, 'Magnum Ice Cream Bars, Double Caramel', 7, '21.90', 'img-bsdhbd.jpg'),
(108, 'Straus Ice Cream', 7, '7.90', 'img-Straus Ice Cream.jpg'),
(109, 'Straus Cookies and Cream', 7, '8.50', 'img-gtrshb.jpg'),
(110, 'Straus Coffee Ice Cream', 7, '8.50', 'img-Straus Coffee Ice Cream.jpg'),
(111, 'Straus Straweberry Ice Cream', 7, '8.50', 'img-Straus Straweberry Ice Cream.jpg'),
(112, 'Classic Treat Ice Cream', 7, '13.90', 'img-xfbxd.jpg'),
(113, 'Classic Treat Cookie Dough Ice Cream', 7, '13.90', 'img-svgsd.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `t_z` int(9) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `password_hach` varchar(100) NOT NULL,
  `city` varchar(20) NOT NULL,
  `adress` varchar(40) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`t_z`)
) ENGINE=InnoDB AUTO_INCREMENT=963852742 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`t_z`, `first_name`, `last_name`, `mail`, `password_hach`, `city`, `adress`, `admin`) VALUES
(123456789, 'Shiri', 'Greenberg', 'a@a.a', '$2a$10$v4MeVsZ9AsAcl6J8EJY3g.Pvp/xys6PXjeuEGz3/GlmFHF08eChZG', 'jerusalem', 'qqq', 0),
(131313131, 'aa', 'bb', 'aa@gmail.com', '$2a$10$UZ56MvuGoaXSevBVP3hn.efp9nJNmAkE/QB0SWIOU//VRH33nRj0i', 'jerusalem', '160 hanurit', 0),
(222222222, 'Shiri', 'Greenberg', 'b@b.b', '$2a$10$R2/Pwpt1hKbX50POakZ/yO9vLTX9v6RjLQyaJ4V3fB7CfH3dpkV3u', 'jerusalem', 'qqq', 1),
(444444444, 'aaa', 'aaa', 'ahhk@jkjka.com', '$2a$10$kI7got1d3YsnvRnbJnJOd.QmHk9gjnlUn6aprQsllSOzPjzb6dj9a', 'beer sheva', 'qqq', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
