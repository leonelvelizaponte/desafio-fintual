const express = require("express");
var cors = require('cors');
var request = require('request');
const app = express();

app.use(cors());
let historicalData = [];

// Yearly profit
app.get('/stock/year/:symbol/:year', function (req, res) {
  const today = new Date();
  const symbol = req.params.symbol;
  const year = req.params.year;
  const initialDate = `${year}-01`;
  let finalDate = null;
  const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+ symbol +'&apikey=F8FQHP6JAVCTY6OI';
  console.log(`Get - Yearly profit for ${symbol} - year: ${year}`);

  //with this validation we check the actual month for this yearly profit
  if (new Date(year).getFullYear()+1 === today.getFullYear()) {
    finalDate = `${year}-${today.getMonth()+1}`;
  } else {
    finalDate = `${year}-12`;
  }
  
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // here we use the API data and transform it to use it later
      for (let [key, value] of Object.entries(data['Monthly Time Series'])) {
        const processedStockData = {
            'date': new Date(key),
            'price': parseFloat(value['4. close']),
        }; //processedStockData
        historicalData.push(processedStockData);
      }; //for
      res.send(profit(new Date(initialDate),new Date(finalDate)));  
    }
  }); //request.get
});


//Get profit by dates
app.get('/stock/:symbol/:initialDate/:finalDate', function (req, res) {
  const symbol = req.params.symbol;
  const initialDate = req.params.initialDate;
  const finalDate = req.params.finalDate;
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+ symbol +'&apikey=F8FQHP6JAVCTY6OI';
  console.log(`Get - Profit for ${symbol} by dates ${initialDate} / ${finalDate}`)

  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // here we use the API data and transform it to use it later
      for (let [key, value] of Object.entries(data['Monthly Time Series'])) {
        const processedStockData = {
            'date': new Date(key),
            'price': parseFloat(value['4. close']),
        }; //processedStockData
        historicalData.push(processedStockData);
      }; //for
      res.send(profit(new Date(initialDate),new Date(finalDate)));  
    }
  }); //request.get
});

//Search the price from dates and calculate it
function profit(fromDate,toDate) {
  const fromDateValue = getStockValue(fromDate);
  const toDateValue = getStockValue(toDate);
 const profit = ((((toDateValue-fromDateValue)/fromDateValue)*100).toFixed(2));
 return profit;
};//profit

function getStockValue(dateToSearch) {
  // searching date and get the price from our historicalData
  const stockValue = historicalData.find((time) => 
      time.date.getFullYear() === dateToSearch.getFullYear()
      && time.date.getMonth() === dateToSearch.getMonth()
  )//find
  return stockValue.price;
};//getStockValue

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});