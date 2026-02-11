# Distributed Denial of Service (DDoS)

## 1. What is a DDoS Attack?

A **Distributed Denial of Service (DDoS)** attack is a malicious attempt to disrupt the normal traffic of a targeted server, service, or network by overwhelming it with a flood of Internet traffic.

- **Mechanism**: Attackers use **Botnets** (networks of compromised computers and IoT devices) to send instructions remotely.
- **Challenge**: Because traffic comes from distributed global sources, it is extremely difficult to filter.

## 2. Common Objectives

- **Financial Gain**: Extortion and ransom demands.
- **Business Rivalry**: Damaging a competitor's reputation or market share.
- **Hacktivism**: Digital protest for political or ideological causes.
- **Diversion**: Using DDoS as a "smokescreen" to cover up more serious activities like data theft.
- **Personal Reasons**: "For the lulz" or personal vendettas.

## 3. Types of DDoS Attacks

### A. Volume-Based Attacks (Flood)

_Goal: Saturate the target's bandwidth._

- **UDP Flood**: Floods random ports on the victim's machine, forcing it to check for apps and respond with "Unreachable" messages.
- **ICMP (Ping) Flood**: Overwhelms the network with echo requests without waiting for replies.
- **Amplification Attack**: Exploits protocols like DNS or NTP to send small requests that result in massive responses directed at the victim.

### B. Protocol Attacks (State-Exhaustion)

_Goal: Consume actual server resources or intermediate equipment (firewalls, load balancers)._

- **SYN Flood**: Exploits the TCP handshake by leaving many connections "half-open," tying up server resources.
- **Smurf Attack**: Sends spoofed ICMP requests to broadcast addresses so every host on the network responds to the victim.
- **Fragmentation Attack**: Sends malformed packets that are impossible to reassemble, causing high CPU usage or crashes.

### C. Application Layer Attacks (Layer 7)

_Goal: Overload specific functions of an application to mimic legitimate user behavior._

- **HTTP Flood**: Sends seemingly legitimate HTTP requests (GET/POST) to exhaust server resources.
- **Slowloris**: Keeps as many connections open as possible by sending partial requests that never complete.
- **DNS Flood**: Floods DNS servers to prevent legitimate users from resolving domain names.

## 4. Impact of Attacks

- **Direct Financial Loss**: Lost sales during downtime and high mitigation costs.
- **Service Degradation**: Extreme slowness or partial unavailability of features.
- **Reputational Damage**: Erosion of consumer trust and loss of brand value.
- **SLA Penalties**: Financial hits due to failure to meet uptime guarantees.

## 5. Detection and Monitoring

- **Early Signs**: Sudden traffic spikes, slow performance, geographic irregularities (e.g., traffic from regions you don't serve).
- **Techniques**:
  - **Baseline Monitoring**: Knowing what "normal" traffic looks like.
  - **Anomaly Detection**: Using ML to flag deviations.
- **Tools**: Cloudflare, Akamai (Commercial); Snort, Suricata, Wireshark (Open Source/Manual).

## 6. Defensive Strategies

- **Overprovisioning**: Having significantly more bandwidth than needed to act as a buffer.
- **Rate Limiting**: Controlling the volume of traffic allowed from any single source.
- **WAF (Web Application Firewall)**: Specifically designed to filter out L7 (Application Layer) attacks.
- **Anycast Networks**: Distributing traffic across many global servers to "dilute" the attack.
- **ISP Collaboration**: Using "upstream" filtering to block malicious traffic before it even reaches your network.

## 7. Major Case Studies

- **2016 Dyn Attack**: A massive attack using the **Mirai botnet** (compromised IoT devices) that took down Netflix, Twitter, and PayPal.
- **2017 GitHub Attack**: One of the largest recorded attacks (1.35 Tbps) using **Memcached amplification**. Mitigated quickly due to robust infrastructure.
