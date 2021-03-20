function pushToItemReciept()  {
    console.log('function pushToItemReciept')      
    let i;
    let recieptLineItem = "";
    for (i = 0; i < itemReciept.length; i++)  {
        recieptLineItem += '<div id = ' + [i] + '><h2>' + itemReciept[i].itemName + ' <span>' +  itemReciept[i].itemAmountDisplay + '</span></h2><button id=' + [i] + ' onclick=removeListArrayElement(this.id)>X</button></div><br>';

        document.getElementById('item-reciept').innerHTML = recieptLineItem;            
    }
    calculateAmount();
}