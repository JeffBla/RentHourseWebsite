-- Creating the rentinfo_user table
CREATE TABLE rentinfo_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Creating the house table
CREATE TABLE house (
    id SERIAL PRIMARY KEY
);

-- Creating the rent_info table
CREATE TABLE rent_info (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    house_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    image_cover_id INT,
    CONSTRAINT fk_house FOREIGN KEY (house_id) REFERENCES house(id)
);

-- Creating the image table
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    rent_info_id INT,
    url VARCHAR(255),
    CONSTRAINT fk_rent_info FOREIGN KEY (rent_info_id) REFERENCES rent_info(id)
);

-- Creating the rent_search_info table
CREATE TABLE rent_search_info (
    id SERIAL PRIMARY KEY,
    rent_info_id INT NOT NULL,
    address VARCHAR(255),
    price_permonth DECIMAL(10,2) NOT NULL,
    published_by VARCHAR(50) NOT NULL,
    house_type VARCHAR(50) NOT NULL,
    building_type VARCHAR(255),
    area FLOAT,
    floor INT,
    facilities VARCHAR(255),
    features VARCHAR(255),
    layout VARCHAR(255),
    min_rent_period VARCHAR(50),
    gender_requirement VARCHAR(50),
    other_desc VARCHAR(255),
    coming_from VARCHAR(255) NOT NULL,
    CONSTRAINT fk_rent_info FOREIGN KEY (rent_info_id) REFERENCES rent_info(id)
);

-- Creating the favorite table
CREATE TABLE favorite (
    user_id INT,
    rent_info_id INT,
    PRIMARY KEY (user_id, rent_info_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES rentinfo_user(id),
    CONSTRAINT fk_rent_info FOREIGN KEY (rent_info_id) REFERENCES rent_info(id)
);

ALTER TABLE rent_info ADD CONSTRAINT fk_image_cover FOREIGN KEY (image_cover_id) REFERENCES image(id);