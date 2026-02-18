
-- Database Schema for Twin Tech

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_users`
-- Default password is 'twin@2026' (hashed with BCRYPT)
--

INSERT INTO `admin_users` (`username`, `password_hash`) VALUES
('admin', '$2y$10$YourHashedPasswordHere_ReplaceThisWithRealHashOnSetup'); 
-- Note: User must generate a real hash for 'twin@2026' or their desired password using password_hash('password', PASSWORD_DEFAULT) in PHP.
-- For 'twin@2026', the hash is: $2y$10$z.something (I will provide a script to generate this or use a default one)
-- Let's use a placeholder hash for now. The setup script or guide will explain how to set this.

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('Contact','Distributor','Career') NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `details` text, -- Stores JSON string of other fields
  `message` text,
  `submitted_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `image_data` longtext, -- Base64 string for small images/uploads
  `description` text,
  `details` json DEFAULT NULL, -- Flexible JSON column for table data, features, etc.
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT 'Uncategorized',
  `image_path` varchar(255) DEFAULT NULL,
  `image_data` longtext,
  `excerpt` text,
  `content` longtext,
  `published_date` date DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
