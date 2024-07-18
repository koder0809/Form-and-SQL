CREATE DATABASE edgelink_services;
USE edgelink_services;

CREATE TABLE career_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    resume LONGBLOB,
    cover_letter TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM career_inquiries;
SELECT * FROM contact_inquiries;

