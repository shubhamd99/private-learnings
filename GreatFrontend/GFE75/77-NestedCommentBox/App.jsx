import React, { useState } from 'react';
import Comment from './Comment';
import './styles.css';

/**
 * RECURSIVE UPDATE: This function traverses the entire tree to find the 
 * targeted comment and injects a new reply into its array.
 * IMPORTANT: We MUST use .map() to return a NEW array and the spread 
 * operator {...comment} to return a NEW object to maintain immutability.
 */
const addReply = (comments, targetId, text) => {
  return comments.map((comment) => {
    // If this current comment is the target, add the reply here.
    if (comment.id === targetId) {
      return {
        ...comment,
        replies: [
          ...comment.replies, 
          { id: Date.now().toString(), text, replies: [] } // Create new child
        ],
      };
    }
    // Otherwise, search inside this comment's replies (recursion).
    return {
      ...comment,
      replies: addReply(comment.replies || [], targetId, text),
    };
  });
};

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

function App() {
  const [comments, setComments] = useState(initialData);

  // The main handler passed down to children to trigger state updates.
  const onReply = (id, text) => {
    // We update the top-level state by recalculating the entire tree.
    setComments(addReply(comments, id, text));
  };

  return (
    <div className="container">
      <h1>Nested Comments</h1>
      {/* Starting the recursive chain by mapping over top-level comments */}
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} onReply={onReply} />
      ))}
    </div>
  );
}

export default App;
