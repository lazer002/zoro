const express = require("express")
const multer = require('multer')
const connection = require('../connections/connection')
const router = express.Router()





router.get('/login', async (req, res) => {
   query5 = `select *  from signup where user_email = '${req.session.user}' and user_role = '${req.session.role}'`
   connection.query(query5, (err, name) => {
      coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
      connection.query(coun, (err, cou) => {
      
    res.render('admin/login',{name:name,cou:cou})
})})})

router.use((req, res, next) => {

   res.locals.user = req.session.user;
   res.locals.role = req.session.role;
   next();

});

const admingateway = function (req, res, next) {
   if (req.session.role == 'admin') {
      next();
   } else {
      res.redirect('/login');
   }
};


const gateway = function (req, res, next) {
   if (req.session.user) {
      next();
   } else {
      res.redirect('/login');
   }
};

router.post('/login', async (req, res) => {
   const { user_email, user_pass } = req.body
   let query = `select * from signup where user_email = '${user_email}' and user_pass = '${user_pass}'`
   connection.query(query, (err, results) => {
      if (err) throw err;
      else {
         if (results.length > 0) {
            let user_role = results[0].user_role
            req.session.user = results[0].user_email
            req.session.role = results[0].user_role
            req.session.num = results[0].user_number
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


const storge = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/profile')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const profile_upload = multer({ storage: storge })

router.post('/new_signup', profile_upload.single('user_profile'), async (req, res) => {
   console.log(req.body);
   let user_profile;
   if (req.file) {
      user_profile = req.file.filename;
   } else {

      user_profile = 'default.jpg';
   }
   const { user_email, user_pass, user_name, user_number, latitude, longitude } = req.body
   let query = `insert into signup(user_profile,user_email ,user_pass, user_name, user_number,latitude,longitude) values('${user_profile}','${user_email}','${user_pass}','${user_name}','${user_number}','${latitude}','${longitude}')`
   connection.query(query, (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })

   })
})



router.get('/profile', gateway, async (req, res) => {

   query5 = `select *  from signup where user_email = '${req.session.user}' and user_role = '${req.session.role}'`
   connection.query(query5, (err, name) => {
      qry = `select * from cart where user_email = '${req.session.user}' `
      console.log(qry,'kjk');
      connection.query(qry, (err, pc) => {
      console.log(pc,'kjk');

         if(typeof pc !='undefined'){

        
         console.log(pc.length);
         coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
         connection.query(coun, (err, cou) => {

            res.render('profile', { role: req.session, name: name, pc: pc, cou: cou })
         })
      }else{
         res.render('profile', { role: req.session, name:name, pc: ' ', cou: '0' })

      }
      })
   })
})








router.get('/', async (req, res) => {
   query1 = `select * from 	
   banner`
   connection.query(query1, (err, banner) => {
      if (err) throw err;
      query2 = 'select * from category ORDER BY product_category DESC'
      connection.query(query2, (err, category) => {
         if (err) throw err;
         query3 = `select * from 	
         carausal_banner where carausal_category = 'first_carausal'`
         connection.query(query3, (err, carausal) => {
            if (err) throw err;
            query4 = `select * from 	
            carausal_banner where carausal_category = 'second_carausal'`
            connection.query(query4, (err, carausal2) => {
               if (err) throw err;
               query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
               connection.query(query5, (err, reslt5) => {
                  coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
                  connection.query(coun, (err, cou) => {
                  
                     res.render('index', { banner: banner, product: category, carausal: carausal, carausal2: carausal2, name: reslt5, cou: cou })
                  })
               })
            })

         })
      })
   })
})

router.get('/admin', admingateway, async (req, res) => {
   if (req.session.user) {
      query = `SELECT * FROM signup ORDER BY id DESC`
      await connection.query(query, (err, user) => {
         if (err) throw err;
         res.render('admin/dashboard', { user: user })
      })
   } else {
      res.redirect('/login')
   }
})

// DASHBOARD BANNER
router.get('/dashboard_banner', admingateway, async (req, res) => {
   query = `select * from banner `
   connection.query(query, (err, banner) => {
      if (err) throw err;
      res.render('admin/banner', { banner: banner })
   })
})

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/banner')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const bnr_upload = multer({ storage })

router.post('/dash_banner', bnr_upload.single('main_banner'), async (req, res) => {

   const main_banner = req.file.filename;
   const { banner_id, banner_title, banner_dis, banner_link } = req.body
   let query = `insert into banner(main_banner,banner_id,banner_title,banner_dis,banner_link) values('${main_banner}','${banner_id}','${banner_title}','${banner_dis}','${banner_link}')`
   connection.query(query, (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })

   })
})


// DASHBOARD BANNER



// CATOGARY

router.get('/category', admingateway, async (req, res) => {
   query = `select * from category`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.render('admin/category', { category: results })
   })
})


const storage1 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/pro_category')
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

router.get('/user', async (req, res) => {
   query = `select * from signup`
   await connection.query(query, (err, user) => {
      if (err) throw err;
      res.render('admin/user', { user: user })
   })
})

// carausal banner

router.get('/carausal_banner', admingateway, async (req, res) => {
   query = `select * from category`
   connection.query(query, (err, results) => {
      if (err) throw err;
      query = `select * from carausal_banner`
      connection.query(query, (err, c_banner) => {
         if (err) throw err;
         res.render('admin/carausal_banner', { category: results, c_banner: c_banner })
      })
   })
})



const storag = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/carousel')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const dash_banner = multer({ storage: storag });

router.post('/carausal_banner', dash_banner.single('carausal_image'), async (req, res) => {

   const carausal_image = req.file.filename;
   const { carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id } = req.body
   let query = `insert into carausal_banner(carausal_image,carausal_title,carausal_category,carausal_dis,carausal_link,carausal_id) values('${carausal_image}','${carausal_title}','${carausal_category}','${carausal_dis}','${carausal_link}','${carausal_id}')`
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })
   })
})


// carausal banner






// PC BANNER
router.get('/product', admingateway, async (req, res) => {
   query = `select * from category`
   connection.query(query, (err, results) => {
      if (err) throw err;


      query1 = `select * from category inner join pc  on category.product_category = pc.product_category`
      connection.query(query1, (err, pc) => {
         if (err) throw err;

         query2 = `select * from category inner join mouse  on category.product_category = mouse.product_category`
         connection.query(query2, (err, mouse) => {
            if (err) throw err;

            query3 = `select * from category inner join laptop  on category.product_category = laptop.product_category`
            connection.query(query3, (err, laptop) => {
               if (err) throw err;

               query4 = `select * from category inner join keyboard  on category.product_category = keyboard.product_category`
               connection.query(query4, (err, keyboard) => {
                  if (err) throw err;

                  query5 = `select * from category inner join headphone  on category.product_category = headphone.product_category`
                  connection.query(query5, (err, headphone) => {
                     if (err) throw err;

                     query6 = `select * from category inner join controller  on category.product_category = controller.product_category`
                     connection.query(query6, (err, controller) => {
                        if (err) throw err;
                        var pro = []
                        pro.push({ controller: controller, headphone: headphone, keyboard: keyboard, laptop: laptop, mouse: mouse, pc: pc })

                        res.render('admin/product', { category: results, pro: pro })
                     })
                  })
               })
            })
         })
      })
   })
})



// // PC BANNER
// router.get('/product', async (req, res) => {
//    query = `select * from category`
//     connection.query(query, (err, results) => {
//       if (err) throw err;
//       else{
//         for (let i = 0; i < results.length; i++) {
//          let a = results[i].product_category

//      let query1 = `select * from ${a} inner join category on ${a}.product_category = category.product_category`

//      connection.query(query1, (err, product) => {
//          if (err) throw err;

//          res.render('admin/product', { category: results,product:product })
//       })}}
//    })})

const storage2 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const product_upload = multer({ storage: storage2 })
router.post('/pc', product_upload.fields([{ name: 'product_image' }]), async (req, res) => {

   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into pc(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;
console.log(results);
      res.redirect('/product')
   })
})


// ####################################


// PC BANNER


const storage4 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const HEADPHONE_upload = multer({ storage: storage4 })
router.post('/headphone', HEADPHONE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

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
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const KEYBOARD_upload = multer({ storage: storage5 })
router.post('/keyboard', KEYBOARD_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into keyboard(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})


const storage6 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const LAPTOP_upload = multer({ storage: storage6 })
router.post('/laptop', LAPTOP_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into laptop(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})


const storage7 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const MOUSE_upload = multer({ storage: storage7 })
router.post('/mouse', MOUSE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into mouse(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})






const storage3 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const contro_upload = multer({ storage: storage3 })
router.post('/controller', contro_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `insert into controller(product_category,product_id,product_image,product_name,product_dis,product_price,orignal_price) values('${product_category}','${product_id}','${product_image.join(',')}','${product_name}','${product_dis}','${product_price}','${orignal_price}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})






// fwhaihfowajfojwaofjwaofj

router.get('/product_banner', admingateway, async (req, res) => {
   query = `select * from category`
   connection.query(query, (err, category) => {
      if (err) throw err;
      query = `select * from product_banner`
      connection.query(query, (err, banner) => {
         if (err) throw err;
         res.render('admin/product_banner', { category: category, banner: banner })
      })
   })
})

const storage_dash = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/productbanner')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const bnnr_upload = multer({ storage: storage_dash })

router.post('/product_bann', bnnr_upload.single('product_banner'), async (req, res) => {

   const product_banner = req.file.filename;
   const { product_title, product_category, product_link, banner_id } = req.body
   let query = `insert into product_banner(product_banner,product_title,product_category,product_link,banner_id) values('${product_banner}','${product_title}','${product_category}','${product_link}','${banner_id}')`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.send({ msg: 'ok' })
   })
})






router.get('/PC', async (req, res) => {

   query = `select * from pc`
   connection.query(query, (err, results) => {
      if (err) throw err;
      query1 = `select product_banner,product_title,product_link from product_banner inner join category  on product_banner.product_category = category.product_category where product_banner.product_category ='PC'`
      connection.query(query1, (err, banner) => {
         if (err) throw err;
         query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
         connection.query(query5, (err, name) => {
            coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
            connection.query(coun, (err, cou) => {
               res.render('pc', { pc: results, banner: banner, name: name, cou: cou })
            })
         })
      })
   })

})


router.get('/controller', async (req, res) => {
   query = `select * from controller`
   connection.query(query, (err, results) => {
      if (err) throw err;
      query1 = `select product_banner,product_title,product_link from product_banner inner join category  on product_banner.product_category = category.product_category where product_banner.product_category ='controller'`
      connection.query(query1, (err, banner) => {
         if (err) throw err;
         query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
         connection.query(query5, (err, name) => {
            coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
            connection.query(coun, (err, cou) => {
               res.render('controller', { controller: results, banner: banner, name: name, cou: cou })
            })
         })
      })
   })
})


router.get('/laptop', async (req, res) => {
   query = `select * from laptop`
   connection.query(query, (err, results) => {
      if (err) throw err;
      query1 = `select product_banner,product_title,product_link from product_banner inner join category  on product_banner.product_category = category.product_category where product_banner.product_category ='laptop'`
      connection.query(query1, (err, banner) => {
         if (err) throw err;
         query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
         connection.query(query5, (err, name) => {
            coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
            connection.query(coun, (err, cou) => {
               res.render('laptop', { laptop: results, banner: banner, name: name, cou: cou })
            })
         })
      })
   })
})

router.get('/accessories', async (req, res) => {
   query = `select * from keyboard`
   connection.query(query, (err, keyboard) => {
      if (err) throw err;
      query = `select * from mouse`
      connection.query(query, (err, mouse) => {
         if (err) throw err;
         query = `select * from headphone`
         connection.query(query, (err, headphone) => {
            if (err) throw err;
            query1 = `select product_banner,product_title,product_link from product_banner inner join category  on product_banner.product_category = category.product_category where product_banner.product_category ='keyboard'`
            connection.query(query1, (err, banner) => {
               if (err) throw err;
               query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
               connection.query(query5, (err, name) => {
                  coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
                  connection.query(coun, (err, cou) => {
                     res.render('accessories', { keyboard: keyboard, mouse: mouse, headphone: headphone, banner: banner, name: name, cou: cou })
                  })
               })
            })
         })
      })
   })
})

router.get('/service', async (req, res) => {
   query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
   connection.query(query5, (err, name) => {
      coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
      connection.query(coun, (err, cou) => {
         res.render('service', { name: name, cou: cou })
      })
   })
})

router.get('/community', async (req, res) => {
   query1 = `select * from 	
   banner where banner_dis = ' '`
   connection.query(query1, (err, banner) => {
      if (err) throw err;
      query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
      connection.query(query5, (err, name) => {
         coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
         connection.query(coun, (err, cou) => {
            res.render('community', { banner: banner, name: name, cou: cou })
         })
      })
   })
})


router.get('/product/:product_category/:product_id', async (req, res) => {

   const { product_id, product_category } = req.params
   let category = `select * from ${product_category.toLowerCase()} where product_id = '${product_id}'`
   connection.query(category, (err, results) => {

      if (err) throw err;
      let product = `select * from cart where product_id = '${product_id}' and user_email = '${req.session.user}'`
      connection.query(product, (err, results1) => {
         if (err) throw err;
         query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`
         connection.query(query5, (err, name) => {
            coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
            connection.query(coun, (err, cou) => {
               res.render('product_param', { product: results, results1: results1, name: name, cou: cou })

            })
         })
      })
   })

})



const storage_dashd = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/cart')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const cart_upload = multer({ storage: storage_dashd })


router.post('/cart', cart_upload.single('cart_img'), async (req, res) => {
   console.log(req.body);
   if (req.session.user) {

      const { product_category, product_quantity, cart_img, product_id, cart_pname, cart_pprice } = req.body
      let user = req.session.user;
      let product = `select * from cart where product_id = '${product_id}' and user_email = '${user}' `
      connection.query(product, (err, results) => {
         if (err) throw err;
         else {
            if (results.length > 0) {

               let quantity = `UPDATE cart SET product_quantity = '${product_quantity}'  where product_id = '${product_id}' and user_email = '${user}'`
               connection.query(quantity, (err, results) => {
                  if (err) throw err;
                  else {
                     res.send({ msg: 'user' })
                   }
               })
            } else {
               let query = `INSERT INTO cart (product_category, product_quantity, product_id,cart_image,cart_pname,cart_pprice,user_email) VALUES ('${product_category}', '${product_quantity}','${product_id}', '${cart_img}','${cart_pname}', '${cart_pprice}','${user}')`;
console.log(query);
               connection.query(query, (err, results) => {
                  if (err) throw err;
                  else { 
                     res.send({ msg: 'user' })
                  }
               })

            }
         }
      })

    

   } else {
      res.send({ msg: 'login' })
   }
})






router.get('/cart_page', async (req, res) => {
   if (req.session.user) {

      let product = `select * from cart where user_email = '${req.session.user}'`
      connection.query(product, (err, results) => {
         if (err) throw err;
         query5 = `select distinct user_profile from signup where user_email = '${req.session.user}'`

         connection.query(query5, (err, name) => {

            coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
            connection.query(coun, (err, cou) => {
               res.render('cart_page', { product: results, name: name, cou: cou })

            })
         })
      })
   }
   else {
      res.redirect('/login')
   }
})



router.get('/cartonpage', gateway, async (req, res) => {


   let product = `select * from cart where user_email = '${req.session.user}'`
   connection.query(product, (err, results) => {
      if (err) throw err;
      console.log(results.length);
      if (results.length == 0) {
         results = ' '
      } else {
         coun = `select count(*) as num_results from cart where user_email = '${req.session.user}'`
         connection.query(coun, (err, cou) => {
            res.send({ product: results, cou: cou })

         })
      }
   })
})


router.post('/quantity_change', async (req, res) => {
   if (req.session.user) {

      const { product_quantity, product_id } = req.body
      let product = `update cart set product_quantity = '${product_quantity}' where user_email = '${req.session.user}' and product_id = '${product_id}' `
      connection.query(product, (err, results) => {
         if (err) throw err;

         res.send({ product: results })

      })
   }
   else {
      res.redirect('/login')
   }
})







router.post('/edit_product', async (req, res) => {


   const { product_id, product_category } = req.body
   let category = `select * from ${product_category} where product_id = '${product_id}'`
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ product: results })

   })
})





const storage22 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})

const product_upload2 = multer({ storage: storage22 })
router.post('/pc_update', product_upload2.fields([{ name: 'product_image' }]), async (req, res) => {

   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body
   let query = `
         UPDATE ${product_category} 
         SET 
           product_image = '${product_image.join(',')}',
           product_name = '${product_name}',
           product_dis = '${product_dis}',
           product_price = '${product_price}',
           orignal_price = '${orignal_price}'
         WHERE 
           product_id = '${product_id}' 
       `;
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/product')
   })
})




router.post('/delete_pro', async (req, res) => {


   const { product_id, product_category } = req.body
   let category = `delete from ${product_category} where product_id = '${product_id}' and product_category = '${product_category}' `
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ product: results })

   })
})


router.post('/show_product', async (req, res) => {

   console.log(req.body)
   const { product_id, product_category } = req.body
   let category = `select * from ${product_category} where product_id = '${product_id}'`
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.json({ product: results })


   })
})


router.post('/banner_edit', async (req, res) => {

   const { product_id } = req.body
   query = `select * from banner where banner_id = '${product_id}'`

   connection.query(query, (err, banner) => {
      if (err) throw err;

      res.json({ banner: banner })
   })
})




const storage33 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/banner');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   },
});

const bnr_uploadb = multer({ storage: storage33 }); // Use 'storage' instead of 'storageb'

router.post('/banner_update', bnr_uploadb.single('main_banner'), async (req, res) => {

   const main_banner = req.file.filename; // Use 'filename' instead of 'originalname'
   const { banner_id, banner_title, banner_dis, banner_link } = req.body;

   let query = `update banner set main_banner = '${main_banner}', banner_title = '${banner_title}', banner_dis= '${banner_dis}', banner_link = '${banner_link}' where banner_id = '${banner_id}'`;

   connection.query(query, (err, results) => {
      if (err) throw err;

      res.json({ msg: 'ok' });
   });
});

router.post('/delete_banner', async (req, res) => {


   const { banner_id } = req.body
   let category = `delete from banner where banner_id = '${banner_id}'  `
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ msg: 'ok' })

   })
})


router.get("/logout", async (req, res) => {

   if (req.session) {
   
     req.session.destroy(function (err) {
       if (err) {
         return next(err);
       } else {
       res.json({msg:"logout"})
       }
     });
   }
 })


router.post('/edit_banner', async (req, res) => {


   const { product_id } = req.body
   let category = `select * from product_banner where banner_id = '${product_id}'`
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ product: results })

   })
})




const storage_a = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/productbanner')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const bnnr_a = multer({ storage: storage_a })

router.post('/update_bnnn', bnnr_a.single('product_banner'), async (req, res) => {
   console.log(req.body);
   const product_banner = req.file.filename;
   const { product_title, product_category, product_link, banner_id } = req.body
   let query = `Update product_banner set product_banner ='${product_banner}',product_title= '${product_title}',product_category= '${product_category}',product_link='${product_link}' where banner_id = '${banner_id}'`
   connection.query(query, (err, results) => {
      if (err) throw err;

      res.send({ msg: 'ok' })
   })
})

router.post('/delete_pbanner', async (req, res) => {


   const { banner_id } = req.body
   let category = `delete from product_banner where banner_id = '${banner_id}'  `
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ msg: 'ok' })

   })
})


router.post('/edit_carausal', async (req, res) => {


   const { carausal_id } = req.body
   let category = `select * from carausal_banner where carausal_id = '${carausal_id}'`
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ product: results })

   })
})


const storagf = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/carousel')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
})
const dash_b = multer({ storage: storagf });

router.post('/update_brrrrrr', dash_b.single('carausal_image'), async (req, res) => {

   const carausal_image = req.file.filename;
   const { carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id } = req.body
   let query = `update carausal_banner set carausal_image ='${carausal_image}',carausal_title='${carausal_title}',carausal_category='${carausal_category}',carausal_dis='${carausal_dis}',carausal_link='${carausal_link}'where carausal_id='${carausal_id}' `
   await connection.query(query, (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })
   })
})


router.post('/delete_carausal', async (req, res) => {


   const { carausal_id } = req.body
   let category = `delete from carausal_banner where carausal_id = '${carausal_id}'  `
   connection.query(category, (err, results) => {

      if (err) throw err;
      res.send({ msg: 'ok' })

   })
})



router.post('/delete_cart', async (req, res) => {
   if (req.session.user) {
      console.log(req.session.user);

      const { product_id } = req.body
      let category = `delete from cart where product_id = '${product_id}' and user_email = '${req.session.user}' `
      console.log(category);
      connection.query(category, (err, results) => {

         if (err) throw err;
         res.send({ msg: 'ok' })

      })
   } else {
      res.redirect('/login')
   }
})
module.exports = router;