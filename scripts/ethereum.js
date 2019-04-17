'use strict';
const ccxt = require('ccxt');
const chalk = require('chalk');
const moment = require('moment');
const secrets = require('./env');
const { missedOpportunityEmail } = require('../src/emails/account');

const ethereum = () => {
	// Coinbase
	(async function() {
		const exchangeId = 'coinbase',
			exchangeClass = ccxt[exchangeId],
			exchange = new exchangeClass({
				apiKey: secrets.coinbaseKey,
				secret: secrets.coinbaseSecret,
				timeout: 30000,
				enableRateLimit: true
			});

		let coinbasePrice = Object.entries(await exchange.fetchTicker('ETH/USD'))[5][1];
		console.log(chalk.green.inverse(`ETH price in Coinbase is $${coinbasePrice}`));

		// Binance
		const exchangeId2 = 'binance',
			exchangeClass2 = ccxt[exchangeId2],
			exchange2 = new exchangeClass2({
				apiKey: secrets.binanceKey,
				secret: secrets.binanceSecret,
				timeout: 30000,
				enableRateLimit: true
			});

		let binancePrice = Object.entries(await exchange2.fetchTicker('ETH/USDT'))[5][1];
		console.log(chalk.green.inverse(`ETH price in Binance is $${binancePrice}`));

		// Bittrex
		const exchangeId3 = 'bittrex',
			exchangeClass3 = ccxt[exchangeId3],
			exchange3 = new exchangeClass3({
				apiKey: secrets.bittrexKey,
				secret: secrets.bittrexSecret,
				timeout: 30000,
				enableRateLimit: true
			});
		let bittrexPrice = Object.entries(await exchange3.fetchTicker('ETH/USD'))[5][1];
		console.log(chalk.green.inverse(`ETH price in Bittrex is $${bittrexPrice}`));

		// Poloniex;
		const exchangeId4 = 'poloniex',
			exchangeClass4 = ccxt[exchangeId4],
			exchange4 = new exchangeClass4({
				apiKey: secrets.poloniexKey,
				secret: secrets.poloniexSecret,
				timeout: 30000,
				enableRateLimit: true
			});
		let poloniexPrice = Object.entries(await exchange4.fetchTicker('ETH/USDT'))[5][1];
		console.log(chalk.green.inverse(`ETH price in Poloniex is $${poloniexPrice}`));

		// Kraken
		const exchangeId5 = 'kraken',
			exchangeClass5 = ccxt[exchangeId5],
			exchange5 = new exchangeClass5({
				apiKey: secrets.krakenKey,
				secret: secrets.krakenSecret,
				timeout: 30000,
				enableRateLimit: true
			});
		let krakenPrice = Object.entries(await exchange5.fetchTicker('ETH/USD'))[5][1];
		console.log(chalk.green.inverse(`ETH price in Kraken is $${krakenPrice}`));

		// Logic
		let priceDifference1 = coinbasePrice / binancePrice;
		let priceDifference2 = coinbasePrice / bittrexPrice;
		let priceDifference3 = coinbasePrice / poloniexPrice;
		let priceDifference4 = coinbasePrice / krakenPrice;

		let priceDifference5 = bittrexPrice / binancePrice;
		let priceDifference6 = bittrexPrice / poloniexPrice;
		let priceDifference7 = bittrexPrice / krakenPrice;

		let priceDifference8 = binancePrice / poloniexPrice;
		let priceDifference9 = binancePrice / krakenPrice;

		let priceDifference10 = poloniexPrice / krakenPrice;

		let priceArray = [
			priceDifference1,
			priceDifference2,
			priceDifference3,
			priceDifference4,
			priceDifference5,
			priceDifference6,
			priceDifference7,
			priceDifference8,
			priceDifference9,
			priceDifference10
		];

		let i;
		for (i = 0; i < priceArray.length; i++) {
			console.log(chalk.magenta.inverse(priceArray[i]));
			if (priceArray[i] >= 1.015 || priceArray[i] <= 0.985) {
				console.log(chalk.white.inverse(moment().format('MMMM Do YYYY, h:mm:ss a')));
				console.log(chalk.red.inverse('Arbitrage opportunity!', '\u0007'));
				missedOpportunityEmail();
			}
		}

		console.log(chalk.blue.inverse('Nothing yet. Taking a break, be back soon...'));
		setTimeout(function() {
			ethereum();
		}, 30000);
	})();
};

ethereum();
