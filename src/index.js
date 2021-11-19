import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Currency } from './currency.js';
import { currencyConverter } from './currency.js';

$(document).ready(function() {
  Currency.getConverter()
    .then(function (response) {
      if(!response.conversion_rates) {
        $("#showError").text(`${response}`);
        $("#error").show();
      } else {
        sessionStorage.setItem('currencyConversions', JSON.stringify(response.conversion_rates));
      }
    });

  $('form#currency-exchanger').submit(function(event) {
    event.preventDefault();
    const currencyExchangeRates = JSON.parse(sessionStorage.getItem('currencyConversions'));
    let currency = $("#currency").val();
    let USD = $("#USD").val();
    $("#USD").val('');
    $("#output-div").hide();
    $("#error").hide();

    if (!currencyExchangeRates[currency]) {
      $("#showError").text(`cannot find conversion rate for ${currency}`);
      $("#error").show();
    } else {
      let convertedAmount = currencyConverter(USD, currencyExchangeRates[currency]);
      $("#output").text(`${convertedAmount} ${currency}`);
      $("#output-div").fadeIn();
    }
  });
});