"use strict"
async function getData (callback){
    let response = await fetch("db.json");
    let finalresult = await response.json();
    callback(finalresult.products);
}
//this function to cancel the main action of the link
function preventDefaultAction (e){
    e.preventDefault();
}
//------------------------------------------------------------
//this function show the header after the window is scrolled
let header = document.querySelector("header");
document.addEventListener("scroll",function (){
    if(Math.floor(scrollY) > 100){
        header.classList.add("header2");
    }
    else{
        header.classList.remove("header2")
    }
})
//------------------------------------------------------------
//this function to show & hide the sidebar 
let Sidebar = document.getElementById("sidebar");
let ShowsOrdersBtn = document.getElementById("orderlist");
let HideSidebarBtn = document.getElementById("exit"); 

ShowsOrdersBtn.addEventListener("click" , preventDefaultAction);
HideSidebarBtn.addEventListener("click" , preventDefaultAction);

ShowsOrdersBtn.addEventListener("click" , showSidebar);
HideSidebarBtn.addEventListener("click" , hideSidebar);

function showSidebar(){
    Sidebar.classList.add("showSidebar");
}
function hideSidebar(){
    Sidebar.classList.remove("showSidebar");
}
//------------------------------------------------------------
//Check if the active page is the home page
if(location.href.includes("Home.html")){
    //this function to control the pause and play buttons of the video
    let pauseBtn = document.getElementById("pause");
    let playBtn = document.getElementById("play");
    let video = document.querySelector("video");

    pauseBtn.addEventListener("click" , preventDefaultAction)
    playBtn.addEventListener("click" , preventDefaultAction)

    pauseBtn.addEventListener("click" , function(){
        video.pause();
        pauseBtn.style.display = "none"
        playBtn.style.display="inline-block";
    })
    playBtn.addEventListener("click" , function(){
        video.play();
        pauseBtn.style.display = "inline-block"
        playBtn.style.display="none";
    })
    //this function to control the controls of the slider
    let cheifImg = document.getElementsByClassName("cheif-img");
    let currentCheifImg = document.getElementById("currentimg");
    let cheifImgsDiv = document.querySelectorAll(".cheif-imgs img");
    let cheifImgs= [];
    let backwardBtn = document.getElementById("moveBackward");
    let forwardBtn = document.getElementById("moveForward");
    let currentImgPosition;
    
    for(let j = 0 ;j<cheifImgsDiv.length;j++){
        cheifImgs.push(cheifImgsDiv[j].src)
    }

    for(let i =0 ; i <cheifImg.length ; i++){
        cheifImg[i].addEventListener("click" , function(e){
            currentCheifImg.src = e.path[0].getElementsByTagName("img")[0].getAttribute("src");
        })
    }
    
    forwardBtn.addEventListener("click" ,preventDefaultAction );
    forwardBtn.addEventListener("click" ,nextImg );
    backwardBtn.addEventListener("click" , preventDefaultAction);
    backwardBtn.addEventListener("click" , prevImg);
    function nextImg (){
        currentImgPosition = cheifImgs.indexOf(currentCheifImg.src);
        if(currentImgPosition == 0){
            currentCheifImg.src = cheifImgs[cheifImgs.length - 1];
        }
        else{
            currentCheifImg.src = cheifImgs[currentImgPosition - 1];
        }
    }
    function prevImg (){
        currentImgPosition = cheifImgs.indexOf(currentCheifImg.src);
        if(currentImgPosition == cheifImgs.length -1 ){
            currentCheifImg.src = cheifImgs[0];
        }
        else{
            currentCheifImg.src= cheifImgs[currentImgPosition + 1]
        }
    }
    document.addEventListener("keydown" , function (e) {
        if(e.keyCode == 39 ){
            nextImg();
        }
        else if(e.keyCode == 37){
            prevImg();
        }
    })
}
//------------------------------------------------------------
//this function to control the up button
let upbtn = document.querySelector(".goto-up");
document.addEventListener("scroll" , function (){
    if(Math.floor(scrollY) > 100 ){
        upbtn.classList.replace("hidebtn","showbtn")
    }
    else{
        upbtn.classList.replace("showbtn","hidebtn")
    }
})
upbtn.addEventListener("click" , preventDefaultAction)
upbtn.addEventListener("click",function(){
    window.scroll({
        top:0,
        behavior:"smooth"
    })
})
//------------------------------------------------------------
//this function to set the current year to the footer
let currentYear = new Date();
let showyear = document.getElementById("date");
showyear.textContent = currentYear.getFullYear()
//------------------------------------------------------------
//check if the active page is the products page
if(document.location.href.includes("products.html")){
    //this function to add or edit products in the localstorage
    let addbtn = document.getElementById("add-product");
    let category = document.getElementsByName("Category");
    let productname = document.getElementsByName("productName");
    let productsrc = document.getElementsByName("Image");
    let productprice = document.getElementsByName("price");
    let productinfo = document.getElementsByName("productinfo");
    let productrecipe = document.getElementsByName("recipe");
   
    addbtn.addEventListener("click" ,preventDefaultAction );
    addbtn.addEventListener('click' ,addProduct );
    function addProduct (){
        let InfoArr =[];

        for(let i = 0 ; i < productinfo.length ; i++){
            InfoArr.push(productinfo[i].value)
        }
        let directory;
        
        if(category[0].value.split("-").join(" ").toLowerCase() == "breakfast" || 
        category[0].value.split("-").join(" ").toLowerCase() == "lunch" ){
            directory = "Food";
        }
        else if(category[0].value.split("-").join(" ").toLowerCase() == "fresh drinks" ){
            directory = "Fresh Juice"
        }
        else if(category[0].value.split("-").join(" ").toLowerCase() == "hot drinks" ){
            directory = "Hot drinks"
        }
        else if(category[0].value.split("-").join(" ").toLowerCase() == "desserts" ){
            directory = "Desserts"
        }

        let productobj = {
            name:productname[0].value,
            category:category[0].value,
            imgsrc: `Assets/Images/${directory}/${productsrc[0].value.split("\\")[2]} `,
            price:productprice[0].value,
            Info:InfoArr,
            recipe:productrecipe[0].value,
        };
        //
        fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productobj)
        })

        //set the fields to their default values after additon process
        document.getElementsByName("productName")[0].value = "";
        document.getElementsByName("Image")[0].value = "";
        document.getElementsByName("price")[0].value = "";
        for(let i = 0 ; i < productinfo.length ; i++){
            productinfo[i].value="0";
        }
        document.getElementsByName("recipe")[0].value = "";
    }
    
}
//------------------------------------------------------------
//to find the current location and set it to the localstorage
let activePage = document.getElementsByClassName("activepage"); 
for(let index =  0 ; index < activePage.length ; index++){
    activePage[index].addEventListener("click" , function(e){
        localStorage.setItem("CurrentLocation",e.path[0].textContent.trim().toLowerCase()) ;
    })
}
//------------------------------------------------------------
//check if the active page is the index2 page
if(location.href.includes("index2.html")){
    //function to list the products in the localstorage in the index2 page according to its category
    function displayproducts(products){
        document.querySelector(".products .row").innerHTML = "";
        for(let item of products){
            if(item.category.split("-").join(" ").toLowerCase() == localStorage.getItem("CurrentLocation")){
                let productcard = `
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="card">
                            <img src="${item.imgsrc}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <hr>
                            <p class="card-text"><b>Price :</b> ${item.price} EGP <br><b>Contents :</b> ${item.recipe} </p>
                            </div>
                        </div>
                    </div>`

                document.querySelector(".products .row").innerHTML += productcard;
            }
        }
        pagination()
    }
    //function for pagination
    function getPageList (totalPages,page,maxLength){
        function range (start,end){
            return Array.from(Array(end-start+1), ( _ , i) => i + start);
        }
        var sideWidth = maxLength < 9 ? 1 : 2; //
        var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1; //
        var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1; //
        if(totalPages <= maxLength){
            return range(1,totalPages);
        }
        if(page <= maxLength - sideWidth - 1 - rightWidth){
            return range(1, maxLength - sideWidth -1).concat(0 , range(totalPages - sideWidth +1 , totalPages));
        }
    
        if(page >= totalPages - sideWidth -1 - rightWidth){
            return range(1, sideWidth ). concat(0 , range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }
    
        return range(1,sideWidth).concat(0,range(page - leftWidth , page + rightWidth) , 0 , range(totalPages - sideWidth +  1 , totalPages));
    }
    function pagination() {
        var numberOfItems = $(".card").length;
        var limitPerPage = 6 ;
        var totalPages = Math.ceil(numberOfItems / limitPerPage);
        var paginationSize = 7;//
        var currentPage;
        function showPage (whichPage){
            if(whichPage < 1 || whichPage > totalPages) return false;
    
            currentPage = whichPage;
            window.scroll({
                top:0,
                behavior:"smooth"
            })
            $(".card").hide().slice((currentPage - 1 ) * limitPerPage, currentPage * limitPerPage).show()
    
            $(".pagination li").slice(1,-1).remove(); //
    
            getPageList(totalPages , currentPage , paginationSize).forEach(item => {
                $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                .attr({href:"javascript:void(0)"}).append($("<span>").text(item))).insertBefore(".next-page");
            });
            $(".previous-page").toggleClass("disable", currentPage === 1);
            $(".next-page").toggleClass("disable", currentPage === totalPages);
            return true;
        }
       $(".pagination").append(
            $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).append($("<i>").addClass("fa-solid fa-chevron-left"))),
            $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).append($("<i>").addClass("fa-solid fa-chevron-right")))
        );
        $(".card-content").show();
        showPage(1);
        $(document).on("click" , ".pagination li.current-page:not(.active)", function (){
            return showPage(+$(this).text())
        })
        $(".next-page").on("click", function(){
            return showPage(currentPage + 1);
        })
    
        $(".previous-page").on("click", function(){
            return showPage(currentPage - 1);
        })
    };
    //function for search
    function search (products){
        $(".SearchBox .form-control").on("keyup" , function(e){
            let founditems = new Set();
            for(let item of products){
                if(item.category.split("-").join(" ").toLowerCase() == localStorage.getItem("CurrentLocation")){
                    if(item.name.toLowerCase().includes(this.value.trim().toLowerCase()) && this.value != ""){
                        founditems.add(item);
                    }
                }
                
            }
            if(founditems.size > 0) {
                displayproducts(founditems);
            }
            else getData(displayproducts)
            getData(getcurrentcards);
            pagination()
            
            
        })
    }
    getData(search);
    getData(displayproducts);

}
//------------------------------------------------------------
//function to add the current products in the array and the index of the card in the localstorage. this card has the click event
let currentproducts;
function getcurrentcards (products){
    currentproducts = [];
    let cards = document.getElementsByClassName("card");
    let cardindex;
        for(let product of products){
            if(product.category.split("-").join(" ").toLowerCase() == localStorage.getItem("CurrentLocation")){
                currentproducts.push(product);
            }
        }
    $(".products .card").click(function () {
        let productname = $(this)[0].innerText.split("\n")[0];

        for(let item of currentproducts){
            if(item.name == productname){
                cardindex = currentproducts.indexOf(item);
                localStorage.setItem("cardindex" , cardindex); 
                open("index.html" , "_Self" , "");
            }
        }
    })
}
getData(getcurrentcards)
//------------------------------------------------------------
//check if the active page is the index page
if(location.href.includes("index.html")){
    function displaycard (){
    //this function to add the clicked card info in the index page
    let cardhtml = `
            <div class="col-xl-6 col-lg-6">
            <div class="Order-img">
                <img id="order-img" src="${currentproducts[localStorage.getItem("cardindex")].imgsrc}" alt="">
            </div>
            </div>
            <div class="col-xl-6 col-lg-6">
                <div class="order-box">
                    <div class="order-info">
                        <h2>${currentproducts[localStorage.getItem("cardindex")].name}</h2>
                        <hr>
                        <ul>
                            <li>Carbohydrates: ${currentproducts[localStorage.getItem("cardindex")].Info[0]} gm</li>
                            <li>Fats: ${currentproducts[localStorage.getItem("cardindex")].Info[1]} gm</li>
                            <li>Sugar: ${currentproducts[localStorage.getItem("cardindex")].Info[2]} gm</li>
                            <li>Calaories: ${currentproducts[localStorage.getItem("cardindex")].Info[3]} kcal</li>
                            <li>Fiber: ${currentproducts[localStorage.getItem("cardindex")].Info[4]} gm</li>
                            <li>Protein: ${currentproducts[localStorage.getItem("cardindex")].Info[5]} gm</li>
                            <hr>
                            <li>Price: ${currentproducts[localStorage.getItem("cardindex")].price} EGP</li>
                            <li>Recipe : ${currentproducts[localStorage.getItem("cardindex")].recipe}</li>
                        </ul>
                    </div>
                
                    <div class="order-btn">
                        <input id="ordersnum" type="number" value="1" min="1" max="100" >
                        <a href="" class="btn btn-primary" id="OrderBtn">Order</a>
                    </div>
                </div>
            </div>`
    document.querySelector(".Order .row").innerHTML = cardhtml;
    }
    getData(displaycard)
}  
//------------------------------------------------------------
//function to add orderlist in the sidebar
let ordersList;
function addOrder (){
    let OrderBtn = document.getElementById("OrderBtn");
    let numOfOrders = 0;


    if(localStorage.getItem("orders") == null){
        ordersList = new Array();
    }
    else{
        ordersList = JSON.parse(localStorage.getItem("orders"));
    }
    if(OrderBtn){
        OrderBtn.addEventListener("click" , preventDefaultAction)
        OrderBtn.addEventListener("click" , function(){
            numOfOrders = document.getElementById("ordersnum").value;
            let status = "not exist";
            if(localStorage.getItem("orders") != null){
                for(let k = 0 ; k < JSON.parse(localStorage.getItem("orders")).length ; k++){
                    if(JSON.parse(localStorage.getItem("orders"))[k].name  == currentproducts[localStorage.getItem("cardindex")].name){
                        ordersList[k].numberoforders = numOfOrders;
                        status="exist";
                    } 
                }
                if(status != "exist"){
                    currentproducts[localStorage.getItem("cardindex")]["numberoforders"]= numOfOrders
                    ordersList.push(currentproducts[localStorage.getItem("cardindex")]);
                }
            }
            else{
                currentproducts[localStorage.getItem("cardindex")]["numberoforders"]= numOfOrders
                ordersList.push(currentproducts[localStorage.getItem("cardindex")]);
            }
            localStorage.setItem("orders" ,JSON.stringify(ordersList));
            displayOrders(); 
            showSidebar();
        });
    }
}
getData(addOrder)
//this function to display the orderlist in the sidebar
function displayOrders(){
    let orderdiv = document.createElement('div');
    let  ordershtml = '';
    orderdiv.classList.add("order");
    
    if(localStorage.getItem("orders") != null){
        for(let i = 0  ; i < JSON.parse(localStorage.getItem("orders")).length ; i++){
                ordershtml +=
                `<div class="order">
                <div class="remove-btn position-absolute">
                    <a href="#" class="removebtn btn" onclick="removeOrder(${i})"><i class="fa-solid fa-xmark"></i></a>
                </div>
                <div class="img">
                    <img src="${JSON.parse(localStorage.getItem("orders"))[i].imgsrc}" alt="">
                </div>
                <div class="info">
                    <ul>
                        <li>no. of products: ${JSON.parse(localStorage.getItem("orders"))[i].numberoforders}</li>
                        <li>price: ${JSON.parse(localStorage.getItem("orders"))[i].price} EGP</li>
                    </ul>
                </div>
                </div>`;
        }
    }   
    document.querySelector(".orderContainer").innerHTML = ordershtml;
    let remove_Btn = document.getElementsByClassName("removebtn");
    //function to remove orders
    for(let j = 0 ; j < remove_Btn.length ; j++){
        remove_Btn[j].addEventListener("click",preventDefaultAction);
    }
    totalOrders();
}
getData(displayOrders)
//this function to calculate the total price and fats,carbohydrates,calories... and show them in the sidebar
function totalOrders (){
    let totalsDiv = document.querySelector(".total-price");
    let totalprice = 0;
    let totalCarbo = 0;
    let totalSugar = 0;
    let totalFats = 0;
    let totalPortein = 0;
    let totalFibers = 0;
    let totalCalaories = 0;
  
    for(let item of ordersList){

        totalprice += Number(item.price * item.numberoforders);
        totalCarbo += Number(item.Info[0]);
        totalFats += Number(item.Info[1]);
        totalSugar += Number(item.Info[2]);
        totalCalaories += Number(item.Info[3]);
        totalFibers += Number(item.Info[4]);
        totalPortein += Number(item.Info[5]);
    }
    let str = `
    <ul>
        <li>Total price: ${totalprice} EGP</li>
        <li>Total Calaories: ${totalCalaories} Kcal</li>
        <li>Total Fats: ${totalFats} gm</li>
        <li>Total Carbohydrates: ${totalCarbo} gm</li>
        <li>Total Portein: ${totalPortein} gm</li>
        <li>Total Sugar: ${totalSugar} gm</li>
        <li>Total Fibers: ${totalFibers} gm</li>
    </ul>`;
    totalsDiv.innerHTML = str;
}
//this function to remove the order from the orderlist
function removeOrder (j){
    ordersList.splice(j,1);
    localStorage.setItem("orders",JSON.stringify(ordersList));
    displayOrders();
}
//this function to confirm orders

function confirmOrders (){
    $("#confirm").click(() => {
        $(".Waiting-screen").css("display" , "flex");
        
        animate();
        setTimeout(() => {$(".Waiting-screen").fadeIn(2000)} , 1000);
        setTimeout(() => {$(".Waiting-screen").fadeOut(1000)} , 15000);
        localStorage.removeItem("orders");
        ordersList.splice(0)
        getData(displayOrders)
    })
}
getData(confirmOrders)
//
// Wrap every letter in a span
function animate (){
    var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}