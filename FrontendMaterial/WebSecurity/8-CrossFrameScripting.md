# Cross Frame Scripting (XFS)

## Introduction

Cross Frame Scripting (XFS) is a security vulnerability that occurs when a malicious webpage loads another site within an `<iframe>` (or frame) to execute scripts that steal data or hijack user sessions. It exploits the interaction between frames, specifically when the **Same-Origin Policy (SOP)** is not properly enforced or is bypassed.

## How it Works

1.  **Modular Loading**: Webpages use frames/iframes to display content from different sources (e.g., ads, social feeds).
2.  **The Attack**: A malicious frame attempts to access the `window.parent` or other sibling frames.
3.  **Exploitation**: If successful, it can read sensitive information from the main page (like login credentials in a form) or perform actions on behalf of the user.

### Example Scenario

- A user visits `securebank.com`.
- The page loads a compromised advertisement from `ads.external.com` in an iframe.
- The malicious script in the iframe accesses the parent document: `var mainPage = window.parent.document;`.
- It steals `username` and `password` values from the login form and sends them to an attacker's server.

## Key Risks

- **Data Theft**: Stealing login credentials, personal data, or financial info.
- **Session Hijacking**: Stealing session cookies to impersonate users.
- **Phishing**: Creating deceptive overlays to trick users into entering data.
- **Clickjacking**: Tricking users into clicking a transparent button over a legitimate site.

## Prevention and Mitigation

| Technique                         | Description                                                                                         |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **Same-Origin Policy (SOP)**      | Restricts scripts from one origin from accessing resources of another origin.                       |
| **Content Security Policy (CSP)** | Use `frame-ancestors 'self'` to allow only same-origin sites to frame your content.                 |
| **X-Frame-Options**               | Header with `DENY` (no framing) or `SAMEORIGIN` (only same origin can frame).                       |
| **Sandboxing**                    | Use the `sandbox` attribute in `<iframe>` to restrict scripts, forms, and same-origin access.       |
| **Frame Busting**                 | JavaScript code like `if (top != self) { top.location = self.location; }` to "break out" of frames. |

## Case Studies

### 1. Facebook (Early 2000s)

Attackers embedded malicious iframes in user profiles, leading to session hijacking and data theft. Facebook mitigated this by implementing stricter framing policies and Content Security Policy (CSP) headers.

### 2. MySpace (The Samy Worm)

In 2005, Samy Kamkar exploited XFS-related vulnerabilities to create a self-propagating worm. It added users as friends and modified their profiles automatically. This forced MySpace to overhaul its JavaScript and HTML sanitization.

### 3. eBay (2014)

Vulnerabilities in eBay's listing pages allowed attackers to embed iframes containing malicious scripts. These scripts stole user credentials and performed fraudulent transactions. eBay responded by restricting HTML content and enforcing stronger authentication (2FA).

## Best Practices

- **Default to DENY**: Use `X-Frame-Options: DENY` unless framing is strictly necessary.
- **Use Modern CSP**: Implement `frame-ancestors` as it is more flexible than `X-Frame-Options`.
- **Sanitize Inputs**: Always validate and encode user-provided HTML content.
- **Regular Audits**: Use automated scanners and manual penetration testing to find XFS gaps.
