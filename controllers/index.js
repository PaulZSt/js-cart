'use strict';

class User {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	// геттер
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	// сеттер
	set fullName(newValue) {
		[this.firstName, this.lastName] = newValue.split(' ');
	}

	// вычисляемое название метода
	["test".toUpperCase()]() {
		alert("PASSED!");
	}

	static createGuest() {
		return new User("Гость", "Сайта");
	}

};

let user = User.createGuest();

let user = new User("Вася", "Пупков");
alert( user.fullName ); // Вася Пупков
user.fullName = "Иван Петров";
alert( user.fullName ); // Иван Петров
user.TEST(); // PASSED!