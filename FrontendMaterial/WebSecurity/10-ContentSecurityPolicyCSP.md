# Content Security Policy (CSP)

## Overview

**Content Security Policy (CSP)** is a security layer that helps detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS), Clickjacking, and data injection attacks. It works by restricting the resources (such as JavaScript, CSS, Images) that a browser is allowed to load for a given page.

## Importance of CSP

- **Prevents XSS Attacks:** Restricts where scripts can be loaded from and can disallow inline scripts.
- **Mitigates Clickjacking:** Uses the `frame-ancestors` directive to control which sites can embed your page.
- **Prevents Data Injection:** Blocks unauthorized content from being injected into the page.
- **Reduces Attack Surface:** Limits the sources of content, making it harder for attackers to exploit vulnerabilities.

## Core Directives

| Directive         | Description                                                                              |
| :---------------- | :--------------------------------------------------------------------------------------- |
| `default-src`     | Serves as a fallback for other fetch directives.                                         |
| `script-src`      | Specifies valid sources for JavaScript.                                                  |
| `style-src`       | Specifies valid sources for stylesheets.                                                 |
| `img-src`         | Specifies valid sources for images.                                                      |
| `frame-ancestors` | Specifies valid parents that may embed a page (Clickjacking protection).                 |
| `connect-src`     | Restricts the URLs which can be loaded using script interfaces (fetch, XHR, WebSockets). |
| `object-src`      | Specifies valid sources for plugins like `<object>`, `<embed>`, or `<applet>`.           |

## CSP Derivatives & Related Policies

### 1. Subresource Integrity (SRI)

Ensures that fetched resources (like scripts or styles from a CDN) have not been tampered with by verifying a cryptographic hash.

```html
<script
  src="https://example.com/script.js"
  integrity="sha384-oqVuAfXR..."
  crossorigin="anonymous"
></script>
```

### 2. HTTP Strict Transport Security (HSTS)

Enforces secure (HTTPS) connections, preventing protocol downgrade attacks and cookie hijacking.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 3. Permissions Policy

(Formerly Feature Policy) Controls which browser features (camera, microphone, geolocation) can be used by the site or embedded iframes.

```http
Permissions-Policy: geolocation=(self), microphone=()
```

## Implementation Methods

### 1. HTTP Header (Recommended)

The most secure way to implement CSP is via the server response header.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
```

### 2. HTML Meta Tag

Used when you don't have control over server headers.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self';"
/>
```

## Advanced Security Techniques

- **Nonces:** A unique, cryptographically strong random string generated for every request. Only scripts with the matching `nonce` attribute are executed.
  - `Content-Security-Policy: script-src 'nonce-2726c7f26c'`
  - `<script nonce="2726c7f26c">...</script>`
- **Hashes:** Allows a specific static script by its SHA-256/384/512 hash.
  - `Content-Security-Policy: script-src 'sha256-xyz...'`
- **Report-Only Mode:** Use `Content-Security-Policy-Report-Only` to monitor policy violations without actually blocking any resources. Excellent for testing before full enforcement.

## Best Practices

1. **Restrictive Defaults:** Start with `default-src 'none';` and explicitly allow only what is needed.
2. **Avoid `unsafe-inline` and `unsafe-eval`:** These directives essentially disable the XSS protection benefits of CSP.
3. **Use Specific URLs:** Instead of allowing entire domains (e.g., `*.google.com`), allow exact URLs or specific subdomains.
4. **Regular Audits:** Use tools like [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/) to identify potential bypasses.
5. **Continuous Monitoring:** Set up a `report-uri` or `report-to` to collect violation reports and identify attempted attacks or broken resources.
