// CREATE HEADERS FROM ITEM TYPES


let newCategoryArray = [];
//for (let i = 0; i < foodProducts.length; i++)  {
//    newCategoryArray.push(foodProducts[i].itemCategory);
//}

for (let i = 0; i < data.length; i++)  {
    newCategoryArray.push(data[i].itemCategory);
}

let uniqueCategoryList = [...new Set(newCategoryArray)]
uniqueCategoryList.sort();

Object.keys(uniqueCategoryList).forEach(function(item) {
    // ----------------------------------
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
});
