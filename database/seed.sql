-- Insert initial users (teachers and students)
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

-- Insert Ken and Alice as active teachers for 2025
INSERT INTO
    TeacherInfo (userId, status, year)
VALUES
    (1, 'ACTIVE', 2025),    -- Ken
    (2, 'ACTIVE', 2025);    -- Alice


-- Insert all 5 students as active for 2025
INSERT INTO
    StudentInfo (userId, status, year)
VALUES
    (3, 'ACTIVE', 2025),    -- Bob
    (4, 'ACTIVE', 2025),    -- Jon
    (5, 'ACTIVE', 2025),    -- Hon
    (6, 'ACTIVE', 2025),    -- Agnes
    (7, 'ACTIVE', 2025);    -- Miche