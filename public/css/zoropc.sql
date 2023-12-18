-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2023 at 06:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zoropc`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `main_banner` varchar(222) NOT NULL,
  `banner_title` varchar(222) NOT NULL,
  `banner_dis` varchar(222) NOT NULL,
  `banner_link` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `main_banner`, `banner_title`, `banner_dis`, `banner_link`) VALUES
(1, '1700933917699_videoplayback.3gpp', 'baner1', 'naer dis', 'link'),
(2, '1700936083056_videoplayback.3gpp', 'fwafwafwaf', 'fwafwafawf', 'fwafwafwafwa'),
(3, '1702053025345_12-2.jpg', 'n', 'dd', 'l'),
(4, '1702053064446_6-2.jpg', 'fw', 'fwaf', 'fwfa');

-- --------------------------------------------------------

--
-- Table structure for table `carausal_banner`
--

CREATE TABLE `carausal_banner` (
  `id` int(11) NOT NULL,
  `carausal_image` varchar(222) NOT NULL,
  `carausal_title` varchar(222) NOT NULL,
  `carausal_category` varchar(222) NOT NULL,
  `carausal_dis` varchar(222) NOT NULL,
  `carausal_link` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carausal_banner`
--

INSERT INTO `carausal_banner` (`id`, `carausal_image`, `carausal_title`, `carausal_category`, `carausal_dis`, `carausal_link`) VALUES
(1, '25890ed07b6465e5b25b849e8740a121', 'aaaaa', 'first_carausal', 'aaaaaaaaaaaaaaaaaaaa', 'a'),
(2, '83c3ebe93ed2473e5d0234b10d27f5e6', 'g', 'second_carausal', 'g', 'g'),
(3, 'a84b60f7c95dabb32d9e86e8bcd7f4f9', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(4, 'fabdc84bc22518e5fa1ad1b2eb1ad442', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(5, 'cb06c884a711f633fe49ab7071ba44ff', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(6, 'd359bfbbd985bb5629d44b81f2691783', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(7, '1a5d8d0815fb5ae6340ead706f9f9b9a', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(8, 'ee31f4718effe29c6584cb2c0c112bc5', 'fwaf', 'second_carausal', 'fwaf', 'fwafwaf'),
(9, 'abf74c81ebe43584a5764aa5cdd8de2e', 'faw', 'first_carausal', 'fwa', 'fwa');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'PC', 'product_650', '1702813957925_p1 (1).png,1702813957936_p1 (2).png,1702813957939_p1 (3).png,1702813957943_p1 (4).png,1702813957947_p1 (5).png', 'pc 1', '5', '55', '66'),
(2, 'PC', 'product_832', '1702814054128_pc (7).png,1702814054132_pc (8).png,1702814054151_pc (9).png,1702814054158_pc (10).png,1702814054164_pc (11).png,1702814054169_pc (12).png,1702814054177_pc (13).png', 'pc7', '7', '564', '646'),
(3, 'PC', 'product_315', '1702814054130_pc (7).png,1702814054152_pc (8).png,1702814054160_pc (9).png,1702814054165_pc (10).png,1702814054168_pc (11).png,1702814054176_pc (12).png,1702814054180_pc (13).png', 'pc7', '7', '564', '646'),
(4, 'PC', 'product_593', '1702814072571_pc (7).png,1702814072581_pc (8).png,1702814072584_pc (9).png,1702814072585_pc (10).png,1702814072586_pc (11).png,1702814072588_pc (12).png,1702814072591_pc (13).png', 'fwafwa', 'ffwafaw', 'fwaf', 'fwaf');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `product_category` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `sub_product_image` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`product_category`, `product_image`, `product_name`, `sub_product_image`) VALUES
('CONTROLLER', '1701597648009_CONTRO.jpg', 'CONTROLLER', '1701597648021_c.jpg'),
('HEADPHONE', '1701597616607_HEADPHONE.jpg', 'HEADPHONE', '1701597616614_HEADPHONE.jpg'),
('KEYBOARD', '1701597507403_keyboard.jpg', 'KEYBOARD', '1701597507424_k.jpg'),
('LAPTOP', '1701596228694_lappy.jpg', 'LAPTOP', '1701596228718_2.jpg'),
('MOUSE', '1701597462947_mouse1.jpg', 'MOUSE', '1701597462958_mu.jpg'),
('PC', '1701611869204_pc.jpg', 'PC', '1701611869205_2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `controller`
--

CREATE TABLE `controller` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `controller`
--

INSERT INTO `controller` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'CONTROLLER', 'product_414', '1702820636155_8.webp,1702820636156_10.webp,1702820636156_11.webp,1702820636157_12.webp,1702820636157_13.webp,1702820636158_14.webp,1702820636158_15.webp', 'fwaf', 'fawf', 'fwaf', 'fwafwaf');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_pro_pill`
--

CREATE TABLE `dashboard_pro_pill` (
  `id` int(11) NOT NULL,
  `product_banner` varchar(222) NOT NULL,
  `product_title` varchar(222) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_link` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `headphone`
--

CREATE TABLE `headphone` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `headphone`
--

INSERT INTO `headphone` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'LAPTOP', 'product_635', '1702051351990_1.jpg,1702051351994_2.jpg,1702051352001_6.22.jfif,1702051352002_6-2.jpg,1702051352005_12-1.jpg,1702051352038_12-2.jpg', 'hhhh', 'hhh', 'hhh', 'hhhh'),
(2, 'CONTROLLER', 'product_829', '1702820636150_8.webp,1702820636152_10.webp,1702820636152_11.webp,1702820636153_12.webp,1702820636153_13.webp,1702820636154_14.webp,1702820636154_15.webp', 'fwaf', 'fawf', 'fwaf', 'fwafwaf');

-- --------------------------------------------------------

--
-- Table structure for table `keyboard`
--

CREATE TABLE `keyboard` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laptop`
--

CREATE TABLE `laptop` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laptop`
--

INSERT INTO `laptop` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'PC', 'product_378', '1702812196380_p1-PhotoRoom.png-PhotoRoom.png,1702812196392_p2-PhotoRoom.png-PhotoRoom.png,1702812196417_p3-PhotoRoom.png-PhotoRoom.png,1702812196432_p4-PhotoRoom.png-PhotoRoom.png,1702812196451_p5-PhotoRoom.png-PhotoRoom.p', 'pc namne', 'dis', '1300', '15000');

-- --------------------------------------------------------

--
-- Table structure for table `mouse`
--

CREATE TABLE `mouse` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mouse`
--

INSERT INTO `mouse` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'PC', 'product_481', '1702812196385_p1-PhotoRoom.png-PhotoRoom.png,1702812196413_p2-PhotoRoom.png-PhotoRoom.png,1702812196425_p3-PhotoRoom.png-PhotoRoom.png,1702812196438_p4-PhotoRoom.png-PhotoRoom.png,1702812196465_p5-PhotoRoom.png-PhotoRoom.p', 'pc namne', 'dis', '1300', '15000'),
(2, 'PC', 'product_899', '1702814054129_pc (7).png,1702814054151_pc (8).png,1702814054159_pc (9).png,1702814054164_pc (10).png,1702814054168_pc (11).png,1702814054175_pc (12).png,1702814054179_pc (13).png', 'pc7', '7', '564', '646');

-- --------------------------------------------------------

--
-- Table structure for table `pc`
--

CREATE TABLE `pc` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_id` varchar(222) NOT NULL,
  `product_image` varchar(222) NOT NULL,
  `product_name` varchar(222) NOT NULL,
  `product_dis` varchar(222) NOT NULL,
  `product_price` varchar(222) NOT NULL,
  `orignal_price` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pc`
--

INSERT INTO `pc` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'PC', 'product_650', '1702813957925_p1 (1).png,1702813957936_p1 (2).png,1702813957939_p1 (3).png,1702813957943_p1 (4).png,1702813957947_p1 (5).png', 'pc 1', '5', '55', '66'),
(2, 'PC', 'product_832', '1702814054128_pc (7).png,1702814054132_pc (8).png,1702814054151_pc (9).png,1702814054158_pc (10).png,1702814054164_pc (11).png,1702814054169_pc (12).png,1702814054177_pc (13).png', 'pc7', '7', '564', '646'),
(3, 'PC', 'product_315', '1702814054130_pc (7).png,1702814054152_pc (8).png,1702814054160_pc (9).png,1702814054165_pc (10).png,1702814054168_pc (11).png,1702814054176_pc (12).png,1702814054180_pc (13).png', 'pc7', '7', '564', '646'),
(4, 'PC', 'product_593', '1702814072571_pc (7).png,1702814072581_pc (8).png,1702814072584_pc (9).png,1702814072585_pc (10).png,1702814072586_pc (11).png,1702814072588_pc (12).png,1702814072591_pc (13).png', 'fwafwa', 'ffwafaw', 'fwaf', 'fwaf');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `id` int(11) NOT NULL,
  `user_email` varchar(222) NOT NULL,
  `user_pass` varchar(222) NOT NULL,
  `user_role` varchar(222) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`id`, `user_email`, `user_pass`, `user_role`) VALUES
(1, 'lazer@gmail.com', 'lazer002', 'user'),
(2, 'lazer_admin@gmail.com', 'lazer_admin', 'admin'),
(3, 'a', 'a', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carausal_banner`
--
ALTER TABLE `carausal_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`product_category`);

--
-- Indexes for table `controller`
--
ALTER TABLE `controller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `dashboard_pro_pill`
--
ALTER TABLE `dashboard_pro_pill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headphone`
--
ALTER TABLE `headphone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `keyboard`
--
ALTER TABLE `keyboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `laptop`
--
ALTER TABLE `laptop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `mouse`
--
ALTER TABLE `mouse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `pc`
--
ALTER TABLE `pc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carausal_banner`
--
ALTER TABLE `carausal_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `controller`
--
ALTER TABLE `controller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dashboard_pro_pill`
--
ALTER TABLE `dashboard_pro_pill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `headphone`
--
ALTER TABLE `headphone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `keyboard`
--
ALTER TABLE `keyboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laptop`
--
ALTER TABLE `laptop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mouse`
--
ALTER TABLE `mouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pc`
--
ALTER TABLE `pc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `signup`
--
ALTER TABLE `signup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pc`
--
ALTER TABLE `pc`
  ADD CONSTRAINT `pc_ibfk_1` FOREIGN KEY (`product_category`) REFERENCES `category` (`product_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
