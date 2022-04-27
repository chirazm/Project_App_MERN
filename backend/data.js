import bcrypt from "bcryptjs";
const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: true,
        },
        {
            name: 'User',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products : [
        {
            name : 'Nike Shirt',
            category : 'Shirts',
            image : '/images/p1.jpg',
            price : 120,
            countInStock : 10,
            brand : 'Nike',
            rating: 4.5,
            numReviews : 10,
            description : 'high quality product',
        },
        {
            name : 'Lacoste Slim Shirt',
            category : 'Pants',
            image : '/images/p2.jpg',
            price : 120,
            countInStock : 20,
            brand : 'Nike',
            rating: 4.5,
            numReviews : 10,
            description : 'high quality product',
        },
        {
            name : 'Nike Slim Shirt',
            category : 'Shirts',
            image : '/images/p3.jpg',
            price : 120,
            countInStock : 0,
            brand : 'Nike',
            rating: 4.5,
            numReviews : 14,
            description : 'high quality product',
        },
        {
            name : 'Adidas Slim Shirt',
            category : 'Shirts',
            image : '/images/p4.jpg',
            price : 100,
            countInStock : 12,
            brand : 'Adidas',
            rating: 4.5,
            numReviews : 10,
            description : 'high quality product',
        },
    ]
}
export default data;