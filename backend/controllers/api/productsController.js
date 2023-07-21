// Import the productModel module, which presumably contains the product schema and model.
const Products = require("../../model/productModel");

// Define the controller function to get a paginated list of products.
module.exports.getProducts = async (req, res) => {
  try {
    // Pagination settings
    const pageSize = 10; // Number of products to display per page
    const page = Number(req.query.pageNumber) || 1; // Current page number (default: 1 if pageNumber not provided)

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    // Count the total number of products in the database
    const count = await Products.countDocuments({ ...keyword });

    // Retrieve products for the current page using 'skip' and 'limit' methods
    // 'skip' will skip a certain number of documents to implement pagination
    // 'limit' will limit the number of documents returned per query, hence implementing pagination
    const products = await Products.find({ ...keyword })
      .limit(pageSize) // Limit the number of products per page
      .skip(pageSize * (page - 1)); // Skip the appropriate number of products based on the current page

    // Respond with the retrieved products and pagination information as a JSON object
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    // If an error occurs during the process, handle it and respond with a 500 status code and an error message.
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
module.exports.createProduct = async (req, res) => {
  const product = new Products({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
module.exports.updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
module.exports.deleteProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
module.exports.createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

module.exports.getTopProducts = async (req, res) => {
  const products = await Products.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};
