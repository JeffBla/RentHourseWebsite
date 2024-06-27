# Rent House Website

![Home page cover](./static/picture/Home-page-cover.png)

Fork from [Rancher Docker Node](https://github.com/dmportella/rancher-docker-node)

Express JS app build to run on composed docker.

We intend to build a House Search Engine that populates the db with cards from various Renting Websites using crawlers. Also, to free users from pages and pages of information, we will also integrate open data from [政府資訊平台](https://data.gov.tw/), providing details on house locations and hospitals nearby.

## Demo

[Concept demo video](https://youtu.be/dobxdnOS8gs?si=56i0eXYGHdeD-9vP)

[Final result video](https://youtu.be/hZpxtyWgGsA?si=ipTBttBA7Pldr9th)

## FrontEnd

- EJS
- Javascript
- css

## BackEnd

- Espress js site with MVC and db.
- postgres [graph](https://dbdiagram.io/d/6445f36e6b31947051111b06)

### Normal route

Website should be available on port `8080` when in docker if you are running the site individually it will be served on port `3000`.

### Data flow

#### Home page

```
POST /submit
{
    'page_num' : 目前頁碼,
    'order_by' : 排序選項,
    'limit' : 筆數,
    'address' : [地區],
    'house_type' : [房屋型態],
    'price_permonth' : [min, max],
    'published_by' : [刊登身份],
    'building_type' : [建物型態],
    'area' : [坪數],
    'floor' : [樓層],
    'facilities' : [設備],
    'features' : [特色],
    'layout' : [格局],
    'min_rent_period' : [最短租期],
    'gender_requirement' : [性別條件],
}
```

#### User Favorite

```
POST /user/favorite
 {
    houses : {
      id, title, url, img_url, price_permonth, coming_from, like（如果沒登入就是0）
    },
    like_cnt, //總共幾個like
    item_cnt, //條件下共幾個item
  }
```

### routes

- Home: `/`
  - Search House Info: `/submit`
  - Mock house page for testing & adjustment: `/test-house-page`
- User Page: `/user`
  - User's Favorite: `/favorite`
  - Register: `/register`
  - Signin: `signin`
  - Signout: `signout`
  - Flash card showing fail or success: `/flashtest`
- Like Button: `/like`
  - Check: `/check`
  - Uncheck: `/uncheck`

## Building

The shell file `build.sh` will run npm install, install and run grunt and it will build and run the docker image.

> $ `./build.sh`

Builds docker image and tags it.

- It is important to take care the image version. You can append behind the `./build.sh`
- e.g. `./build.sh 0.0.1`

> $ `./build-image.sh`

- Installs npm and grunt

> $ `./setup.sh`

- Then use docker-compose.yml to Run the docker set(Backend with EJS && DataBase).
