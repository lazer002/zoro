

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
           const product_category =  a.toLowerCase()
     alert(product_category)
                    $.ajax({
                        type: 'POST',
                        url: '/edit_product',
                        data: {
                            product_id:product_id,
                            product_category:product_category
                        },
                        success: function (response) {
                            console.log(response.product[0].product_image);
                         $('#product_id').val(response.product[0].product_id)
                         $('#product_image').val(response.product[0].product_image)
                         $('#product_name').val(response.product[0].product_name)
                         $('#product_category').val(response.product[0].product_category)
                         $('#product_dis').val(response.product[0].product_dis)
                         $('#product_price').val(response.product[0].product_price)
                         $('#orignal_price').val(response.product[0].orignal_price)

                           $('#editModal').modal('show');
                        }

})})})


$(document).ready(function () {
$(document).on('click', '.product_image',  function(){
let  editb = $('#product_image_edit')
editb.click()
editb.text(editb.val())
})
})

$(document).on('click', '#edit_sbbtn', function () {


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

