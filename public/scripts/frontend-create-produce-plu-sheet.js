// CREATE HEADERS FROM ITEM TYPES

let newCategoryArray = [];
for (let i = 0; i < foodProducts.length; i++)  {
    newCategoryArray.push(foodProducts[i].itemCategory);
}

let uniqueCategoryList = [...new Set(newCategoryArray)]
uniqueCategoryList.sort();



Object.keys(uniqueCategoryList).forEach(function(item) {
    //console.log(uniqueCategoryList[item])

    let itemCategorySection = document.createElement('div');
    let h2 = document.createElement('h2');
    //let anchor = document.createElement('a');
    let itemCategorySectionDropDownMenu = document.createElement('div');

    itemCategorySection.id = uniqueCategoryList[item];
    itemCategorySection.className = 'food-category-section';

    h2.innerText = uniqueCategoryList[item];

    //anchor.href = "#" + uniqueCategoryList[item];
    
    itemCategorySection.appendChild(h2);
    //itemCategorySection.appendChild(anchor);

    //itemCategorySectionDropDownMenu.id = uniqueCategoryList[item] + '-section-dropdown';
    //itemCategorySectionDropDownMenu.className = 'category-bottom-dropdown'

    document.getElementById('produce-plu-code-list').appendChild(itemCategorySection);

    // POPULATE ITEM TYPES WITH ITEMS OF THAT TYPE

    for (let i = 0; i < foodProducts.length; i++)  {

        if (foodProducts[i].itemCategory == (uniqueCategoryList[item]))  {

        let foodItemCard = document.createElement('div');
        let foodItemName = document.createElement('h3');
        let pluSheetLeft = document.createElement('span');
        let pluSheetRight = document.createElement('span');
        //let foodItemPicture = document.createElement('img');
        //let foodItemPrice = document.createElement('h4');
        //let foodItemPromo = document.createElement('h4');

        //let br = document.createElement('br');

        //let addToCartButton = document.createElement('button')

        //------------------------------------------------------------------------------------------

        foodItemCard.id = 'food-item-' + i;
        foodItemCard.className = 'food-item-section';

        pluSheetLeft.className = 'plu-sheet-left';
        pluSheetRight.className = 'plu-sheet-right';

        //foodItemPicture.src = foodProducts[i].itemImage;
        //if (foodProducts[i].itemImage == "images/produce/")  {
        //    foodItemPicture.src = "images/produce/z-image-not-available.jpg";
        //}
        //foodItemPicture.width = 200;
        pluSheetLeft.innerText = foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType + ' ';
        pluSheetRight.innerText = foodProducts[i].itemCode;

        foodItemName.appendChild(pluSheetLeft);
        foodItemName.appendChild(pluSheetRight);

        //foodItemName.innerText = '<span class="plu-sheet-left">' + foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType + '</span><span class="plu-sheet-right">'  + foodProducts[i].itemCode + '</span>';
        //foodItemPrice.innerText = foodProducts[i].itemPrice;

        //if (foodProducts[i].weighedItem == true)  {
        //    foodItemPrice.innerText = (foodProducts[i].itemPrice * 0.454).toFixed(2) + '/lb';
        //}

        //foodItemPromo.innerHTML = 'sale ' + foodProducts[i].itemPromo + '<span>  reg ' + foodProducts[i].itemPrice + '</span>';
        //foodItemPromo.className = 'food-item-promo'

        //addToCartButton.innerText = 'add to cart';
        //addToCartButton.setAttribute('onclick', 'addToCart(foodProducts[i])'); -- doesn't work
        //addToCartButton.setAttribute('onclick', 'addToCart()'); -- works but doesn't pass an argument
        //addToCartButton.setAttribute('onclick', 'addToCart(' + foodProducts[i] + ')');
        //addToCartButton.setAttribute('onclick', 'addToCart(' + foodProducts[i].itemCode + ')'); -- works but doesn't pass all info. Works fine to print an order sheet!

        //foodItemCard.appendChild(foodItemPicture);
        foodItemCard.appendChild(foodItemName);

        //if (foodProducts[i].promo == false)  {
        //    foodItemCard.appendChild(foodItemPrice);
//
        //} else  {
        //    foodItemCard.appendChild(foodItemPromo)
        //}

        

        //foodItemCard.appendChild(addToCartButton);
        itemCategorySection.appendChild(foodItemCard);
        }
    }

    //itemCategorySection.appendChild(itemCategorySectionDropDownMenu);
});
