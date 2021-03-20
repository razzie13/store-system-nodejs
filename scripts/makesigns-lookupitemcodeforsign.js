function lookUpItemCodeForSign()  {
    console.log('function lookUpItemCodeForSign')
    let searchInput = document.getElementById('item-number-input').value;
    let itemFound = foodProducts.find(e => e.itemCode == searchInput) || produce.find(e => e.itemCode == searchInput);  

    if (itemFound == undefined) {
        alert('Item not on file. Inform Mallory. And get her a Two Cream Coffee from McDonalds');
    }

    if (itemFound.promo == true)  {
        itemFound.itemPrice = itemFound.itemPromo
    }

    if (itemFound.itemDepartment == "Produce")  {
            let inputtedCountryOfOrigin = prompt("Please Enter Country of Origin and Product Grade (if applicable)");
            var countryOfOrigin = ("Product of " + inputtedCountryOfOrigin);
        }

    if (itemFound.itemDepartment != "Produce")  {
        var countryOfOrigin = "";
    }

    storeSignList.push({itemName: itemFound.itemBrand + ' ' + itemFound.itemDescription + ' ' + itemFound.itemType, itemAmount: itemFound.itemPrice, uOM: itemFound.weighedItem, itemOrigin: countryOfOrigin});

    let i;
    let signsToBeMade = "";
    let signsCreated = "";
    for (i = 0; i < storeSignList.length; i++)  {
        signsToBeMade += "<li id=" + [i] + ">" + storeSignList[i].itemName + "</li>"
        document.getElementById('signs-in-list-to-print').innerHTML = signsToBeMade

        if (storeSignList[i].uOM == false)  {
        signsCreated += 
        "<div class='sign' id=" + [i] + "><h3>" + storeSignList[i].itemName + " " + "<span>" + storeSignList[i].itemOrigin + "</span></h3>" +
            "<h1>" + storeSignList[i].itemAmount + "</h1><h4 id='h4-ea'>Each</h4></div>"
        document.getElementById('signs-to-print').innerHTML = signsCreated
        }
        if (storeSignList[i].uOM == true)  {
            let systemPriceLB = (storeSignList[i].itemAmount * 0.454);
            let signPriceLB = systemPriceLB.toFixed(2);
            let systemPriceKG = storeSignList[i].itemAmount
            let signPriceKG = systemPriceKG.toFixed(2);
            if (signPriceLB < 1)  {
                signPriceLB.slice(1);
                console.log('this is the part you want to still fix');
            }
            signsCreated += 
            "<div class='sign' id=" + [i] + "><h3>" + storeSignList[i].itemName + " " + "<span>" + storeSignList[i].itemOrigin + "</h3><br>" + 
                "<h1>" + signPriceLB + "<span>/LB</span></h1><h4 id='h4-lb'><span>/lb | </span>" + signPriceKG + "/KG</h4></div>"
            document.getElementById('signs-to-print').innerHTML = signsCreated;
        }
    }
    
};