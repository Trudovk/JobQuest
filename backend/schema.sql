PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS vacancies;
DROP TABLE IF EXISTS recruiters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    passhash TEXT NOT NULL,
    salt TEXT NOT NULL,

    session_token TEXT,

    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE recruiters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    
    company_name TEXT UNIQUE NOT NULL,
    company_description TEXT,
    website TEXT,
    contact_email TEXT,

    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE vacancies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recruiter_id INTEGER NOT NULL,
  
    job_name TEXT NOT NULL,
    job_description TEXT,
    min_salary INTEGER,
    max_salary INTEGER,

    FOREIGN KEY (recruiter_id) REFERENCES recruiters(id)
);

-- Fake data

INSERT INTO users ("email", "passhash", "salt", "first_name", "last_name") VALUES ("c@a.a", "1", "1", "Dan", "Smith");
INSERT INTO users ("email", "passhash", "salt", "first_name", "last_name") VALUES ("bc@a.a", "1", "1", "Kate", "Smith");
INSERT INTO users ("email", "passhash", "salt", "first_name", "last_name") VALUES ("ca@a.a", "1", "1", "John", "Smith");


INSERT INTO recruiters (owner_id,company_name,company_description,website,contact_email) VALUES (
  1,
  'Пряники',
  'Мы делаем пряники',
  'pryaniki.su',
  'job@pryaniki.su'
); 
INSERT INTO recruiters (owner_id,company_name,company_description,website,contact_email) VALUES (
  2,
  'Ботиночки',
  'Мы делаем ботиночки',
  'botinochki.ru',
  'work@botinochki.ru'
); 



INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project Manager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
);

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project Manager1',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project1 Manager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project 34Manager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project Ma6nager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project Man456ager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  1,
  'Project Mana2ger',
  'Вам будет нуж2но менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  2,
  'Proje2ct Manager',
  'Вам будет нужно 2менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  2,
  'P1r0oject Manager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 

INSERT INTO vacancies (recruiter_id,job_name,job_description,min_salary,max_salary) VALUES (
  2,
  'Project Ma2nager',
  'Вам будет нужно менеджить проект',
  100000,
  150000
); 