const axios = require("axios");
const cheerio = require("cheerio");

// const URL = "https://vanipedia.org/wiki/Random_Quotes_of_Srila_Prabhupada";
const URL = "https://vaniquotes.org/wiki/Main_Page";
async function getQuote() {
	try {
		const res = await axios.get(URL);
		const $ = cheerio.load(res.data);
		const vani = $("#mw-content-text > div > div:nth-child(13) > div:nth-child(5) > div > table > tbody > tr:nth-child(3) > td > span");
		const pic = $("#mw-content-text > div > div:nth-child(13) > div.row > div.large-4.columns > div > div > a > img")['0'].attribs.src;
		// const quote = $("#mw-content-text > div > div:nth-child(4) > table > tbody > tr > td:nth-child(2) > a").text();
		// const pic  = $("#mw-content-text > div > div:nth-child(2) > table > tbody > tr > td:nth-child(1) > img")['0'].attribs.src;
		// console.log(pic);
		// prabhupadaQuote = quote;
		// return [pic, quote];

		return [pic, vani];

	}catch(err) {
		console.error(err);
	}
}

module.exports = {getQuote};