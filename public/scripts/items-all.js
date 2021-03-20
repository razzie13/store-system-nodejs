let allFoodProducts = [...meat, ...produce]
document.getElementById('search-number-of-items').innerHTML = "Search from " + allFoodProducts.length + " products!";