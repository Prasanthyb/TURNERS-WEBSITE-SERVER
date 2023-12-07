
jest.mock('../utilities/CustomError');
const CustomError = require('../utilities/CustomError');


const {
    getProducts,
    getSingleProduct,
    createProduct,
    getCars,
  } = require('./productController');
  const Product = require('../models/Product');
  
  // Mocking Product model
  jest.mock('../models/Product');
  
  describe('getProducts', () => {
    test('should return all products', async () => {
      const mockProducts = [{ /* mocked product data */ }];
      Product.find.mockResolvedValue(mockProducts);
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getProducts(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: mockProducts.length,
        products: mockProducts,
      });
    });
  
    test('should handle no products found', async () => {
      Product.find.mockResolvedValue([]);
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getProducts(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Something went wrong, try again later.',
      });
    });
  
    // Add more test cases as needed
  });
  
  describe('getSingleProduct', () => {
    test('should return a single product', async () => {
      const mockProduct = { /* mocked product data */ };
      const req = { params: { id: 'mockProductId' } };
      const res = { json: jest.fn() };
  
      Product.findById.mockResolvedValue(mockProduct);
  
      await getSingleProduct(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ product: mockProduct });
    });
  
    test('should handle product not found', async () => {
      const req = { params: { id: 'nonexistentProductId' } };
      const res = { json: jest.fn() };
  
      Product.findById.mockResolvedValue(null);
  
      await getSingleProduct(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });
  
    // Add more test cases as needed
  });
  
  describe('createProduct', () => {
    test('should create a new product', async () => {
      const mockRequestBody = { /* mocked request body data */ };
      const mockCreatedProduct = { /* mocked created product data */ };
      
      const req = { body: mockRequestBody };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Product.create.mockResolvedValue(mockCreatedProduct);
  
      await createProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        product: mockCreatedProduct,
      });
    });
  
    // Add more test cases as needed
  });
  
  describe('getCars', () => {
    test('should return cars of a specific color', async () => {
      const mockColor = 'blue';
      const mockMatchingCars = [{ /* mocked car data */ }];
  
      const req = { body: { data: mockColor } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Product.find.mockResolvedValue(mockMatchingCars);
  
      await getCars(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: mockMatchingCars.length,
        products: mockMatchingCars,
      });
    });
  
    test('should handle no cars found with the specified color', async () => {
      const mockColor = 'green';
  
      const req = { body: { data: mockColor } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Product.find.mockResolvedValue([]);
  
      await getCars(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'No cars found with the specified color.',
      });
    });
  
    // Add more test cases as needed
  });
  