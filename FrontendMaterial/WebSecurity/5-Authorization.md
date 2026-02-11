# Authorization in Web Applications

Authorization defines the scope of what an authenticated user can do within an application. It ensures that users can only access resources and perform actions they are permitted to.

## 1. Authorization Approaches

| Approach                       | Description                                                                                    | Pros                                                    | Cons                                                               |
| :----------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------------------- |
| **RBAC** (Role-Based)          | Assigns permissions based on user roles (e.g., Admin, Editor).                                 | Simple to manage, consistent security policies.         | Inflexible for dynamic needs, "Role Explosion" in complex systems. |
| **ABAC** (Attribute-Based)     | Uses policies evaluating attributes of users, resources, and context (e.g., department, time). | Highly granular and flexible, scales for diverse needs. | Complex policy management, potential performance overhead.         |
| **PBAC** (Policy-Based)        | Uses formalized policies combining RBAC and ABAC elements.                                     | Highly customizable, unified policy framework.          | High complexity, requires advanced expertise.                      |
| **ReBAC** (Relationship-Based) | Permissions based on relationships between entities (e.g., "Owner of", "Friend of").           | Excellent for social/collaborative platforms, dynamic.  | Complex relationship modeling, performance challenges at scale.    |

---

## 2. Best Practices for Secure Authorization

### Access Control Strategies

- **Principle of Least Privilege (PoLP):** Grant users only the minimum access required for their tasks to limit potential damage from compromises.
- **Separate Authorization from Business Logic:** Use middleware or dedicated services to handle security checks. This keeps code clean and maintainable.
- **Regular Audits:** Periodically review user permissions to eliminate outdated or excessive privileges.
- **Verifying Resource Ownership:** Ensure users can only modify or access data they actually own (e.g., `user_id` checks).

### Data & Password Security

- **Salt & Slow Hashing:** Use unique salts for every user and slow algorithms like **bcrypt, scrypt, or Argon2** to protect against brute-force attacks.
- **Multi-Factor Authentication (MFA):** Add layers (something you know, have, or are) to significantly boost security.
- **Sensitive Data Segregation:** Store highly sensitive data (e.g., credit cards) on separate, more restricted servers or databases.
- **Eliminate Hardcoded Secrets:** Use environment variables or secure vaults (like AWS Secrets Manager or HashiCorp Vault).

### Session & Token Management

- **Secure JWT Validation:** Use `kid` (Key ID) in headers to select the correct validation key, especially during key rotations.
- **Advanced Session Management:** Rotate session IDs after login and set appropriate expiration times to prevent hijacking.
- **Maintain Server-Side State:** Avoid relying solely on client-side storage for critical authorization state to prevent tampering.

### Communication & Browser Security

- **Enforce HTTPS (TLS 1.3):** Encrypt all data in transit. Use **HSTS (Strict-Transport-Security)** headers to prevent downgrade attacks.
- **CSPRNG:** Use Cryptographically Secure Pseudorandom Number Generators for tokens and keys.
- **Security Headers:** Implement modern headers to control browser behavior and mitigate attacks.

### Defensive Implementation

- **Standardized Error Messages:** Use generic messages (e.g., "Invalid credentials") to prevent **User ID Enumeration**.
- **Input Validation & Sanitization:** Treat all user input as malicious to prevent SQL Injection and XSS.
- **Comprehensive Logging:** Maintain immutable audit logs of all authorization decisions and user activities for incident response.
- **Continuous Security Testing:** Integrate automated security scans into your CI/CD pipeline to catch vulnerabilities early.

## 3. Advanced Controls & Modern Tools

### Advanced Authorization Controls

- **Role Hierarchies:** Define roles that inherit permissions from others (e.g., a "Manager" inherits "Employee" permissions).
- **Context-Aware Restrictions:** Implement limitations based on time (e.g., working hours only) or geography (IP-based) for high-risk actions.
- **Consent Management:** Use clear mechanisms for user consent regarding data usage, ensuring compliance with **GDPR/CCPA**.
- **API Gateway Security:** Enforce rate limiting, API key validation, and routing policies to protect backend services.

### Modern Solutions

- **Standardized Libraries:** Use well-tested libraries like **OAuth2** or **Authgear** to manage complex flows, biometrics, and MFA instead of building from scratch.
