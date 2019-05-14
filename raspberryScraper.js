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
	let difference = current - release;
	return Math.round(difference / (60 * 60 * 24 * 1000));
}

rp(url)
	.then(function(html) {
		//success!
		console.log(chalk.hex("#e592faff").bold(" WOW! raspberryCandy has:"));
		console.log(
			chalk.hex("#00feff")(
				figlet.textSync($("span.downloads-text", html).text(), {
					font: "Big",
					horizontalLayout: "default",
					verticalLayout: "default"
				})
			)
		);
		console.log(chalk.hex("#00feff").bold("It was released on: " + release));
		console.log(
			chalk.hex("#e592faff").bold("It has been released for: " + dateDiff() + " days!")
		);
	})
	.catch(function(err) {
		//handle error
	});
