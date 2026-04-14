// Given an object which resembles a DOM tree, implement a function that serializes
// the object into a formatted string with proper indentation (one tab (\t character)
// per nesting level) and one tag per line.

// There are two ways to traverse a tree - Depth-first search and Breadth-first search.
// We can see that each object has a similar structure and there is a pattern
// - items in the children property look like its parent, with the exception that
// some items in children are strings, representing a leaf text node in typical DOM trees.

// Whenever we see a pattern like this, we should immediately think of recursion.
// Not to say recursion is the only and best way to solve problems like this, but it usually is a good place to start looking.

// We would want to use recursion to process the tree object
// And it is easy to tell when we should stop recursion for a given input
//  if the input has a children property, we keep on exploring the tree by calling the function itself on the items in children
// otherwise, we know we are at the leaf node and we should stop and return the input (i.e. the string).

const mood = "Happy! ";

console.log(`I feel ${mood.repeat(3)}`);
// Expected output: "I feel Happy! Happy! Happy! "

"Hello".repeat(0); // "" empty string
"Hello".repeat(1); // "Hello"
"Hello".repeat(2); // "HelloHello"

/**
 * @param {Object} element
 * @return {string}
 */
export default function serializeHTML(element, indent = "\t") {
  function traverse(node, depth = 0) {
    const pad = indent.repeat(depth); // for zero depth, it is empty string

    // Base case — text node, just return it with indentation
    if (typeof node === "string") {
      return `${pad}${node}`;
    }

    const tag = node.tag.toLowerCase();
    const openTag = `${pad}<${tag}>`;
    const closeTag = `${pad}</${tag}>`;

    // Recursively process each child, one level deeper
    const children = node.children.map((child) => traverse(child, depth + 1));

    return [openTag, ...children, closeTag].join("\n");
  }

  return traverse(element);
}

const tree = {
  tag: "body",
  children: [
    { tag: "div", children: [{ tag: "span", children: ["foo", "bar"] }] },
    { tag: "div", children: ["baz"] },
  ],
};

serializeHTML(tree);
// Output:
`<body>
  <div>
    <span>
      foo
      bar
    </span>
  </div>
  <div>
    baz
  </div>
</body>`;

// **Trace through the example**

// traverse({ tag: 'div', children: [{ tag: 'p', children: ['Hello'] }] }, depth=0)

//   pad = ''
//   openTag  = '<div>'
//   closeTag = '</div>'

//   children → traverse({ tag: 'p', children: ['Hello'] }, depth=1)

//     pad = '\t'
//     openTag  = '\t<p>'
//     closeTag = '\t</p>'

//     children → traverse('Hello', depth=2)
//       pad = '\t\t'
//       return '\t\tHello'   ← base case hit

//     return join('\t<p>', '\t\tHello', '\t</p>')

//   return join('<div>', '\t<p>\n\t\tHello\n\t</p>', '</div>')

// ---- SIMPLE VERSION (for interviews) ----
// Idea: recurse through the tree, tracking depth for indentation.
// Base case: string node → return it with tabs. Recursive case: build open/close tags around children.

function serializeHTMLSimple(node, depth = 0) {
  const pad = "\t".repeat(depth);

  if (typeof node === "string") {
    return `${pad}${node}`;
  }

  const open = `${pad}<${node.tag}>`;
  const close = `${pad}</${node.tag}>`;
  const children = node.children.map((child) =>
    serializeHTMLSimple(child, depth + 1),
  );

  return [open, ...children, close].join("\n");
}
