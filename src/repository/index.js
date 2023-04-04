'use strict';

class House {
	constructor(url, imgUrl, title, price) {
		this.url = url;
		this.imgUrl = imgUrl;
		this.title = title;
		this.price = price;
	}
}

class Repository {
	constructor(name) {
		this.name = name;

		// funny test data
		this.houses = [
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 1', '5000'),
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 2', '9000'),
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 3', '7000'),
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 4', '6000'),
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 5', '6500'),
			new House('https://www.dd-room.com/', 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', 'House title 6', '5500')
		];
	}

	getData() {
		return `hello ${this.name}.`;
	}
	getHouses() {
		return this.houses;
	}
}

module.exports = Repository;
