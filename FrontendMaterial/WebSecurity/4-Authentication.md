# Authentication in Web Development

## Overview

Authentication is the process of verifying that a person, organization, or website is who they claim to be. It is a vital operation that allows users to access platforms and perform actions based on their specific privileges.

## Types of Authentication

### 1. Password-Based Authentication

- **Mechanism**: Requires a unique identifier (email/username) and a password.
- **Security Boost**: Can be combined with Multi-Factor Authentication (MFA) using an OTP sent via email or phone.
- **Drawback**: Users must create and remember complex, secure passwords.

### 2. Password-less Authentication

Frees users from remembering passwords by using alternative verification methods:

- **OTP/Link**: One-time passwords or magic links sent via email or phone.
- **Social Login**: Leveraging trusted identity providers like Google, GitHub, or Facebook.
- **Protocols**: Using cryptographic methods or tokens instead of traditional secrets.

## Authentication Protocols

| Protocol      | Description                                   | Key Features                                                                   |
| :------------ | :-------------------------------------------- | :----------------------------------------------------------------------------- |
| **OAuth 2.0** | Token-based authorization/authentication.     | Uses HTTPS; provides secure tokens for API access.                             |
| **OpenId**    | HTTP-based Single Sign-On (SSO) protocol.     | Users reuse a single identity provider (e.g., Google) across sites.            |
| **SAML**      | XML-based protocol for enterprise federation. | Offers high flexibility; often used for corporate intranet SSO.                |
| **FIDO**      | Standard for secure, public-key-based auth.   | **UAF** for passwordless (biometrics) and **U2F** for 2nd factor (USB tokens). |

## Best Practices

### Password Security

- **Enforcement**: Require 8–64 character passwords; allow Unicode characters; avoid truncation.
- **Hashing**: Always hash passwords using strong cryptographic algorithms; never compare them directly.
- **Transmitting**: Use encryption over the network and re-authenticate for sensitive actions.
- **Changes**: Require the old password or MFA before allowing a password update.

### Login & UI Security

- **UI Design**: Mask password input by default but provide a "Show Password" option.
- **Information Leakage**: Use generic error messages (e.g., "Invalid username or password") to hide whether an account exists.
- **Brute-Force Protection**: Implement rate limiting, exponential backoff for failed attempts, and CAPTCHAs.
- **Monitoring**: Log all authentication failures (lockouts, incorrect passwords) for security auditing.

## Session Management

Once authenticated, the server generates a session to maintain the user's state across subsequent requests.
