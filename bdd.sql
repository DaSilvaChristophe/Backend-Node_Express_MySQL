-- Active: 1660822833005@@127.0.0.1@3306@dcrprojectone

USE dcrprojectone;
CREATE TABLE notes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    contenu TEXT NOT NULL,
    PRIMARY KEY (id)

) ENGINE = InnoDB;




