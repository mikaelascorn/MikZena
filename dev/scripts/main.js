/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store

*/

// App
const app = {};

app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getProduct = function (store, drink) { 
    // filter through the whole product array
  return $.ajax({
      url: `http://lcboapi.com/products?primary_category=Wine&per_page=100&=511`,
    dataType: 'jsonp',
    method: 'GET',
    headers: 
      { Authorization: app.key }
    })
  .then( (drink) => {
    //   console.log(drink);
      
    //   console.log(drink.result);
        const listOfDrinks = drink.result;
        const drinkChoices = [];
        listOfDrinks.filter((drink) => {
        // console.log(drink.primary_category);
        // if (drink.primary_category === 'Wine') {
        //     // console.log(drink.secondary_category);
            
        // }
        if (drink.primary_category === "Beer" && drink.regular_price_in_cents > 5000 && drinkChoices.length < 5) {
            // miguel -- I feel like we can make this less verbose. Maybe we can extract this logic into a function? 
            drinkChoices.push(drink)           
        }
        // console.log(drinkChoices);
        
        
        
      });
    });
} // productid end

    // this finds the closest store based on postal code, get the  store on submit of the app.events
app.getStores = function(geo)  { 
   return $.ajax({
       url: `http://lcboapi.com/stores?&geo=${geo}`,
       headers: {
           Authorization: app.key
       },
       contentType: 'application/json',
       dataType: 'jsonp'
   }).then(function (store) {            
       const $store = store.result[0];  // Get the nearest store
       console.log($store.name, $store.id);        
       
   });
} 

app.events = function() {
    $('form').on('submit', function(e) {
        e.preventDefault();        
        //Gives us user postal code and finds the closest store
        const $postalCode = $('#postalCode').val();
        app.getStores($postalCode);
        
        // const selectedPrice = $('.selectPrice input[name="radio"]:checked').val();
        // app.getPrice(selectedPrice);
        // console.log(selectedPrice);
        
        const selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        console.log(selectedDrink);
    });
} //on click end


app.init = function() {  // Everything gets called inside of this function
    app.events();
    app.getProduct();  
}

// Document ready
$(function() {
    app.init(); // <-- we don't need to touch this
});
