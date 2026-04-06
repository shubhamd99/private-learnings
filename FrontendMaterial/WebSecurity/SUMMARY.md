# Web Security — Interview-Ready Summary

Quick reference for all 13 topics. Each section has the core concept, attack mechanism, and defenses.

---

## 1. Cross-Site Scripting (XSS)
**What:** Attacker injects malicious scripts into a trusted website that execute in victims' browsers.

**Types:**
- **Stored (Persistent):** Script saved in DB, runs for every user who views it (e.g., chat message with `<script>`).
- **Reflected (Non-Persistent):** Script in URL param, reflects back to victim clicking a crafted link.
- **DOM-Based:** Vulnerability in client-side code; source (e.g., `location.hash`) flows into sink (e.g., `innerHTML`).

**Defenses:** Sanitize inputs (DOMPurify), use `textContent` not `innerHTML`, escape HTML entities (`<` → `&lt;`), CSP headers. React/Angular/Vue sanitize by default.

---

## 2. Cross-Site Request Forgery (CSRF)
**What:** Attacker tricks a logged-in user into unknowingly making a state-changing request (exploits browser auto-sending cookies).

**Attack Vectors:** Hidden `<img>` tags (GET), auto-submit hidden forms (POST).

**Key Difference from XSS:** No script injection — exploits existing authenticated session.

**Defenses:**
- **Anti-CSRF Tokens** (synchronizer token pattern)
- **SameSite Cookie** (`Strict` or `Lax`)
- **Custom Headers** (`X-CSRF-Token`) — browsers block cross-origin custom headers via SOP
- **Double Submit Cookie** method
- MFA/CAPTCHA for critical actions

---

## 3. XML External Entity (XXE)
**What:** XML parser processes external entity references, allowing attackers to read server files or trigger SSRF.

**Example Payload:** `<!ENTITY xxe SYSTEM "file:///etc/passwd">`

**Vulnerable Formats:** XML, SVG, DOCX/XLSX (OpenXML), PDF/XFDF, HTML serialized as XML.

**Types:** Direct (attacker sends XML) vs. Indirect (attacker exploits internal XML processing, e.g., via JSON→SOAP converter).

**Defenses:** Disable DTDs, disable external entity expansion, prefer JSON, keep XML libraries updated, validate input.

---

## 4. Authentication
**What:** Verifying identity before granting access.

**Types:** Password-based (+ MFA), Passwordless (OTP, magic links, social login).

**Protocols:**
| Protocol | Purpose |
|---|---|
| OAuth 2.0 | Token-based authorization/authentication |
| OpenID Connect | SSO identity layer on top of OAuth |
| SAML | XML-based enterprise federation/SSO |
| FIDO (UAF/U2F) | Passwordless/2nd-factor with public-key crypto |

**Best Practices:** Hash passwords (bcrypt/Argon2), generic error messages (no user enumeration), rate limiting + CAPTCHA, MFA, mask password UI but offer "show" toggle.

---

## 5. Authorization
**What:** Defining what an authenticated user is allowed to do.

**Models:**
| Model | Description |
|---|---|
| RBAC | Role-based (Admin, Editor, Viewer) — simple but can "role-explode" |
| ABAC | Attribute-based (user dept, time, context) — granular but complex |
| PBAC | Policy-based combining RBAC + ABAC |
| ReBAC | Relationship-based ("Owner of", "Friend of") — great for social apps |

**Best Practices:** Principle of Least Privilege, verify resource ownership (check `user_id`), separate auth from business logic (use middleware), salt + slow hashing (bcrypt/Argon2), rotate session IDs post-login, enforce HTTPS + HSTS.

---

## 6. DDoS (Distributed Denial of Service)
**What:** Flood a server with traffic using botnets to make it unavailable.

**Types:**
- **Volume-Based (Layer 3/4):** UDP Flood, ICMP Flood, Amplification attacks (DNS/NTP).
- **Protocol (State-Exhaustion):** SYN Flood (half-open TCP connections), Smurf Attack, Fragmentation.
- **Application Layer (Layer 7):** HTTP Flood, Slowloris (partial requests), DNS Flood.

**Objectives:** Financial extortion, business rivalry, hacktivism, diversion smokescreen.

**Defenses:** Rate limiting, WAF (L7), Anycast networks, overprovisioning bandwidth, ISP upstream filtering, Cloudflare/Akamai.

**Case Studies:** 2016 Dyn (Mirai botnet, took down Netflix/Twitter); 2017 GitHub (1.35 Tbps Memcached amplification).

---

## 7. CORS (Cross-Origin Resource Sharing)
**What:** Browser mechanism to allow/restrict cross-origin requests (different domain, protocol, or port).

**Same-Origin Policy (SOP):** Foundation of web security — blocks cross-origin JS by default.

**Request Types:**
- **Simple:** GET/POST with standard headers — no preflight.
- **Preflight:** PUT/DELETE or custom headers — browser sends OPTIONS first.

**Key Headers:**
| Header | Role |
|---|---|
| `Access-Control-Allow-Origin` | Which origins can access (avoid `*` with credentials) |
| `Access-Control-Allow-Methods` | Allowed HTTP methods |
| `Access-Control-Allow-Credentials` | Allow cookies/auth headers |
| `Access-Control-Max-Age` | Preflight cache duration |

**Pitfalls:** `*` wildcard + credentials is invalid; CORS doesn't prevent CSRF; always validate on the server too.

---

## 8. Cross Frame Scripting (XFS)
**What:** Malicious iframe loads a legitimate site and runs scripts to steal data or hijack sessions (exploits SOP weaknesses).

**Risks:** Data theft, session hijacking, phishing overlays, clickjacking.

**Defenses:**
| Technique | How |
|---|---|
| `X-Frame-Options: DENY/SAMEORIGIN` | Prevents site from being framed |
| `CSP: frame-ancestors 'self'` | More flexible framing control |
| `sandbox` attribute on `<iframe>` | Restricts scripts/forms in iframe |
| Frame busting JS | `if (top != self) top.location = self.location` |

**Case Studies:** Facebook early 2000s (session hijacking via iframes), Samy Worm on MySpace 2005, eBay 2014 (credential theft via listing pages).

---

## 9. Web Security Fundamentals (Overview)
**Key Threats:** SQLi, XSS, CSRF, MitM, DDoS, Phishing, Malware, Insider Threats, Zero-Day exploits.

**HTTPS/TLS:** Encrypts data in transit; SSL/TLS handshake = Hello → Certificate → Key Exchange → Session Keys.

**Firewalls:** Packet-filtering (IP/port) → WAF (app-layer content) → NGFW (deep packet inspection + IDS/IPS).

**Secure Coding:**
- Input validation (whitelist, server-side)
- Output encoding (context-aware to prevent XSS)
- Parameterized queries (prevent SQLi)
- CSRF tokens + SameSite cookies

**SDLC Integration:** SAST (static analysis on code) + DAST (dynamic analysis on running app); `npm audit`, Snyk for dependencies.

**Data Protection:** Encryption at rest + in transit; tokenization for PCI; data masking for dev/test.

**Incident Response:** Detect → Contain → Eradicate → Recover → Post-Incident Analysis.

**Case Studies:** Equifax 2017 (unpatched Apache Struts, 147M records); Target 2013 (vendor credentials, 110M customers).

---

## 10. Content Security Policy (CSP)
**What:** HTTP header that tells the browser which resource sources are trusted, blocking unauthorized scripts/styles/iframes.

**Key Directives:**
| Directive | Controls |
|---|---|
| `default-src` | Fallback for all resource types |
| `script-src` | JavaScript sources |
| `style-src` | CSS sources |
| `img-src` | Image sources |
| `frame-ancestors` | Who can embed this page (clickjacking defense) |
| `connect-src` | fetch/XHR/WebSocket URLs |

**Advanced:**
- **Nonces:** Per-request random token on `<script>` tags — only matching scripts execute.
- **Hashes:** Whitelist a specific script by its SHA-256/384/512 hash.
- **Report-Only mode:** Monitor violations without blocking (great for testing).

**Related Headers:**
- **SRI (Subresource Integrity):** `integrity` hash on CDN scripts to detect tampering.
- **HSTS:** Force HTTPS, prevent downgrade attacks. `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- **Permissions-Policy:** Control browser features (camera, mic, geolocation) per frame.

**Best Practices:** Start with `default-src 'none'`, avoid `unsafe-inline`/`unsafe-eval`, use specific URLs not wildcards, set up `report-uri`.

---

## 11. Prototype Pollution
**What:** JavaScript-specific attack that modifies `Object.prototype`, affecting all objects in the app. Can cause ACE, DoS, or privilege escalation.

**How it works:** Attacker controls object keys during a merge operation and uses `__proto__`, `constructor`, or `prototype` as keys.

```js
// Polluted merge input: {"__proto__": {"isAdmin": true}}
// Result: all objects now have isAdmin = true
```

**Common Vectors:** Deep merge functions (Lodash `_.merge`), `Object.assign` with unvalidated JSON, query string parsing.

**Impact:** Privilege escalation (inject `isAdmin`), ACE (inject props used in `eval`/`exec`), DoS (crash logic), bypass security checks.

**Defenses:**
- `Object.create(null)` — creates prototype-less objects
- Block `__proto__`/`constructor`/`prototype` keys in merge functions
- Use `Map` instead of plain objects for dynamic key storage
- `Object.freeze(Object.prototype)` at app startup
- Use `Object.hasOwn(obj, key)` for property checks
- Keep Lodash/jQuery updated (CVE-2019-10744, CVE-2019-11358)

---

## 12. Server-Side Request Forgery (SSRF)
**What:** Attacker tricks the server into making requests to unintended internal or external resources — server acts as a "proxy".

**Classic Exploit:** Provide `http://169.254.169.254/` (AWS metadata endpoint) to steal IAM credentials.

**Attack Vectors:** URL parameters, JSON/XML payloads, file upload endpoints, `Referer`/`Host` headers.

**Impact:** Access internal services (databases, admin panels), network recon, steal cloud credentials (AWS/GCP/Azure metadata), RCE in severe cases.

**Defenses:**
- **Allowlist** only trusted domains/IPs (not blocklist — too easy to bypass)
- **Egress filtering** — block requests to `127.0.0.1`, `10.x.x.x`, `192.168.x.x`
- **Protocol restriction** — block `file://`, `gopher://`, `ftp://`
- **Network segmentation** — isolate internal services from web server
- **AWS IMDSv2** — session-based tokens prevent simple SSRF on metadata service
- Avoid passing user-controlled full URLs; use IDs or pre-defined keys

**Case Studies:** Capital One (AWS metadata → 100M+ customers), Tesla (Kubernetes console for crypto-mining), GitHub, Uber.

---

## 13. Session Management
**What:** Maintaining user state across stateless HTTP requests using Session IDs (SIDs).

**Lifecycle:** Create (on login, server issues SID) → Manage (SID sent with each request) → Expire (inactivity/absolute timeout) → Terminate (logout or server invalidation).

**Storage Options:**
- **Server-side:** In-memory (fast, not scalable), DB (persistent, slower), Redis (distributed, ideal for scale).
- **Client-side:** Cookies (auto-sent, 4KB), LocalStorage (5-10MB, XSS risk), SessionStorage (tab-scoped).

**Attack Types & Mitigations:**
| Attack | Mitigation |
|---|---|
| Session Hijacking | HTTPS + `Secure`/`HttpOnly` cookies + SID regeneration |
| Session Fixation | Regenerate SID immediately after login |
| XSS stealing cookies | `HttpOnly` flag + input sanitization |
| CSRF | Anti-CSRF tokens + `SameSite` cookie |

**Cookie Flags:** Always set `HttpOnly` (no JS access), `Secure` (HTTPS only), `SameSite=Strict/Lax`.

**Advanced:**
- **JWT (Stateless):** Token carries session data, signed by server. No server storage needed but revocation is hard.
- **SSO:** OAuth 2.0, SAML, OpenID Connect — single login across multiple services.
- **Microservices:** Use centralized Redis store or JWT propagation.

**Common Pitfalls:** Predictable SIDs, not regenerating SID after login, storing tokens in localStorage (XSS risk), incomplete logout (only clearing client-side).

---

## Quick Cheat Sheet

| Topic | 1-Line Summary |
|---|---|
| XSS | Inject scripts into page via unsanitized user input |
| CSRF | Forge requests using victim's authenticated session |
| XXE | XML parser reads server files via external entity references |
| Authentication | Verify who the user is (passwords, MFA, OAuth) |
| Authorization | Control what the user can do (RBAC, ABAC, PoLP) |
| DDoS | Flood server with traffic via botnets to cause downtime |
| CORS | Browser policy to allow/restrict cross-origin requests |
| XFS | Malicious iframe steals data from framed legitimate page |
| Web Security Basics | HTTPS, firewalls, secure coding, SDLC integration |
| CSP | HTTP header whitelisting trusted script/style/image sources |
| Prototype Pollution | JS `__proto__` manipulation affects all objects globally |
| SSRF | Server makes unauthorized internal requests on attacker's behalf |
| Session Management | Secure SID lifecycle with proper cookies and timeouts |
