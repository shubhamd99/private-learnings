import submitForm from "./submitForm";

// CONTACT FORM — Key interview points:
//
// 1. htmlFor vs for:
//    In JSX, use `htmlFor` instead of `for` (reserved JS keyword).
//    htmlFor links the <label> to the <input> via matching id — clicking the label focuses the input.
//
// 2. name attribute on inputs:
//    When the form is submitted natively (action + method), the browser sends
//    each input's `name` as the key and its value as the value in the POST body.
//    Without `name`, the field won't be included in the submission.
//
// 3. type="email":
//    Browser validates email format automatically — no JS needed for basic validation.
//
// 4. <textarea> vs <input>:
//    Use <textarea> for multi-line text (like a message).
//    Unlike <input>, textarea has an opening and closing tag — no self-closing in HTML.
//
// 5. Native form submission (action + method):
//    action = URL to send the form data to
//    method = HTTP method (post for forms that change data, get for searches)
//    No JS required — browser handles it natively on submit button click.

export default function App() {
  return (
    // action: where to send the form data
    // method="post": sends data in request body (not in URL like GET)
    // onSubmit: intercepts submit — used here by GFE to check solution
    <form
      onSubmit={submitForm}
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="post"
    >
      <div>
        {/* htmlFor links this label to the input with id="name-input" */}
        <label htmlFor="name-input">Name</label>
        {/* name="name" is the key sent in the POST body */}
        <input id="name-input" name="name" type="text" />
      </div>

      <div>
        <label htmlFor="email-input">Email</label>
        {/* type="email" gives free browser-level format validation */}
        <input id="email-input" name="email" type="email" />
      </div>

      <div>
        <label htmlFor="message-input">Message</label>
        {/* textarea for multi-line input — needs closing tag unlike <input /> */}
        <textarea id="message-input" name="message" />
      </div>

      <div>
        {/* type="submit" is the default for buttons inside a form */}
        <button>Send</button>
      </div>
    </form>
  );
}
