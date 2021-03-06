export class Currency {
  static getConverter() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then (function(response) {
        if(!response.ok) {
          throw Error(`${response.status} ${response.statusText}`);
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