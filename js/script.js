//SELECT ELEMENTS
const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
	buttonElement.disabled = !buttonElement.disabled;
}

//PASSING JOKE TO VOICE RSS API
function tellMe(joke) {
	console.log('tell me:', joke);
	VoiceRSS.speech({
		key: API_KEY,
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

//GET JOKES FROM JOKE API
async function getJokes() {
	joke = '';
	//const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
	const apiUrl =
		'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup}...${data.delivery}`;
		} else {
			joke = data.joke;
		}
		//text-to-speech
		tellMe(joke);
		//disable button
		toggleButton();
	} catch (error) {
		//catch Errors Here
		console.log('Whoops', error);
	}
}
