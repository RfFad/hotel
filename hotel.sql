-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 30, 2024 at 09:27 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_shifts`
--

CREATE TABLE `employee_shifts` (
  `id` varchar(100) NOT NULL,
  `nama_shifts` varchar(100) NOT NULL,
  `jam_awal` time NOT NULL,
  `jam_akhir` time NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_shifts`
--

INSERT INTO `employee_shifts` (`id`, `nama_shifts`, `jam_awal`, `jam_akhir`, `status`) VALUES
('7fc814fd-7efc-11ef-9e18-bcde251b1a2f', 'SORE', '12:00:00', '12:00:00', 1),
('8b469cb9-7efc-11ef-9e18-bcde251b1a2f', 'PAGI', '12:44:00', '19:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_status`
--

CREATE TABLE `employee_status` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nama_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_status`
--

INSERT INTO `employee_status` (`id`, `nama_status`, `status`) VALUES
('245bda39-7e0f-11ef-b9cf-b06ebf1bb0fa', 'Kontrak', 1),
('9b7daa16-7e11-11ef-b9cf-b06ebf1bb0fa', 'Magang', 1),
('a517d719-7e11-11ef-b9cf-b06ebf1bb0fa', 'Owner', 1),
('b3b5dfdd-7e11-11ef-b9cf-b06ebf1bb0fa', 'NEW', 1),
('dcbdf14c-7e0e-11ef-b9cf-b06ebf1bb0fa', 'Tetap', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_type`
--

CREATE TABLE `employee_type` (
  `id` varchar(225) NOT NULL,
  `nama_type` varchar(225) NOT NULL,
  `status` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_type`
--

INSERT INTO `employee_type` (`id`, `nama_type`, `status`) VALUES
('6b8e2f48-7f0d-11ef-84f7-b06ebf1bb0fa', 'MANAGER', '1'),
('9e0c8bfe-7f0d-11ef-84f7-b06ebf1bb0fa', 'FRONT OFFICE', '1'),
('ad506988-7f0d-11ef-84f7-b06ebf1bb0fa', 'SECURITY', '1');

-- --------------------------------------------------------

--
-- Table structure for table `extracharge`
--

CREATE TABLE `extracharge` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_extragroup` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `extracharge_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_persen` int NOT NULL DEFAULT '0',
  `price` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extracharge_group`
--

CREATE TABLE `extracharge_group` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `extracharge_group` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `outlet_posting` int NOT NULL DEFAULT '1',
  `income_group` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parameter_qty` int NOT NULL DEFAULT '1',
  `pos_mobile` int NOT NULL DEFAULT '1',
  `pajak` int NOT NULL DEFAULT '1',
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `extracharge_group`
--

INSERT INTO `extracharge_group` (`id`, `extracharge_group`, `outlet_posting`, `income_group`, `parameter_qty`, `pos_mobile`, `pajak`, `status`) VALUES
('4069e3ab-7ca3-11ef-9c5c-b06ebf1bb0fa', 'EXTRA BED', 1, 'PENDAPATAN KAMAR', 1, 0, 0, 1),
('bbd12914-7ca7-11ef-9c5c-b06ebf1bb0fa', 'LAUNDRY', 0, 'PENDAPATAN LAUNDRY', 1, 1, 1, 1),
('cb6c7188-7d4f-11ef-b889-b06ebf1bb0fa', 'RESTO', 1, 'PENDAPATAN RESTO', 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `floor`
--

CREATE TABLE `floor` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_floor` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `floor`
--

INSERT INTO `floor` (`id`, `nama_floor`, `status`) VALUES
('246f453a-6e63-11ef-97b6-ce50eb0f5b9e', '1st Floor', 1),
('300de2bc-6e63-11ef-97b6-ce50eb0f5b9e', '2nd Floor', 0),
('3584f82b-6e63-11ef-97b6-ce50eb0f5b9e', '7rd Floor', 0),
('3cf81960-6e63-11ef-97b6-ce50eb0f5b9e', '4th Floor', 1),
('3fdd3af4-6e63-11ef-97b6-ce50eb0f5b9e', '5th Floor', 1),
('8055ae17-6e63-11ef-97b6-ce50eb0f5b9e', '6th Floor', 1),
('b563955a-795f-11ef-81f5-b06ebf1bb0fa', '8rd Floor', 1),
('bc26c263-7beb-11ef-bf99-b06ebf1bb0fa', '9th Floor', 1),
('c8c62cf0-7beb-11ef-bf99-b06ebf1bb0fa', '10nd Floor', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ratetype`
--

CREATE TABLE `ratetype` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `keterangan` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hari` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratetype`
--

INSERT INTO `ratetype` (`id`, `keterangan`, `hari`) VALUES
('weekday', 'Weekday', '{\"0\":0,\"1\":1,\"2\":1,\"3\":1,\"4\":1,\"5\":1,\"6\":0}'),
('weekend', 'Weekend', '{\"0\":1,\"5\":0,\"6\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `rate_breakdown`
--

CREATE TABLE `rate_breakdown` (
  `id` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nama_b` varchar(225) NOT NULL,
  `kategori_p` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rate_breakdown`
--

INSERT INTO `rate_breakdown` (`id`, `nama_b`, `kategori_p`) VALUES
('1', 'Breakfast', 'Pendapatan Resto');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_floor` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `room_number` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `id_floor`, `id_type`, `room_number`, `status`) VALUES
('0594d74f-7d4f-11ef-b889-b06ebf1bb0fa', '8055ae17-6e63-11ef-97b6-ce50eb0f5b9e', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', '003', 1),
('22188e5e-6e83-11ef-97b6-ce50eb0f5b9e', '246f453a-6e63-11ef-97b6-ce50eb0f5b9e', '31326b98-6e67-11ef-97b6-ce50eb0f5b9e', '001', 0),
('35aa33de-6e83-11ef-97b6-ce50eb0f5b9e', '246f453a-6e63-11ef-97b6-ce50eb0f5b9e', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', '003', 1),
('3b2e8829-7bec-11ef-bf99-b06ebf1bb0fa', '3584f82b-6e63-11ef-97b6-ce50eb0f5b9e', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', '002', 1),
('689e302f-7bec-11ef-bf99-b06ebf1bb0fa', '3cf81960-6e63-11ef-97b6-ce50eb0f5b9e', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', '004', 1),
('fdcb0b2d-7d4e-11ef-b889-b06ebf1bb0fa', 'c8c62cf0-7beb-11ef-bf99-b06ebf1bb0fa', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', '002', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_plan`
--

CREATE TABLE `room_plan` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_plan` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jml` int DEFAULT '1',
  `jenis` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_plan`
--

INSERT INTO `room_plan` (`id`, `nama_plan`, `jml`, `jenis`, `status`) VALUES
('c4ca4238a0b923820dcc509a6f75849b', 'RARE RATE', 2, 'MONTH', 1),
('c84ec979-6eff-11ef-97b6-ce50eb0f5b9e', 'NORMAL RATE', 1, 'DAYS', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_rates`
--

CREATE TABLE `room_rates` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_roomtype` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_ratetype` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_sessions` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_plan` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int NOT NULL,
  `charges_adult` int DEFAULT NULL,
  `charges_child` int DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room_rates`
--

INSERT INTO `room_rates` (`id`, `id_roomtype`, `id_ratetype`, `id_sessions`, `id_plan`, `price`, `charges_adult`, `charges_child`, `status`) VALUES
('07c05476-7e01-11ef-b31c-b06ebf1bb0fa', '9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 500000, 2, 1, 1),
('44487b71-7a62-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 5000000, 2, 3, 0),
('5dffcb31-7a5e-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c84ec979-6eff-11ef-97b6-ce50eb0f5b9e', 500000, 2, 1, 1),
('5e032f4c-7a37-11ef-bd75-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 5000000, 2, 3, 0),
('7085eb77-7a60-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c84ec979-6eff-11ef-97b6-ce50eb0f5b9e', 500000, 2, 1, 0),
('89683577-7a60-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 500000, 5, 2, 1),
('b92bc065-7a61-11ef-a9b6-b06ebf1bb0fa', '1', '1', '1', '1', 100000, 3, 3, 1),
('bb4fd419-7a5f-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 500000, 2, 3, 0),
('fcb430cd-7a5e-11ef-a9b6-b06ebf1bb0fa', NULL, 'weekday', 'c4ca4238a0b923820dcc509a6f75849b', 'c4ca4238a0b923820dcc509a6f75849b', 500000, 2, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_status`
--

CREATE TABLE `room_status` (
  `id` varchar(100) NOT NULL,
  `nama_status` varchar(100) NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room_status`
--

INSERT INTO `room_status` (`id`, `nama_status`, `keterangan`, `status`) VALUES
('0dfd528f-7be5-11ef-bf99-b06ebf1bb0fa', 'Refan', 'booking', 1),
('12619ec3-7be2-11ef-bf99-b06ebf1bb0fa', 'Subhan', 'checkout', 0),
('486b8cb5-7be6-11ef-bf99-b06ebf1bb0fa', 'Fanzz', 'booking', 0),
('b756d7c9-7a4d-11ef-9139-73ea3d73864a', 'Azi', 'booking', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `base_adult` int DEFAULT NULL,
  `base_child` int DEFAULT NULL,
  `max_adult` int DEFAULT NULL,
  `max_child` int DEFAULT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`id`, `nama_type`, `base_adult`, `base_child`, `max_adult`, `max_child`, `status`) VALUES
('31326b98-6e67-11ef-97b6-ce50eb0f5b9e', 'STANDAR ROOM', 2, 2, 2, 0, 1),
('9ca041ce-6e67-11ef-97b6-ce50eb0f5b9e', 'DELUXE ROOM', 2, 0, 2, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_sessions` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_tgl` date DEFAULT NULL,
  `end_tgl` date DEFAULT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `nama_sessions`, `start_tgl`, `end_tgl`, `status`) VALUES
('c4ca4238a0b923820dcc509a6f75849b', 'Liburan 1', '2024-09-09', '2024-09-30', 1),
('fef65d64-6eb6-11ef-97b6-ce50eb0f5b9e', 'Liburan 2', '2024-09-02', '2024-09-30', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_password` text COLLATE utf8mb4_general_ci,
  `alamat` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `alamat`) VALUES
('2af0003f-653b-11ef-97b6-ce50eb0f5b9e', 'hotel', 'hotel', 'bd2f1c34a329f1060c9be3d20bd5e68e501cb3a98dec361f8c7d7def594837c6d82734677bad24da0f60ae08e2a56f3e6cde05dcaa14c248aceebea75c95676b', 'hotel');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_status`
--
ALTER TABLE `employee_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_type`
--
ALTER TABLE `employee_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extracharge`
--
ALTER TABLE `extracharge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extracharge_group`
--
ALTER TABLE `extracharge_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `floor`
--
ALTER TABLE `floor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratetype`
--
ALTER TABLE `ratetype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate_breakdown`
--
ALTER TABLE `rate_breakdown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_plan`
--
ALTER TABLE `room_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_rates`
--
ALTER TABLE `room_rates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_status`
--
ALTER TABLE `room_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
