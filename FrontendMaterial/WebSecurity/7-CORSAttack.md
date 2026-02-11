# Cross-Origin Resource Sharing (CORS)

## 1. What is CORS?

**Cross-Origin Resource Sharing (CORS)** is a browser-based security mechanism that allows or restricts a web page from making requests to a domain different from the one that served the web page.

- **Objective:** To enable secure "cross-origin" requests (requests to a different domain, protocol, or port).
- **The Problem:** By default, browsers block these requests to prevent malicious scripts from stealing data.

---

## 2. Same-Origin Policy (SOP)

The foundation of web security. It restricts how a document or script from one origin can interact with resources from another origin.

- **Origin Definition:** Scheme (http/https) + Host (domain) + Port.
  - `https://example.com:443` is **different** from `http://example.com:80`.
  - `https://example.com` is **different** from `https://api.example.com`.
- **Purpose:** Prevents CSRF (Cross-Site Request Forgery) and unauthorized data access.

---

## 3. How CORS Works

When a browser detects a cross-origin request, it adds an `Origin` header. The server must then respond with specific headers to "bless" the request.

### A. Simple Requests

Requests that don't trigger a "preflight".

- **Methods:** `GET`, `POST`, `HEAD`.
- **Headers:** Only standard headers (Accept, Content-Type: `text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`).
- **Process:** Browser sends the request -> Server responds -> Browser checks headers -> If allowed, data is passed to the script.

### B. Preflight Requests (The OPTIONS Call)

For "unsafe" requests (e.g., `PUT`, `DELETE`, or custom JSON headers like `Content-Type: application/json`).

1.  **OPTIONS Request:** Browser sends a "test" request first to see if the real request is allowed.
2.  **Server Check:** Server responds with allowed methods/headers.
3.  **Actual Request:** If the preflight succeeds, the browser sends the actual data.

---

## 4. Essential CORS Headers

| Header                             | Description                                                                            |
| :--------------------------------- | :------------------------------------------------------------------------------------- |
| `Origin`                           | Sent by browser; indicates the source domain.                                          |
| `Access-Control-Allow-Origin`      | Sent by server; specifies which origins are allowed (e.g., `https://site.com` or `*`). |
| `Access-Control-Allow-Methods`     | List of allowed HTTP methods (GET, POST, etc.).                                        |
| `Access-Control-Allow-Headers`     | List of allowed custom headers.                                                        |
| `Access-Control-Allow-Credentials` | Set to `true` if the request needs to include cookies or auth tokens.                  |
| `Access-Control-Max-Age`           | How long the preflight result remains valid (in seconds).                              |

---

## 5. Security Risks & Best Practices

### Risks:

1.  **Wildcard Origins (`*`)**: Allowing all origins is dangerous for private data.
2.  **Credentials with Wildcard**: You **cannot** use `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true`. You must specify the exact origin.
3.  **CSRF**: CORS alone doesn't prevent CSRF; you still need CSRF tokens.

### Best Practices:

- **Whitelist Specific Origins**: Only allow trusted domains.
- **Use the Least Privilege Principle**: Only allow necessary methods (e.g., if you only need GET, don't allow DELETE).
- **Validate on Server**: Don't rely solely on the browser; check headers on the backend.
- **Secure Headers**: Use `Access-Control-Max-Age` to reduce preflight overhead while maintaining security.

---

## 6. Troubleshooting Common Errors

- **"No Access-Control-Allow-Origin header present"**: The server isn't sending the CORS header at all.
- **"Method not allowed"**: The server's `Access-Control-Allow-Methods` doesn't include the method you are using (e.g., PUT).
- **"Request header field X-Custom is not allowed"**: You are sending a custom header that isn't listed in `Access-Control-Allow-Headers`.
- **"Credentialed request cannot use wildcard"**: You are sending cookies/headers but the server responds with `*`. Use the specific origin instead.

---

## 7. Useful Tools for Debugging

1.  **Browser DevTools**: Check the "Network" tab for failed red requests and inspect "Headers".
2.  **cURL**: `curl -H "Origin: https://example.com" -v https://api.yoursite.com/data` to see raw headers.
3.  **Postman**: Useful for testing server responses without browser restrictions.
