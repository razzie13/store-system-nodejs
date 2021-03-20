function sortDataByDepartment()  {

    let selectedDepartment =  document.querySelector("input[name=shop-department]:checked").value;

    if (selectedDepartment == "meat")  {
        console.log('meat works')
    }

    if (selectedDepartment == "produce")  {
        console.log('produce works')
    }

    if (selectedDepartment == "bulk")  {
        console.log('bulk works')
    }
}

/*
function sortDataByDepartment()  {

    let selectedDepartment =  document.querySelector("input[name=shop-department]:checked").value
    let browseByDepartmentValue = document.createElement('div');

    browseByDepartmentValue.className = 'food-category-section';
    browseByDepartmentValue.id = 'browse-' + document.querySelector("input[name=shop-department]:checked").value;
    
    for (let i = 0; i < foodProducts.length; i++)  {
        if (foodProducts[i].itemDepartment == selectedDepartment)  {

            

            let foodItemCard = document.createElement('div');
            let foodItemName = document.createElement('h3');
            let foodItemPicture = document.createElement('img');
            let foodItemPrice = document.createElement('h4');
            let foodItemPromo = document.createElement('h4');

            let br = document.createElement('br');

            let addToCartButton = document.createElement('button')

            //------------------------------------------------------------------------------------------

            

            foodItemCard.id = 'food-item-' + i;
            foodItemCard.className = 'food-item-section'

            foodItemPicture.src = foodProducts[i].itemImage;
            foodItemPicture.width = 200;

            foodItemName.innerText = foodProducts[i].itemBrand + ' ' +  foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType;
            foodItemPrice.innerText = foodProducts[i].itemPrice;

            foodItemPromo.innerHTML = 'sale ' + foodProducts[i].itemPromo + '<span>  reg ' + foodProducts[i].itemPrice + '</span>';
            foodItemPromo.className = 'food-item-promo'

            addToCartButton.innerText = 'add to cart';
            //addToCartButton.setAttribute('onclick', 'addToCart(foodProducts[i])'); -- doesn't work
            //addToCartButton.setAttribute('onclick', 'addToCart()'); -- works but doesn't pass an argument
            addToCartButton.setAttribute('onclick', 'addToCart(' + foodProducts[i] + ')');
            //addToCartButton.setAttribute('onclick', 'addToCart(' + foodProducts[i].itemCode + ')'); -- works but doesn't pass all info. Works fine to print an order sheet!

            foodItemCard.appendChild(foodItemPicture);
            foodItemCard.appendChild(foodItemName);

            if (foodProducts[i].promo == false)  {
                foodItemCard.appendChild(foodItemPrice);

            } else  {
                foodItemCard.appendChild(foodItemPromo)
            }

            foodItemCard.appendChild(addToCartButton);
            //foodItemMenu.appendChild(foodItemCard);
            browseByDepartmentValue.appendChild(foodItemCard)
            //document.getElementById('food-products').appendChild(browseByDepartmentValue);
        }

            
            document.getElementById('food-products').appendChild(browseByDepartmentValue);
            //console.log(foodProducts[i].itemBrand + ' ' + foodProducts[i].itemDescription + ' ' + foodProducts[i].itemType);
            //console.log(foodProducts[i].itemPrice);
    }
}
*/