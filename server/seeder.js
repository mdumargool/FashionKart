import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: "Classic Black Denim Jacket",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
    description: "Premium quality cotton denim jacket for an effortless everyday look.",
    price: 1499,
    countInStock: 25
  },
  {
    name: "Slim Fit Casual Blue Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    description: "Stretchable comfort-fit blue denim jeans designed for all-day wear.",
    price: 1199,
    countInStock: 40
  },
  {
    name: "Oversized Graphic Cotton T-Shirt",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    description: "100% pure breathable cotton oversized tee with modern street style print.",
    price: 699,
    countInStock: 60
  },
  {
    name: "Formal Slim-Fit White Shirt",
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=600&q=80",
    description: "Crisp white formal shirt tailored for business meetings and formal events.",
    price: 999,
    countInStock: 30
  },
  {
    name: "Winter Fleece Hooded Sweatshirt",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Warm and cozy fleece hoodie with front kangaroo pocket for winter days.",
    price: 1299,
    countInStock: 20
  },
  {
    name: "Casual Canvas Sneakers",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight and durable everyday walking canvas shoes with rubber sole.",
    price: 1599,
    countInStock: 35
  },
  {
    name: "Olive Green Bomber Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    description: "Stylish military-inspired olive green bomber jacket with smooth zip closures.",
    price: 1999,
    countInStock: 15
  },
  {
    name: "High-Waisted Black Cargo Pants",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
    description: "Trendy utility cargo pants with multiple spacious pockets for a edgy look.",
    price: 1399,
    countInStock: 22
  },
  {
    name: "Striped Summer Casual Polo",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    description: "Classic collar polo t-shirt featuring horizontal summer color stripes.",
    price: 799,
    countInStock: 45
  },
  {
    name: "Checkered Flannel Shirt",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    description: "Soft brushed cotton flannel shirt featuring a classic red and black plaid check.",
    price: 1099,
    countInStock: 28
  },
  {
    name: "Men's Tan Leather Casual Shoes",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    description: "Premium faux-leather slip-on casual shoes designed for parties and outings.",
    price: 2199,
    countInStock: 12
  },
  {
    name: "Women's Pastel Pink Hoodie",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
    description: "Soft pastel fleece hoodie offering supreme comfort and relaxed aesthetics.",
    price: 1199,
    countInStock: 25
  },
  {
    name: "Athletic Running Sports Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "High-performance cushioned running shoes engineered for active workouts.",
    price: 2499,
    countInStock: 18
  },
  {
    name: "Ethnic Printed Kurta",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    description: "Traditional cotton straight-cut ethnic kurta with subtle festive patterns.",
    price: 1299,
    countInStock: 20
  },
  {
    name: "Regular Fit Athletic Joggers",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    description: "Flexible cotton-blend joggers featuring elasticated cuffs and waistband.",
    price: 899,
    countInStock: 50
  },
  {
    name: "Chunky Platform Sneakers",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    description: "Modern chunky sneakers offering a bold footwear statement and elevated comfort.",
    price: 2299,
    countInStock: 14
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully with Corrected Images!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();