let globalKey = "ETH";
let getPrice = async () => {
	const ENDPOINT = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${globalKey}&to=USDT `;
	const request = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT)}`) 
    console.log(request);
	const data = await request.json();
	console.log(data);
	
    showResult(data);


};

let getMinMax = async () => {
    const ENDPOINT = `https://api.exchange.cryptomkt.com/api/3/public/price/history?from=${globalKey}&to=USDT&limit=1&period=D1&sort=DESC`;
    const request = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT)}`) 
    console.log(request);
	const data = await request.json();
	console.log(data);
	
    showMinMax(data);

}
let getMinMaxYear = async () => {
    const ENDPOINT = `https://api.exchange.cryptomkt.com/api/3/public/price/history?from=${globalKey}&to=USDT&limit=1&period=1M&sort=DESC`;
    const request = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT)}`) 
    console.log(request);
	const data = await request.json();
	console.log(data);
	
    showMinMaxYear(data);

}

let getProcentageDay = async () => {
	const ENDPOINT1 = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${globalKey}&to=USDT `;
	const request1 = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT1)}`) 
    console.log(request1);
	const data1 = await request1.json();
    response1 = JSON.parse(data1.contents)
	console.log(data1);

    const ENDPOINT2 = `https://api.exchange.cryptomkt.com/api/3/public/price/history?from=${globalKey}&to=USDT&limit=1&period=D1&sort=DESC`;
    const request2 = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT2)}`) 
    console.log(request2);
	const data2 = await request2.json();
    response2 = JSON.parse(data2.contents)
	console.log(data2);

	//formule om de procentage te berekenen
    const procentage = ((response1[globalKey].price - response2[globalKey].history[0].min) /(response2[globalKey].history[0].max - response2[globalKey].history[0].min)) *100;
    console.log("Procentage day: " + procentage);
    
    setProcentageDay(procentage);
};


let getProcentageMonth = async () => {
	const ENDPOINT1 = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${globalKey}&to=USDT `;
	const request1 = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT1)}`) 
    console.log(request1);
	const data1 = await request1.json();
    response1 = JSON.parse(data1.contents)
	console.log(data1);

    const ENDPOINT2 = `https://api.exchange.cryptomkt.com/api/3/public/price/history?from=${globalKey}&to=USDT&limit=1&period=1M&sort=DESC`;
    const request2 = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ENDPOINT2)}`) 
    console.log(request2);
	const data2 = await request2.json();
    response2 = JSON.parse(data2.contents)
	console.log(data2);

    
	//formule om de procentage te berekenen
    const procentage = ((response1[globalKey].price - response2[globalKey].history[0].min) /(response2[globalKey].history[0].max - response2[globalKey].history[0].min)) *100;
    console.log("Procentage month: " + procentage);
    
    setProcentageMonth(procentage);
};

function setProcentageDay(procentage){
    document.querySelector('.js-range-arrow-day').style.left = procentage+"%";
    document.querySelector('.js-range-top_bar-day').style.left = procentage-1+"%";

}

function setProcentageMonth(procentage){
    document.querySelector('.js-range-arrow-month').style.left = procentage+"%";
    document.querySelector('.js-range-top_bar-month').style.left = procentage-1+"%";

}

function changeBitcoinData(){
    var container = document.querySelector('.js-BTC');
    container.addEventListener('click', function( event ) {
       
        console.log('clicking BTC');

        container.classList.add('hide_container');
        document.querySelector('.js-MATIC').classList.remove('hide_container');
        document.querySelector('.js-VET').classList.remove('hide_container');
        document.querySelector('.js-ETH').classList.remove('hide_container');

        document.querySelector('.js-title-currency').innerHTML = "Bitcoin";

        globalKey = "BTC";
        reloadFunctions();
        
    });
}

function changePolygonData(){
    var container = document.querySelector('.js-MATIC');
    container.addEventListener('click', function( event ) {
       
        console.log('clicking MATIC');

        container.classList.add('hide_container');
        document.querySelector('.js-BTC').classList.remove('hide_container');
        document.querySelector('.js-VET').classList.remove('hide_container');
        document.querySelector('.js-ETH').classList.remove('hide_container');

        document.querySelector('.js-title-currency').innerHTML = "Polygon";

        globalKey = "MATIC";
        reloadFunctions();
        
    });
}
function changeVechainData(){
    var container = document.querySelector('.js-VET');
    container.addEventListener('click', function( event ) {
       
        console.log('clicking VET');

        container.classList.add('hide_container');
        document.querySelector('.js-MATIC').classList.remove('hide_container');
        document.querySelector('.js-BTC').classList.remove('hide_container');
        document.querySelector('.js-ETH').classList.remove('hide_container');

        document.querySelector('.js-title-currency').innerHTML = "VeChain";
        globalKey = "VET";
        reloadFunctions();
        
    });
}
function changeEthereumData(){
    var container = document.querySelector('.js-ETH');
    container.addEventListener('click', function( event ) {
       
        console.log('clicking ETH');

        container.classList.add('hide_container');
        document.querySelector('.js-MATIC').classList.remove('hide_container');
        document.querySelector('.js-VET').classList.remove('hide_container');
        document.querySelector('.js-BTC').classList.remove('hide_container');

        document.querySelector('.js-title-currency').innerHTML = "Ethereum";

        globalKey = "ETH";
        reloadFunctions();
        
    });
}




function showResult(queryResponse) {
    const price = document.querySelector('.js-price');
    const day = document.querySelector('.js-current_price--day');
    const month = document.querySelector('.js-current_price--month');

    console.log(queryResponse.contents);
    const response = JSON.parse(queryResponse.contents);

    console.log(response[globalKey].price);
    price.innerHTML = "$" + response[globalKey].price;
    day.innerHTML = "$" + response[globalKey].price;
    month.innerHTML = "$" + response[globalKey].price;

}

let showMinMax = queryResponse => {
	const min = document.querySelector('.js-price_open');
    const max = document.querySelector('.js-price_close');

    console.log(queryResponse.contents);
    const response = JSON.parse(queryResponse.contents);
    
    console.log(response[globalKey].price);
	min.innerHTML = "$"+ response[globalKey].history[0].min;
    max.innerHTML = "$"+ response[globalKey].history[0].max;

};

let showMinMaxYear = queryResponse => {
	const minMonth = document.querySelector('.js-price_open--month');
    const maxMonth = document.querySelector('.js-price_close--month');

    console.log(queryResponse.contents);
    const response = JSON.parse(queryResponse.contents);
    
	minMonth.innerHTML = "$"+ response[globalKey].history[0].min;
    maxMonth.innerHTML = "$"+ response[globalKey].history[0].max;

};
function reloadFunctions(){
    getPrice();
    getMinMax();
    getMinMaxYear();
    getProcentageDay();
    getProcentageMonth();
    changeBitcoinData();
    changePolygonData();
    changeVechainData();
    changeEthereumData();

}

document.addEventListener('DOMContentLoaded', function() {
	getPrice();
    getMinMax();
    getMinMaxYear();
    getProcentageDay();
    getProcentageMonth();
    changeBitcoinData();
    changePolygonData();
    changeVechainData();
    changeEthereumData();
});