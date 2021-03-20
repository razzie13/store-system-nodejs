function calculateAmount()  {
    console.log('function calculateAmount')
    let recieptSubTotal = itemReciept.reduce(function(prev, cur) {return prev + cur.itemAmount;}, 0);
    let recieptSubTotalToString = recieptSubTotal.toFixed(2)
    let recieptTaxes = itemReciept.reduce(function(prev, cur) {return prev + cur.itemHST;}, 0);
    let recieptTaxesToString = recieptTaxes.toFixed(2)
    let recieptTotal = itemReciept.reduce(function(prev, cur) {return prev + (cur.itemAmount + cur.itemHST);}, 0);
    let recieptTotalToString = recieptTotal.toFixed(2)

    document.getElementById('item-subtotal-h2').innerHTML = recieptSubTotalToString;
    document.getElementById('item-taxes-h2').innerHTML = recieptTaxesToString;
    document.getElementById('item-total-h2').innerHTML = recieptTotalToString;
}