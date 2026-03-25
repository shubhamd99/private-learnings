import React, { useState } from 'react';

// This component represents a single comment and its nested replies.
function Comment({ data, onReply }) {
  // Local state to toggle the visibility of the reply input box.
  const [showInput, setShowInput] = useState(false);
  // Local state to store the text typed in the reply input.
  const [text, setText] = useState("");

  const handleReply = () => {
    // Only send the reply if it's not empty/whitespace.
    if (text.trim()) {
      // onReply is passed down from the parent (App.js) to update the global tree.
      onReply(data.id, text);
      // Reset local input state after successfully queueing the reply update.
      setText("");
      setShowInput(false);
    }
  };

  return (
    <div className="comment-node">
      {/* The UI for the current comment itself */}
      <div className="comment-card">
        <p>{data.text}</p>
        <button className="btn" onClick={() => setShowInput(!showInput)}>
          {showInput ? "Cancel" : "Reply"}
        </button>

        {/* Conditional rendering for the reply input box */}
        {showInput && (
          <div className="reply-input">
            <input 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Type your reply..."
            />
            <button className="btn" onClick={handleReply}>Add</button>
          </div>
        )}
      </div>

      {/* RECURSION: This is the critical part for deep nesting.
          If this comment has any replies, we call the <Comment /> component 
          on itself for each reply in the array. 
          The 'onReply' handler is passed down through every depth level. */}
      <div className="replies">
        {data.replies.map((reply) => (
          <Comment key={reply.id} data={reply} onReply={onReply} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
