// Given an array of file objects,
// build a component that displays them in a hierarchical tree format.

// There are two types of objects – files and directories:

// Files are essentially leaf nodes of the tree, they do not have children.

// Directories can contain other objects – either files or directories.

// Requirements
// The names of the directories/files should be displayed.

// The focus of the exercise is on the functionality and not the styling.

// interface FileObject {
//   id: number;
//   name: string;
//   children?: FileObject[];
// }

import FileExplorer from "./FileExplorer";

const fileData = [
  {
    id: 1,
    name: "README.md",
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "Word.doc",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
      },
      {
        id: 7,
        name: "Misc",
        children: [
          {
            id: 8,
            name: "foo.txt",
          },
          {
            id: 9,
            name: "bar.txt",
          },
        ],
      },
    ],
  },
];

export default function App() {
  return <FileExplorer data={fileData} />;
}
