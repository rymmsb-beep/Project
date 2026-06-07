const products = [

  {id:1,name:"Ball Track Kmart",price:49.90,category:"Fun Toys Interactive Games",img:"../image/ft1.jpg"},
  {id:2,name:"Puzzle Cat Toy",price:59.90,category:"Fun Toys Interactive Games",img:"../image/ft2.jpg"},
  {id:3,name:"Automatic Toy",price:79.90,category:"Fun Toys Interactive Games",img:"../image/ft3.jpg"},


  {id:11,name:"Collar with Bell",price:15.90,category:"Collars Items",img:"../image/ci1.jpg"},
  {id:12,name:"Pet Faux Pearl Necklace",price:35.90,category:"Collars Items",img:"../image/ci2.jpg"},
  {id:13,name:"Petface Accessories",price:12.90,category:"Collars Items",img:"../image/ci3.jpg"},
  {id:14,name:"Harnesses",price:49.90,category:"Collars Items",img:"../image/ci4.jpg"},

  {id:21,name:"Soft Cushion",price:24.90,category:"Beds & Cushions",img:"../image/bed1.jpg"},
  {id:22,name:"Round Bed",price:29.90,category:"Beds & Cushions",img:"../image/bed2.jpg"},
  {id:23,name:"Premium Bed",price:49.90,category:"Beds & Cushions",img:"../image/bed3.jpg"},
  {id:24,name:"XXL Cushion",price:34.90,category:"Beds & Cushions",img:"../image/bed4.jpg"},

  {id:31,name:"Dental Hygiene Set",price:19.90,category:"Care & Hygiene",img:"../image/ch1.jpg"},
  {id:32,name:"Cordless Cat Trimmer",price:24.90,category:"Care & Hygiene",img:"../image/ch2.jpg"},
  {id:33,name:"Health Care Kit",price:34.90,category:"Care & Hygiene",img:"../image/ch3.jpg"},
  {id:34,name:"Marltons Pet Care",price:39.90,category:"Care & Hygiene",img:"../image/ch4.jpg"},

  {id:41,name:"Healthy Gourmet",price:90,category:"Healthy Cat Food",img:"../image/f1.jpg"},
  {id:42,name:"Flash Sales Food",price:100,category:"Healthy Cat Food",img:"../image/f2.jpg"},
  {id:43,name:"Fresh Chicken",price:76,category:"Healthy Cat Food",img:"../image/f3.jpg"},
  {id:44,name:"Tuna & Chicken",price:85,category:"Healthy Cat Food",img:"../image/f4.jpg"}

];

/* ELEMENTS */
const productsGrid = document.getElementById("productsGrid");
const resultCount = document.getElementById("resultCount");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

/* SHUFFLE */
function shuffleArray(array){
  let arr = [...array];

  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/* RENDER PRODUCTS */
function renderProducts(list){

  productsGrid.innerHTML = "";

  if(list.length === 0){
    productsGrid.innerHTML = `
      <h2 style="text-align:center;width:100%;">
        No Products Found
      </h2>
    `;
    resultCount.textContent = "0 Products";
    return;
  }

  list.forEach(product => {

    productsGrid.innerHTML += `
      <div class="product-card">

        <img src="${product.img}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <div class="price">
            ${product.price} €
          </div>

          <button class="add-cart" onclick="addCart(${product.id})">
            Add To Cart
          </button>

        </div>

      </div>
    `;
  });

  resultCount.textContent = list.length + " Products";
}

/* FILTER */
function filterProducts(){

  const maxPrice = Number(priceRange.value);
  priceValue.textContent = maxPrice + " €";

  const selectedRadio = document.querySelector('input[name="cat"]:checked');
  const selectedCategory = selectedRadio ? selectedRadio.value : "all";

  let filtered = products.filter(product => {

    const priceMatch = product.price <= maxPrice;

    const categoryMatch =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return priceMatch && categoryMatch;
  });

  if(selectedCategory === "all"){
    filtered = shuffleArray(filtered);
  }

  renderProducts(filtered);
}

/* ADD TO CART */
function addCart(id){

  const product = products.find(p => p.id == id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id == id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Added:", product.name);
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {

  renderProducts(products);

  document.querySelectorAll('input[name="cat"]').forEach(radio => {
    radio.addEventListener("change", filterProducts);
  });

  priceRange.addEventListener("input", filterProducts);

});
