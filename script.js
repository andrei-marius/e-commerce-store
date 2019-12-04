"use strict";

 let shoppingCart = (function () {
 let cart = [];
 let obj = {};

  function saveCart() {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  };

  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  };

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  };

  obj.addItemToCart = function (name, price, count) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  obj.removeItemFromCart = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  obj.removeItemFromCartAll = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  obj.totalCount = function () {
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  obj.listCart = function () {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();

function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  for (let i in cartArray) {
    output += "<tr>" +
      "<td>" + cartArray[i].name + "</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
      "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
      " = " +
      "<td>" + cartArray[i].total + "</td>" +
      "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
};

$('.add-to-cart').click(function (e) {
  e.preventDefault();
  let name = $(this).data('name');
  let price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

$('.show-cart').on("click", ".delete-item", function (e) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$('.show-cart').on("click", ".minus-item", function (e) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

$('.show-cart').on("click", ".plus-item", function (e) {
  let name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
});

$('.show-cart').on("change", ".item-count", function (e) {
  let name = $(this).data('name');
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

$(".card-img-top").on("error", function () {
  $(this).attr("src", "/assets/Placeholder-Product-Image.jpg");
});
displayCart();
