let userName = document.getElementById('userName');
let password = document.getElementById('password');
let exitButton = document.getElementById("exitButton");
let content = document.getElementById('container');

let logInButton = document.getElementById('logInButton');

logInButton.onclick =apigetLogging;

async function apigetLogging(){
    let userName = document.getElementById('userName');
    let password = document.getElementById('password');
    // let name1 = name.value;

    let response = await fetch("http://localhost:9000/iceCreamShop/getLogging/"+ userName.value +","+ password.value);
    if (response.status >= 200 && response.status <= 299){
        response = await response.json();
        content.innerText ="";
        let iceCream = document.createElement("p");
        iceCream.innerText = "welcome : " + response.userName ;
        content.appendChild(iceCream);
        console.log(response);

        if (response.userRole == "user"){
            let iceCream = document.createElement("p");
            iceCream.innerText = "welcome : " + response.userName ;
            content.appendChild(iceCream);
            sessionStorage.setItem("userName", response.userName);
            
           window.open("cashier.html");
           

        }else if (response.userRole == "admin"){
            window.open("admin.html");
            sessionStorage.setItem("userName", "");
            sessionStorage.setItem("userName", response.userName);
        }

    }else{
        content.innerText ="";
        let iceCream = document.createElement("p");
        iceCream.innerText = "the user name or password is uncorrected, Try again" ;
        content.appendChild(iceCream);
        console.log(response);
    }
      

}




