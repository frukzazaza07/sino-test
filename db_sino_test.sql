-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2022 at 06:44 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sino_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CusID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Surname` varchar(100) NOT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CusID`, `Name`, `Surname`, `Status`, `created_at`, `updated_at`) VALUES
(1, 'test customer', 'customer1', 'Delete', '2022-12-04 19:33:06', '2022-12-04 19:33:11'),
(2, 'customer1 แก้ไข', 'custoer2', 'Active', '2022-12-04 19:33:20', '2022-12-04 19:33:25');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `Datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `UserID` int(11) NOT NULL,
  `Total_Price` decimal(16,2) NOT NULL,
  `CusID` int(11) DEFAULT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `ID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `CusID` int(11) DEFAULT NULL,
  `Price` decimal(16,2) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Total_Price` decimal(16,2) NOT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductID` int(11) NOT NULL,
  `Code` varchar(100) NOT NULL,
  `ProductName` varchar(100) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `Price` double(16,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductID`, `Code`, `ProductName`, `CategoryID`, `Status`, `Price`, `created_at`, `updated_at`) VALUES
(112, 'pro001111', 'testName23', 2, 'Delete', 1101.11, '2022-12-04 20:25:06', '2022-12-04 20:26:55'),
(113, 'pro-001', 'product name', 2, 'Active', 1000.21, '2022-12-04 20:27:04', '2022-12-04 20:27:04'),
(114, 'pro-002', 'productTest', 2, 'Active', 10000.50, '2022-12-04 21:31:51', '2022-12-04 21:31:51'),
(115, 'pro-003', 'productCate2', 3, 'Active', 50000.00, '2022-12-05 12:30:48', '2022-12-05 12:30:48');

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `CategoryID` int(11) NOT NULL,
  `Code` varchar(100) NOT NULL,
  `CategoryName` varchar(100) NOT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`CategoryID`, `Code`, `CategoryName`, `Status`, `created_at`, `updated_at`) VALUES
(1, 'c001แก้ไข', 'testแก้ไข', 'Delete', '2022-12-04 19:57:58', '2022-12-04 19:59:28'),
(2, 'c-011', 'test', 'Active', '2022-12-04 19:59:34', '2022-12-04 19:59:34'),
(3, 'c-o12', 'test2', 'Active', '2022-12-05 12:30:17', '2022-12-05 12:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Surname` varchar(100) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Status` enum('Active','Inactive','Delete') NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Surname`, `Username`, `Password`, `Status`, `created_at`, `updated_at`) VALUES
(1, 'ทดสอบ1', 'ทดสอบ1', 'bws_fluk', 'test4', 'Delete', '2022-12-04 13:39:59', '2022-12-04 18:49:15'),
(2, 'ทดสอบ1เปลี่ยนแปลง', 'ทดสอบ1', 'bws_fluk', 'test4', 'Active', '2022-12-04 13:40:29', '2022-12-04 19:12:48'),
(3, 'ทดสอบ1', 'ทดสอบ1', 'bws_fluk', 'test4', 'Active', '2022-12-04 13:40:38', '2022-12-04 13:40:38'),
(4, 'ทดสอบ1 แก้ไข', 'ทดสอบ1', 'bws_fluk', 'test4', 'Active', '2022-12-04 13:41:35', '2022-12-04 19:12:09'),
(5, 'test', 'test2', 'test3', 'test4', 'Delete', '2022-12-04 13:43:25', '2022-12-04 18:49:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CusID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
