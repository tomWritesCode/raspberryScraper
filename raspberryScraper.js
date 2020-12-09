#!/usr/bin/env node

const rp = require("request-promise");
const chalk = require("chalk");
const figlet = require("figlet");
const $ = require("cheerio");
const url =
	"https://marketplace.visualstudio.com/items?itemName=tomWritesCode.raspberryCandy";

const release = new Date("February 19, 2019 11:46:11");
const current = new Date();

function dateDiff() {
	const difference = current - release;
	return Math.round(difference / (60 * 60 * 24 * 1000));
}

function perDay(string) {
	const downloads = string;
	return Math.round(parseInt(downloads.slice(0, -9).replace(/,/g, '')) / dateDiff());
}

rp(url)
	.then(function (html) {
		//success!
		console.log(chalk.hex("#00feff").bold("WOW!") + chalk.hex("#e592faff").bold(" raspberryCandy has:"));
		console.log(
			chalk.hex("#00feff")(
				figlet.textSync($("span.installs-text", html).text(), {
					font: "Big",
					horizontalLayout: "default",
					verticalLayout: "default"
				})
			)
		);
		console.log(chalk.hex("#00feff").bold("It was released on: " + chalk.hex("#e592faff").bold(release)));
		console.log(
			chalk.hex("#e592faff").bold("It has been released for: " + chalk.hex("#00feff").bold(dateDiff()) + " days!")
		);
		console.log(chalk.hex("#00feff").bold("That's " + chalk.hex("#e592faff").bold(perDay($("span.installs-text", html).text())) + " downloads per day!"));
	})
	.catch(function (err) {
		//handle error
	});
