-- Create schema 
CREATE TABLE
    IF NOT EXISTS User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS StudentInfo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
        year YEAR NOT NULL,
        FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE,
        UNIQUE (userId, year),
        INDEX idx_userId_status (userId, status)
    );

CREATE TABLE
    IF NOT EXISTS TeacherInfo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
        year YEAR NOT NULL,
        FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE,
        UNIQUE (userId, year),
        INDEX idx_userId_status (userId, status)
    );

CREATE TABLE
    IF NOT EXISTS TeacherStudent (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teacherInfoId INT NOT NULL,
        studentInfoId INT NOT NULL,
        FOREIGN KEY (teacherInfoId) REFERENCES TeacherInfo (id) ON DELETE CASCADE,
        FOREIGN KEY (studentInfoId) REFERENCES StudentInfo (id) ON DELETE CASCADE
    );