import mobile from "./data/data.json" assert { type: "json" };
var kraya_mobiles = []
kraya_mobiles = [...mobile]
var localData = JSON.parse(localStorage.getItem('data'))

if(localData) {
  if(localData.length == kraya_mobiles.length && checkJSONlocal()) {
    kraya_mobiles = [...localData]
    
    var local_hearts_count = JSON.parse(localStorage.getItem('heart-count'))
    var heartIcon = document.getElementById("fa-heart");
    heartIcon.title = local_hearts_count || 0
    
    var local_carts_count = JSON.parse(localStorage.getItem('cart-count'))
    var cartIcon = document.getElementById("fa-cart-shopping");
    cartIcon.title = local_carts_count || 0
  }
}
localStorage.setItem('data', JSON.stringify(kraya_mobiles))

// CROSS VERIFIER OF JSON DATA AND LOCAL DATA
function checkJSONlocal() {
  for(let i=0; i<kraya_mobiles.length; ++i) {
    return kraya_mobiles[i].id == localData[i].id && kraya_mobiles[i].new_sale == localData[i].new_sale && kraya_mobiles[i].sale == localData[i].sale && 
    kraya_mobiles[i].img == localData[i].img && 
    kraya_mobiles[i].brand == localData[i].brand && 
    kraya_mobiles[i].title == localData[i].title && 
    kraya_mobiles[i].rating == localData[i].rating && 
    kraya_mobiles[i].comments == localData[i].comments && 
    kraya_mobiles[i].actual_price == localData[i].actual_price && 
    kraya_mobiles[i].discount == localData[i].discount
  }
}

// ACCORDION
function theAccordion() {
    var accordion = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener("click", function () {
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
            this.children[1].style.transform = 'rotate('+0+'deg)'; 
          } else {
            panel.style.display = "block";
            this.children[1].style.transform = 'rotate('+180+'deg)'; 
          }
      });
    }
}
theAccordion()

// SLIDER
function theSlider() {
  function setSliderValue (event, ui) {
    let minValue = ui.values[0];
    let maxValue = ui.values[1];
    document.getElementById(
      "amount-min"
    ).innerText = `$ ${minValue.toLocaleString("en-US")}`;
    document.getElementById(
      "amount-max"
    ).innerText = `$ ${maxValue.toLocaleString("en-US")}`;
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
    productCard.tabIndex = "0"

    var imageCard = elementCreater("div", "imageCard")
    // imageCard.id = "imageCard"
    var productImage = new Image();
    productImage.src = product.img;
    productImage.className = "product-img"
    productImage.id = "product-img-id"
    productImage.alt = product.title
    productImage.setAttribute('loading', 'lazy')
    imageCard.appendChild(productImage)
    imageCard.tabIndex = '0'

    productCard.appendChild(imageCard);

    var heart = elementCreater("span", "heart");
    var i = elementCreater("i", "fa-regular fa-heart");
    hearts_counts_setter(heart)
    if(product.isHearted) {
      heart.style.backgroundColor = 'red'
      heart.style.color = 'white'
    }
    else {
      heart.style.backgroundColor = 'white'
      heart.style.color = 'black'
    }

    heart.appendChild(i);
    heart.tabIndex = '0'

    productCard.appendChild(heart);

    var productsButtons = elementCreater("div", "product-buttons");
    var cartButton = elementCreater("button", "cart");
    var galleryButton = elementCreater("button", "gallery");
    cartButton.innerText = "ADD TO CART";
    galleryButton.innerText = "VIEW GALLERY";
    cartButton.id = 'cart-button'
    productsButtons.appendChild(cartButton);
    productsButtons.appendChild(galleryButton);
    carts_count_setter(cartButton)
    if (product.isCart) {
      cartButton.innerText = "ADDED TO THE CART";
      cartButton.style.backgroundColor = "green";
    } 
    else {
      cartButton.innerText = "ADD TO CART";
      cartButton.style.backgroundColor = "#FF3465";
    }

    productCard.appendChild(productsButtons);

    var productText = elementCreater("div", "product-text");

    var phoneName = elementCreater("div", "phone-name");
    phoneName.innerText = product.title;
    phoneName.tabIndex = '0'

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
    totalPrice.tabIndex = '0'

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

    var sale_div = elementCreater("div", "sale-div");
    var newer = elementCreater("div", "newer")
    var saler = elementCreater("div", "saler")

    newer.innerText = "NEW"
    saler.innerText = "SALE"
    if(product.new_sale) sale_div.appendChild(newer)
    if(product.sale) sale_div.appendChild(saler)

    productCard.appendChild(sale_div)

    productCard.appendChild(productText);

    document.getElementById(idToPut).appendChild(productCard);
  });
  transforms_products()
  var filters = document.getElementsByClassName('added-filter')
  if(filters.length == 0) document.getElementById('clearAll').style.color = "#999999"
  else document.getElementById('clearAll').style.color = "#ff3465"
}
// go(kraya_mobiles, "products-list")
go(kraya_mobiles, "products-list-desk")

// window.addEventListener("resize", () => {
//   if(screen.width <= 760) go(kraya_mobiles, "products-list");
//   else {
//     go(kraya_mobiles, "products-list-desk");
//   }
// })

function transforms_products() {
  const container = document.getElementsByClassName('product');
  for(let i=0; i<container.length; ++i) {
    let isDoubleClick = false;
  
    container[i].children[0].addEventListener("dblclick", function () {
      isDoubleClick = !isDoubleClick;
      this.nextElementSibling.nextElementSibling.style.display = 'none'
      if(!isDoubleClick) {
        this.children[0].style.filter = 'blur(0px)'
          this.children[0].style.transformOrigin = "center center";
          this.children[0].style.transform = "scale(1)";
      }
    });
  
    container[i].children[0].addEventListener("mouseleave", function() {
      isDoubleClick = false
        this.children[0].style.transformOrigin = "center center";
        this.children[0].style.transform = "scale(1)";
    });
  
    container[i].addEventListener("mousemove", function(e) {
      if(!isDoubleClick) return
      let x = e.clientX - container[i].offsetLeft;
      let y = e.clientY - container[i].offsetTop;
      y = y<-400 ? -400 : y
      this.children[0].style.filter = 'blur(0px)'
      this.children[0].children[0].style.transformOrigin = `${x}px ${y}px`;
      this.children[0].children[0].style.transform = "scale(1.04)";
    });
  
    container[i].children[0].addEventListener("mouseover", function(e) {
      if(screen.width >= 760) {
        this.style.filter = 'blur(2px)'
        this.nextElementSibling.nextElementSibling.style.display = "flex";
        this.nextElementSibling.nextElementSibling.style.padding = '1rem'
      }
    });
    
    container[i].children[2].addEventListener("mouseover", function(e) {
      if(screen.width >= 760) {
          this.parentElement.children[0].style.filter = 'blur(2px)'
          this.style.display = "flex";
          this.style.padding = '1rem'
        }
    });
    
    container[i].children[0].addEventListener('mouseleave', function() {
      this.style.filter = 'blur(0px)'
      this.nextElementSibling.nextElementSibling.style.display = "none";
    })
  
  }
}

// INCREMENT OF HEARTS
function make_it_heart(mob) {
  var heartIcon = document.getElementById("fa-heart");
  mob.style.backgroundColor = "red";
  mob.style.color = "white";
  var heartsCount = Number(heartIcon.title);
  heartIcon.title = heartsCount + 1;
  localStorage.setItem('heart-count', heartIcon.title);
}

function remove_heart(mob) {
  var heartIcon = document.getElementById("fa-heart");
  mob.style.backgroundColor = "white";
  mob.style.color = "black";
  var heartsCount = Number(heartIcon.title);
  if (heartsCount == 0) return;
  heartIcon.title = heartsCount - 1;
  localStorage.setItem('heart-count', heartIcon.title)
}

function hearts_counts_setter(heart) {
  heart.addEventListener('click',  function() {
    var hearted_one = ''
    if (this.style.backgroundColor == "red" && this.style.color == "white") {
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
    localStorage.setItem('data', JSON.stringify(kraya_mobiles))
  })
}

// INCREMENT OF CARTS
function carts_count_setter(button) {
  button.addEventListener("click", function () {
    var cartIcon = document.getElementById("fa-cart-shopping");
    var carted_one = ''
    if (this.innerText == "ADDED TO THE CART") {
      this.innerText = "ADD TO CART";
      this.style.backgroundColor = "#FF3465";
      var cartsCount = Number(cartIcon.title);
      if (cartsCount == 0) return;
      cartIcon.title = cartsCount - 1;
      localStorage.setItem('cart-count', cartIcon.title)
      carted_one = kraya_mobiles.filter(item => {
        if(item.id == Number(this.parentElement.parentElement.id)) {
          item.isCart = false
        }
        return item;
      })
    }
    else {
      this.innerText = "ADDED TO THE CART";
      this.style.backgroundColor = "green";

      var cartsCount = Number(cartIcon.title);
      cartIcon.title = cartsCount + 1;
      localStorage.setItem('cart-count', cartIcon.title)
      carted_one = kraya_mobiles.filter(item => {
        if(item.id == Number(this.parentElement.parentElement.id)) {
          item.isCart = true
        }
        return item;
      })
    }

    kraya_mobiles = [...carted_one]
    localStorage.setItem('data', JSON.stringify(kraya_mobiles))
  });
}

// OVER ALL FILTER
function overAllFiltering(mobile){
    let new_data=filter_the_data(mobile)
    let another_new_data = filter_the_data_by_price(new_data, Number(document.getElementById('amount-min').innerText.substr(1).replace(',','')), Number(document.getElementById('amount-max').innerText.substr(1).replace(',','')))
    another_new_data = search_filtering(another_new_data)
    if(another_new_data.length == 0) {
      document.getElementById('products-list-desk').innerHTML = "No products matched for this filter. &#128546; &#128546;"
    }
    else {
      document.getElementById("products-list-desk").innerHTML = ''
      // go(another_new_data, "products-list");
      go(another_new_data, "products-list-desk");
    }
    return another_new_data
}

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

  return filtered_items.length > 0 ? filtered_items : mobile
}

document.getElementById('filter-added-waala').addEventListener('DOMSubtreeModified', ()=> {
  overAllFiltering(kraya_mobiles)
})

// FILTERING BASED ON AMOUNT
function filter_the_data_by_price(mobile, min, max) {
    const filtered_items = mobile.filter((el) => {
      return min <= priceDecider(Number(el.actual_price), Number(el.discount)) && priceDecider(Number(el.actual_price), Number(el.discount)) <= max
    });
    return filtered_items
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

// FILTERING BASED ON THE SEARCH
function search_filtering(mobiles) {
  var input = document.getElementById("text")
  var searched_product = ''
  searched_product = mobiles.filter(item => {
    return item.brand.toLowerCase() == input.value.toLowerCase()
  })
  input.value = ''
  
  // if(searched_product.length == 0) document.getElementById('products-list-desk').innerHTML = "No products matched for this filter. &#128546; &#128546;"
  return searched_product.length == 0 ? mobiles : mobiles = [...searched_product]
}

function search_filter(mobiles) {
  var input = document.getElementById("text")
  input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      overAllFiltering(mobiles)
    }
  })
}
search_filter(kraya_mobiles)

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
  function compare1( a, b ) {
    a = priceDecider(a.actual_price, a.discount)
    b = priceDecider(b.actual_price, b.discount)

    if ( a < b ){
      return 1;
    }
    if ( a > b ){
      return -1;
    }
    return 0;
  }
  var data = kraya_mobiles
  if(document.getElementById('low-high').classList.contains("lowhigh")) {
    data.sort( compare1 );
    document.getElementById('low-high').classList.remove("lowhigh")
    document.getElementById('low-high').innerText = 'Price high-Low'
  }
  else {
    data.sort( compare );
    document.getElementById('low-high').classList.add("lowhigh")
    document.getElementById('low-high').innerText = 'Price low-High'
  }
  document.getElementById('products-list-desk').innerHTML = ''
  overAllFiltering(data)
})

// NEWEST FIRST
document.getElementById('newest-first').addEventListener('click', () => {
  var data = []
  if(document.getElementById("newest-first").classList.contains("newest-first")) {
    kraya_mobiles.filter(item => {
      if(!item.new_sale) {
        data.unshift(item)
      }
      else {
        data.push(item)
      }
    })
    document.getElementById("newest-first").classList.add('newest-first')
    document.getElementById("newest-first").innerText = 'Oldest first'
  }
  else {
    kraya_mobiles.filter(item => {
      if(item.new_sale) {
        data.unshift(item)
      }
      else {
        data.push(item)
      }
    })
    document.getElementById("newest-first").classList.add('newest-first')
    document.getElementById("newest-first").innerText = 'Newest first'
  }
  kraya_mobiles = [...data]
  overAllFiltering(data)
})

// ADDING THE BRAND INTO THE FILTER AND REMOVING THE BRAND FROM FILTER USING X
function remover_brand_filter(item) {
    document.getElementById(item.name).remove()
}
  
$(function () { 
  $(".brands-ul li input").on('click', function() {
    if(!this.checked) {
      remover_brand_filter(this)
      return
    }
    const filter_to_add = 
    `<p class="added-filter" id=${this.name} tabindex="0">
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

// CLEARING ALL THE FILTERS
$(function() {
    document.getElementById('clearAll').addEventListener('click', ()=> {
      document.getElementById('filter-added-waala').innerHTML = ''
      document.getElementById('products-list-desk').innerHTML = ''
      document.getElementById('clearAll').style.color = "#999999"
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

// SORT BY ONCLICKS
const relevances = document.getElementsByClassName("relevance")
for(let i=0; i<relevances.length; ++i) {
  relevances[i].addEventListener("click", function () {
    for(let j=0; j<relevances.length; ++j) {
      relevances[j].classList.remove('active')
    }
    this.classList.add("active")
  })
}

// RELEVANCE SORT
function relevance(kraya_mobiles) {
  function compare( a, b ) {
    a = a.rating, b = b.rating
  
    if ( a < b ){
      return 1;
    }
    if ( a > b ){
      return -1;
    }
    return 0;
  }
  function compare1( a, b ) {
    a = a.rating, b = b.rating
  
    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }
  var data = kraya_mobiles
  if(document.getElementById("relevance").classList.contains("first")) {
    data.sort(compare1)
    document.getElementById("relevance").classList.remove("first")
  }
  else {
    data.sort( compare );
    document.getElementById("relevance").classList.add("first")
  }
  document.getElementById('products-list-desk').innerHTML = ''
  overAllFiltering(data)
}

document.getElementById("relevance").addEventListener("click", () => {
  relevance(kraya_mobiles)
})

// ONCLICK SHOWING THE INPUT
document.getElementById("glass").addEventListener("click", ()=> {
  var input = document.getElementById('text');
  if(input.style.display == 'block') input.style.display = 'none'
  else input.style.display = 'block'
})

// ASIDE FILTERS OPENING
document.getElementById("sortby").addEventListener("click", function() {
  document.getElementById("aside").classList.add("displayBlock")
  document.getElementById("aside").classList.remove("displayNone")
})

// SORTS FILTERS OPENING
document.getElementById("filters").addEventListener("click", function() {
  document.getElementById("products-top-right").classList.add("displayBlock")
  document.getElementById("products-top-right").classList.remove("displayNone")
})

// ASIDE FILTERS CLOSING
document.getElementById("cross").addEventListener("click", function() {
  document.getElementById("aside").classList.remove("displayBlock")
  document.getElementById("aside").classList.add("displayNone")
})

// SORTS FILTERS CLOSING
document.getElementById("cross1").addEventListener("click", function() {
  document.getElementById("products-top-right").classList.remove("displayBlock")
  document.getElementById("products-top-right").classList.add("displayNone")
})

document.getElementById("aside").addEventListener('click', function() {
  const checkers = document.getElementsByClassName("checker")
  for(let i=0; i<checkers.length; ++i) {
    checkers[i].addEventListener("click", function() {
      if(screen.width < 760) {
        document.getElementById("aside").classList.remove("displayBlock")
        document.getElementById("aside").classList.add("displayNone")
      }
    })
  }
})

$(function() {
  $('.accordion').on('focus', function(e){
    $(window).keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 9) {
           $('.accordion').keypress(function(e) {
            var key = e.which
            if(key == 13) {
              var panel = this.nextElementSibling;
              if (panel.style.display === "block") {
                panel.style.display = "none";
                this.children[1].style.transform = 'rotate('+0+'deg)'; 
              } else {
                panel.style.display = "block";
                this.children[1].style.transform = 'rotate('+180+'deg)'; 
              }
            }
           })
        }
    });
});
  // console.log(document);
})

$('.checker').keypress(function(e) {
  var key = e.which
  if(key == 13) {
    if(this.checked) {
      this.checked = false
      document.getElementById(this.name).remove()
      return
    }

    this.checked = true
    const filter_to_add = 
    `<p class="added-filter" id=${this.name} tabindex="0">
        <span>&#10005;</span> ${this.name}
        </p>`
    document.getElementById('filter-added-waala').innerHTML += filter_to_add

    // REMOVING THE BRAND FROM FILTER USING X
    $('.added-filter span').on('click', function() {
      $(this).parent().remove()
      unchecker_radios($(this).parent()[0].id)
    })
  }
 }) 

function stickyHeader() {
  var prevScrollpos = window.pageYOffset;

  var headerDiv = document.querySelector("header");

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos <= currentScrollPos ){
        headerDiv.classList.remove("fixedToTop");
        headerDiv.style.top ="-7rem";
    }
    else{  
        headerDiv.classList.add("fixedToTop");
        headerDiv.style.top = "0";
    }

    prevScrollpos = currentScrollPos;
  }
}
stickyHeader()

document.getElementById("goup").addEventListener("click", function() {
  window.scrollTo(0, 0)
})