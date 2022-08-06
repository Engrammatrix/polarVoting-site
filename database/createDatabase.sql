-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csci4145
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema csci4145
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csci4145` DEFAULT CHARACTER SET utf8 ;
USE `csci4145` ;

-- -----------------------------------------------------
-- Table `csci4145`.`polls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csci4145`.`polls` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `answers` JSON NOT NULL,
  `multiple_answers` TINYINT NOT NULL DEFAULT 0,
  `status` ENUM("OPEN", "CLOSED") NOT NULL DEFAULT 'OPEN',
  `date_created` DATE NOT NULL,
  `creator_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csci4145`.`votes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csci4145`.`votes` (
  `polls_id` INT NOT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `answers` JSON NOT NULL,
  PRIMARY KEY (`polls_id`, `user_id`),
  INDEX `fk_votes_polls_idx` (`polls_id` ASC) VISIBLE,
  CONSTRAINT `fk_votes_polls`
    FOREIGN KEY (`polls_id`)
    REFERENCES `csci4145`.`polls` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
