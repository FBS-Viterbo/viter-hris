-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 09:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_hris_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_aid` int(11) NOT NULL,
  `employee_department_id` varchar(20) NOT NULL,
  `employee_is_active` tinyint(1) NOT NULL,
  `employee_first_name` varchar(128) NOT NULL,
  `employee_middle_name` varchar(128) NOT NULL,
  `employee_last_name` varchar(128) NOT NULL,
  `employee_email` varchar(255) NOT NULL,
  `employee_created` datetime NOT NULL,
  `employee_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_aid`, `employee_department_id`, `employee_is_active`, `employee_first_name`, `employee_middle_name`, `employee_last_name`, `employee_email`, `employee_created`, `employee_updated`) VALUES
(3, '', 1, 'Johnasdsdfwefwefwefwe', 'Middleasdasd', 'Doeasdasdasdasdasd', 'johndoasde@gmail.com', '2026-04-17 02:43:44', '2026-04-17 13:00:10'),
(4, '', 0, 'Johnasd', 'Middleasd', 'Doeasd', 'joh123ndoe@gmail.com', '2026-04-17 02:43:44', '2026-04-17 13:45:14'),
(5, '', 0, 'John', 'Middle', 'Doe', 'johndoe@gmail.com', '2026-04-17 02:43:44', '2026-04-17 14:44:37'),
(6, '', 0, 'John', 'Middle', 'Doe', 'johndoe@gmail.com', '2026-04-17 02:43:44', '2026-04-17 14:44:39'),
(7, '', 1, 'John', 'Middle', 'Doe', 'johndoe@gmail.com', '2026-04-17 02:43:44', '2026-04-17 02:43:44'),
(8, '', 1, 'Johnasdasd', 'Middleasd', 'Doeasdasd', 'johndoe123123@gmail.com', '2026-04-17 02:43:44', '2026-04-17 12:59:40'),
(33, '', 1, 'asd', 'asdasd', 'dwq', 'asdjhas@gmail.com', '2026-04-17 11:27:38', '2026-04-17 11:27:38'),
(34, '', 1, 'asdasd', 'asdasd', 'dwq', 'asdjhas@gmail.com', '2026-04-17 11:27:58', '2026-04-17 11:27:58'),
(35, '', 1, 'asdsad', 'dsadas', 'dsadas', 'dasdasdasd@gmail.com', '2026-04-17 11:29:00', '2026-04-17 11:29:00'),
(36, '1', 1, 'asddasdasdq3d213423432', 'asddasdas43423', 'asdasdasdasdas23423423', 'asfdhdsaifiusdfiu@gmail.com', '2026-04-24 08:23:28', '2026-04-24 08:23:28');

-- --------------------------------------------------------

--
-- Table structure for table `memo`
--

CREATE TABLE `memo` (
  `memo_aid` int(11) NOT NULL,
  `memo_is_active` tinyint(1) NOT NULL,
  `memo_from` varchar(200) NOT NULL,
  `memo_to` varchar(200) NOT NULL,
  `memo_date` varchar(20) NOT NULL,
  `memo_category` varchar(128) NOT NULL,
  `memo_text` text NOT NULL,
  `memo_created` datetime NOT NULL,
  `memo_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings_department`
--

CREATE TABLE `settings_department` (
  `department_aid` int(11) NOT NULL,
  `department_is_active` tinyint(1) NOT NULL,
  `department_name` varchar(200) NOT NULL,
  `department_created` datetime NOT NULL,
  `department_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_department`
--

INSERT INTO `settings_department` (`department_aid`, `department_is_active`, `department_name`, `department_created`, `department_updated`) VALUES
(1, 1, 'test', '2026-04-24 08:23:10', '2026-04-24 08:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `settings_notification`
--

CREATE TABLE `settings_notification` (
  `notification_aid` int(11) NOT NULL,
  `notification_is_active` tinyint(1) NOT NULL,
  `notification_first_name` varchar(255) NOT NULL,
  `notification_last_name` varchar(255) NOT NULL,
  `notification_email` varchar(255) NOT NULL,
  `notification_purpose` varchar(20) NOT NULL,
  `notification_created` datetime NOT NULL,
  `notification_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_notification`
--

INSERT INTO `settings_notification` (`notification_aid`, `notification_is_active`, `notification_first_name`, `notification_last_name`, `notification_email`, `notification_purpose`, `notification_created`, `notification_updated`) VALUES
(1, 1, 'test', 'test2', 'test@gmail.com', 'Leave', '2026-04-24 09:48:27', '2026-04-24 10:16:19');

-- --------------------------------------------------------

--
-- Table structure for table `settings_roles`
--

CREATE TABLE `settings_roles` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_name` varchar(128) NOT NULL,
  `role_code` varchar(50) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` datetime NOT NULL,
  `role_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_roles`
--

INSERT INTO `settings_roles` (`role_aid`, `role_is_active`, `role_name`, `role_code`, `role_description`, `role_created`, `role_updated`) VALUES
(24, 1, 'my role', 'r_is_my role', 'role', '2026-05-04 11:05:36', '2026-05-04 11:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `settings_users`
--

CREATE TABLE `settings_users` (
  `users_aid` int(11) NOT NULL,
  `users_is_active` tinyint(1) NOT NULL,
  `users_first_name` varchar(255) NOT NULL,
  `users_last_name` varchar(255) NOT NULL,
  `users_email` varchar(255) NOT NULL,
  `users_role_id` varchar(20) NOT NULL,
  `users_password` varchar(255) NOT NULL,
  `users_key` varchar(255) NOT NULL,
  `users_created` datetime NOT NULL,
  `users_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_users`
--

INSERT INTO `settings_users` (`users_aid`, `users_is_active`, `users_first_name`, `users_last_name`, `users_email`, `users_role_id`, `users_password`, `users_key`, `users_created`, `users_updated`) VALUES
(23, 1, 'asd', 'asdas', 'jeremyviterbo19@gmail.com', '24', '$2y$10$FD9UyNcIeSxM2ripAKAZEOUdT5s/FhxxsICX954mlVPYJCYzKCICS', '', '2026-05-04 15:17:26', '2026-05-04 15:24:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_aid`);

--
-- Indexes for table `memo`
--
ALTER TABLE `memo`
  ADD PRIMARY KEY (`memo_aid`);

--
-- Indexes for table `settings_department`
--
ALTER TABLE `settings_department`
  ADD PRIMARY KEY (`department_aid`);

--
-- Indexes for table `settings_notification`
--
ALTER TABLE `settings_notification`
  ADD PRIMARY KEY (`notification_aid`);

--
-- Indexes for table `settings_roles`
--
ALTER TABLE `settings_roles`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `settings_users`
--
ALTER TABLE `settings_users`
  ADD PRIMARY KEY (`users_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `memo`
--
ALTER TABLE `memo`
  MODIFY `memo_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings_department`
--
ALTER TABLE `settings_department`
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings_notification`
--
ALTER TABLE `settings_notification`
  MODIFY `notification_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings_roles`
--
ALTER TABLE `settings_roles`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `settings_users`
--
ALTER TABLE `settings_users`
  MODIFY `users_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
