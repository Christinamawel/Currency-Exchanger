import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Currency } from './currency.js';
import { currencyConverter } from './currency.js';

$(document).ready(function() {
  $('form#currency-exchanger').submit(function(event) {
    event.preventDefault();
    let currency = $("#currency").val();
    let USD = $("#USD").val();
    

    Currency.getConverter()
      .then(function(response) {
        if(!response.conversion_rates) {
          $("#showError").text(`${response}`);
        } else if (!response.conversion_rates[currency]) {
          $("#showError").text(`cannot find conversion rate for ${currency}`);
        } else {
          let convertedAmount = currencyConverter(USD, response.conversion_rates[currency]);
          $("#output").text(`${convertedAmount} ${currency}`);
        }
      })
  });
});