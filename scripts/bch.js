'use strict';
const ccxt = require('ccxt');
const chalk = require('chalk');
const moment = require('moment');
const secrets = require('./env');
const { missedOpportunityEmail } = require('../src/emails/account');

const bch = () => {
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

		let coinbasePrice = Object.entries(await exchange.fetchTicker('BCH/USD'))[5][1];
		console.log(chalk.green.inverse(`BCH price in Coinbase is $${coinbasePrice}`));

		// Binance
		const exchangeId2 = 'binance',
			exchangeClass2 = ccxt[exchangeId2],
			exchange2 = new exchangeClass2({
				apiKey: secrets.binanceKey,
				secret: secrets.binanceSecret,
				timeout: 30000,
				enableRateLimit: true
			});

		let binancePrice = Object.entries(await exchange2.fetchTicker('BCH/USDT'))[5][1];
		console.log(chalk.green.inverse(`BCH price in Binance is $${binancePrice}`));

		// Bittrex
		const exchangeId3 = 'bittrex',
			exchangeClass3 = ccxt[exchangeId3],
			exchange3 = new exchangeClass3({
				apiKey: secrets.bittrexKey,
				secret: secrets.bittrexSecret,
				timeout: 30000,
				enableRateLimit: true
			});
		let bittrexPrice = Object.entries(await exchange3.fetchTicker('BCH/USD'))[5][1];
		console.log(chalk.green.inverse(`BCH price in Bittrex is $${bittrexPrice}`));

		// Kraken
		const exchangeId5 = 'kraken',
			exchangeClass5 = ccxt[exchangeId5],
			exchange5 = new exchangeClass5({
				apiKey: secrets.krakenKey,
				secret: secrets.krakenSecret,
				timeout: 30000,
				enableRateLimit: true
			});
		let krakenPrice = Object.entries(await exchange5.fetchTicker('BCH/USD'))[5][1];
		console.log(chalk.green.inverse(`BCH price in Kraken is $${krakenPrice}`));

		// Logic

		let priceDifference1 = coinbasePrice / binancePrice;
		let priceDifference2 = coinbasePrice / bittrexPrice;
		let priceDifference3 = coinbasePrice / krakenPrice;

		let priceDifference4 = bittrexPrice / binancePrice;
		let priceDifference5 = bittrexPrice / krakenPrice;

		let priceDifference6 = binancePrice / krakenPrice;

		let priceArray = [priceDifference1, priceDifference2, priceDifference3, priceDifference4, priceDifference5, priceDifference6];

		let i;
		for (i = 0; i < priceArray.length; i++) {
			console.log(chalk.magenta.inverse(priceArray[i]));
			if (priceArray[i] >= 1.01 || priceArray[i] <= 0.99) {
				console.log(chalk.white.inverse(moment().format('MMMM Do YYYY, h:mm:ss a')));
				console.log(chalk.red.inverse('Arbitrage opportunity!', '\u0007'));
				missedOpportunityEmail();
			}
		}

		console.log(chalk.blue.inverse('Nothing yet. Taking a break, be back soon...'));
		setTimeout(function() {
			bch();
		}, 30000);
	})();
};

bch();
