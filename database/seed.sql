-- Insert User
INSERT INTO
    User (name, email)
VALUES
    ('Ken', 'teacherken@gmail.com'),
    ('Alice', 'teacheralice@gmail.com'),
    ('Bob', 'studentbob@gmail.com'),
    ('Jon', 'studentjon@gmail.com'),
    ('Hon', 'studenthon@gmail.com'),
    ('Agnes', 'studentagnes@gmail.com'),
    ('Miche', 'studentmiche@gmail.com');

-- Insert TeacherInfo (userId must match Ken = 1, Alice = 2)
INSERT INTO
    TeacherInfo (userId, status, year)
VALUES
    (1, 'ACTIVE', 2025),
    (2, 'ACTIVE', 2025);

-- Insert StudentInfo (userId must match Bob = 3, Jon = 4, Hon = 5)
INSERT INTO
    StudentInfo (userId, status, year)
VALUES
    (3, 'ACTIVE', 2025),
    (4, 'ACTIVE', 2025),
    (5, 'ACTIVE', 2025),
    (6, 'ACTIVE', 2025),
    (7, 'ACTIVE', 2025);