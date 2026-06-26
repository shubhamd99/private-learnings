import React, { useState, useEffect } from 'react';
import { fetchProducts } from './mock/mockApi';
import { useDebounce } from './hooks/useDebounce';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import './styles.css';

export default function App() {
  // 1. Data State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 3. Derived State: Debounced search term prevents API spam while typing
  const debouncedSearch = useDebounce(searchTerm, 500);

  // 4. Side Effect: Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  // 5. Side Effect: Fetch Data
  useEffect(() => {
    let isMounted = true; // Cleanup flag to prevent state updates on unmounted components
    setLoading(true);
    setError(null);

    fetchProducts(debouncedSearch, category, page)
      .then((res) => {
        if (isMounted) {
          setProducts(res.data);
          setTotalPages(res.totalPages);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to fetch products. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Clean up on unmount or re-render
    };
  }, [debouncedSearch, category, page]); // Only re-run when these 3 values actually change

  return (
    <div className="container">
      <h2>Product Search</h2>
      
      <Filters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        category={category} 
        setCategory={setCategory} 
      />

      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="grid">
            {products.length === 0 ? (
              <p className="no-results">No products found.</p>
            ) : (
              products.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>

          <Pagination 
            page={page} 
            setPage={setPage} 
            totalPages={totalPages} 
          />
        </>
      )}
    </div>
  );
}
