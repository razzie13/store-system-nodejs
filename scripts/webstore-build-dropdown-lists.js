// ---- BUILD DROPDOWN LIST TO QUICKLY BROWSE SECTIONS
for (let i = 0; i < uniqueCategoryList; i++)  {
    let anchor = document.createElement('a');
    anchor.textContent = (uniqueCategoryList[i]);

    anchor.setAttribute('onclick', console.log(uniqueCategoryList[i]));                        
    
    document.getElementById('category-dropdown').appendChild(anchor)                    
}
