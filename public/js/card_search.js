document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.getElementsByClassName('searchInput');

  if (searchInputs.length > 0) {
    for (let i = 0; i < searchInputs.length; i++) {
      searchInputs[i].addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();

        document.querySelectorAll('.pcard').forEach(card => {
          const productName = card.querySelector('.card-body p.card-text:first-child').textContent.toLowerCase();
  
          if (productName.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  } else {
    console.error("Search input element not found.");
  }
});


$(document).ready(function () {
  $('.card-body').each(function () { 
      var $this = $(this); 
      
      $this.find('.star').empty(); 
      
      var a = Math.floor(Math.random() *5)+1; 
      
      var stars = '★'.repeat(a); 
      
      $this.find('.star').append(stars); 
  });
  $('.ctype').each(function() {
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); 
    $(this).css('background-color', randomColor);
});
});


// JavaScript part
document.getElementById('sortSelect').addEventListener('change', function() {
  let criteria = this.value;
  sortProducts(criteria);
});

function sortProducts(criteria) {
  let productsContainer = document.getElementById('productContainer');
  let products = Array.from(productsContainer.children);
  
  products.sort(function(a, b) {
      let aData = getProductData(a);
      let bData = getProductData(b);
      
      if (criteria === 'name-asc') {
          return aData.productName.localeCompare(bData.productName);
      } else if (criteria === 'name-desc') {
          return bData.productName.localeCompare(aData.productName);
      } else if (criteria === 'price-desc') {
          return bData.productPrice - aData.productPrice;
      } else if (criteria === 'price-asc') {
          return aData.productPrice - bData.productPrice;
      } else if (criteria === 'rating-desc') {
          return bData.productRating - aData.productRating;
      } else if (criteria === 'rating-asc') {
          return aData.productRating - bData.productRating;
      }
  });

  // Clear existing products and append sorted products
  productsContainer.innerHTML = '';
  products.forEach(function(product) {
      productsContainer.appendChild(product);
  });
}

function getProductData(product) {
  let productName = product.querySelector('.card-text').innerText;
  let productPrice = parseFloat(product.querySelector('.fw-bold').innerText.substring(1)); // Assuming price is always prefixed with '₹'
  let productRating = parseFloat(product.querySelector('.star').innerText); // Assuming the star rating is represented as a number
  return { productName, productPrice, productRating };
}
