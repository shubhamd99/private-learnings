import React from 'react';

export default function Filters({ searchTerm, setSearchTerm, category, setCategory }) {
  return (
    <div className="filters">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
      </select>
    </div>
  );
}
