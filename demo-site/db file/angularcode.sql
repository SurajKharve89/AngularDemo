-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2016 at 09:17 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angularcode`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getusers` (IN `getid` INT)  if getid != '' then
       SELECT *  FROM customers_auth WHERE uid = getid;
else 
       SELECT *  FROM customers_auth;
end if$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers_auth`
--

CREATE TABLE `customers_auth` (
  `uid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profile_pic` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers_auth`
--

INSERT INTO `customers_auth` (`uid`, `name`, `email`, `phone`, `password`, `profile_pic`, `address`, `city`, `created`, `modified`) VALUES
(179, 'Suraj Kharve', 'kharve.suraj@gmail.com', '9881168489', '$2a$10$36ade8de76ae00fce374fucBNCL.ud.YcK3rryq0QzRdTcuMxYITi', '', 'Nagpur', '', '2016-03-21 11:28:35', '0000-00-00 00:00:00'),
(386, 'Suraj Kharve', 'suraj@giftechnologies.com', '', '3dcaf5d0dc19ae0cb4820cf3593f8e147ba0b8e4', 'Koala-386.jpg', '', '', '2016-04-07 06:18:38', '2016-05-27 13:36:04'),
(388, 'Swapnil', 'swap@gmail.com', '', '1787f50069c362ec8de140b90ae1a80533f09ba6', 'Penguins-388.jpg', '', '', '2016-05-11 04:12:08', '2016-05-27 14:12:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers_auth`
--
ALTER TABLE `customers_auth`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers_auth`
--
ALTER TABLE `customers_auth`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=389;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
