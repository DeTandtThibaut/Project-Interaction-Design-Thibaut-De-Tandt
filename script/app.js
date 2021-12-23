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
        document.querySelector('.js-coin_subtitle').innerHTML = globalKey;
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
        document.querySelector('.js-coin_subtitle').innerHTML = globalKey;
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
        document.querySelector('.js-coin_subtitle').innerHTML = globalKey;
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
        document.querySelector('.js-coin_subtitle').innerHTML = globalKey;
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
    price.innerHTML = "$" + parseFloat(response[globalKey].price).toFixed(3);
    day.innerHTML = "$" +   parseFloat(response[globalKey].price).toFixed(3);
    month.innerHTML = "$" + parseFloat(response[globalKey].price).toFixed(3);

}

let showMinMax = queryResponse => {
	const min = document.querySelector('.js-price_open');
    const max = document.querySelector('.js-price_close');

    console.log(queryResponse.contents);
    const response = JSON.parse(queryResponse.contents);
    
    console.log(response[globalKey].price);
	min.innerHTML = "$"+ parseFloat(response[globalKey].history[0].min).toFixed(3);
    max.innerHTML = "$"+ parseFloat(response[globalKey].history[0].max).toFixed(3);

};

let showMinMaxYear = queryResponse => {
	const minMonth = document.querySelector('.js-price_open--month');
    const maxMonth = document.querySelector('.js-price_close--month');

    console.log(queryResponse.contents);
    const response = JSON.parse(queryResponse.contents);
    
	minMonth.innerHTML = "$"+ parseFloat(response[globalKey].history[0].min).toFixed(3);
    maxMonth.innerHTML = "$"+ parseFloat(response[globalKey].history[0].max).toFixed(3);

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
function ClickDarkToggleEvent(){
    var container = document.querySelector('.js-checkbox--dark');
    container.addEventListener('click', function( event ) {
       
        if(container.checked){
            document.getElementById('dark-styles').disabled  = false;
            document.getElementById('light-styles').disabled  = true;
        }else{
            document.getElementById('dark-styles').disabled  = true;
            document.getElementById('light-styles').disabled  = false;
        }
        
    });
}



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.coin_info--current').classList.remove('coin_info--current--preanimation')
    document.querySelector('.one').classList.remove('coin_other--item--preanimation')
    document.querySelector('.two').classList.remove('coin_other--item--preanimation')
    document.querySelector('.three').classList.remove('coin_other--item--preanimation')
    document.querySelector('.four').classList.remove('coin_other--item--preanimation')
	getPrice();
    getMinMax();
    getMinMaxYear();
    getProcentageDay();
    getProcentageMonth();
    changeBitcoinData();
    changePolygonData();
    changeVechainData();
    changeEthereumData();
    ClickDarkToggleEvent();
});