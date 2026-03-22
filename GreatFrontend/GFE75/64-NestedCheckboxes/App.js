// Build a component that displays a hierarchical structure of checkboxes
// The component should handle parent-child relationships between checkboxes
// and manage their states efficiently.

// Requirements
// A checkbox's value is determined by the value of its direct children

// When all children of a parent are checked, the parent should be checked

// When some (but not all or none) children of a parent are checked,
// the parent should be in an indeterminate state, with a dash displayed within the box

// When none of the children of a parent are checked, the parent is unchecked.

// If a parent checkbox is checked or unchecked, all the descendant checkboxes
// (not just direct children) will be updated with that new value

// The focus of the exercise is on the functionality and not the styling.

// interface CheckboxItem {
//   id: number;
//   name: string;
//   checked: boolean | 'indeterminate';
//   children?: CheckboxItem[];
// }

import Checkboxes from "./Checkboxes";

export default function App() {
  const checkboxesData = [
    {
      id: 1,
      name: "Electronics",
      checked: false,
      children: [
        {
          id: 2,
          name: "Mobile phones",
          checked: false,
          children: [
            {
              id: 3,
              name: "iPhone",
              checked: false,
            },
            {
              id: 4,
              name: "Android",
              checked: false,
            },
          ],
        },
        {
          id: 5,
          name: "Laptops",
          checked: false,
          children: [
            {
              id: 6,
              name: "MacBook",
              checked: false,
            },
            {
              id: 7,
              name: "Surface Pro",
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "Books",
      checked: false,
      children: [
        {
          id: 9,
          name: "Fiction",
          checked: false,
        },
        {
          id: 10,
          name: "Non-fiction",
          checked: false,
        },
      ],
    },
    {
      id: 11,
      name: "Toys",
      checked: false,
    },
  ];

  return (
    <div>
      <Checkboxes defaultCheckboxData={checkboxesData} />
    </div>
  );
}
