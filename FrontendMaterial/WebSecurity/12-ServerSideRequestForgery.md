# Server-Side Request Forgery (SSRF)

Server-Side Request Forgery (SSRF) is a critical web security vulnerability that allows an attacker to induce the server-side application to make requests to an unintended location.

---

## 🔒 What is SSRF?

SSRF occurs when an attacker manipulates a server to make unauthorized requests to internal or external resources. This happens because the application fails to properly validate user-supplied URLs before fetching remote content.

**In simple terms:** The attacker tricks the server into acting as a "proxy" to attack other systems that it has access to, but the attacker doesn't.

---

## 🚀 Why is it Important?

- **Security Breach Prevention:** Can lead to unauthorized access to internal networks.
- **Data Protection:** Accesses sensitive internal data (databases, APIs).
- **Infrastructure Integrity:** Prevents disruption of critical internal services.
- **Cloud Security:** Exploits cloud metadata services to steal temporary credentials.

---

## 🛠️ How it Works

1. **User Input:** The app takes a URL from the user (e.g., to fetch a profile picture).
2. **Request Execution:** The server processes this URL and fetches the resource.
3. **Exploitation:** An attacker provides an internal URL (e.g., `http://localhost/admin` or `http://169.254.169.254/`).
4. **Outcome:** The server fetches the internal resource and returns it to the attacker.

### Common Attack Vectors

- **URL Parameters:** `http://example.com/fetch?url=http://internal-api.local`
- **JSON/XML Payloads:** Processing URLs within data structures.
- **File Uploads:** Fetching remote files for processing.
- **HTTP Headers:** Using `Referer` or `Host` headers.

---

## 💥 Impact of SSRF

- **Accessing Internal Services:** Reaching non-public databases, APIs, or admin panels.
- **Network Reconnaissance:** Port scanning and mapping internal network topology.
- **Sensitive Metadata Access:** Stealing IAM roles/credentials from cloud metadata services (AWS, Google Cloud, Azure).
- **Stealing Data:** Exfiltrating sensitive logs or configuration files.
- **Remote Code Execution (RCE):** In some cases, if the server processes the fetched response as code.

---

## 📜 Real-World Case Studies

| Company         | Incident Description                                                                           |
| :-------------- | :--------------------------------------------------------------------------------------------- |
| **Capital One** | Attacker accessed AWS metadata service to steal credentials, exposing data of 100M+ customers. |
| **Tesla**       | Exploited SSRF to access an unprotected Kubernetes console for crypto-mining.                  |
| **GitHub**      | Researcher found a way to access internal APIs and sensitive metadata.                         |
| **Uber**        | SSRF on an internal dashboard allowed access to private keys and configuration details.        |

---

## 🔍 Detection & Testing

### Detection Indicators

- Unexpected internal requests in logs.
- Error messages disclosing internal IP addresses or service names.
- Anomalous traffic spikes to unfamiliar domains.

### Testing Tools

- **Burp Suite:** Scanner and Intruder modules.
- **OWASP ZAP:** Automated scanning and fuzzing.
- **Nuclei:** Template-based vulnerability scanning.
- **SSRFmap:** Specialized tool for SSRF exploitation.

---

## 🛡️ Prevention & Mitigation

The best defense is a **defense-in-depth** strategy:

### 1. Input Validation & Sanitization

- **Allowlisting (Whitelisting):** Only allow requests to a predefined list of trusted domains/IPs.
- **Protocol Restriction:** Only allow `http` or `https`; block `file://`, `gopher://`, `ftp://`.
- **URL Parsing:** Use robust libraries to validate URL formats.

### 2. Network-Level Defenses

- **Network Segmentation:** Isolate critical services from the web-facing server.
- **Egress Filtering:** Block the server from making outbound requests to internal IP ranges (e.g., `127.0.0.1`, `10.0.0.0/8`).
- **Use Proxies:** Force all outbound traffic through a secure proxy that filters requests.

### 3. Cloud-Specific Security

- **Adopt IMDSv2:** (For AWS) Requires session-based tokens to access instance metadata, preventing simple SSRF.
- **Least Privilege:** Give instances minimal permissions required for their tasks.

---

## 💡 Best Practices

- **Avoid Direct URLs:** Don't let users specify full URLs; use IDs or pre-defined keys.
- **Generic Errors:** Provide minimal feedback to users on failed requests to avoid reconnaissance.
- **Regular Audits:** Conduct thorough code reviews and penetration testing focusing on URL-handling logic.
