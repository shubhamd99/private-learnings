// It was designed to test:

// String manipulation
// Data aggregation
// Object handling
// Array transformation
// Sorting logic

// You are given an array of strings in the format:
// "productName:amount"

const sales = [
  "pen:20",
  "pencil:60",
  "pen:40",
  "eraser:10",
  "pencil:30",
  "marker:25",
  "notebook:15",
  "scale:18",
  "sharpener:12",
  "crayons:50",
  "sketchpen:35",
  "highlighter:22",
  "compass:8",
  "stapler:14",
  "glue:28",
  "marker:40",
  "notebook:22",
  "scale:10",
  "eraser:15",
  "sharpener:20",
  "crayons:30",
  "sketchpen:45",
  "highlighter:18",
  "compass:12",
  "stapler:25",
  "glue:35",
];

// Requirements
// Extract the product name and amount from each string.
// Calculate the total sales for each product.
// Sort the results in descending order (highest total first).
// Return the output in this format:
// [
//   { product: 'pencil', Total: 90 },
//   { product: 'crayons', Total: 80 },
//   ...
// ]

// Time: O(n log n)
// reduce is O(n)
// Object.entries is O(k) where k is unique products
// map is O(k)
// sort is O(k log k)
// Overall O(n log n) dominated by sort.

// Array does not have an .entries() that returns key value pairs like Object.entries() or Map.entries().
// Array.prototype.entries() exists but it returns index value pairs like [0, "pen:20"], which is not what you want here.

// Space: O(k)
// The accumulator object and final array both hold k unique products.
function extractData(arr) {
  const result = arr.reduce((acc, curr) => {
    const [product, amount] = curr.split(":");
    acc[product] = (acc[product] || 0) + Number(amount);
    return acc;
  }, {});

  const finalOutput = Object.entries(result)
    .map(([product, total]) => ({ product, total }))
    .sort((a, b) => b.total - a.total);

  return finalOutput;
}

console.log(extractData(sales));

function extractData2(arr) {
  const map = new Map();

  for (const item of arr) {
    const [product, amount] = item.split(":");
    map.set(product, (map.get(product) || 0) + Number(amount));
  }

  return [...map.entries()]
    .map(([product, Total]) => ({ product, Total }))
    .sort((a, b) => b.Total - a.Total);
}

console.log(extractData2(sales));
