function addToCart(addedItemCode, addedItemName, addedItemPrice, addedItemQuantity)  {
    console.log('function addToCart(itemCode)');
    //localStorage.removeItem('local-food-store');
    if (addedItemQuantity == "")  {
        addedItemQuantity = 1
    }

    shoppingCart.push({itemCode: addedItemCode, itemName: addedItemName, itemPrice: addedItemPrice, itemQuantity: addedItemQuantity});
    //localStorage.setItem('local-food-store', shoppingCart);
    console.log(shoppingCart);
    document.getElementById('shopping-cart').innerText = 'Items in your cart: ' + shoppingCart.length;
}