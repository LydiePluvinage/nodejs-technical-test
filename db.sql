-- -----------------------------------------------------
-- Schema technical_test
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `technical_test` ;

-- -----------------------------------------------------
-- Schema technical_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `technical_test` DEFAULT CHARACTER SET utf8 ;
USE `technical_test` ;

-- -----------------------------------------------------
-- Table `technical_test`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `technical_test`.`users` ;

CREATE TABLE IF NOT EXISTS `technical_test`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `technical_test`.`groups` // WARNING : Groups is a reserved word in mysql, had to change it
-- -----------------------------------------------------
DROP TABLE IF EXISTS `technical_test`.`userGroups` ;

CREATE TABLE IF NOT EXISTS `technical_test`.`userGroups` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `technical_test`.`users_groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `technical_test`.`users_has_groups` ;

CREATE TABLE IF NOT EXISTS `technical_test`.`users_has_groups` (
  `idUser` INT NOT NULL,
  `idGroup` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idGroup`),
  INDEX `fk_users_has_groups_groups1_idx` (`idGroup` ASC) VISIBLE,
  INDEX `fk_users_has_groups_users_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_groups_users`
    FOREIGN KEY (`idUser`)
    REFERENCES `technical_test`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_groups_groups1`
    FOREIGN KEY (`idGroup`)
    REFERENCES `technical_test`.`userGroups` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;