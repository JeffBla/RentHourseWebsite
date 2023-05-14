INSERT INTO rentinfo_user("name", "email", "password")
VALUES 
    ('${username:raw}', '${email:raw}', '${hashedPassword:raw}');