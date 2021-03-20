function completeTransaction()  {
    console.log('function completeTransaction')
    document.getElementById("reciept-number").innerHTML = 'Your Reciept Number: ' + year + month + day + hour + minute + second;
    storeRecieptRecords.push({recieptNumber: year + month + day + hour + minute + second, itemsPurchased: itemReciept});
    window.print();

    document.getElementById("reciept-number").innerHTML = '';
    console.log('itemReciept: ');
    console.log(itemReciept);
    console.log('storeRecieptRecords: ');
    console.log(storeRecieptRecords);
    itemReciept = []; 

    //localStorage.removeItem('reciepts')
    //localStorage.setItem('reciepts', storeRecieptRecords)

    document.getElementById('item-reciept').innerHTML = '';
    document.getElementById('item-subtotal-h2').innerHTML = '0.00';
    document.getElementById('item-taxes-h2').innerHTML = '0.00';
    document.getElementById('item-total-h2').innerHTML = '0.00';
    document.getElementById('reciept-number').innerHTML = '';

}