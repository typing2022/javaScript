var ice = document.getElementById('iceCreams');
var drink = document.getElementById('drinks');
var orderNumber = document.getElementById('orderNumber');
var newOrder = document.getElementById('newOrder');
var sumAmount = 0;
var tax = 0;
var total = 0;
var num = 0;

var amountSpan = document.getElementById('amountSpan');
var taxSpan = document.getElementById('taxSpan');
var totalAmountSpan = document.getElementById('totalAmountSpan');
var orderNumber = document.getElementById("orderNumber");
var orderDate = document.getElementById("orderDate");
var cancelButton = document.getElementById("cancelButton");

var productName = document.getElementById("productName");
var productAmount = document.getElementById("productAmount");
var userNamesession = document.getElementById("session1");

var saveOrderButton = document.getElementById("saveOrderButton");
ice.onchange = selectIceCreamById;
drink.onclick = selectDrinkById;
newOrder.onclick = addOrder;
saveOrderButton.onclick = saveOrder;
cancelButton.onclick = cancelOrder;

async function selectIceCreamById(){
     var table = document.getElementById('table');
                             
    let id =ice.options[ice.selectedIndex].value;
    let response = await fetch("http://localhost:9000/iceCreamShop/getIceCreamById/" + id);
    if (response.status >= 200 && response.status <= 299){
         response = await response.json();

       table.innerHTML  = table.innerHTML + '  <tr> ' +
                     ' <td>' + response.id + '</td>' +
                     ' <td> ' + response.name +'</td> ' +
                      '<td>' + response.amount +'</td>' +
                    '</tr>  ' ;
         
         

         sumAmount = sumAmount + response.amount ;
         tax = sumAmount * 7/100;
         total = sumAmount + tax ;

         amountSpan.innerText = sumAmount;
         taxSpan.innerText = tax;
         totalAmountSpan.innerText = total;


         productName.value = response.name;
         productAmount.value = response.amount;
         
         addOrderDetails();

    }
}  


async function selectDrinkById(){
  var table = document.getElementById('table');
                  
  let id = drink.options[drink.selectedIndex].value;
  let response = await fetch("http://localhost:9000/iceCreamShop/getDrinkById/" + id);
  if (response.status >= 200 && response.status <= 299){
      response = await response.json();

    table.innerHTML  = table.innerHTML + '  <tr> ' +
                  ' <td>' + response.id + '</td>' +
                  ' <td> ' + response.name +'</td> ' +
                   '<td>' + response.amount +'</td>' +
                 '</tr>  ' ;
      
      sumAmount = sumAmount + response.amount ;
      tax = sumAmount * 7/100;
      total = sumAmount + tax ;

      amountSpan.innerText = sumAmount;
      taxSpan.innerText = tax;
      totalAmountSpan.innerText = total;


      productName.value = response.name;
      productAmount.value = response.amount;

      addOrderDetails();

 }
}

async  function getMaxOrderId(){
 
  let response = await fetch("http://localhost:9000/iceCreamShop/maxIdNumber/");
  
  if (response.status >= 200 && response.status <= 299){
    response = await response.json();
    num = response.orderId + 1;
     
    orderNumber.value = num;

  }
}

async function addOrder(){
  
  getMaxOrderId();
  let currentDate = new Date().toJSON().slice(0, 10);
    let inputOrder = {
        date:currentDate,
        tax:0,
        amount:0,
        totalAmount:0
    }
    let response = await fetch("http://localhost:9000/iceCreamShop/addOrder/", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(inputOrder)
        
    }); 

    orderDate.value = currentDate;
  
 }


 async function addOrderDetails(){
  
  
  let currentDate = new Date().toJSON().slice(0, 10);
    let inputOrder = {
        orderId:orderNumber.value,
        productName:productName.value,
        amount:productAmount.value
        
    }
    let response = await fetch("http://localhost:9000/iceCreamShop/OrderDetailsAddition/", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(inputOrder)
    }); 
  
 }


 async function saveOrder(){
    
  let currentDate = new Date().toJSON().slice(0, 10);
    let inputOrder = {
      orderId:orderNumber.value,
      date:currentDate,
      tax:taxSpan.innerText,
      amount:amountSpan.innerText,
      totalAmount:totalAmountSpan.innerText
      
    }

            
    let response = await fetch("http://localhost:9000/iceCreamShop/saveOrder/", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(inputOrder)
    }); 

    table.innerHTML = "";
    amountSpan.innerText = "";
    taxSpan.innerText = "";
    totalAmountSpan.innerText = "";
    orderDate.value = "";
    orderNumber.value = "";
    
  
 }

 async function deleteOrderDetails(){
  
      id =  orderNumber.value;           
  
      let response = await fetch("http://localhost:9000/iceCreamShop/deleteOrderDetails/" + id);
      if (response.status >= 200 && response.status <= 299){
           response = await response.json();
   
 }
}

async function deleteOrder(){
  
  id =  orderNumber.value;           

  let response = await fetch("http://localhost:9000/iceCreamShop/deleteOrder/" + id);
   if (response.status >= 200 && response.status <= 299){
    response = await response.json();

  }
}

function cancelOrder(){
  alert("hellow");
  deleteOrderDetails();
  deleteOrder();

  table.innerHTML = "";
  amountSpan.innerText = "";
  taxSpan.innerText = "";
  totalAmountSpan.innerText = "";
  orderDate.value = "";
  orderNumber.value = "";
 
}




