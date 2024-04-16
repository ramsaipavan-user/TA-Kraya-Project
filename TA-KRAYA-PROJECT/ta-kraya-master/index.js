import mobile from "./data/data.json" assert { type: "json" };
var kraya_mobiles = [...mobile]

// ELEMENTS CREATER
function elementCreater(element, className) {
  var div = document.createElement(element);
  div.className = className;
  return div;
}

// TILES RENDERER
function priceDecider(price, discount) {
  return (price - (discount / 100) * price)
}

function go(mobile, idToPut) {
  mobile.map((product) => {
    var productCard = elementCreater("div", "product");
    productCard.id = product.id

    var productImage = new Image();
    productImage.src = product.img;
    productImage.className = "product-img"
    productImage.setAttribute('loading', 'lazy')

    productCard.appendChild(productImage);

    var heart = elementCreater("span", "heart");
    var i = elementCreater("i", "fa-regular fa-heart");
    if(product.isHearted) make_it_heart(heart)
    else remove_heart(heart)

    heart.appendChild(i);

    productCard.appendChild(heart);

    var productsButtons = elementCreater("div", "product-buttons");
    var cartButton = elementCreater("button", "cart");
    var galleryButton = elementCreater("button", "gallery");
    cartButton.innerText = "ADD TO CART";
    galleryButton.innerText = "VIEW GALLERY";
    productsButtons.appendChild(cartButton);
    productsButtons.appendChild(galleryButton);

    productCard.appendChild(productsButtons);

    var productText = elementCreater("div", "product-text");

    var phoneName = elementCreater("div", "phone-name");
    phoneName.innerText = product.title;

    productText.appendChild(phoneName);

    var stars = elementCreater("div", "stars");
    for (let i = 0; i < 5; ++i) {
      var star_yes = elementCreater("i", "fa-solid fa-star");
      star_yes.style.color = '#ff3465'
      var star_no = elementCreater("i", "fa-regular fa-star");

      if(i < product.rating) stars.appendChild(star_yes);
      else stars.appendChild(star_no);
    }
    var commentsP = elementCreater("p", 'comments');
    commentsP.innerText = `(${product.comments})`;
    stars.appendChild(commentsP);

    productText.appendChild(stars);

    var pricesDiv = elementCreater("div", "prices-list");
    var totalPrice = elementCreater("p", "phone-name");
    var realPrice = elementCreater("p", "real-price");
    // totalPrice.innerText = `$${product.real_price.toLocaleString('en-US')}`;
    // realPrice.innerText = product.actual_price;
    totalPrice.innerText = `$${priceDecider(Number(product.actual_price), Number(product.discount)).toLocaleString('en-US')}`
    realPrice.innerText = `$ ${product.actual_price.toLocaleString('en-US')}`

    var discountSpan = elementCreater("span", "");
    discountSpan.innerText = `${product.discount}% off`;

    pricesDiv.appendChild(totalPrice);
    pricesDiv.appendChild(realPrice);
    pricesDiv.appendChild(discountSpan);

    productText.appendChild(pricesDiv);

    var colors = elementCreater("div", "colors");
    var grey = elementCreater("div", "grey");
    var black = elementCreater("div", "black");
    var yellow = elementCreater("div", "yellow");
    colors.appendChild(grey);
    colors.appendChild(black);
    colors.appendChild(yellow);

    productText.appendChild(colors);

    productCard.appendChild(productText);

    document.getElementById(idToPut).appendChild(productCard);
  });
}
go(kraya_mobiles, "products-list");
go(kraya_mobiles, "products-list-desk");

// INCREMENT OF HEARTS
function make_it_heart(mob) {
  var heartIcon = document.getElementById("fa-heart");
  mob.style.backgroundColor = "red";
  mob.style.color = "white";
  var heartsCount = Number(heartIcon.title);
  heartIcon.title = heartsCount + 1;
}

function remove_heart(mob) {
  var heartIcon = document.getElementById("fa-heart");
  mob.style.backgroundColor = "white";
  mob.style.color = "black";
  var heartsCount = Number(heartIcon.title);
  if (heartsCount == 0) return;
  heartIcon.title = heartsCount - 1;
}

function hearts_counts_setter() {
  var hearts = document.getElementsByClassName("heart");

  for (let i = 0; i < hearts.length; ++i) {
    var heart = hearts[i];
    console.log(heart);
    heart.addEventListener("click", function () {
      var hearted_one = ''
      console.log(this);
      if (this.style.backgroundColor == "red" && this.style.color == "white") {
      // if (this.style.backgroundColor == "red" && this.style.color == "white") {
        hearted_one = kraya_mobiles.filter(item => {
          if(item.id == Number(this.parentElement.id)) {
            item.isHearted = false
          }
          return item;
        })
        remove_heart(this)
      }
      else {
        hearted_one = kraya_mobiles.filter(item => {
          if(item.id == Number(this.parentElement.id)) {
            item.isHearted = true
          }
          return item;
        })
        make_it_heart(this)
      }
      kraya_mobiles = [...hearted_one]
      console.log(kraya_mobiles);
    });
  }
}
hearts_counts_setter()

// INCREMENT OF CARTS
function carts_count_setter() {
  var buttons = document.getElementsByClassName("cart");

  for (let i = 0; i < buttons.length; ++i) {
    var button = buttons[i];
    button.addEventListener("click", function () {
      var cartIcon = document.getElementById("fa-cart-shopping");

      if (this.innerText == "ADDED TO THE CART") {
        this.innerText = "ADD TO CART";
        this.style.backgroundColor = "#FF3465";
        var cartsCount = Number(cartIcon.title);
        if (cartsCount == 0) return;
        cartIcon.title = cartsCount - 1;
        return;
      }
      this.innerText = "ADDED TO THE CART";
      this.style.backgroundColor = "green";

      var cartsCount = Number(cartIcon.title);
      cartIcon.title = cartsCount + 1;
    });
  }
}
carts_count_setter()

// ACCORDION
var accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// SLIDER
function theSlider() {
  function setSliderValue (event, ui) {
    let minValue = ui.values[0];
    let maxValue = ui.values[1];
    document.getElementById(
      "amount-min"
    ).innerText = `$${minValue.toLocaleString("en-US")}`;
    document.getElementById(
      "amount-max"
    ).innerText = `$${maxValue.toLocaleString("en-US")}`;
  }
  $("#slider").slider({
    range: true,
    min: 10000,
    max: 100000,
    values: [10000, 100000],
    slide:setSliderValue
  });
}
theSlider()

// ADDING THE BRAND INTO THE FILTER AND REMOVING THE BRAND FROM FILTER USING X
function remover_brand_filter(item) {
  document.getElementById(item.name).remove()
  theSlider()
    document.getElementById(
      "amount-min"
    ).innerText = "$10,000";
    document.getElementById(
      "amount-max"
    ).innerText = "$100,000";
}

$(function () {
  $(".brands-ul li input").on('click', function() {
    if(!this.checked) {
      remover_brand_filter(this)
      return
    }
    const filter_to_add = 
      `<p class="added-filter" id=${this.name}>
          <span>&#10005;</span> ${this.name}
        </p>`
    document.getElementById('filter-added-waala').innerHTML += filter_to_add

    // REMOVING THE BRAND FROM FILTER USING X
    $('.added-filter span').on('click', function() {
      $(this).parent().remove()
      unchecker_radios($(this).parent()[0].id)
    })

});
})

// FILTERING BASED ON THE BRAND
function filter_the_data(mobile) {
  var to_be_filtered = document.getElementsByClassName('added-filter')
  var to_be_filtered_items = []
  for(let i=0; i<to_be_filtered.length; ++i) {
    var text = to_be_filtered[i].innerText.split(" ")[1]
    to_be_filtered_items.push(text)
  }
  const filtered_items = mobile.filter((el) => {
    return to_be_filtered_items.some((f) => {
      return f === el.brand;
    });
  });

  // document.getElementById('products-list-desk').innerHTML = ''
  // if(filtered_items.length == 0) go(mobile, "products-list-desk")
  // else go(filtered_items, "products-list-desk");

  return filtered_items.length > 0 ? filtered_items : mobile
}

document.getElementById('filter-added-waala').addEventListener('DOMSubtreeModified', ()=> {
  overAllFiltering(kraya_mobiles)
})

function overAllFiltering(mobile){
  let new_data=filter_the_data(mobile)
  let another_new_data = filter_the_data_by_price(new_data, Number(document.getElementById('amount-min').innerText.substr(1).replace(',','')), Number(document.getElementById('amount-max').innerText.substr(1).replace(',','')))
    if(another_new_data.length == 0) {
      document.getElementById('products-list-desk').innerHTML = "No products matched for this filter. &#128546; &#128546;"
    }
    else {
      document.getElementById('products-list-desk').innerHTML = ''
      another_new_data = another_new_data.filter(item => {
        return item.isHearted || item.isWished
      })
      go(another_new_data, "products-list-desk")
    }
    return another_new_data
}

// CLEARING ALL THE FILTERS
$(function() {
  document.getElementById('clearAll').addEventListener('click', ()=> {
    document.getElementById('filter-added-waala').innerHTML = ''
    document.getElementById('products-list-desk').innerHTML = ''
    go(mobile, "products-list-desk")
    var checks = document.getElementsByClassName('checker')
    for(let i=0; i<checks.length; ++i) {
        checks[i].checked = false
    }
    theSlider()
    document.getElementById(
      "amount-min"
    ).innerText = "$10,000";
    document.getElementById(
      "amount-max"
    ).innerText = "$100,000";
  })
})

// UNCHECKING THE RADIOS
function unchecker_radios(val) {
  var checks = document.getElementsByClassName('checker')
  for(let i=0; i<checks.length; ++i) {
    if(val == checks[i].name) {
      checks[i].checked = false
    }
  }
}

// FILTERING BASED ON AMOUNT
function filter_the_data_by_price(mobile, min, max) {
  const filtered_items = mobile.filter((el) => {
    return min <= priceDecider(Number(el.actual_price), Number(el.discount)) && priceDecider(Number(el.actual_price), Number(el.discount)) <= max
  });
  return filtered_items
  // document.getElementById('products-list-desk').innerHTML = ''
  // go(filtered_items, "products-list-desk");
}

function min_max_getter() {
  const amounts = document.getElementsByClassName('amount')
  for(let i=0; i<amounts.length; ++i) {
    amounts[i].addEventListener('DOMSubtreeModified', function() {
      // filter_the_data_by_price(mobile, Number(amounts[0].innerText.substr(1).replace(',','')), Number(amounts[1].innerText.substr(1).replace(',','')))
      overAllFiltering(kraya_mobiles)
    })
  }
}
min_max_getter()

// PRICE LOW HIGH
document.getElementById('low-high').addEventListener('click', ()=> {
  function compare( a, b ) {
    a = priceDecider(a.actual_price, a.discount)
    b = priceDecider(b.actual_price, b.discount)

    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }
  var data = overAllFiltering(mobile)
  data.sort( compare );
  document.getElementById('products-list-desk').innerHTML = ''
  go(data, "products-list-desk")
})

// FIXING THE IMAGE FLICKERING
// const images = document.getElementsByClassName('product-img')
// for(let i=0; i<images.length; ++i) {
//   images[i].addEventListener('mouseover', function() {
//     const buttons = document.getElementsByClassName('product-buttons')
//     for(let j=0; j<buttons.length; ++j) {
//       buttons[j].style.display = 'flex'
//       buttons[j].style.padding = '1rem'
//       buttons[j].style.backgroundColor = '#999999'
//       buttons[j].addEventListener('mouseleave', function() {
//         buttons[j].style.display = 'none'
//         console.log("mouse left form drawer");
//         images[i].addEventListener('mouseover', function(){})
//       })
//     }
//   })
// }

// mobile.map(item => {
//     const product = `
//     <div class="product">
//     <img src=${item.img} alt="Mobile">
//     <span class="heart">
//       <i class="fa-regular fa-heart"></i>
//     </span>
//     <div class="product-buttons">
//       <button class="cart">ADD TO CART</button>
//       <button class="gallery">VIEW GALLERY</button>
//     </div>
//     <div class="product-text">
//       <p class="phone-name">${item.title}</p>
//       <div class="">
//         <p class="phone-name">${item.real_price}</p>
//         <p class="real-price">${item.actual_price}</p>
//         <span>${item.discount}</span>
//       </div>
//       <div class="stars">
//         <i class="fa-regular fa-star"></i>
//         <i class="fa-regular fa-star"></i>
//         <i class="fa-regular fa-star"></i>
//         <i class="fa-regular fa-star"></i>
//         <i class="fa-regular fa-star"></i>
//         <p>(0)</p>
//       </div>
//       <div class="colors">
//         <div class="grey"></div>
//         <div class="black"></div>
//         <div class="yellow"></div>
//       </div>
//     </div>
//   </div>
//     `
//     document.getElementById('products-list').innerHTML += product
// })
