-- Table schema 

-- User table stores both teachers and students identified by unique email.
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique user ID
    name VARCHAR(100) NOT NULL,                -- Name of the user
    email VARCHAR(100) NOT NULL UNIQUE         -- Email address (must be unique)
);    

-- StudentInfo stores additional info about student users.
CREATE TABLE IF NOT EXISTS StudentInfo (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Unique student info ID
    userId INT NOT NULL,                          -- FK reference to User(id)
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- Student status (e.g., ACTIVE, SUSPENDED)
    year YEAR NOT NULL,                           -- Academic year for the student record
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,  -- Delete student info if user is deleted
    UNIQUE (userId, year),                        -- Prevent duplicate entries per year
    INDEX idx_userId_status (userId, status)      -- Index for lookup by userId and status
);    

-- TeacherInfo stores additional info about teacher users.
CREATE TABLE IF NOT EXISTS TeacherInfo (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Unique teacher info ID
    userId INT NOT NULL,                          -- FK reference to User(id)
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- Teacher status (e.g., ACTIVE)
    year YEAR NOT NULL,                           -- Academic year for the teacher record
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (userId, year),                        -- Prevent duplicate entries per year
    INDEX idx_userId_status (userId, status)
);    

-- Join table representing the many-to-many relationship between teachers and students.
CREATE TABLE IF NOT EXISTS TeacherStudent (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique ID for mapping
    teacherInfoId INT NOT NULL,                -- FK to TeacherInfo(id)
    studentInfoId INT NOT NULL,                -- FK to StudentInfo(id)
    FOREIGN KEY (teacherInfoId) REFERENCES TeacherInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (studentInfoId) REFERENCES StudentInfo(id) ON DELETE CASCADE
);    