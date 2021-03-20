// CREATE HEADERS FROM ITEM TYPES

let newCategoryArray = [];
for (let i = 0; i < foodProducts.length; i++)  {
    newCategoryArray.push(foodProducts[i].itemCategory);
}

let uniqueCategoryList = [...new Set(newCategoryArray)]
uniqueCategoryList.sort();

Object.keys(uniqueCategoryList).forEach(function(item) {

    let itemCategorySection = document.createElement('div');
    let h2 = document.createElement('h2');
    let anchor = document.createElement('a');
    let itemCategorySectionDropDownMenu = document.createElement('div');

    itemCategorySection.id = uniqueCategoryList[item];
    itemCategorySection.className = 'food-category-section';

    h2.innerText = uniqueCategoryList[item];

    anchor.href = "#" + uniqueCategoryList[item];
    
    itemCategorySection.appendChild(h2);
    itemCategorySection.appendChild(anchor);

    itemCategorySectionDropDownMenu.id = uniqueCategoryList[item] + '-section-dropdown';
    itemCategorySectionDropDownMenu.className = 'category-bottom-dropdown'

    document.getElementById('food-products').appendChild(itemCategorySection);

    // POPULATE ITEM TYPES WITH ITEMS OF THAT TYPE

    for (let i = 0; i < foodProducts.length; i++)  {

        if (foodProducts[i].itemCategory == (uniqueCategoryList[item]))  {

        let foodItemCard = document.createElement('div');
        let foodItemName = document.createElement('h3');
        let foodItemPicture = document.createElement('img');
        let foodItemPriceAndQuantity = document.createElement('div');
        let foodItemPrice = document.createElement('h4');
        let foodItemPromo = document.createElement('h4');
        let foodItemQuantity = document.createElement('input');
        let foodItemQuantityLabel = document.createElement('label');

        let br = document.createElement('br');

        let addToCartButton = document.createElement('button')

        //------------------------------------------------------------------------------------------

        foodItemCard.id = 'food-item-' + i;
        foodItemCard.className = 'food-item-section'

        foodItemPicture.src = foodProducts[i].itemImage;
        if (foodProducts[i].itemImage == "images/produce/")  {
            foodItemPicture.src = "images/produce/z-image-not-available.jpg";
        }
        foodItemPicture.width = 200;

        foodItemName.innerText = foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType;
        foodItemPrice.innerText = foodProducts[i].itemPrice;

        if (foodProducts[i].weighedItem == true)  {
            foodItemPrice.innerText = (foodProducts[i].itemPrice * 0.454).toFixed(2) + '/lb';
        }

        foodItemPromo.innerHTML = 'sale ' + foodProducts[i].itemPromo + '<span>  reg ' + foodProducts[i].itemPrice + '</span>';
        foodItemPromo.className = 'food-item-promo'

        foodItemCard.appendChild(foodItemPicture);
        foodItemCard.appendChild(foodItemName);

        foodItemPriceAndQuantity.id = 'price-amount-' + i;
        foodItemPriceAndQuantity.className = 'price-and-amount';

        if (foodProducts[i].promo == false)  {
            foodItemPriceAndQuantity.appendChild(foodItemPrice);

        } else  {
            foodItemPriceAndQuantity.appendChild(foodItemPromo)
        }

        foodItemQuantity.id = 'quantity-' + i;
        foodItemQuantity.type = "number";
        foodItemQuantity.min = "0";

        foodItemQuantityLabel.htmlFor =  'quantity-' + i;
        foodItemQuantityLabel.innerHTML = "Quantity: ";
        
        foodItemPriceAndQuantity.appendChild(foodItemQuantityLabel);
        foodItemPriceAndQuantity.appendChild(foodItemQuantity);

        foodItemCard.appendChild(foodItemPriceAndQuantity);

        addToCartButton.innerText = 'add to cart';
        addToCartButton.id = foodProducts[i].itemCode;
        //addToCartButton.setAttribute('onclick', 'addToCart(' + '"' + foodProducts[i].itemCode + '"' + ', ' + '"' + (foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType) + '"' + ', ' + '"' + foodProducts[i].itemPrice + '"' + ', ' + foodItemQuantity.value + ')'); // add more arguments to this or add a lookup for the codes to the cart
        //addToCartButton.setAttribute('onclick', 'addToCart(' + '"' + foodProducts[i].itemCode + '"' + ', ' + '"' + (foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType) + '"' + ', ' + '"' + foodProducts[i].itemPrice + '"' + ', ' + '"' + foodItemQuantity.value + '"' + ')'); // add more arguments to this or add a lookup for the codes to the cart
        addToCartButton.setAttribute('onclick', 'addToCart(' + '"' + foodProducts[i].itemCode + '"' + ', ' + '"' + (foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType) + '"' + ', ' + '"' + foodProducts[i].itemPrice + '"' + ', ' + '"' + foodItemQuantity.value + '"' + ')'); // add more arguments to this or add a lookup for the codes to the cart


        foodItemCard.appendChild(addToCartButton);
        itemCategorySection.appendChild(foodItemCard);
        }
    }

    itemCategorySection.appendChild(itemCategorySectionDropDownMenu);
});
