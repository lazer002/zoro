const express = require("express")
const multer = require('multer')
const executeQuery = require('../connections/connection') 
const router = express.Router()

router.get('/login', async (req, res) => {
   const query5 = `select * from signup where user_email = ? and user_role = ?`
   executeQuery(query5, [req.session.user, req.session.role], (err, name) => {
      const coun = `select count(*) as num_results from cart where user_email = ?`
      executeQuery(coun, [req.session.user], (err, cou) => {
         res.render('admin/login', { name: name, cou: cou })
      })
   })
})

router.use((req, res, next) => {
   res.locals.user = req.session.user;
   res.locals.role = req.session.role;
   next();
})

const admingateway = function (req, res, next) {
   if (req.session.role == 'admin') {
      next();
   } else {
      res.redirect('/login');
   }
}

const gateway = function (req, res, next) {
   if (req.session.user) {
      next();
   } else {
      res.redirect('/login');
   }
}

router.post('/login', async (req, res) => {
   const { user_email, user_pass } = req.body
   const query = `select * from signup where user_email = ? and user_pass = ?`
   executeQuery(query, [user_email, user_pass], (err, results) => {
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
   const query = `insert into signup(user_profile, user_email, user_pass, user_name, user_number, latitude, longitude) values(?, ?, ?, ?, ?, ?, ?)`
   executeQuery(query, [user_profile, user_email, user_pass, user_name, user_number, latitude, longitude], (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })
   })
})

router.get('/profile', gateway, async (req, res) => {
   const query5 = `select * from signup where user_email = ? and user_role = ?`
   executeQuery(query5, [req.session.user, req.session.role], (err, name) => {
      const qry = `select * from cart where user_email = ?`
      executeQuery(qry, [req.session.user], (err, pc) => {
         if (typeof pc != 'undefined') {
            const coun = `select count(*) as num_results from cart where user_email = ?`
            executeQuery(coun, [req.session.user], (err, cou) => {
               res.render('profile', { role: req.session, name: name, pc: pc, cou: cou })
            })
         } else {
            res.render('profile', { role: req.session, name: name, pc: ' ', cou: '0' })
         }
      })
   })
})

router.get('/', async (req, res) => {
   const query1 = `select * from banner`
   executeQuery(query1, [], (err, banner) => {
      if (err) throw err;
      const query2 = 'select * from category ORDER BY product_category DESC'
      executeQuery(query2, [], (err, category) => {
         if (err) throw err;
         const query3 = `select * from carausal_banner where carausal_category = 'first_carausal'`
         executeQuery(query3, [], (err, carausal) => {
            if (err) throw err;
            const query4 = `select * from carausal_banner where carausal_category = 'second_carausal'`
            executeQuery(query4, [], (err, carausal2) => {
               if (err) throw err;
               const query5 = `select distinct user_profile from signup where user_email = ?`
               executeQuery(query5, [req.session.user], (err, reslt5) => {
                  const coun = `select count(*) as num_results from cart where user_email = ?`
                  executeQuery(coun, [req.session.user], (err, cou) => {
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
      const query = `SELECT * FROM signup ORDER BY id DESC`
      executeQuery(query, [], (err, user) => {
         if (err) throw err;
         res.render('admin/dashboard', { user: user })
      })
   } else {
      res.redirect('/login')
   }
})

// DASHBOARD BANNER
router.get('/dashboard_banner', admingateway, async (req, res) => {
   const query = `select * from banner`
   executeQuery(query, [], (err, banner) => {
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
   const query = `insert into banner(main_banner, banner_id, banner_title, banner_dis, banner_link) values(?, ?, ?, ?, ?)`
   executeQuery(query, [main_banner, banner_id, banner_title, banner_dis, banner_link], (err, results) => {
      if (err) throw err;
      res.send({ msg: 'ok' })
   })
})

// CATOGARY
router.get('/category', admingateway, async (req, res) => {
   const query = `select * from category`
   executeQuery(query, [], (err, results) => {
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

      const query = `insert into category(product_category, product_image, product_name, sub_product_image) values(?, ?, ?, ?)`
      executeQuery(query, [product_category, product_image, product_name, sub_product_image], (err, results) => {
         if (err) throw err;
         res.redirect('/category');
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
})

// Other routes follow similar pattern...

router.get('/carausal_banner', admingateway, async (req, res) => {
   try {
      const category = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM category', [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const c_banner = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM carausal_banner', [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      res.render('admin/carausal_banner', { category, c_banner });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

const storag = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/carousel');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});
const dash_banner = multer({ storage: storag });

router.post('/carausal_banner', dash_banner.single('carausal_image'), async (req, res) => {
   try {
      const carausal_image = req.file.filename;
      const { carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id } = req.body;
      
      const query = `INSERT INTO carausal_banner(carausal_image, carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

      await new Promise((resolve, reject) => {
         executeQuery(query, [carausal_image, carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// PC BANNER
router.get('/product', admingateway, async (req, res) => {
   try {
      const category = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM category', [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const pc = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN pc ON category.product_category = pc.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const mouse = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN mouse ON category.product_category = mouse.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const laptop = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN laptop ON category.product_category = laptop.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const keyboard = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN keyboard ON category.product_category = keyboard.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const headphone = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN headphone ON category.product_category = headphone.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const controller = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM category INNER JOIN controller ON category.product_category = controller.product_category`, [], (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });

      const pro = {
         controller,
         headphone,
         keyboard,
         laptop,
         mouse,
         pc,
      };

      res.render('admin/product', { category, pro });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

const storage2 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/product');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});

const product_upload = multer({ storage: storage2 });

router.post('/pc', product_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   try {
      const ppicFiles = req.files['product_image'];
      const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

      const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body;

      const query = `INSERT INTO pc(product_category, product_id, product_image, product_name, product_dis, product_price, orignal_price) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

      await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_id, product_image.join(','), product_name, product_dis, product_price, orignal_price], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.redirect('/product');
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

const storageConfig = (folder) => multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, `./public/images/category/${folder}`);
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});

// Upload configuration for different products
const HEADPHONE_upload = multer({ storage: storageConfig('product') });
const KEYBOARD_upload = multer({ storage: storageConfig('product') });
const LAPTOP_upload = multer({ storage: storageConfig('product') });
const MOUSE_upload = multer({ storage: storageConfig('product') });
const CONTROLLER_upload = multer({ storage: storageConfig('product') });

// Function to insert product into the respective table
const insertProduct = async (tableName, productData, res) => {
   const { product_category, product_id, product_image, product_name, product_dis, product_price, orignal_price } = productData;

   const query = `INSERT INTO ${tableName} (product_category, product_id, product_image, product_name, product_dis, product_price, orignal_price) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_id, product_image, product_name, product_dis, product_price, orignal_price], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });
      res.redirect('/product');
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
};

// Headphone POST
router.post('/headphone', HEADPHONE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename).join(',') : '';
   await insertProduct('headphone', { ...req.body, product_image }, res);
});

// Keyboard POST
router.post('/keyboard', KEYBOARD_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename).join(',') : '';
   await insertProduct('keyboard', { ...req.body, product_image }, res);
});

// Laptop POST
router.post('/laptop', LAPTOP_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename).join(',') : '';
   await insertProduct('laptop', { ...req.body, product_image }, res);
});

// Mouse POST
router.post('/mouse', MOUSE_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename).join(',') : '';
   await insertProduct('mouse', { ...req.body, product_image }, res);
});

// Controller POST
router.post('/controller', CONTROLLER_upload.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename).join(',') : '';
   await insertProduct('controller', { ...req.body, product_image }, res);
});




// fwhaihfowajfojwaofjwaofj
router.get('/product_banner', admingateway, async (req, res) => {
   try {
      const category = await new Promise((resolve, reject) => {
         executeQuery('select * from category', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const banner = await new Promise((resolve, reject) => {
         executeQuery('select * from product_banner', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('admin/product_banner', { category, banner });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});


router.get('/user', async (req, res) => {
   const query = `SELECT * FROM signup`;

   try {
      const users = await new Promise((resolve, reject) => {
         executeQuery(query, [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('admin/user', { user: users });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});


// Storage configuration for banner
const storage_dash = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/category/productbanner');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});

const bnnr_upload = multer({ storage: storage_dash });

// Product Banner Post
router.post('/product_bann', bnnr_upload.single('product_banner'), async (req, res) => {
   const { product_title, product_category, product_link, banner_id } = req.body;
   const product_banner = req.file.filename;

   const query = `INSERT INTO product_banner (product_banner, product_title, product_category, product_link, banner_id) 
                  VALUES (?, ?, ?, ?, ?)`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [product_banner, product_title, product_category, product_link, banner_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });
      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// PC Page
router.get('/PC', async (req, res) => {
   try {
      const pc = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM pc', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const banner = await new Promise((resolve, reject) => {
         executeQuery(
            `SELECT product_banner, product_title, product_link 
             FROM product_banner 
             INNER JOIN category ON product_banner.product_category = category.product_category 
             WHERE product_banner.product_category = 'PC'`,
            [], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            }
         );
      });

      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('pc', { pc, banner, name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Controller Page
router.get('/controller', async (req, res) => {
   try {
      const controller = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM controller', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const banner = await new Promise((resolve, reject) => {
         executeQuery(
            `SELECT product_banner, product_title, product_link 
             FROM product_banner 
             INNER JOIN category ON product_banner.product_category = category.product_category 
             WHERE product_banner.product_category = 'controller'`,
            [], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            }
         );
      });

      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('controller', { controller, banner, name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Laptop Page
router.get('/laptop', async (req, res) => {
   try {
      const laptop = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM laptop', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const banner = await new Promise((resolve, reject) => {
         executeQuery(
            `SELECT product_banner, product_title, product_link 
             FROM product_banner 
             INNER JOIN category ON product_banner.product_category = category.product_category 
             WHERE product_banner.product_category = 'laptop'`,
            [], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            }
         );
      });

      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('laptop', { laptop, banner, name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Accessories Page
router.get('/accessories', async (req, res) => {
   try {
      const keyboard = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM keyboard', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const mouse = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM mouse', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const headphone = await new Promise((resolve, reject) => {
         executeQuery('SELECT * FROM headphone', [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const banner = await new Promise((resolve, reject) => {
         executeQuery(
            `SELECT product_banner, product_title, product_link 
             FROM product_banner 
             INNER JOIN category ON product_banner.product_category = category.product_category 
             WHERE product_banner.product_category = 'keyboard'`,
            [], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            }
         );
      });

      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('accessories', { keyboard, mouse, headphone, banner, name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Service Page
router.get('/service', async (req, res) => {
   try {
      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('service', { name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Community Page
router.get('/community', async (req, res) => {
   try {
      const banner = await new Promise((resolve, reject) => {
         executeQuery(`SELECT * FROM banner WHERE banner_dis = ' '`, [], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const name = await new Promise((resolve, reject) => {
         executeQuery(`SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const cou = await new Promise((resolve, reject) => {
         executeQuery(`SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.render('community', { banner, name, cou });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

router.get('/product/:product_category/:product_id', async (req, res) => {
   const { product_id, product_category } = req.params;

   try {
      const categoryQuery = `SELECT * FROM ?? WHERE product_id = ?`;
      const category = await new Promise((resolve, reject) => {
         executeQuery(categoryQuery, [product_category.toLowerCase(), product_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      const productQuery = `SELECT * FROM cart WHERE product_id = ? AND user_email = ?`;
      const product = await new Promise((resolve, reject) => {
         executeQuery(productQuery, [product_id, req.session.user], (err, results1) => {
            if (err) reject(err);
            else resolve(results1);
         });
      });

      const nameQuery = `SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`;
      const name = await new Promise((resolve, reject) => {
         executeQuery(nameQuery, [req.session.user], (err, name) => {
            if (err) reject(err);
            else resolve(name);
         });
      });

      const countQuery = `SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`;
      const count = await new Promise((resolve, reject) => {
         executeQuery(countQuery, [req.session.user], (err, count) => {
            if (err) reject(err);
            else resolve(count);
         });
      });

      res.render('product_param', { product: category, results1: product, name: name, cou: count });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Storage for cart images
const storage_dashd = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/public/images/category/cart');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});
const cart_upload = multer({ storage: storage_dashd });

// Add item to cart
router.post('/cart', cart_upload.single('cart_img'), async (req, res) => {
   if (req.session.user) {
      const { product_category, product_quantity, cart_img, product_id, cart_pname, cart_pprice } = req.body;
      const user = req.session.user;

      try {
         const checkProductQuery = `SELECT * FROM cart WHERE product_id = ? AND user_email = ?`;
         const existingProduct = await new Promise((resolve, reject) => {
            executeQuery(checkProductQuery, [product_id, user], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            });
         });

         if (existingProduct.length > 0) {
            const updateQuantityQuery = `UPDATE cart SET product_quantity = ? WHERE product_id = ? AND user_email = ?`;
            await new Promise((resolve, reject) => {
               executeQuery(updateQuantityQuery, [product_quantity, product_id, user], (err, results) => {
                  if (err) reject(err);
                  else resolve(results);
               });
            });
            res.send({ msg: 'user' });
         } else {
            const insertQuery = `INSERT INTO cart (product_category, product_quantity, product_id, cart_image, cart_pname, cart_pprice, user_email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            await new Promise((resolve, reject) => {
               executeQuery(insertQuery, [product_category, product_quantity, product_id, cart_img, cart_pname, cart_pprice, user], (err, results) => {
                  if (err) reject(err);
                  else resolve(results);
               });
            });
            res.send({ msg: 'user' });
         }
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error');
      }
   } else {
      res.send({ msg: 'login' });
   }
});

// Cart page
router.get('/cart_page', async (req, res) => {
   if (req.session.user) {
      try {
         const cartQuery = `SELECT * FROM cart WHERE user_email = ?`;
         const products = await new Promise((resolve, reject) => {
            executeQuery(cartQuery, [req.session.user], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            });
         });

         const nameQuery = `SELECT DISTINCT user_profile FROM signup WHERE user_email = ?`;
         const name = await new Promise((resolve, reject) => {
            executeQuery(nameQuery, [req.session.user], (err, name) => {
               if (err) reject(err);
               else resolve(name);
            });
         });

         const countQuery = `SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`;
         const count = await new Promise((resolve, reject) => {
            executeQuery(countQuery, [req.session.user], (err, count) => {
               if (err) reject(err);
               else resolve(count);
            });
         });

         res.render('cart_page', { product: products, name: name, cou: count });
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error');
      }
   } else {
      res.redirect('/login');
   }
});

// Cart items on page
router.get('/cartonpage', gateway, async (req, res) => {
   try {
      const productQuery = `SELECT * FROM cart WHERE user_email = ?`;
      const products = await new Promise((resolve, reject) => {
         executeQuery(productQuery, [req.session.user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      if (products.length === 0) {
         res.send({ product: ' ', cou: 0 });
      } else {
         const countQuery = `SELECT COUNT(*) AS num_results FROM cart WHERE user_email = ?`;
         const count = await new Promise((resolve, reject) => {
            executeQuery(countQuery, [req.session.user], (err, cou) => {
               if (err) reject(err);
               else resolve(cou);
            });
         });
         res.send({ product: products, cou: count });
      }
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Change cart quantity
router.post('/quantity_change', async (req, res) => {
   if (req.session.user) {
      const { product_quantity, product_id } = req.body;

      try {
         const updateQuery = `UPDATE cart SET product_quantity = ? WHERE user_email = ? AND product_id = ?`;
         const updatedProduct = await new Promise((resolve, reject) => {
            executeQuery(updateQuery, [product_quantity, req.session.user, product_id], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            });
         });

         res.send({ product: updatedProduct });
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error');
      }
   } else {
      res.redirect('/login');
   }
});




router.post('/edit_product', async (req, res) => {
   const { product_id, product_category } = req.body;
   const query = `SELECT * FROM ?? WHERE product_id = ?`;

   try {
      const results = await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ product: results });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Storage configuration for product images
const storage22 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/product');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});

const product_upload2 = multer({ storage: storage22 });

// Update product details
router.post('/pc_update', product_upload2.fields([{ name: 'product_image' }]), async (req, res) => {
   const ppicFiles = req.files['product_image'];
   const product_image = ppicFiles ? ppicFiles.map(file => file.filename) : [];

   const { product_category, product_id, product_name, product_dis, product_price, orignal_price } = req.body;
   const query = `
      UPDATE ?? 
      SET 
         product_image = ?,
         product_name = ?,
         product_dis = ?,
         product_price = ?,
         orignal_price = ?
      WHERE 
         product_id = ?
   `;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_image.join(','), product_name, product_dis, product_price, orignal_price, product_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.redirect('/product');
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Delete a product
router.post('/delete_pro', async (req, res) => {
   const { product_id, product_category } = req.body;
   const query = `DELETE FROM ?? WHERE product_id = ? AND product_category = ?`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_id, product_category], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ product: 'deleted' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Show product details
router.post('/show_product', async (req, res) => {
   const { product_id, product_category } = req.body;
   const query = `SELECT * FROM ?? WHERE product_id = ?`;

   try {
      const results = await new Promise((resolve, reject) => {
         executeQuery(query, [product_category, product_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.json({ product: results });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Edit banner details
router.post('/banner_edit', async (req, res) => {
   const { product_id } = req.body;
   const query = `SELECT * FROM banner WHERE banner_id = ?`;

   try {
      const banner = await new Promise((resolve, reject) => {
         executeQuery(query, [product_id], (err, banner) => {
            if (err) reject(err);
            else resolve(banner);
         });
      });

      res.json({ banner: banner });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Storage configuration for banner images
const storage33 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/banner');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});

const bnr_uploadb = multer({ storage: storage33 });

// Update banner details
router.post('/banner_update', bnr_uploadb.single('main_banner'), async (req, res) => {
   const main_banner = req.file.filename;
   const { banner_id, banner_title, banner_dis, banner_link } = req.body;
   const query = `
      UPDATE banner
      SET 
         main_banner = ?, 
         banner_title = ?, 
         banner_dis = ?, 
         banner_link = ? 
      WHERE 
         banner_id = ?
   `;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [main_banner, banner_title, banner_dis, banner_link, banner_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.json({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

router.post('/delete_banner', async (req, res) => {
   const { banner_id } = req.body;
   const query = `DELETE FROM banner WHERE banner_id = ?`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [banner_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Logout
router.get("/logout", async (req, res) => {
   if (req.session) {
      req.session.destroy(function (err) {
         if (err) {
            return next(err);
         } else {
            res.json({ msg: "logout" });
         }
      });
   }
});

// Edit banner details
router.post('/edit_banner', async (req, res) => {
   const { product_id } = req.body;
   const query = `SELECT * FROM product_banner WHERE banner_id = ?`;

   try {
      const results = await new Promise((resolve, reject) => {
         executeQuery(query, [product_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ product: results });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Storage configuration for banner images
const storage_a = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/productbanner');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});
const bnnr_a = multer({ storage: storage_a });

// Update banner details
router.post('/update_bnnn', bnnr_a.single('product_banner'), async (req, res) => {
   const product_banner = req.file.filename;
   const { product_title, product_category, product_link, banner_id } = req.body;
   const query = `
      UPDATE product_banner 
      SET 
         product_banner = ?, 
         product_title = ?, 
         product_category = ?, 
         product_link = ? 
      WHERE 
         banner_id = ?
   `;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [product_banner, product_title, product_category, product_link, banner_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Delete a product banner
router.post('/delete_pbanner', async (req, res) => {
   const { banner_id } = req.body;
   const query = `DELETE FROM product_banner WHERE banner_id = ?`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [banner_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Edit carousal details
router.post('/edit_carausal', async (req, res) => {
   const { carausal_id } = req.body;
   const query = `SELECT * FROM carausal_banner WHERE carausal_id = ?`;

   try {
      const results = await new Promise((resolve, reject) => {
         executeQuery(query, [carausal_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ product: results });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Storage configuration for carousel images
const storagf = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/category/carousel');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   }
});
const dash_b = multer({ storage: storagf });

// Update carousal details
router.post('/update_brrrrrr', dash_b.single('carausal_image'), async (req, res) => {
   const carausal_image = req.file.filename;
   const { carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id } = req.body;
   const query = `
      UPDATE carausal_banner 
      SET 
         carausal_image = ?, 
         carausal_title = ?, 
         carausal_category = ?, 
         carausal_dis = ?, 
         carausal_link = ? 
      WHERE 
         carausal_id = ?
   `;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [carausal_image, carausal_title, carausal_category, carausal_dis, carausal_link, carausal_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Delete a carousal
router.post('/delete_carausal', async (req, res) => {
   const { carausal_id } = req.body;
   const query = `DELETE FROM carausal_banner WHERE carausal_id = ?`;

   try {
      await new Promise((resolve, reject) => {
         executeQuery(query, [carausal_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
         });
      });

      res.send({ msg: 'ok' });
   } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
});

// Delete an item from the cart
router.post('/delete_cart', async (req, res) => {
   if (req.session.user) {
      const { product_id } = req.body;
      const query = `DELETE FROM cart WHERE product_id = ? AND user_email = ?`;

      try {
         await new Promise((resolve, reject) => {
            executeQuery(query, [product_id, req.session.user], (err, results) => {
               if (err) reject(err);
               else resolve(results);
            });
         });

         res.send({ msg: 'ok' });
      } catch (err) {
         console.error(err);
         res.status(500).send('Internal Server Error');
      }
   } else {
      res.redirect('/login');
   }
});


module.exports = router;