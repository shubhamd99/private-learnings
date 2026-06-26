const PRODUCTS = [
    { id: 1, name: 'iPhone 13', category: 'Electronics', price: 799 },
    { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 1299 },
    { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249 },
    { id: 4, name: 'Samsung Galaxy S22', category: 'Electronics', price: 899 },
    { id: 5, name: 'Sony WH-1000XM4', category: 'Electronics', price: 349 },
    { id: 6, name: 'Kindle Paperwhite', category: 'Electronics', price: 139 },
    { id: 7, name: 'Nintendo Switch', category: 'Electronics', price: 299 },
    { id: 8, name: 'PlayStation 5', category: 'Electronics', price: 499 },
    { id: 9, name: 'Xbox Series X', category: 'Electronics', price: 499 },
    { id: 10, name: 'Dell XPS 13', category: 'Electronics', price: 999 },
    { id: 11, name: 'Levi 501 Jeans', category: 'Clothing', price: 59 },
    { id: 12, name: 'Nike Air Max', category: 'Clothing', price: 120 },
    { id: 13, name: 'Adidas Ultraboost', category: 'Clothing', price: 180 },
    { id: 14, name: 'North Face Jacket', category: 'Clothing', price: 199 },
    { id: 15, name: 'Patagonia Fleece', category: 'Clothing', price: 119 },
    { id: 16, name: 'Dune by Frank Herbert', category: 'Books', price: 15 },
    { id: 17, name: 'Atomic Habits', category: 'Books', price: 20 },
    { id: 18, name: 'Sapiens', category: 'Books', price: 22 },
    { id: 19, name: '1984 by George Orwell', category: 'Books', price: 12 },
    { id: 20, name: 'The Great Gatsby', category: 'Books', price: 10 },
    { id: 21, name: 'Apple Watch Series 7', category: 'Electronics', price: 399 },
    { id: 22, name: 'Garmin Fenix 6', category: 'Electronics', price: 549 },
    { id: 23, name: 'Hanes T-Shirt', category: 'Clothing', price: 10 },
    { id: 24, name: 'Project Hail Mary', category: 'Books', price: 24 },
    { id: 25, name: 'Think and Grow Rich', category: 'Books', price: 14 },
];

export const fetchProducts = (query, category, page, limit = 10) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = PRODUCTS;
            
            // 1. Filter by category
            if (category && category !== 'All') {
                filtered = filtered.filter(p => p.category === category);
            }
            
            // 2. Filter by search query
            if (query) {
                const q = query.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
            }
            
            // 3. Paginate
            const total = filtered.length;
            const start = (page - 1) * limit;
            const paginated = filtered.slice(start, start + limit);
            
            resolve({
                data: paginated,
                total,
                totalPages: Math.ceil(total / limit)
            });
        }, 600); // Simulate 600ms network latency
    });
};
