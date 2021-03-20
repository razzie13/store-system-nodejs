let input = document.getElementById("item-number-input");    
input.addEventListener("keyup", function(event) {
if (event.keyCode === 13)   {
    document.getElementById('check-code-button').click();
    document.getElementById("item-number-input").value = "";
}});