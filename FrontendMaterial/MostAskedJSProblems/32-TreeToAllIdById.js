const initialData = [
  {
    id: "1",
    text: "Parent Comment",
    replies: [
      { id: "1-1", text: "Child 1", replies: [] },
      { id: "1-2", text: "Child 2", replies: [] },
    ],
  },
];

const convertTreeToNormalized = (data) => {
  const allIds = [];
  const byId = {};

  const dfs = (nodes) => {
    nodes.forEach((node) => {
      allIds.push(node.id);

      const { replies, ...rest } = node;
      byId[node.id] = {
        ...rest,
        replies: replies ? replies.map((r) => r.id) : [],
      };

      if (replies && replies.length > 0) {
        dfs(replies);
      }
    });
  };

  dfs(data);

  return { allIds, byId };
};

const normalizedState = convertTreeToNormalized(initialData);
console.log("Normalized State:", normalizedState);

const deleteCommentFromTree = (idToDelete, tree) => {
  return tree
    .filter((node) => node.id !== idToDelete)
    .map((node) => ({
      ...node,
      replies: node.replies
        ? deleteCommentFromTree(idToDelete, node.replies)
        : [],
    }));
};

console.log(
  "Original Tree after deleting '1-1':",
  JSON.stringify(deleteCommentFromTree("1-1", initialData), null, 2),
);
