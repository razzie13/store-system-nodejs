function lookUpItemCode()  {
    console.clear();
    let searchInput = document.getElementById('item-number-input').value;
    let itemTaxes;
    let itemFound = meat.find(e => e.itemCode == searchInput) || produce.find(e => e.itemCode == searchInput);  

    if (itemFound == undefined) {
        alert('Item not on file. Inform Mallory. And get her a Two Cream Coffee from McDonalds');
    }

    if (itemFound.promo == true)  {
        itemFound.itemPrice = itemFound.itemPromo
    }

    if (itemFound.weighedItem == true)  {
        let weightEntered = prompt(itemFound.itemDescription + ' ' + itemFound.itemType + " are a Weighed Item. Enter Item Weight in Grams.");
        let weight = (weightEntered * 0.001)           
        itemFound.itemPrice = (weight * itemFound.itemPrice) // works
    }

    if (itemFound.hst == true)  {
        itemTaxes = (itemFound.itemPrice * 0.13)
    } else  {
        itemTaxes = 0
    }

    let itemAmountString = itemFound.itemPrice;
    let itemAmountToString = itemAmountString.toFixed(2)
    itemReciept.push({itemName: itemFound.itemBrand + ' ' + itemFound.itemDescription + ' ' + itemFound.itemType, itemAmount: itemFound.itemPrice, itemAmountDisplay: itemAmountToString, itemHST: itemTaxes});
    console.log(itemReciept);
    pushToItemReciept();
}