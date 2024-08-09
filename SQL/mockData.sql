-- Inserting mock data into rentinfo_user table
INSERT INTO rentinfo_user (id, name, email, password) VALUES 
(1, 'John Doe', 'johndoe@example.com', 'password123'),
(2, 'Jane Smith', 'janesmith@example.com', 'password123'),
(3, 'Alice Johnson', 'alicejohnson@example.com', 'password123'),
(4, 'Bob Brown', 'bobbrown@example.com', 'password123'),
(5, 'Charlie Davis', 'charliedavis@example.com', 'password123');

-- Inserting mock data into house table
INSERT INTO house (id) VALUES 
(1), 
(2), 
(3), 
(4), 
(5);

-- Inserting mock data into rent_info table
INSERT INTO rent_info (id, title, house_id, url, image_cover_id) VALUES 
(1, '南京復興ＭＲＴ、屋齡新3房', 1, 'https://rent.591.com.tw/17130222', NULL),
(2, '【新碩華悅】全新完工電梯質感大兩房', 2, 'https://rent.591.com.tw/15598430', NULL),
(3, '👉🍉超美裝潢2房+捷運中山站雙連站', 3, 'https://rent.591.com.tw/16980705', NULL),
(4, '近中興大學、新時代、秀泰，興大超讚套房', 4, 'https://www.dd-room.com/object/omcntfo8hvxhtpno', NULL),
(5, '沛沛租🔅南崁優質高CP套房', 5, 'https://www.dd-room.com/object/hnmm0rxeiocstuor', NULL);

-- Inserting mock data into image table
INSERT INTO image (id, rent_info_id, url) VALUES 
(1, 1, 'https://img2.591.com.tw/house/2024/08/07/172302101822124801.jpg!510x400.jpg'),
(2, 2, 'https://img1.591.com.tw/house/2023/11/14/169995589857801804.jpg!510x400.jpg'),
(3, 3, 'https://img2.591.com.tw/house/2020/11/04/160448770753799038.jpg!510x400.jpg'),
(4, 4, 'https://static.dd-room.com/images/object/o/m/c/omcntfo8hvxhtpno/cover/dd90a30890fc53037e3550911d190c9b_766x510.jpg'),
(5, 5, 'https://static.dd-room.com/images/object/h/n/m/hnmm0rxeiocstuor/cover/ab1fe7314614e390979dbc6c56361278_766x510.jpg');

-- Updating rent_info to set image_id_cover with the inserted image ids
UPDATE rent_info SET image_cover_id = 1 WHERE id = 1;
UPDATE rent_info SET image_cover_id = 2 WHERE id = 2;
UPDATE rent_info SET image_cover_id = 3 WHERE id = 3;
UPDATE rent_info SET image_cover_id = 4 WHERE id = 4;
UPDATE rent_info SET image_cover_id = 5 WHERE id = 5;

-- Inserting mock data into rent_search_info table
INSERT INTO rent_search_info (id, rent_info_id, address, price_permonth, published_by, house_type, building_type, area, floor, facilities, features, layout, min_rent_period, gender_requirement, other_desc, coming_from) VALUES 
(1, 1, '台中市', 105000, '仲介: 儲先生', '電梯大樓', '電梯大樓', 35, 1, 'Pool, Gym', 'Modern, Spacious', '2BHK', '1 year', 'None', 'Near park', 'Website A'),
(2, 2, '台北市',2500.00, 'Jane Smith', 'House', 'Detached', 200.0, 1, 'Garage, Garden', 'Spacious, Quiet', '4BHK', '6 months', 'None', 'Near school', 'Website B'),
(3, 3, '台北市', 1800.00, 'Alice Johnson', 'Condo', 'Condominium', 75.0, 5, 'Gym, Parking', 'Modern, Secure', '3BHK', '1 year', 'None', 'Near mall', 'Website C'),
(4, 4, '台南市', 900.00, 'Bob Brown', 'Studio', 'Studio', 30.0, 2, 'Parking', 'Cozy, Affordable', '1BHK', '6 months', 'None', 'Near downtown', 'Website D'),
(5, 5, '高雄市', 5000.00, 'Charlie Davis', 'Villa', 'Villa', 350.0, 1, 'Pool, Garden', 'Luxurious, Spacious', '5BHK', '1 year', 'None', 'Near beach', 'Website E');

-- Inserting mock data into favorite table
INSERT INTO favorite (user_id, rent_info_id) VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);
