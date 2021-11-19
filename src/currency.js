export class Currency {
  static getConverter() {
    return fetch(`https://v6.exchangerate-api.com/v6/not-a-key/latest/USD`)
      .then (function(response) {
        if(!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}

export function currencyConverter(USD, newCurrency) {
  return Math.round((USD * newCurrency)*100)/100;
}