INSERT INTO department (name)
VALUES ('PT'),
       ('PTA'),
       ('Aide'),
       ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES ('Physical Therapist', 90000, 1),
       ('Physical Therapist Assistant', 600000, 2),
       ('Therapy Tech', 20000, 3),
       ('Office Manager', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kelli', 'Hernandez', 1, NULL),
       ('Shannon', 'Price', 2, 1),
       ('John', 'Rodriguez', 3, 1),
       ('Sally', 'Smith', 4, 1);