-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2023 at 08:41 PM
-- Server version: 10.5.15-MariaDB-0+deb11u1-log
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs-queue`
--

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `floor` int(11) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `in_queue` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  `maximum` int(11) NOT NULL,
  `open` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `floor`, `activity`, `in_queue`, `status`, `image_path`, `duration`, `last_updated`, `maximum`, `open`) VALUES
(1, 'CSB201', 2, 'IoT Ghost House', 20, 0, 'img/detectiveIOT.jpg', 5, '2023-08-31 05:39:59', 5, 0),
(2, 'CSB202', 2, 'VR showcase Midnight', 6, 0, 'img/ghostvr.jpg', 15, '2023-08-31 03:42:40', 12, 0),
(3, 'CSB203', 2, 'VR showcase ดูดาว', 0, 0, 'img/vrstars.jpg', 15, '2023-08-31 04:39:13', 10, 0),
(4, 'CSB210', 2, 'VR showcase Game VR', 0, 0, 'img/vrshowcase.jpg', 15, '2023-08-31 03:47:04', 4, 0),
(5, 'CSB207', 2, 'CS Museum', 5, 0, 'img/museum.jpg', 10, '2023-08-31 04:51:36', 30, 0),
(6, 'CSB308', 3, 'Vocab Game', 11, 0, 'img/vocab.jpg', 15, '2023-08-31 04:39:17', 32, 0),
(10, 'CSB309', 3, 'PTT Showcase', 0, 0, 'img/ptttgif.jpg', 10, '2023-08-31 04:29:26', 20, 0),
(13, 'CSB307', 3, 'eSport Game / Cast', 0, 0, 'img/CompetitiveGaming.jpg', 40, NULL, 40, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
