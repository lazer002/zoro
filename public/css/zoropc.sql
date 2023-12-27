-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 04:18 PM
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
(5, '1703086878372_2.mp4', 'BX600 NEWGEN', 'hyper-fast input with just 1.0mm actuation distance and smooth linear travel for top-tier\n            SOUND QUALITY', '/pc'),
(6, '1703087026618_11.mp4', 'GX460 Gaming Keyboard', 'Exclusive OPX optical-mechanical keyswitches for top-tier gaming performance', '/keyboard'),
(7, '1703087122827_33.mp4', 'RGB OMNIX OPX', 'with just 1.0mm actuation distance and smooth linear travel for top-tier gaming performance.', '/mouse'),
(8, '1703087184071_3_1.mp4', 'Super X Ultra', 'Exclusive ZORO OPX optical-mechanical keyswitches performance', '/pc');

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
(1, 'cra (1).jpg', 'NEW RS SUPER', 'first_carausal', 'PORTABLE. POWERFUL. PERFECTION', '/MOUSE'),
(2, 'cra (2).jpg', 'NEW ZORO LZZZR 16', 'first_carausal', 'Powerful CPU cooling with a customizable LCD screen..', '/KEYBOARD'),
(3, 'cra (3).jpg', 'NEW ZORO NOVA LIGHT', 'first_carausal', 'Ultra light. Hyper fast.', '/KEYBOARD'),
(4, 'cra (4).jpg', 'SONIC LIGHT', 'first_carausal', 'Ultra light. Hyper fast WITH AMAZING MACHANIC KEYS ', '/KEYBOARD'),
(5, 'cra (5).jpg', 'PORTABLE. POWERFUL. PERFECTION', 'second_carausal', 'Powerful CPU cooling with a customizable LCD screen..', '/LAPTOP'),
(6, 'cra (6).jpg', 'Ultra light. Hyper fast.', 'second_carausal', 'Ultra light. Hyper fast Gaming Pc.', '/PC'),
(7, 'cra (7).jpg', ' NEW CUSTOM CONTROLLER', 'second_carausal', ' NEW CUSTOM CONTROLLER WITH AMAZING MACHANIC KEYS ', '/CONTROLLER'),
(8, 'cra (8).jpg', 'SONIC LIGHT Pro', 'second_carausal', 'AMAZING MACHANIC KEYS  AMAZING RESPONSE', '/KEYBOARD');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_category` varchar(255) DEFAULT NULL,
  `product_quantity` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `cart_image` varchar(255) DEFAULT NULL,
  `cart_pname` varchar(255) DEFAULT NULL,
  `cart_pprice` varchar(255) DEFAULT NULL,
  `user_email` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `product_category`, `product_quantity`, `product_id`, `cart_image`, `cart_pname`, `cart_pprice`, `user_email`) VALUES
(1, 'PC', '13', 'product_650', '1702813957925_p1 (1).png', 'pc 1', '₹55\n        ', 'a'),
(2, 'PC', '', 'product_650', '1702813957925_p1 (1).png', 'pc 1', '₹55\n        ', 'b'),
(3, 'PC', '', 'product_832', '1702814054128_pc (7).png', 'pc7', '₹564\n        ', 'b'),
(4, 'PC', '5', 'product_832', '1702814054128_pc (7).png', 'pc7', '₹564\n        ', 'a');

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
(3, 'HEADPHONE', 'product_279', '1703414050487_hh11.png,1703414050488_hh12.png,1703414050489_hh13.png,1703414050490_hh14.png,1703414050493_hh15.png', 'Headphone', 'headpone deis', '500', '600');

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

--
-- Dumping data for table `keyboard`
--

INSERT INTO `keyboard` (`id`, `product_category`, `product_id`, `product_image`, `product_name`, `product_dis`, `product_price`, `orignal_price`) VALUES
(1, 'KEYBOARD', 'product_927', '1703414085799_7.webp,1703414085800_8.webp,1703414085801_10.webp,1703414085802_11.webp,1703414085802_12.webp', 'keyboard', 'keboard dis', '600', '500');

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
(2, 'LAPTOP', 'product_655', '1703414122631_8-removebg-preview (1).png,1703414122631_8-removebg-preview.png,1703414122633_9-removebg-preview.png,1703414122637_10-removebg-preview.png,1703414122638_18.webp.png', 'laptop', 'laptop dis', '600', '500');

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
(3, 'MOUSE', 'product_408', '1703414156331_mm3.png,1703414156331_mm4.webp.png,1703414156356_mm5.webp.png,1703414156357_mm6.webp.png,1703414156367_mm7.webp.png', 'mouse', 'mouse dis', '600', '500');

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
-- Table structure for table `product_banner`
--

CREATE TABLE `product_banner` (
  `id` int(11) NOT NULL,
  `product_category` varchar(222) NOT NULL,
  `product_banner` varchar(222) NOT NULL,
  `product_title` varchar(222) NOT NULL,
  `product_link` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_banner`
--

INSERT INTO `product_banner` (`id`, `product_category`, `product_banner`, `product_title`, `product_link`) VALUES
(1, 'PC', '1703354831726_bg-2.webp.png', 'PC 01', 'pc'),
(2, 'PC', '1703354869745_bg-4.webp.png', 'PC 03', 'pc'),
(3, 'PC', '1703354853994_bg-3.webp.png', 'PC 02', 'pc'),
(4, 'PC', '1703354881036_bg-5.webp.png', 'PC 04', 'pc'),
(5, 'LAPTOP', '1703354950504_bg-6.jpg', 'LAPTOP 06', 'LAPTOP'),
(6, 'LAPTOP', '1703354959374_bg-5.webp.png', 'LAPTOP 05', 'LAPTOP'),
(7, 'LAPTOP', '1703354963602_bg-4.webp.png', 'LAPTOP 01', 'LAPTOP'),
(8, 'LAPTOP', '1703354967446_bg-3.webp.png', 'LAPTOP 04', 'LAPTOP'),
(9, 'LAPTOP', '1703354971336_bg-2.webp.png', 'LAPTOP 02', 'LAPTOP'),
(10, 'LAPTOP', '1703354982079_bg1.jpg.png', 'LAPTOP 03', 'LAPTOP'),
(11, 'CONTROLLER', '1703355152793_4.jpg', 'CONTROLLER 01', 'CONTROLLER'),
(12, 'CONTROLLER', '1703355163317_3.jpg', 'CONTROLLER 02', 'CONTROLLER'),
(13, 'CONTROLLER', '1703355170500_2.jpg', 'CONTROLLER 03', 'CONTROLLER'),
(14, 'CONTROLLER', '1703355184488_1.jpg', 'CONTROLLER 04', 'CONTROLLER'),
(15, 'CONTROLLER', '1703355192905_111.png', 'CONTROLLER 05', 'CONTROLLER'),
(16, 'KEYBOARD', '1703355357704_BG-2.jpg', 'KEYBOARD 01', 'KEYBOARD'),
(17, 'KEYBOARD', '1703355365475_bg-3.webp.png.jpg', 'KEYBOARD 02', 'KEYBOARD'),
(18, 'KEYBOARD', '1703355373158_BG-4.jpg', 'KEYBOARD 03', 'KEYBOARD'),
(19, 'KEYBOARD', '1703355381396_BG-11.jpg', 'KEYBOARD 04', 'KEYBOARD'),
(20, 'HEADPHONE', '1703355406514_hbg4.jpg', 'HEADPHONE 01', 'HEADPHONE '),
(21, 'HEADPHONE', '1703355413659_hbg3.jpg', 'HEADPHONE 02', 'HEADPHONE '),
(22, 'HEADPHONE', '1703355420302_hbg1.jpg', 'HEADPHONE 03', 'HEADPHONE '),
(23, 'HEADPHONE', '1703355427297_hbg2.jpg', 'HEADPHONE 04', 'HEADPHONE '),
(24, 'MOUSE', '1703355472674_MBG1.jpg', 'MOUSE 04', 'MOUSE '),
(25, 'MOUSE', '1703355482241_mbg3.jpg', 'MOUSE 03', 'MOUSE '),
(26, 'MOUSE', '1703355491510_mbg2.jpg', 'MOUSE 02', 'MOUSE '),
(27, 'MOUSE', '1703355499264_mbg4.jpg', 'MOUSE 01', 'MOUSE ');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `user_email` varchar(222) NOT NULL,
  `user_pass` varchar(222) NOT NULL,
  `user_role` varchar(222) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`user_email`, `user_pass`, `user_role`) VALUES
('a', 'a', 'user'),
('lazer@gmail.com', 'lazer002', 'user'),
('lazer_admin@gmail.com', 'lazer_admin', 'admin');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

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
-- Indexes for table `product_banner`
--
ALTER TABLE `product_banner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category` (`product_category`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carausal_banner`
--
ALTER TABLE `carausal_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- AUTO_INCREMENT for table `headphone`
--
ALTER TABLE `headphone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `keyboard`
--
ALTER TABLE `keyboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `laptop`
--
ALTER TABLE `laptop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mouse`
--
ALTER TABLE `mouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pc`
--
ALTER TABLE `pc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_banner`
--
ALTER TABLE `product_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_category`) REFERENCES `category` (`product_category`);

--
-- Constraints for table `pc`
--
ALTER TABLE `pc`
  ADD CONSTRAINT `pc_ibfk_1` FOREIGN KEY (`product_category`) REFERENCES `category` (`product_category`);

--
-- Constraints for table `product_banner`
--
ALTER TABLE `product_banner`
  ADD CONSTRAINT `product_banner_ibfk_1` FOREIGN KEY (`product_category`) REFERENCES `category` (`product_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
