const express = require("express")
const multer = require('multer')
const connection = require('../connections/connection')
const router = express.Router()






router.get('/login', async (req, res) => {
   await res.render('admin/login')
})



router.post('/login', async (req, res) => {
   const { user_email, user_pass } = req.body
   let query = `select * from signup where user_email = '${user_email}' and user_pass = '${user_pass}'`
   connection.query(query, (err, results) => {
      if (err) throw err;
      else {
         if (results.length > 0) {
            let user_role = results[0].user_role
            req.session.user = results
            res.send({ user_role: user_role })

         }
         else {
            res.send({ user_role: 'login' })
         }
      }

   })
})


router.get('/signup', async (req, res) => {
   await res.render('admin/signup')
})



router.get('/', async (req, res) => {
   query1 = `select * from 	
   banner`
    connection.query(query1, (err, banner) => {
      if (err) throw err;
    res.render('index',{banner:banner})
})})

router.get('/admin', async (req, res) => {
   if(req.session.user){

  
   await res.render('admin/dashboard')
}else{
   res.redirect('/signup')
}
})

// DASHBOARD BANNER
router.get('/dashboard_banner', async (req, res) => {
   await res.render('admin/banner')
})

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/banner')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const bnr_upload = multer({ storage })

router.post('/dash_banner', bnr_upload.single('main_banner'), async (req, res) => {

   const main_banner = req.file.filename;
   const { banner_title, banner_dis, banner_link } = req.body
   let query = `insert into banner(main_banner,banner_title,banner_dis,banner_link) values('${main_banner}','${banner_title}','${banner_dis}','${banner_link}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/dash_banner')
   })
})


// DASHBOARD BANNER



// CATOGARY

router.get('/category', async (req, res) => {
   query = `select * from category`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.render('admin/category', { category: results })
   })
})


const storage1 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/pro_category')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const upload_category = multer({ storage: storage1 });

router.post('/category', upload_category.fields([{ name: 'product_image' }, { name: 'sub_product_image' }]), async (req, res) => {
   try {

      const product_image = req.files['product_image'][0].filename;
      const sub_product_image = req.files['sub_product_image'][0].filename;
      const { product_category, product_name } = req.body;

      // Parameterized query to prevent SQL injection
      const query = `insert into category(product_category,product_image,product_name,sub_product_image) values('${product_category}','${product_image}','${product_name}','${sub_product_image}')`;

      await connection.query(query, (err, results) => {
         if (err) throw err;
         res.redirect('/category');
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});
// CATOGARY


// carausal banner

router.get('/carausal_banner', async (req, res) => {
   query = `select * from category`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.render('admin/dash', { category: results })
   })
})

const dash_banner = multer({ dest: '/public/images/category/carousel' })
router.post('/carausal_banner', dash_banner.single('carausal_image'), async (req, res) => {

   const carausal_image = req.file.filename;
   const { carausal_title, carausal_category, carausal_dis, carausal_link } = req.body
   let query = `insert into carausal_banner(carausal_image,carausal_title,carausal_category,carausal_dis,carausal_link) values('${carausal_image}','${carausal_title}','${carausal_category}','${carausal_dis}','${carausal_link}')`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.redirect('/category')
   })
})


// carausal banner






// PC BANNER
router.get('/product', async (req, res) => {
   query = `select * from category`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.render('admin/product', { category: results })
   })
})

const storage2 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const product_upload = multer({ storage: storage2 })
router.post('/pc', product_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   console.log(req.body);
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into pc(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})


// ####################################


// PC BANNER


const storage4 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const HEADPHONE_upload = multer({ storage: storage4 })
router.post('/HEADPHONE', HEADPHONE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into headphone(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})

// ####################################



const storage5 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const KEYBOARD_upload = multer({ storage: storage5 })
router.post('/KEYBOARD', KEYBOARD_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into KEYBOARD(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})


const storage6 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const LAPTOP_upload = multer({ storage: storage6 })
router.post('/LAPTOP', LAPTOP_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into LAPTOP(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})


const storage7 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const MOUSE_upload = multer({ storage: storage7 })
router.post('/MOUSE', MOUSE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into MOUSE(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})






const storage3 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const contro_upload = multer({ storage: storage3 })
router.post('/controller', contro_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];
   console.log(product_image)
   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into controller(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})






// fwhaihfowajfojwaofjwaofj

router.get('/product_banner', async (req, res) => {
   await res.render('admin/product_banner')
})

const storage_dash = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/productbanner')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const bnnr_upload = multer({ storage: storage_dash })

router.post('/product_bann', bnnr_upload.single('product_banner'), async (req, res) => {
   console.log(req.body);
   const product_banner = req.file.filename;
   const { product_title, product_category, product_link } = req.body
   let query = `insert into dashboard_pro_pill(product_banner,product_title,product_category,product_link) values('${product_banner}','${product_title}','${product_category}','${product_link}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product_bann')
   })
})






router.get('/pcc', async (req, res) => {
   if(req.session.user){
   query = `select * from pc`
    connection.query(query, (err, results) => {
      if (err) throw err;
      query1 = `select * from 	
      CONTROLLER`
       connection.query(query1, (err, results1) => {
         if (err) throw err;
      res.render('pc', { pc: results,controller:results1 })
   })
})}
else{
   res.redirect('/login')
}
})




router.get('/product/:product_category/:product_id', async (req, res) => {
   if(req.session.user){
const {product_id,product_category}=req.params
let category = `select * from ${product_category} where product_id = '${product_id}'`
connection.query(category, (err, results) => {
   if (err) throw err;
   let product = `select * from cart where product_id = '${product_id}' and user_email = '${req.session.user[0].user_email}'`
   connection.query(product, (err, results1) => {
    if (err) throw err;
      res.render('product_param',{product:results,results1:results1})
  
})})}
else{
   res.redirect('/login')
}})






const cart_upload = multer({ dest: '/public/images/category/cart' })

router.post('/cart',cart_upload.single('cart_img'), async (req, res) => {
   console.log(req.body);

 const {product_category,product_quantity,cart_img,product_id,cart_pname,cart_pprice}=req.body
 let user= req.session.user[0].user_email;
  let product = `select * from cart where product_id = '${product_id}' and user_email = '${user}'`
  connection.query(product, (err, results) => {
   if (err) throw err;
   else{
      if(results.length>0){
         let quantity = `UPDATE cart SET product_quantity = '${product_quantity}'  where product_id = '${product_id}' and user_email = '${user}'`
         connection.query(quantity, (err, results) => {
            if (err) throw err;
         else{}})         
      }else{
         let query = 'INSERT INTO cart (product_category, product_quantity, product_id,cart_image,cart_pname,cart_pprice,user_email) VALUES (?, ?, ?, ?, ?, ?,?)';
         connection.query(query, [product_category, product_quantity, product_id, cart_img, cart_pname, cart_pprice,user], (err, results) => {
            if (err) throw err;
         else{}})   

      } 
   }
})})






router.get('/cart_page', async (req, res) => {
   if(req.session.user){

   let product = `select * from cart where user_email = '${req.session.user[0].user_email}'`
   connection.query(product, (err, results) => {
    if (err) throw err;
      res.render('cart_page',{product:results})
  
})}
else{
   res.redirect('/login')
}})



module.exports = router;