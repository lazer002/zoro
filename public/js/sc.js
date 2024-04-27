

$(document).on('change', '#product_category', function () {

  var value = $('#product_category').val();
  if (value === 'PC') {

    console.log(value);
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);


      var product_image = $('#product_image')[0].files;

      console.log(product_image, 'formdata');
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }
      $.ajax({
        type: 'POST',
        url: '/pc',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {

        }
      });
    });
  }
  else if (value === 'CONTROLLER') {
    console.log(value, 'value')
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);

      // Append each file to formdata
      var product_image = $('#product_image')[0].files;
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/controller',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {
          // Handle error
        }
      });
    });
  }


  else if (value === 'HEADPHONE') {
    console.log(value, 'value')
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);

      // Append each file to formdata
      var product_image = $('#product_image')[0].files;
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/HEADPHONE',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {
          // Handle error
        }
      });
    });
  }



  else if (value === 'KEYBOARD') {
    console.log(value, 'value')
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);

      // Append each file to formdata
      var product_image = $('#product_image')[0].files;
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/KEYBOARD',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {
          // Handle error
        }
      });
    });
  }



  else if (value === 'LAPTOP') {
    console.log(value, 'value')
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);

      // Append each file to formdata
      var product_image = $('#product_image')[0].files;
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/LAPTOP',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {
          // Handle error
        }
      });
    });
  }


  else if (value === 'MOUSE') {
    console.log(value, 'value')
    $('#category_sbbtn').on('click', function () {
      function rendom(e) {
        randomid = Math.floor(Math.random() * e)
        _id = `product_${randomid}`
        return _id
      }
      idd = rendom(1000)
      $('#product_id').val(idd);

      var product_category = $('#product_category').val();
      var product_id = $('#product_id').val();
      var product_name = $('#product_name').val();
      var product_dis = $('#product_dis').val();
      var product_price = $('#product_price').val();
      var orignal_price = $('#orignal_price').val();

      var formdata = new FormData();
      formdata.append('product_category', product_category);
      formdata.append('product_id', product_id);
      formdata.append('product_name', product_name);
      formdata.append('product_dis', product_dis);
      formdata.append('product_price', product_price);
      formdata.append('orignal_price', orignal_price);

      // Append each file to formdata
      var product_image = $('#product_image')[0].files;
      for (var i = 0; i < product_image.length; i++) {
        formdata.append('product_image', product_image[i]);
      }

      $.ajax({
        type: 'POST',
        url: '/MOUSE',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
          alert('product added')
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },

        error: function (error) {
          // Handle error
        }
      });
    });
  }
});


$(document).ready(function () {
  $(document).on('click', '#edit_but', function () {

    var trow = $(this).closest('tr')
    var tdata = trow.find('td')

    const product_id = tdata[1].innerText
    a = tdata[4].innerText
    const product_category = a.toLowerCase()

    $.ajax({
      type: 'POST',
      url: '/edit_product',
      data: {
        product_id: product_id,
        product_category: product_category
      },
      success: function (response) {
        console.log(response.product[0].product_image);
        $('.product_id').val(response.product[0].product_id)
        $('.product_image').val(response.product[0].product_image)
        $('.product_name').val(response.product[0].product_name)
        $('.product_category').val(response.product[0].product_category)
        $('.product_dis').val(response.product[0].product_dis)
        $('.product_price').val(response.product[0].product_price)
        $('.orignal_price').val(response.product[0].orignal_price)

        $('#editModal').modal('show');
      }

    })
  })
})


$(document).ready(function () {
  $(document).on('click', '.product_image', function () {
    let editb = $('#product_image_edit')
    editb.click()
    editb.text(editb.val())
  })
})

$(document).on('click', '#edit_sbbtn', function () {


  var product_category = $('#edit_category').val().toLowerCase();
  var product_id = $('#edit_id').val();
  var product_name = $('#edit_name').val();

  var product_dis = $('#edit_dis').val();
  var product_price = $('#edit_price').val();
  var orignal_price = $('#edit_price').val();

  var formdata = new FormData();
  formdata.append('product_category', product_category);
  formdata.append('product_id', product_id);
  formdata.append('product_name', product_name);
  formdata.append('product_dis', product_dis);
  formdata.append('product_price', product_price);
  formdata.append('orignal_price', orignal_price);


  var product_image = $('#product_image_edit')[0].files;
  for (var i = 0; i < product_image.length; i++) {
    formdata.append('product_image', product_image[i]);
  }

  $.ajax({
    type: 'POST',
    url: '/pc_update',
    data: formdata,
    contentType: false,
    processData: false,
    success: function (response) {
      alert('product added')
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },

    error: function (error) {

    }
  });
});

$(document).ready(function () {
  $(document).on('click', '#delete_but', function () {

    var trow = $(this).closest('tr')
    var tdata = trow.find('td')

    const product_id = tdata[1].innerText
    a = tdata[4].innerText
    const product_category = a.toLowerCase()

    $.ajax({
      type: 'POST',
      url: '/delete_pro',
      data: {
        product_id: product_id,
        product_category: product_category
      },
      success: function (response) {
        alert("delete")
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      }

    })
  })
})




$(document).ready(function () {
  $(document).on('click', '#show_but', function () {

    var trow = $(this).closest('tr')
    var tdata = trow.find('td')

    const product_id = tdata[1].innerText
    a = tdata[4].innerText
    const product_category = a.toLowerCase()

    $.ajax({
      type: 'POST',
      url: '/show_product',
      data: {
        product_id: product_id,
        product_category: product_category
      },
      success: function (response) {
        console.log(response.product);
        $('.show_id').val(response.product[0].product_id)
        $('.show_name').text(response.product[0].product_name)
        $('.show_category').text(response.product[0].product_category)
        $('.show_dis').text(response.product[0].product_dis)
        $('.show_price').text(response.product[0].product_price + '₹')
        $('.orignal_price').text(response.product[0].orignal_price)
        $(document).ready(function () {
          // Assuming response.product[0].product_image is a comma-separated string of image URLs
          const images = response.product[0].product_image.split(',');

          // Generate the carousel HTML dynamically
          let carouselHtml = '<div id="carouselExample" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner">';

          images.forEach((element, index) => {
            carouselHtml += `<div class="carousel-item ${index === 0 ? 'active' : ''}" data-bs-interval="2000">
                                                                                  <img src="/static/images/category/product/${element.trim()}" class="img-fluid" alt="..." id="cart_img">
                                                                                </div>`;
          });

          carouselHtml += '</div></div>';

          // Set the generated HTML inside the .show_image element
          $('.show_image').html(carouselHtml);
        });
        $('#viewmodel').modal('show');
      }

    })
  })
})











$(document).ready(function () {



  $.ajax({
    type: 'GET',
    url: '/cartonpage',

    success: function (response) {

      document.getElementById('cartbody').innerHTML = ' ';

      for (let i = 0; i < response.product.length; i++) {
        $('#cartbody').append(`
                                        <div class="py-3 border-bottom border-success">
                                          <div class="row">
                                         
                                            <img src="/static/images/category/product/${response.product[i].cart_image}" alt="" class="img-fluid">
                                        
                                          <div class="col-6">
                                            <span class="ps-2">${response.product[i].cart_pname}</span>
                                          </div> 
                                          <div class="col-2 pt-1">
                                           ${response.product[i].cart_pprice}
                                          </div>
                                            <div class="col-2">
                                              <input type="number" value="${response.product[i].product_quantity}"
                                      class="bg-black text-light w-100 out rounded-2 p-2" id="product_quantity">
                                        <input type="hidden" name="" id="product_id" value="${response.product[i].product_id}">
                          
                                          </div>
                                            <div class="col-2 ">
                                              <button class="dddd bcolor rounded-2 border-0 p-2">
                                              <img src="/static/images/icon/delete.png" alt="">
                                            </button>
                                          </div> 
                                          </div> 
                                        </div>
                                      `);
      }
    }
  });
})




$(document).ready(function () {

  $(document).on('keyup', '#product_quantity', function () {
    var a = $(this).closest('div').find('#product_quantity')
    var bb = a.val()
    var b = Number(bb)
    var c = $(this).closest('div').find('#product_id')
    var d = c.val()

    if (b !== '' && b !== 0) {
      $.ajax({
        type: 'POST',
        url: '/quantity_change',
        data: {
          product_quantity: b, product_id: d
        },
        success: function (response) {
        }
      })
    }
    else if (b === 0) {
      $.ajax({
        type: 'POST',
        url: '/delete_cart',
        data: { product_id: d },
        success: function (response) {
          window.location.reload()
        }
      })
    }

    else {
      alert('quantity cant be null')
    }
  })

  $(document).on('click', '.dddd', function () {



    var product_id = $(this).closest('button').parent().parent('div').find('#product_id').val()

    $.ajax({
      type: 'POST',
      url: '/delete_cart',
      data: {
        product_id: product_id

      },
      success: function (response) {
        alert("delete")
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      }


    })

  })
})




$(document).on('click', function (event) {
  var clickedOutsideCollapse = true;

  // Check if the click is outside of any collapse area
  $('.collapse').each(function () {
    if ($(this).hasClass('show') && $(event.target).closest('.collapse').is($(this))) {
      clickedOutsideCollapse = false;
    }
  });

  // If the click is outside of any collapse area, close the opened collapse
  if (clickedOutsideCollapse) {
    $('.collapse.show').collapse('hide');
  }
});





$(document).ready(function () {
  $(document).on('click', '#logout', function () {
    $.ajax({
      type: 'GET',
      url: '/logout',
      data: { "lala": 'lalal' },
      success: function (response) {
        if (response.msg == 'logout') {
          console.log(response.msg);
          window.location.reload()
        }
      }
    })
  })
})




$(document).ready(function() {
  $('.table').DataTable({
    responsive: true,
    // "pageLength": 25,
    "columnDefs": [{
      "targets": 'no-sort',
      "orderable": false,
    }],
    "language": {
    
      "zeroRecords": "Nothing found. Please change your search term",
      "info": "Page _PAGE_ of _PAGES_",
      "infoEmpty": "No results",
      "infoFiltered": "(filtered out of _MAX_)",
      "search": "Search:",
      "paginate": {
        "first": "First",
        "last": "Last",
        "next": ">>",
        "previous": "<<"
      }
    },
    "ordering": false,
    "lengthMenu": [], // Hide the length menu
    "paging": true, // Disable pagination
    // "searching": false, // Disable search input
    "info": false // Hide information display
  });

  // Add event listener for search input
  $('#search-input').on('keyup', function() {
    $('.table').DataTable().search($(this).val()).draw();
  });
});