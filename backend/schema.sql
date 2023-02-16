DROP TABLE IF EXISTS vacancies;
DROP TABLE IF EXISTS recruiters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(128) UNIQUE NOT NULL,
    passhash VARCHAR(64) NOT NULL,
    salt VARCHAR(40) NOT NULL,

    session_token VARCHAR(64),

    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL
);

CREATE TABLE recruiters (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    owner_id INTEGER NOT NULL,
    
    company_name VARCHAR(256) UNIQUE NOT NULL,
    company_description TEXT,
    website TEXT,
    contact_email TEXT,

    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE vacancies (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    recruiter_id INTEGER NOT NULL,
  
    city VARCHAR(128) NOT NULL,

    job_name VARCHAR(384) NOT NULL,
    job_description TEXT,
    min_salary INTEGER,
    max_salary INTEGER,

    FOREIGN KEY (recruiter_id) REFERENCES recruiters(id),
    FULLTEXT KEY ft_title (job_name)
);