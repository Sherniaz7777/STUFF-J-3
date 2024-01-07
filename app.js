const list=document.querySelector('.list')
const root=document.querySelector('.root')
const block4=document.querySelector('.block-4-in')
const box=document.querySelector('.box')
const imgHome=document.querySelector('.header-img')
const Cardlike=document.querySelector('#imgs-sp1')
const CardCorzina=document.querySelector('#imgs-sp2')
const btnlike=document.querySelector('#header-btn-like')
const btncorzina=document.querySelector('#header-btn-corz')
const corzinka=document.querySelector('.corzinka')
const total=document.querySelector('#total')
const corzinkas=document.querySelector('.corzinkas')


const urlstuff='https://fakestoreapi.com/products'


async function getProducts() {
    const res=await fetch(urlstuff)
    const data=await res.json()
    console.log(data);
    renderCategory(data)
    renderProducts(data.slice(0 ,5))
}
getProducts()

function ShowBox() {
    box.innerHTML=''
    box.innerHTML+=`
    <div>
         <div class="box-all">
            
                         <h1>BIG SALE 20%</h1>
                         <div class="box-in">
                               <div class="box-in1">
                                   <h3>the bestseller of 2022</h3>
                                   <p>LENNON R2D2 WITH NVIDIA 5090 TI</p>
                                    <button>Shop Now</button>
                                </div>

                               <div class="box-in2">
                                       <img src="/img/image 1 (2).png" alt="">
                                   </div>

                          </div>
                    </div>
                    
                    </div>
    `
}
ShowBox()

imgHome.onclick=()=>{

    ShowBox()
}



function renderCategory(arr) {
    const newcategory=[]
    const result=arr.filter(el=>{
        if (!newcategory.includes(el.category)) {
            newcategory.push(el.category)
        }
    })
   

    for (const obj of newcategory) {
     list.innerHTML+=`
     <li onclick="getProductsByCategory(event)">${obj}</li>
     `
        
    }

    
}

function renderProducts(arr) {
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <div class="card" onclick='GetId(${obj.id})' style="width: 18rem;" >
           <img src="${obj.image}" class="card-img-top" alt="Card image cap">
         <div class="card-body">
         <h5 class="card-title">${obj.title}</h5>
           <p class="card-text">${obj.category}</p>
           <a href="#" class="btn btn-primary">${obj.price} $</a>
        </div>
      </div>
        `
    }
}



async function getProductsByCategory(nameCategory) {
    const c = nameCategory.target.innerText;
    const res = await fetch(urlstuff);
    const data = await res.json();
    const filterData = data.filter(el => el.category === c);
    console.log(filterData);
    renderProducts(filterData.slice(0,5))
    
    
}
async function ShowHome() {
    const res=await fetch(urlstuff)
    const data=await res.json()
    const priceFilterFunction = el => el.price < 100;
    renderBlock4(data.slice(0,7),  priceFilterFunction);
    
}


function renderBlock4(arr, filterFunction) {
    block4.innerHTML = '';
    const filteredData = arr.filter(filterFunction);

    for (const obj of filteredData) {
        block4.innerHTML += `
            <div  class="card" onclick='GetId(${obj.id})' style="width: 18rem;">
                <img src="${obj.image}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${obj.title}</h5>
                    <p class="card-text">${obj.category}</p>
                    <a href="#" class="btn btn-primary">${obj.price} $</a>
                </div>
            </div>
        `;
    }
}



ShowHome({ target: { innerText: '' } });




async function GetId(id) {
    const res=await fetch('https://fakestoreapi.com/products/'+id)
    const data=await res.json()
    // console.log(data);
    getOnclickcategory(data)
}


function getOnclickcategory(obj) {
    box.innerHTML=''
    
    box.innerHTML+=`
    <div>
    <div class="box-all1">
         <div class="Click-category">
                    <div class="box-img-cate">
                          <img src="${obj.image}" alt="">
                    </div>
                        <div class="box-anket">
                                      <h3>${obj.title}</h3>
                                      <h5>$${obj.price}</h5>
                                      <h2 id="box-anket-h2">category:  <span id="box-anket-span-h2">${obj.category}</span></h2>
                                      
                                      <p>${obj.description}</p>
                                  <div class="box-btn">
                                      <button onclick="incrCard(${obj.id})" id="box-btn-in-1">Add to cart</button>
                                      <button onclick="incrCard1(${obj.id})" id="box-btn-in-2">Add to favorites</button>
                                    </div>
                               
                       </div>
                      
        </div>

          <div class="box-all1-p">
                <p id="box-all1-p-1">19 people purchased</p>
                <p id="box-all1-p-2">Find in a store</p>
            </div>
    </div>
    </div>`
                
}

let CardData1 = [];
let totalPricelike = 0;

function DataLocal() {
    const cart1Ls = localStorage.getItem('cartLike');
    CardData1 = JSON.parse(cart1Ls) || [];
    Cardlike.innerHTML = CardData1.length;


    TotalPriceLike();
}


DataLocal();

async function incrCard1(id) {
    const cart1Ls = localStorage.getItem('cartLike');
    CardData1 = JSON.parse(cart1Ls) || [];
    const res = await fetch(urlstuff + '/' + id);
    const data = await res.json();
    const existingCard1 = CardData1.find(card2 => card2.id === data.id);

    if (!existingCard1) {
        
        CardData1.push(data);
    } else {
        
    }

    localStorage.setItem('cartLike', JSON.stringify(CardData1));
    DataLocal();
}

btnlike.onclick = () => {
    GetLike();
}

function GetLike() {


    box.innerHTML = '';
    box.innerHTML=`
            <div>
                    <h1 id="Yourcart">Your cart</h1>
                </div>`

    CardData1.forEach(item => {
        box.innerHTML += `
        
                <div class="corzinka">
                         <img src="${item.image}" alt="">
                         <div class="corzinka-title">
                             <h3>${item.title}</h3>
                             <h4>${item.category}</h4>
                         </div>
                      <h1>${item.price}$</h1>
                     <div class="corzina-btns">
                            <button>-</button>
                            <span>0</span>
                            <button>+</button>
                       </div>
                    <h2>${item.price}$</h2>
                    <button onclick="removeItemlike(${item.id})" id="Delete">X</button>
                </div>
            `;
    });


    box.innerHTML += `
        <div class="total-price">
            <h1>TOTAL PRICE: <span>${totalPricelike}$</span></h1>
            <button id="Proceed">Proceed to checkout</button>
        </div>`;
}




function removeItemlike(itemId) {
    CardData1 = CardData1.filter(item => item.id !== itemId);
    localStorage.setItem('cartLike', JSON.stringify(CardData1));
    DataLocal();
    GetLike()
}


function TotalPriceLike() {
    totalPricelike = CardData1.reduce((total, item) => total + (item.price), 0);
}

let CardData2 = [];
let totalPrice = 0;

function updateCartView() {
    const cart2Ls = localStorage.getItem('cart');
    CardData2 = JSON.parse(cart2Ls) || [];
    CardCorzina.innerHTML = CardData2.length;

    TotalPrice();
}

updateCartView();

async function incrCard(id) {
    const cart2Ls = localStorage.getItem('cart');
    CardData2 = JSON.parse(cart2Ls) || [];
    const res = await fetch(urlstuff + '/' + id);
    const data = await res.json();
    const existingCard2 = CardData2.find(card2 => card2.id === data.id);

    if (!existingCard2) {
        
        CardData2.push(data);
    } else {
        
    }

    localStorage.setItem('cart', JSON.stringify(CardData2));
    updateCartView();
}

btncorzina.onclick = () => {
    GetCorzina();
}

function GetCorzina() {


    box.innerHTML = '';
    box.innerHTML=`
            <div>
                    <h1 id="Yourcart">Your cart</h1>
                </div>`

    CardData2.forEach(item => {
        box.innerHTML += `
        
                <div class="corzinka">
                         <img src="${item.image}" alt="">
                         <div class="corzinka-title">
                             <h3>${item.title}</h3>
                             <h4>${item.category}</h4>
                         </div>
                      <h1>${item.price}$</h1>
                     <div class="corzina-btns">
                            <button>-</button>
                            <span>0</span>
                            <button>+</button>
                       </div>
                    <h2>${item.price}$</h2>
                    <button onclick="removeItem(${item.id})" id="Delete">X</button>
                </div>
            `;
    });


    box.innerHTML += `
        <div class="total-price">
            <h1>TOTAL PRICE: <span>${totalPrice}$</span></h1>
            <button id="Proceed">Proceed to checkout</button>
        </div>`;
}




function removeItem(itemId) {
    CardData2 = CardData2.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(CardData2));
    updateCartView();
    GetCorzina()
}


function TotalPrice() {
    totalPrice = CardData2.reduce((total, item) => total + (item.price), 0);
}
