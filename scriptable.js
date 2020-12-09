const release = new Date("February 19, 2019 11:46:11");
const current = new Date();

function dateDiff() {
	const difference = current - release;
	return Math.round(difference / (60 * 60 * 24 * 1000));
}

function perDay(string) {
	const downloads = string;
	return Math.round(
		parseInt(downloads.slice(0, -9).replace(/,/g, "")) / dateDiff()
	);
}

fetch(
	"https://simplescraper.io/api/s2U5BLTG6dyTkEBRVRrZ?apikey=kYlQJOkMbkjuANMtlvtEktF8Du6Z6Mn0&offset=0&limit=20"
)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		const project = data.name;
		const installs = data.data[0].installs;

		console.log(`${project} has ${installs}`);
		console.log(`It has been released for ${dateDiff()} days!`);
		console.log(`That's about ${perDay(installs)} installs per day!`);
	})
	.catch((err) => {
		console.log("Something went wrong.", err);
	});
