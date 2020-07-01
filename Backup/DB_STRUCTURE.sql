-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 25 Haz 2020, 16:20:04
-- Sunucu sürümü: 10.4.11-MariaDB
-- PHP Sürümü: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `ocp`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `login` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `registerDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `diamonds` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `email`, `registerDate`, `diamonds`) VALUES
(1, 'a', '*667F407DE7C6AD07358FA38DAED7828A72014B4E', 'a', '2020-06-21 04:26:13', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `account` int(11) NOT NULL,
  `hp` int(11) NOT NULL DEFAULT 100,
  `mp` int(11) NOT NULL DEFAULT 100,
  `exp` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `room` varchar(60) NOT NULL DEFAULT 'hub',
  `posX` int(11) NOT NULL,
  `posY` int(11) NOT NULL,
  `posZ` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `players`
--

INSERT INTO `players` (`id`, `name`, `account`, `hp`, `mp`, `exp`, `level`, `room`, `posX`, `posY`, `posZ`) VALUES
(1, 'test', 1, 100, 100, 0, 1, 'hub', 0, 0, 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
