# XML External Entity (XXE) Attack

An **XML External Entity (XXE)** attack is a serious security vulnerability that occurs when an XML parser is incorrectly configured to process **external entities** within an XML document. This can allow an attacker to view files on the application server filesystem, interact with any back-end or external systems that the application itself can access, or cause a denial of service.

## 1. What is an External Entity?

In the XML specification, an external entity is a way to import content from a different file or URL into an XML document.

- **Malicious Example**: `<!ENTITY xxe SYSTEM "file:///etc/passwd" >`
- When the parser reaches `&xxe;`, it fetches the contents of `/etc/passwd` and includes it in the document.

## 2. Types of XXE Attacks

### A. Direct XXE

The attacker submits a malicious XML payload directly to an endpoint that accepts XML.

- **Scenario**: A web app allows users to upload a "Profile Logo" as an SVG (which is XML-based).
- **Exploit**: The attacker uploads an SVG containing a system file reference. If the server doesn't disable external entities, it might return the file's content in the processed image or an error message.

### B. Indirect XXE

The attack targets endpoints that don't explicitly accept XML but use internal services that do.

- **Scenario**: You send a JSON request to a service, but that service internally converts your data into a SOAP/XML format to talk to a legacy payment gateway.
- **Exploit**: If the internal converter or the third-party service is vulnerable, the attacker can still trigger an XXE even if the entry point is JSON.

## 3. Vulnerable Formats

XXE isn't limited to `.xml` files. Any format based on or similar to XML is a potential vector:

- **SVG**: Scalable Vector Graphics (pure XML).
- **PDF/XFDF**: XML Forms Data Format.
- **HTML/DOM**: When serialized using XML parsers.
- **RTF**: Rich Text Format.
- **Office Docs**: `.docx`, `.xlsx` (OpenXML formats).

## 4. Example Scenario: Screenshot Service

Imagine a service that takes a screenshot of a webpage by serializing the DOM to XML and sending it to a converter:

**Vulnerable Client-side Code:**

```javascript
const screenshot = async () => {
  // Serializing DOM to XML string
  const page = document.getElementById("main").innerHTML;
  const serializer = new XMLSerializer();
  const pageAsString = serializer.serializeToString(page);

  await fetch("/screenshot", {
    method: "POST",
    body: pageAsString, // Sending XML payload
  });
};
```

**Attack Payload:**
Instead of valid HTML, the attacker sends:

```xml
<!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<xxe>&xxe;</xxe>
```

If the `xmltojpg` library on the server isn't configured to ignore DTDs, the resulting JPEG might actually contain the text of the `/etc/passwd` file.

## 5. Prevention Strategies

Prevention is primarily about **disabling features** of the XML parser that are not needed.

1.  **Disable DTDs**: The most effective way is to completely disable Document Type Definitions (DTDs) in your XML parser configuration.
2.  **Disable External Entities**: If DTDs are required, specifically disable the expansion of external entities (`SYSTEM` and `PUBLIC`).
3.  **Use Safer Formats**: Prefer JSON or other non-XML formats for data exchange whenever possible.
4.  **Keep Libraries Updated**: Vulnerabilities often exist in older versions of XML parsing libraries (like `libxml2`).
5.  **Input Validation**: Sanitize and validate any user-supplied XML before parsing.

## Summary

XXE is a configuration oversight that can lead to catastrophic data breaches. It must be addressed by ensuring that XML parsers, whether used directly or by internal third-party services, are hardened against external entity expansion.
