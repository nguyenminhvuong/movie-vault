-- AdminNeo 5.0.0 MySQL 8.0.35 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `movie-vault`;
CREATE DATABASE `movie-vault` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movie-vault`;

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `country_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `genre_id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `language`;
CREATE TABLE `language` (
  `language_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_date` date DEFAULT NULL,
  `runtime` smallint unsigned DEFAULT NULL,
  `plot_summary` text COLLATE utf8mb4_unicode_ci,
  `budget` bigint unsigned DEFAULT NULL,
  `imdb_rating` decimal(3,1) DEFAULT NULL,
  `director_id` int unsigned DEFAULT NULL,
  `country_id` smallint unsigned DEFAULT NULL,
  `language_id` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`movie_id`),
  KEY `idx_movie_title` (`title`),
  KEY `idx_movie_release` (`release_date`),
  KEY `director_id` (`director_id`),
  KEY `country_id` (`country_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `person` (`person_id`) ON DELETE SET NULL,
  CONSTRAINT `movie_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE SET NULL,
  CONSTRAINT `movie_ibfk_3` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie_actor`;
CREATE TABLE `movie_actor` (
  `movie_id` int unsigned NOT NULL,
  `person_id` int unsigned NOT NULL,
  `character_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_order` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`movie_id`,`person_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `movie_actor_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `movie_actor_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie_country`;
CREATE TABLE `movie_country` (
  `movie_id` int unsigned NOT NULL,
  `country_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`movie_id`,`country_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `movie_country_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `movie_country_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie_genre`;
CREATE TABLE `movie_genre` (
  `movie_id` int unsigned NOT NULL,
  `genre_id` tinyint unsigned NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `movie_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie_language`;
CREATE TABLE `movie_language` (
  `movie_id` int unsigned NOT NULL,
  `language_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`movie_id`,`language_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `movie_language_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `movie_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `movie_writer`;
CREATE TABLE `movie_writer` (
  `movie_id` int unsigned NOT NULL,
  `person_id` int unsigned NOT NULL,
  PRIMARY KEY (`movie_id`,`person_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `movie_writer_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `movie_writer_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `person_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date DEFAULT NULL,
  `death_date` date DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `country_id` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  KEY `idx_person_name` (`last_name`,`first_name`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;