## Live Cryptocurrency Prices

This is a small pet project that uses nodejs, swagger UI, etc. to get the live cryptocurrency prices from the internet

### Steps to run the project:

1. Install node and npm
2. Clone the project
3. Install dependancies using `npm install` command on the command-line
4. Run the command `swagger project start` and open `localhost:5000/docs` to get to the swagger UI

### Checking the prices
* The swagger UI uses a POST method to get the price of a cryptocurrency in a certain denomination

For example, to get the price of Bitcoin in USD follow the steps:

1. `List Operations` -> `POST /checkPrice` -> `Click on example value to get the sample JSON into parameters text box` 
2. ```{
  "CurrencyName": "BTC",
  "ValueType": "USD"
}```
3. `Try it out!`

You will be able to get the prices of all the cryptocurrency pairs using their short-name and a specific denomination

Note : If a currency is traded in BTC/LTC/ETH, etc you can enter these as denominations.
Ex : ```{
  "CurrencyName": "ETH",
  "ValueType": "BTC"
}```
