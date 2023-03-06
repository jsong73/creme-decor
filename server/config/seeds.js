const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: 'Chairs' },
    { categoryName: 'Sofas' },
    { categoryName: 'Tables' },
    { categoryName: 'Dressers' },
    { categoryName: 'Beds' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      productName: 'Mid-Century Chair',
      description:'White linen wooden chair',
      image: 'mid-century-chair.png',
      category: categories[0]._id,
      price: 150.00,
      quantity: 10,
    },
    {
      productName: 'Mid-Century Sectional',
      description:'Cream three piece sectional',
      image: 'mid-century-sectional.jpg',
      category: categories[1]._id,
      price: 700.00,
      quantity: 5,
    },
    {
      productName: 'Mid-Century Table',
      description:'Wooden coffee table',
      image: 'mid-century-table.png',
      category: categories[2]._id,
      price: 190.99,
      quantity: 15,
    },
    {
      productName: 'Mid-Century Dresser',
      category: categories[3]._id,
      description:'modern-day wooden dresser',
      image: 'mid-century-dresser.jpg',
      price: 100.00,
      quantity: 20,
    },
    {
      productName: 'Mid-Century Bed',
      category: categories[4]._id,
      description: 'Modern white bed with headboard',
      image: 'mid-century-bed.jpg',
      price: 600.00,
      quantity: 15,
    },
    {
      productName: 'Vintage White Chair',
      category: categories[0]._id,
      description: 'Cream lounge chair',
      image: 'vintage-white-chair.jpg',
      price: 170.00,
      quantity: 20,
    },
    {
      productName: 'Modern chair',
      category: categories[0]._id,
      description:'Light oak wood modern chair',
      image: 'wooden-chair.png',
      price: 90.00,
      quantity: 25,
    },
    {
      productName: 'Couples Sofa',
      category: categories[1]._id,
      description: 'Two piece living room sofa',
      image: 'couples-sofa.png',
      price: 500.00,
      quantity: 5,
    },
    {
      productName: 'Oak Table',
      category: categories[2]._id,
      description:'Light and dark Oak wood side table',
      image: 'oak-table.png',
      price: 120.00,
      quantity: 30,
    },
    {
      productName: 'Oak Dresser',
      category: categories[3]._id,
      description: 'Light and dark Oak wood dresser',
      image: 'oak-dresser.png',
      price: 250.00,
      quantity: 25,
    },
    {
      productName: 'Oak bed',
      category: categories[4]._id,
      description: 'Modern day oak wood bed',
      image: 'oak-bed.png',
      price: 650.00,
      quantity: 10,
    },
    {
      productName: 'Linen Chair',
      category: categories[0]._id,
      description: 'Wooden chair with linen seats',
      image: 'linen-chair.png',
      price: 150.00,
      quantity: 50,
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'jessica',
    lastName: 'song',
    email: 'jessica@email.com',
    password: 'root123',
    orders: [
      {
        products: [products[0]._id, products[4]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: 'jane',
    lastName: 'doe',
    email: 'janedoe@temail.com',
    password: 'janedoe',
  });

  console.log('users seeded');

  process.exit();
});
