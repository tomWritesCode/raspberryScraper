const url =
	"https://simplescraper.io/api/s2U5BLTG6dyTkEBRVRrZ?apikey=kYlQJOkMbkjuANMtlvtEktF8Du6Z6Mn0&offset=0&limit=20";

async function checkDownloads() {
	const request = new Request(url);
	const json = await request.loadJSON();
	return json;
}

async function createWidget(data) {
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

	const widget = new ListWidget();
	widget.backgroundColor = new Color("#16161d");
	widget.addSpacer();

	const project = data.name;
	const installs = data.data[0].installs;

	const installCount = widget.addText(`${project} has ${installs}`);
	installCount.font = Font.boldSystemFont(14);
	installCount.textColor = new Color("#00feff");
	installCount.centerAlignText();

	const releaseDate = widget.addText(
		`It has been released for ${dateDiff()} days!`
	);
	releaseDate.font = Font.boldSystemFont(12);
	releaseDate.textColor = new Color("#00feff");
	releaseDate.centerAlignText();

	const perDayText = widget.addText(
		`That's about ${perDay(installs)} installs per day!`
	);
	perDayText.font = Font.boldSystemFont(12);
	perDayText.textColor = new Color("#00feff");
	perDayText.centerAlignText();

	return widget;
}

const data = await checkDownloads();
const widget = await createWidget(data);

if (config.runsInWidget) {
	Script.setWidget(widget);
} else {
	widget.presentMedium();
}
