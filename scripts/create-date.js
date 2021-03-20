let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let hour = date.getHours();
let minute = date.getMinutes(); 
let second = date.getSeconds();

if (month <= 9)  {month = "0" + date.getMonth();}
if (day <= 9)  {day = "0" + date.getMonth();}
if (hour <= 9)  {hour = "0" + date.getMonth();}
if (minute <= 9)  {minute = "0" + date.getMonth();}
if (second <= 9)  {second = "0" + date.getMonth();}