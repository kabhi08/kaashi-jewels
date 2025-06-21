const mongoose = require('mongoose');
const Product = require('./models/Product');

// ✅ Connect to your MongoDB
mongoose.connect('mongodb://localhost:27017/kaashijewels', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  return Product.deleteMany(); // Optional: Clear old data
})
.then(() => {
  // ✅ Corrected Sample Products (only filenames for imageUrl)
  const sampleProducts = [
    {
      name: 'Royal Kundan Necklace',
      description: 'Beautiful traditional kundan necklace set.',
      price: 3999,
      imageUrl: 'RoyalKundanNecklace.webp',
      category: 'necklace'
    },
    {
      name: 'Elegant Pearl Necklace',
      description: 'Pearl necklace with golden beads.',
      price: 2499,
      imageUrl: 'ElegantPearlNecklace.jpg',
      category: 'necklace'
    },
    {
      name: 'Gold Plated Ring',
      description: 'Adjustable gold plated ring for all occasions.',
      price: 799,
      imageUrl: 'GoldPlatedRing.jpg',
      category: 'rings'
    },
    {
      name: 'Diamond Style Ring',
      description: 'Shiny ring with American diamonds.',
      price: 1199,
      imageUrl: 'DiamondStyleRing.png',
      category: 'rings'
    },
    { 
      name: 'Classic Gold Bracelet',
      description: 'Elegant gold-toned bracelet.',
      price: 1299,
      imageUrl: 'ClassicGoldBracelet.webp',
      category: 'bracelet'
    },
    {
      name: 'Charm Bracelet',
      description: 'Trendy bracelet with small charms.',
      price: 999,
      imageUrl: 'CharmBracelet.webp',
      category: 'bracelet'
    },
    {
      name: 'Silver Jhumka Earrings',
      description: 'Handcrafted oxidized silver jhumkas.',
      price: 699,
      imageUrl: 'SilverJhumkaEarrings.jpeg',
      category: 'earrings'
    },
    {
      name: 'Stud Earrings Set',
      description: 'Set of 5 minimal stud earrings.',
      price: 599,
      imageUrl: 'StudEarringsSet.jpg',
      category: 'earrings'
    },
    {
      name: 'Traditional Gold Bangles',
      description: 'Set of 4 traditional golden bangles.',
      price: 1799,
      imageUrl: 'TraditionalGoldBangles.webp',
      category: 'bangles'
    },
    {
      name: 'Modern Stylish Bangles',
      description: 'Western style metal bangles.',
      price: 1299,
      imageUrl: 'ModernStylishBangles.jpg',
      category: 'bangles'
    }
  ];

  return Product.insertMany(sampleProducts);
})
.then((docs) => {
  console.log(`✅ ${docs.length} products added successfully`);
  mongoose.connection.close();
})
.catch((err) => {
  console.error('❌ Error adding products:', err);
  mongoose.connection.close();
});
