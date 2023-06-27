-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Jun 2023 um 21:51
-- Server-Version: 10.4.25-MariaDB
-- PHP-Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `d4games`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE `games` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`ID`, `Name`) VALUES
(1, 'Moodle Jump'),
(2, 'StickHero'),
(3, 'TicTacToe'),
(4, 'Snake'),
(5, 'Minesweeper'),
(6, 'Pong');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `persons`
--

CREATE TABLE `persons` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Firstname` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Lastname` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Usermail` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(250) CHARACTER SET utf8 NOT NULL,
  `Birthdate` date DEFAULT NULL,
  `Salutation` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `persons`
--

INSERT INTO `persons` (`ID`, `Username`, `Firstname`, `Lastname`, `Usermail`, `Password`, `Birthdate`, `Salutation`) VALUES
(1, 'maxl12', 'maxi', 'Trostmann', 'max@gmail.com', '123', '2023-05-10', 'Mr'),
(2, 'if22b141', 'Maximilian', 'Trostmann', 'maximilian.trostmann@icloud.com', '1234', '2023-05-12', 'Mr'),
(3, 'a', 'a', 'a', 'a@a.c', '1', '0000-00-00', 'Mr');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `scores`
--

CREATE TABLE `scores` (
  `ID` int(11) NOT NULL,
  `Score` int(250) NOT NULL,
  `P_ID` int(11) NOT NULL,
  `G_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `scores`
--

INSERT INTO `scores` (`ID`, `Score`, `P_ID`, `G_ID`) VALUES
(1, 43, 1, 1),
(2, 99, 1, 1),
(3, 1, 1, 1),
(6, 0, 1, 1),
(7, 0, 1, 1),
(8, 0, 1, 1),
(9, 0, 1, 1),
(10, 0, 1, 1),
(11, 5, 1, 1),
(12, 5, 1, 1),
(13, 15, 1, 1),
(14, 36, 1, 1),
(15, 9, 1, 1),
(16, 23, 1, 1),
(17, 14, 1, 1),
(18, 35, 1, 1),
(19, 14, 1, 1),
(20, 46, 1, 1),
(21, 53, 1, 1),
(22, 999, 3, 2),
(23, 2, 1, 2),
(24, 8, 1, 2),
(25, 999, 3, 3),
(26, 1, 1, 3),
(27, 999, 3, 4),
(28, 999, 3, 4),
(29, 1, 1, 4),
(30, 9991, 3, 4),
(31, 21, 3, 4),
(32, 1, 1, 2),
(33, 2, 1, 4),
(34, 0, 1, 4),
(35, 0, 1, 4),
(36, 0, 1, 4),
(37, 0, 1, 4),
(38, 98, 1, 4),
(39, 4, 1, 3),
(40, 106, 1, 5),
(41, 42069, 3, 6),
(42, 4, 1, 6),
(43, 2, 1, 6),
(44, 0, 1, 6),
(45, 2, 1, 2),
(46, 2, 1, 3),
(47, 3, 1, 3),
(48, 12, 1, 4),
(49, 92, 1, 5);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indizes für die Tabelle `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_scores_persons` (`P_ID`),
  ADD KEY `fk_scores_games` (`G_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `persons`
--
ALTER TABLE `persons`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `scores`
--
ALTER TABLE `scores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `fk_scores_games` FOREIGN KEY (`G_ID`) REFERENCES `games` (`ID`),
  ADD CONSTRAINT `fk_scores_persons` FOREIGN KEY (`P_ID`) REFERENCES `persons` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
