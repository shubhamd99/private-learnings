# Case Study: Designing a White-Labeled Neo-Banking Service Frontend

## Overview

A major fintech company (Razorpay) entered the neo-banking space with a white-labeled product based on RBI guidelines. The system tokenizes card details for transactions rather than storing raw card data.

The service can be hosted on bank premises or the fintech's premises. The solution required deep configurability, allowing each client bank (e.g., KVB, Canara, Equitas, Axis) to use their own custom branding along with completely unique SSO login mechanisms.

## Portals Developed

1. **Customer Portal (Focus of this document):** Allows bank customers to manage tokens (pause, resume, delete) against their cards.
2. **Admin Portal:** Used by bank employees for enterprise token lifecycle management and reporting (handled separately due to complex role-based access control).

## System Architecture

- **Backend:** Java (Spring Boot) - chosen due to existing infrastructure at traditional banks.
- **Frontend:** React + Context API as a Single Page Application (SPA). Minimal pages required (Landing page for all cards, Single page listing associated tokens).

## Core Challenges & Solutions

### 1. Hosting & Routing

- **Hosting:** Hosted as a single comprehensive application using subdomains and cookie-based authentication. The React build files were copied into the Spring Boot `public` folder and linked to `index.html`. To ensure a unified entry point, the Webpack output build was hardcoded as `entry.js`.
- **Client-side Routing vs. Server-side Routing:** Hitting a frontend client route directly (like `/login`) would cause a server 404 because Spring Boot doesn't recognize frontend route paths.
  - **Solution:** Configured the Spring Boot application to handle 404 errors by forwarding them back to `index.html`. Client-side React Router then handles the URL parsing and renders the correct view. Backend APIs were cleanly scoped under `/api/*` to avoid collisions.

```java
// Spring Boot configuration to fallback to index.html for client-side routing
@Configuration
public class WebApplicationConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/notFound").setViewName("forward:/index.html");
    }

    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return container -> {
            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notFound"));
        };
    }
}
```

### 2. Configurable Logins & Separation of Concerns

- **Challenge:** Login requirements varied vastly per bank (e.g., Customer ID + OTP vs. Card No + Password vs. Card No + ATM Pin + OTP).
- **Solution:** Rather than making a massive, complex dynamic form component, **individual login pages were created per bank**.
  - A `switch` case evaluates the active `bank code` and renders that bank's specific login UI.
  - The login API payload structure remained relatively standard, and the backend routed the data to the correct authentication manager.
  - This architecture isolates security overhead, ensures UI flexibility, and allows for painless maintenance when onboarding new banks.

### 3. Theming and Dynamic Configuration Load

- **Challenge:** The SPA needed to act as a white-labeled platform matching each bank's theme. Fetching these configuration details (bank logo, active features, styling colors) via API on initial render degraded UX, causing a blank screen on slower mobile networks until the round trip finished.
- **Solution:** The configuration was statically injected into a global JavaScript object right inside the `index.html` by the Spring Boot server _during the initial document load_.
  - The frontend cached the data in the React Context layer on mount.
  - Development followed a rigid CSS design system. Passing a bank code essentially swapped CSS variables instantly, skipping the costly network request.

### 4. Data Flow & Cryptographic Security

- **Data Storage:** Raw or sensitive information is **never** stored in Local Storage or Cookies. Any persisted data is heavily masked.
- **Payload Encryption:** Although traffic goes over SSL/TLS, every single API POST/PUT payload sent to the server is encrypted at the application level using a client-side 1024-bit RSA Key (via the `jose` library).
- **State Management:** Standard local state within components, with the Context API managing immutable user session data globally.

```javascript
// Example of JWE encryption on the client before sending the payload
import * as jose from "jose";

const encryptAndSend = async function (payload) {
  const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
  ... [RSA PUBLIC KEY] ...
  -----END PUBLIC KEY-----`;

  let publicKey = await importKey(pemEncodedKey);

  const jwe = await new jose.CompactEncrypt(
    new TextEncoder().encode(JSON.stringify(payload)),
  )
    .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
    .encrypt(publicKey);

  // Send the encrypted JWE string
};
```

## Best Practices & Security Mitigations

1. **Authentication Restrictions:** Maximum of 3 login attempts before the account is temporarily blocked (requires customer support to unlock).
2. **Multi-Factor Checks (MFA):** Enforced on sensitive user actions to ensure customer presence.
3. **Anti-DDoS & Bot Mitigation:** Integrated Google reCAPTCHA.
4. **Cross-Site Scripting (XSS) Prevention:** Content Security Policy (CSP) headers aggressively restrict script sources. Only the specific reCAPTCHA script is allowed, and all inline JavaScript execution is forcibly disabled.
5. **Cross-Site Request Forgery (CSRF) Prevention:** The deep payload encryption process inherently obscures payload shapes, making request forgery mathematically infeasible.
6. **CORS:** Disabled entirely since the frontend is hosted on the identically matching domain as the backend.
7. **Client-side Verification:**
   - Masked standard inputs (only showing the last 4 card digits).
   - Implemented Luhn algorithm checks to validate cards on both the client (for UX) and server (for strict validation) side.
