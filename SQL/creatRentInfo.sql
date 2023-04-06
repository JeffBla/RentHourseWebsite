-- Active: 1680748449623@@127.0.0.1@5432@rentdb

Create Table
    houseInfo(
        house_id SERIAL NOT NULL PRIMARY KEY,
        counties VARCHAR(20),
        districts VARCHAR(20),
        street VARCHAR(20),
        more_Position_Info VARCHAR(80)
    );

Create Table
    rentDesc(
        title VARCHAR(20) NOT NULL,
        house_id INT NOT - NULL,
        type VARCHAR(20),
        prices_perMonth INT,
        刊登身份 VARCHAR(20),
        建物型態 VARCHAR(20),
        坪數 INT,
        樓層 INT,
        設備 VARCHAR(80),
        特色 VARCHAR(200),
        格局 VARCHAR(80),
        最短租期 VARCHAR(20),
        性別條件 VARCHAR(20),
        other_Desc VARCHAR(200),
        PRIMARY KEY (title, house_id),
        Foreign Key (house_id) REFERENCES houseInfo(house_id)
    );

DROP Table rentDesc;