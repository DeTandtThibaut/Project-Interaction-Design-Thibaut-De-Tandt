let getAPI = async () => {
	// Eerst bouwen we onze url op

	
	const ENDPOINT = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=ETH&to=USDT`;

	// Met de fetch API proberen we de data op te halen.
  
	const request = await fetch(`${ENDPOINT}`

    );
	const data = await request.json();
	console.log(data);
	

};

document.addEventListener('DOMContentLoaded', function() {
	getAPI();
});