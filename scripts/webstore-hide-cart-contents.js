function hideCartContents()  {
    console.log('function hideCartContents');
    let shoppingCartWindow = document.getElementById('shopping-cart-window-items');
    document.getElementById('shopping-cart-window').removeChild(shoppingCartWindow);
}