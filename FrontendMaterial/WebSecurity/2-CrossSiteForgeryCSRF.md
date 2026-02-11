# Cross-Site Request Forgery (CSRF)

## 1. What is CSRF?

**Cross-Site Request Forgery (CSRF)** is a vulnerability where an attacker tricks a logged-in user into performing unwanted actions on a web application. It exploits the trust that a site has in a user's browser.

- **Mechanism**: Since browsers automatically attach session cookies to every request made to a domain, the server cannot distinguish between a legitimate user action and a forged one.
- **Difference from XSS**: Unlike XSS, CSRF does not involve running malicious scripts on the target website. It instead uses the user's existing authenticated state to trigger actions.

## 2. How the Attack Takes Place

### A. Forgery via HTTP GET Request

Attackers can exploit GET requests by embedding malicious URLs in common tags:

- **Links**: `<a href="https://provider.com/delete?file=config.yml">Click here for a prize!</a>`
- **Hidden Images**: `<img src="https://provider.com/delete?file=config.yml" width="0" height="0" />`
  - _Note_: The request triggers automatically as soon as the email or page containing the image is loaded.
- **Video/Audio tags**: Source URLs can also be used to trigger requests.

### B. Forgery via HTTP POST Request

For actions involving POST, attackers use hidden forms that can be auto-submitted:

```html
<form method="POST" action="https://provider.com/delete">
  <input type="hidden" name="file" value="config.yml" />
  <input type="submit" value="Submit" />
</form>
<script>
  document.forms[0].submit();
</script>
```

The user might be tricked into visiting a malicious site that submits this form in the background without their knowledge.

## 3. How to Prevent CSRF Attacks

### A. Anti-CSRF Tokens (Synchronizer Token Pattern)

The server generates a unique, cryptographically strong token for each session or request.

- The token is passed to the client (e.g., in a hidden form field or a custom header).
- The client must include this token in subsequent state-changing requests (POST, PUT, DELETE).
- The server rejects any request where the token is missing or invalid.

### B. Custom Request Headers

In modern AJAX-based applications, adding a custom header (e.g., `X-CSRF-Token`) is a strong defense.

- **Same-Origin Policy (SOP)**: Browsers prevent JavaScript from adding custom headers to cross-origin requests by default.
- If the server only accepts requests with a specific custom header, cross-site attackers cannot successfully forge those requests.

### C. Double Submit Cookie Method

A stateless approach where a random value is sent in both a **cookie** and a **request parameter**.

- The server verifies that the value in the cookie matches the value in the request parameter.
- Since an attacker cannot read the cookie from a different domain (due to SOP), they cannot include the matching value in their forged request.

### D. SameSite Cookie Attribute

Configuring session cookies with the `SameSite` attribute helps restrict when cookies are sent:

- `SameSite=Strict`: Cookies are only sent for requests originating from the same site.
- `SameSite=Lax`: Cookies are not sent on cross-site subrequests (like images/iframes) but are sent when the user navigates to the site (e.g., clicking a link).

### E. Other Best Practices

- **Multi-Step Confirmation**: Require a second confirmation (MFA, CAPTCHA, or re-authentication) for critical actions like password changes or financial transfers.
- **Short Session Lifetimes**: Expire sessions frequently to minimize the attack window.
- **CORS Whitelisting**: Use `Access-Control-Allow-Origin` to allow only trusted domains to make cross-origin requests. Avoid using wildcards (`*`) when credentials are allowed.
