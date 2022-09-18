let button = document.getElementById('loadButton');
let content = document.getElementById('container');
let id = document.getElementById('id');
let name = document.getElementById('name');
let amount = document.getElementById('amount');
let addButton = document.getElementById('addButton');
let searchButton = document.getElementById('searchButton')
addButton.onclick = addIceCream;
button.onclick = loadAllIceCreams;
searchButton.onclick = apigetLogging;

function loadSpan(response){
    content.innerText = "";
    for(let i = 0; i < response.length; i++){
        let iceCream = document.createElement("p");
        iceCream.innerText = response[i].name;
        content.appendChild(iceCream);
    }
}

function loadSpan1(response){
    content.innerText = "";
   
        let iceCream = document.createElement("p");
        iceCream.innerText = response.userName + " " +response.password + " " + response.userRole ;
        content.appendChild(iceCream);
    
}

function loadAllIceCreams(){
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9000/iceCreams/");
    request.send();

    request.onreadystatechange = load;

   function load(){
        if(request.readyState == 4 && request.status == 200){
            let responsejson = JSON.parse(request.response);
            console.log(responsejson);
            loadSpan(responsejson);
        }
    }
}

function addIceCream() {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/paintings");
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    let iceCreamObj = {id:id.value,name:name.value, amount:amount.value};
    request.send(JSON.stringify(iceCreamObj));
}



function getIceCreamByName(){
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9000/paintings/artistname/");
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    //let str = 2;
    //let iceCreamObj = {name:name.value};
  let iceCreamObj = {id:id.value,name:name.value, amount:amount.value};
    request.send();

    request.onreadystatechange = load;

   function load(){
        if(request.readyState == 4 && request.status == 200){
            let responsejson = JSON.parse(request.response);
            console.log(responsejson);
            loadSpan1(responsejson);
        }
    }

}

async function loadIceCreamByName(response){

    
}
async function apigetIceCreamByName(){
    let name = document.getElementById('name');
     let name1 = name.value;
    let response = await fetch("http://localhost:9000/iceCreamShop/getIceCreamByName/"+ name1);
    response = await response.json();
    console.log(response);
    loadSpan1(response);
    return {id:response.id, name:response.name};

}

async function apigetLogging(){
    let userName = document.getElementById('name');
    let password = document.getElementById('amount');
    // let name1 = name.value;

    let Logging = {
        userName:userName.value,
        password:password.value
    }
   try {} let response = await fetch("http://localhost:9000/iceCreamShop/getLogging/"+ userName.value +","+ password.value);
    response = await response.json();
    console.log(response);
    loadSpan1(response);
    return {userName:response.userName, password:response.password, userRole:response.useRole};

}


