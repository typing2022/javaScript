var addItem = document.getElementById('addItem');
var itemName = document.getElementById('itemName');
var amount = document.getElementById('amount');
var idNumber= document.getElementById('idNumber');
var iceCream = document.getElementById('iceCream');
var drink = document.getElementById('drink')
var userName = document.getElementById('userName');
var password = document.getElementById('password');
var userRole = document.getElementById('userRole');
var drinkCombo = document.getElementById('drinks')
var addUserButton = document.getElementById('addUserButton');
var users = document.getElementById('users');
var deleteItem = document.getElementById("deleteItem")
var ice = document.getElementById('iceCreams'); 
var deleteUsers = document.getElementById('deleteUser');

addItem.onclick =  addItems;
addUserButton.onclick = addUser;
ice.onclick = selectIceCreamById;
drinkCombo.onclick = selectDrinkById;
users.onclick = selectUserById;
deleteItem.onclick = deleteItems;
deleteUsers.onclick = deleteUser;

var num = 0;
 
function addItems(){
    if (iceCream.checked == true){
        addIceCream();
        updateIceCreamCombo();
           
    } else if (drink.checked == true){
        addDrink();
        updateDrinkCombo();
    }
}

function deleteItems(){
    
    if (iceCream.checked  == true){
        deleteIceCream();
        updateIceCreamCombo();
            
    } else if (drink.checked == true){
       
        deleteDrink();
        updateDrinkCombo();
    }
}
async function addIceCream(){
    
      let inputOrder = {
          name:itemName.value,
          amount:amount.value
        }
      
      let response = await fetch("http://localhost:9000/iceCreamShop/addIceCream/", {
          method:'POST',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          body:JSON.stringify(inputOrder)
      });
    
      updateIceCreamCombo();
}

async function addDrink(){
    
    let inputOrder = {
        
        name:itemName.value,
        amount:amount.value
        
    }
    
    let response = await fetch("http://localhost:9000/iceCreamShop/addDrink/", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(inputOrder)
    });
  
    updateDrinkCombo();
}


async function addUser(){
    
    let inputOrder = {
        
        userName:userName.value,
        password:password.value,
        userRole:userRole.value
        
    }
    
    let response = await fetch("http://localhost:9000/iceCreamShop/addUser/", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(inputOrder)
    });
  
    updateUserCombo();
}

async function updateIceCreamCombo(){
    
    var ice = document.getElementById('iceCreams');                                              
    let response = await fetch("http://localhost:9000/iceCreams/");
        if (response.status >= 200 && response.status <= 299){
            response = await response.json();
           let options =  ice.options.length;
            for (let j = 0 ; j < options ; j++){
                ice.remove(0);
            }
            for(let i = 0; i < response.length; i++){
                                
                let str = ' ' +  '<option value= "' + response[i].id + '" > ' + response[i].name + ' </option>';
                ice.innerHTML = ice.innerHTML + ' '  + str;
            } 
       
        }
                        
}


async function updateUserCombo(){
    
    var usersCombo = document.getElementById('users');                                               
    let response = await fetch("http://localhost:9000/iceCreamShop/users/");
        if (response.status >= 200 && response.status <= 299){
            response = await response.json();
           let options =  usersCombo.options.length;
            for (let j = 0 ; j < options ; j++){
                usersCombo.remove(0);
            }
            
            for(let i = 0; i < response.length; i++){
                                
                let str = ' ' +  '<option value= "' + response[i].id + '" > ' + response[i].userName + ' </option>';
                usersCombo.innerHTML = usersCombo.innerHTML + ' '  + str;
            } 
     
        }
                        
}

async function updateDrinkCombo(){
    
                                                 
    let response = await fetch("http://localhost:9000/drinks/");
        if (response.status >= 200 && response.status <= 299){
            response = await response.json();
           let options =  drinkCombo.options.length;
            for (let j = 0 ; j < options ; j++){
                drinkCombo.remove(0);
            }
            
            for(let i = 0; i < response.length; i++){
                                
                let str = ' ' +  '<option value= "' + response[i].id + '" > ' + response[i].name + ' </option>';
                drinkCombo.innerHTML = drinkCombo.innerHTML + ' '  + str;
            } 

        }
                        
}

async function updateDeleteCombo(){
    
                                            
    let response = await fetch("http://localhost:9000/iceCreamShop/users/");
        if (response.status >= 200 && response.status <= 299){
            response = await response.json();
           let options =  usersCombo.options.length;
            for (let j = 0 ; j < options ; j++){
                usersCombo.remove(0);
            }
            
           
            for(let i = 0; i < response.length; i++){
                                
                let str = ' ' +  '<option value= "' + response[i].id + '" > ' + response[i].name + ' </option>';
                usersCombo.innerHTML = usersCombo.innerHTML + ' '  + str;
            } 
           
        }
                        
}


async function selectIceCreamById(){
                          
   let id =ice.options[ice.selectedIndex].value;
   let response = await fetch("http://localhost:9000/iceCreamShop/getIceCreamById/" + id);
   if (response.status >= 200 && response.status <= 299){
        response = await response.json();
        idNumber.value  =  response.id;
        itemName.value = response.name;
        amount.value   = response.amount;
   
        iceCream.checked = true;   

   }
}  

async function selectDrinkById(){
                 
    let id = drinkCombo.options[drinkCombo.selectedIndex].value;
    let response = await fetch("http://localhost:9000/iceCreamShop/getDrinkById/" + id);
    if (response.status >= 200 && response.status <= 299){
        response = await response.json();
  
        idNumber.value  =  response.id;
        itemName.value = response.name;
        amount.value   = response.amount;

        drink.checked = true;
  
   }
  } 

  async function selectUserById(){
                  
    let id = users.options[users.selectedIndex].value;
    let response = await fetch("http://localhost:9000/iceCreamShop/getUserById/" + id);
    if (response.status >= 200 && response.status <= 299){
        response = await response.json();
  
        idNumber.value  =  response.id;
        userName.value = response.userName;
        password.value   = response.password;
        userRole.value = response.userRole;
  
   }
  } 

  async function deleteIceCream(){
                          
    let id =idNumber.value;
    let response = await fetch("http://localhost:9000/iceCreamShop/iceCreamDeletion/" + id);
    if (response.status >= 200 && response.status <= 299){
         response = await response.json();
          
         clearItemInputs();
         updateIceCreamCombo();
         
    }
 }  

 async function deleteDrink(){
                          
    let id =idNumber.value;
    let response = await fetch("http://localhost:9000/iceCreamShop/drinkDeletion/" + id);
    if (response.status >= 200 && response.status <= 299){
         response = await response.json();
         
         clearItemInputs();
         updateDrinkCombo();
         
    }
 }

 async function deleteUser(){
                          
    let id =idNumber.value;
    let response = await fetch("http://localhost:9000/iceCreamShop/userDeletion/" + id);
    if (response.status >= 200 && response.status <= 299){
         response = await response.json();
         
         clearUserInputs()
         updateUserCombo();
    }
 }

 function clearItemInputs(){
    idNumber.value = "";
    itemName.value = "";
    amount.value = "";
 }

 function clearUserInputs(){
    idNumber.value  =  "";
    userName.value = "";
    password.value   = "";
    userRole.value = "";
 }
 

  