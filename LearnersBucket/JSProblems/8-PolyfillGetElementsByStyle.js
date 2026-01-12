// There is no native method available in the JavaScript to get the elements,
// that is why we are going to create polyfill for the getElementsByStyle().

// Why not querySelectorAll? querySelectorAll('[style*="color:red"]')
// Does not check computed styles
// Misses inherited styles
// Misses stylesheet-applied styles

// This was an interview question asked in Zepto for SDE3 and Amazon.

// Before jumping into the solution’s the very first thing we should remember
// is that each browser applies styles different to the element.

// Though there is standardization going on, still there is very unevenness and
// also to support the older browser we should never rely on the sole style values for checking the elements.

// For example, if you apply the color as string color:red or as HEXA value color:#ff0000 it is applied as rgb value,
// thus if you want to get all the elements with the styles color:red then you will need to check on the computed values.

// Always use the computedStyles() as it returns the computed values that are applied by the browser.
// The Window.getComputedStyle() method returns a live read-only CSSStyleProperties object containing the resolved values
// of all CSS properties of an element, after applying active stylesheets and resolving any computation those values may contain.

// Using computedStyles() this is how you can create the polyfill for the getElementsByStyle():
// 1. Apply the style to a temporary element and get its computed value for that property for who we are searching the element.
// 2. Do the depth-first-search of all the elements, starting from the root and get the computed value of each.
// 3. If the computed values for the properties match on the element, store that element in the result set and return it.

// Function to get the computed styles
// Create a temporary DOM element and then get its computed style value for the given property.
// Once we get the value, remove the element from the DOM.
// Computed value is what we will be using for comparison on the elements.

// DOM is a tree, and DFS is the simplest and most memory-efficient way to traverse a tree completely.

// styles - color: red
// computed - rgb(255, 0, 0)
const getPropertyComputedValue = (property, value) => {
  // create a new element
  const div = document.createElement("div");

  // apply the property to the element
  div.style[property] = value;

  // get the computed style of the div
  const styles = window.getComputedStyle(document.body.appendChild(div));

  // get the computed value of the property
  let computedValue = styles[property];

  // remove the div
  document.body.removeChild(div);

  // return the computed value
  return computedValue;
};

// Function to search the elements with the given styles
// Create the main function that will take the root element from where it will begin the search
// and then the CSS property name and its value and first get the computed value of this CSS property and then perform
// the DFS and get the computed CSS property value of each element and match it with the computed
// value that we have. If they match add the element in the result and return it.

function getElementsByStyle(rootElement, property, value) {
  // get the computed value of the property, this will make sure we are checking the values that are applied in the browser
  const computedValue = getPropertyComputedValue(property, value);

  // to store the result
  const result = [];

  // helper function to traverse the DOM
  const search = (element, property, value) => {
    // get the computed styles of the element
    let computedStyles = window.getComputedStyle(element);
    let elementPropertyValue = computedStyles[property];

    // if both the values match
    // store the result
    if (elementPropertyValue === computedValue) {
      result.push(element);
    }

    // recursively search for each child of the element
    for (const child of element.children) {
      search(child, property, value);
    }
  };

  // begin the search
  search(rootElement, property, value);

  // return the result
  return result;
}

// Input:
// <div id="root">
//   <div class="alpha"></div>
//   <div class="beta"></div>
//   <div class="gamma"></div>
// </div>
// <styles>
// #root {
//   display: flex;
//   gap: 8px;
// }

// #root > div{
//   border: 1px solid;
//   width: 50px;
//   height: 50px;
// }

// .alpha{
//   padding: 10px 10px;
//   background-color: red;
//   border-style: dotted !important;
// }

// .beta{
//   padding-top: 10px;
//   padding-bottom: 10px;
//   padding-right: 10px;
//   padding-left: 10px;
//   background-color: #000;
// }

// .gamma{
//   padding: 10px 0 0;
//   background-color: rgb(255,0,0);
// }
// </styles>

// <script>
// console.log(getElementsByStyle(document.getElementById("root"), 'paddingTop', '10px'));
// </script>

// Output:
// [<div class="alpha"></div>,<div class="beta"></div>,<div class="gamma"></div>]

// Even though we have applied padding in 3 different formats to the elements,
// we are getting all the elements that have paddingTop:10px in the result.
