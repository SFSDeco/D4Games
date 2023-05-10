-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Mai 2023 um 13:56
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
  `Password` varchar(250) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `persons`
--
ALTER TABLE `persons`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `scores`
--
ALTER TABLE `scores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

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
