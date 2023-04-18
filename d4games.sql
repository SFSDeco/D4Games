CREATE DATABASE IF NOT EXISTS `d4games` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `d4games`;

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, INDEX, ALTER, CREATE TEMPORARY TABLES, EXECUTE, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER ON *.* TO `d4games`@`%` IDENTIFIED BY PASSWORD '*DE77763E195A38723AD01B05705673E2937926EF';

GRANT ALL PRIVILEGES ON `d4games`.* TO `d4games`@`%`;

CREATE TABLE 'wow';