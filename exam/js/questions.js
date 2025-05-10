// questions.js
// This file will be populated with more questions covering all domains and objectives as per the Security+ SY0-701 curriculum.

const questions = [
  {
    id: 1,
    domain: "1.0 General Security Concepts",
    topic: "1.1 Compare and contrast various types of security controls.",
    questionType: "multipleChoiceSingle",
    questionText: "An organization implements security guards at the entrance of their facility. What type of security control is this?",
    options: [
      { id: "a", text: "Technical" },
      { id: "b", text: "Managerial" },
      { id: "c", text: "Operational" },
      { id: "d", text: "Physical" }
    ],
    correctAnswer: ["d"],
    explanation: "Security guards are a type of physical security control, designed to protect assets by physically preventing unauthorized access."
  },
  {
    id: 2,
    domain: "1.0 General Security Concepts",
    topic: "1.2 Summarize fundamental security concepts.",
    questionType: "multipleChoiceMultiple",
    questionText: "Which of the following are core components of the CIA triad? (Choose three)",
    options: [
      { id: "a", text: "Confidentiality" },
      { id: "b", text: "Authentication" },
      { id: "c", text: "Integrity" },
      { id: "d", text: "Availability" },
      { id: "e", text: "Authorization" }
    ],
    correctAnswer: ["a", "c", "d"],
    explanation: "The CIA triad consists of Confidentiality, Integrity, and Availability. These are fundamental principles for information security."
  },
  {
    id: 3,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.1 Compare and contrast common threat actors and motivations.",
    questionType: "fillInTheBlank",
    questionText: "A threat actor primarily motivated by political or social change is known as a _________.",
    options: [], 
    correctAnswer: ["hacktivist"],
    explanation: "A hacktivist is an attacker who uses hacking techniques to promote a political agenda or social change."
  },
  {
    id: 4,
    domain: "3.0 Security Architecture",
    topic: "3.2 Given a scenario, apply security principles to secure enterprise infrastructure.",
    questionType: "dragAndDrop", 
    questionText: "Drag the appropriate security device to its correct placement in a typical network DMZ setup.",
    pbqData: {
        draggableItems: [
            {id: "item1", text: "Web Server"},
            {id: "item2", text: "Firewall"},
            {id: "item3", text: "Internal Database Server"},
            {id: "item4", text: "IDS Sensor"}
        ],
        dropZones: [
            {id: "zoneA", label: "Internet Side"},
            {id: "zoneB", label: "DMZ Segment"},
            {id: "zoneC", label: "Internal Network Side"}
        ],
        correctMapping: { "item1": "zoneB", "item2": "zoneA" } // Simplified, a real PBQ would have more complex mapping logic
    },
    options: [],
    correctAnswer: [], // For PBQs, correctness is often evaluated by the pbqData.correctMapping or specific logic
    explanation: "Firewalls are placed at the boundaries of the DMZ (e.g., between Internet and DMZ, and DMZ and Internal Network). Web servers are typically placed within the DMZ. IDS sensors can be placed in various locations to monitor traffic."
  },
  {
    id: 5,
    domain: "4.0 Security Operations",
    topic: "4.3 Explain various activities associated with vulnerability management.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following vulnerability scan results indicates that a reported vulnerability does not actually exist on the system?",
    options: [
      { id: "a", text: "False Positive" },
      { id: "b", text: "False Negative" },
      { id: "c", text: "True Positive" },
      { id: "d", text: "True Negative" }
    ],
    correctAnswer: ["a"],
    explanation: "A false positive is a result that incorrectly indicates a vulnerability is present when it is not."
  },
  {
    id: 6,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.1 Summarize elements of effective security governance.",
    questionType: "exhibit", 
    questionText: "Refer to the provided organizational chart. Which role is typically responsible for the overall security posture and strategy of the organization?",
    exhibitUrl: "/assets/exhibits/org_chart_security_roles.png", // Ensure this dummy file exists
    options: [
      { id: "a", text: "Security Analyst" },
      { id: "b", text: "Network Administrator" },
      { id: "c", text: "Chief Information Security Officer (CISO)" },
      { id: "d", text: "Help Desk Technician" }
    ],
    correctAnswer: ["c"],
    explanation: "The Chief Information Security Officer (CISO) is generally responsible for establishing and maintaining the enterprise vision, strategy, and program to ensure information assets and technologies are adequately protected."
  },
  {
    id: 7,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.4 Given a scenario, analyze indicators of malicious activity.",
    questionType: "pbqLogAnalysis", 
    questionText: "Review the following server log excerpt. Which entry most strongly indicates a potential SQL injection attempt? Click on the suspicious log entry line number.",
    exhibitUrl: null, 
    pbqData: {
        logLines: [
            "LINE 1: [2025-05-06 10:00:01] INFO User 'admin' logged in from 192.168.1.100",
            "LINE 2: [2025-05-06 10:00:05] INFO Page '/dashboard' accessed by user 'admin'",
            "LINE 3: [2025-05-06 10:01:10] WARN Attempt to access '/admin/config' by user 'guest' from 10.0.0.5 - Unauthorized",
            "LINE 4: [2025-05-06 10:02:15] INFO Product search: query='SELECT * FROM products WHERE id = 1 OR 1=1; --' by user 'guest' from 10.0.0.5",
            "LINE 5: [2025-05-06 10:03:00] INFO User 'admin' updated profile settings"
        ],
        correctLineNumber: 4 
    },
    options: [],
    correctAnswer: ["4"], // Represents the line number
    explanation: "Line 4 shows a common SQL injection pattern ('OR 1=1; --') being used in a product search query, attempting to bypass authentication or retrieve all data."
  },
  {
    id: 8,
    domain: "1.0 General Security Concepts",
    topic: "1.3 Explain the importance of change management processes and the impact to security.",
    questionType: "multipleChoiceSingle",
    questionText: "When implementing a significant change to an IT system, which document outlines the steps to revert to the previous state if the change fails?",
    options: [
      { id: "a", text: "Risk Assessment Plan" },
      { id: "b", text: "Backout Plan" },
      { id: "c", text: "Disaster Recovery Plan" },
      { id: "d", text: "Standard Operating Procedure" }
    ],
    correctAnswer: ["b"],
    explanation: "A backout plan is a critical part of change management that details the procedures to restore a system to its original state if a change implementation is unsuccessful or causes issues."
  },
  {
    id: 9,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.2 Explain common threat vectors and attack surfaces.",
    questionType: "multipleChoiceSingle",
    questionText: "A user reports that their files are inaccessible and they see a message demanding payment to regain access. This is most likely an attack by what type of malware?",
    options: [
      { id: "a", text: "Spyware" },
      { id: "b", text: "Worm" },
      { id: "c", text: "Ransomware" },
      { id: "d", text: "Trojan" }
    ],
    correctAnswer: ["c"],
    explanation: "Ransomware is a type of malicious software that blocks access to a victim's data or threatens to publish it until a ransom is paid."
  },
  {
    id: 10,
    domain: "3.0 Security Architecture",
    topic: "3.1 Compare and contrast security implications of different architecture models.",
    questionType: "multipleChoiceSingle",
    questionText: "Which cloud computing service model provides the highest level of control and responsibility to the customer over the operating systems, storage, and deployed applications?",
    options: [
      { id: "a", text: "Software as a Service (SaaS)" },
      { id: "b", text: "Platform as a Service (PaaS)" },
      { id: "c", text: "Infrastructure as a Service (IaaS)" },
      { id: "d", text: "Function as a Service (FaaS)" }
    ],
    correctAnswer: ["c"],
    explanation: "Infrastructure as a Service (IaaS) provides the fundamental building blocks for cloud IT. It typically provides access to networking features, computers (virtual or on dedicated hardware), and data storage space. IaaS gives you the highest level of flexibility and management control over your IT resources and is most similar to existing IT resources that many IT departments and developers are familiar with today."
  },
  {
    id: 11,
    domain: "4.0 Security Operations",
    topic: "4.4 Explain security alerting and monitoring concepts and tools.",
    questionType: "multipleChoiceSingle",
    questionText: "During a security incident investigation, you are analyzing network traffic logs to identify suspicious connections. Which of the following data points would be LEAST directly useful in identifying the source of a potential external attack?",
    options: [
      { id: "a", text: "Source IP addresses of incoming connections" },
      { id: "b", text: "Destination port numbers on internal servers" },
      { id: "c", text: "MAC addresses of devices on the internal network" },
      { id: "d", text: "Timestamps of connection attempts" }
    ],
    correctAnswer: ["c"],
    explanation: "MAC addresses are hardware addresses used for communication within a local network segment. While useful for internal network analysis, they are not typically visible or relevant when tracing the source of an external attack originating from the internet, as MAC addresses are stripped and replaced at each hop by routers."
  },
  {
    id: 12,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.2 Given a scenario, implement risk management processes and concepts.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following documents would typically outline the acceptable use of company-owned IT assets, including internet access and email usage?",
    options: [
      { id: "a", text: "Incident Response Plan" },
      { id: "b", text: "Acceptable Use Policy (AUP)" },
      { id: "c", text: "Business Continuity Plan (BCP)" },
      { id: "d", text: "Security Audit Report" }
    ],
    correctAnswer: ["b"],
    explanation: "An Acceptable Use Policy (AUP) is a document that defines the constraints and practices that a user must agree to for access to a corporate network, the internet or other resources. It outlines what an organization considers to be the acceptable use of its IT assets."
  },
  {
    id: 13,
    domain: "1.0 General Security Concepts",
    topic: "1.4 Explain the importance of using appropriate cryptographic solutions.",
    questionType: "multipleChoiceSingle",
    questionText: "Which type of encryption uses two different keys, one for encryption and one for decryption?",
    options: [
      { id: "a", text: "Symmetric encryption" },
      { id: "b", text: "Asymmetric encryption" },
      { id: "c", text: "Hashing" },
      { id: "d", text: "Steganography" }
    ],
    correctAnswer: ["b"],
    explanation: "Asymmetric encryption, also known as public-key cryptography, uses a pair of keys: a public key for encryption and a private key for decryption. Symmetric encryption uses the same key for both processes."
  },
  {
    id: 14,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.3 Explain various types of vulnerabilities.",
    questionType: "multipleChoiceSingle",
    questionText: "A vulnerability that is exploited before the software vendor is aware of it or has released a patch is known as a:?",
    options: [
      { id: "a", text: "Zero-day vulnerability" },
      { id: "b", text: "Legacy system vulnerability" },
      { id: "c", text: "Misconfiguration" },
      { id: "d", text: "Buffer overflow" }
    ],
    correctAnswer: ["a"],
    explanation: "A zero-day vulnerability is a software security flaw that is known to the software vendor but doesn't have a patch in place to fix the flaw. It has a high chance of being exploited by attackers."
  },
  {
    id: 15,
    domain: "3.0 Security Architecture",
    topic: "3.3 Compare and contrast concepts and strategies to protect data.",
    questionType: "multipleChoiceMultiple",
    questionText: "Which of the following are common methods used for data loss prevention (DLP)? (Choose two)",
    options: [
      { id: "a", text: "Network segmentation" },
      { id: "b", text: "Endpoint data monitoring" },
      { id: "c", text: "Content filtering and blocking" },
      { id: "d", text: "Load balancing" },
      { id: "e", text: "Vulnerability scanning" }
    ],
    correctAnswer: ["b", "c"],
    explanation: "Data Loss Prevention (DLP) strategies often involve monitoring data at endpoints (e.g., user workstations, mobile devices) and using content filtering to identify and block sensitive data from leaving the organization's control. While network segmentation can help contain breaches, it's not a primary DLP method itself."
  },
  {
    id: 16,
    domain: "4.0 Security Operations",
    topic: "4.1 Given a scenario, apply common security techniques to computing resources.",
    questionType: "multipleChoiceSingle",
    questionText: "What is the primary purpose of sandboxing when analyzing potentially malicious software?",
    options: [
      { id: "a", text: "To encrypt the malware for secure storage" },
      { id: "b", text: "To execute the malware in an isolated environment to observe its behavior without risking harm to production systems" },
      { id: "c", text: "To quickly identify the malware's signature using antivirus definitions" },
      { id: "d", text: "To share the malware sample with other organizations immediately" }
    ],
    correctAnswer: ["b"],
    explanation: "Sandboxing provides an isolated environment where suspicious code can be executed and analyzed safely. This allows security analysts to observe its behavior, understand its capabilities, and develop countermeasures without impacting live systems."
  },
  {
    id: 17,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.3 Explain the importance of business continuity and disaster recovery concepts.",
    questionType: "multipleChoiceSingle",
    questionText: "A company has identified that its critical business operations must be resumable within 4 hours of a major disruption. This time period is known as the:?",
    options: [
      { id: "a", text: "Recovery Point Objective (RPO)" },
      { id: "b", text: "Recovery Time Objective (RTO)" },
      { id: "c", text: "Mean Time Between Failures (MTBF)" },
      { id: "d", text: "Mean Time To Repair (MTTR)" }
    ],
    correctAnswer: ["b"],
    explanation: "The Recovery Time Objective (RTO) is the targeted duration of time within which a business process must be restored after a disaster or disruption in order to avoid unacceptable consequences associated with a break in business continuity."
  },
  // Adding new questions based on SY0-701 objectives
  {
    id: 18,
    domain: "1.0 General Security Concepts",
    topic: "1.5 Explain common use cases and concepts of public key infrastructure (PKI).",
    questionType: "multipleChoiceSingle",
    questionText: "In a Public Key Infrastructure (PKI), what is the primary role of a Certificate Authority (CA)?",
    options: [
      { id: "a", text: "To encrypt all network traffic" },
      { id: "b", text: "To issue and manage digital certificates" },
      { id: "c", text: "To store private keys securely" },
      { id: "d", text: "To perform vulnerability scans on servers" }
    ],
    correctAnswer: ["b"],
    explanation: "A Certificate Authority (CA) is a trusted entity that issues digital certificates. These certificates verify the identity of entities (like websites or users) and bind public keys to them."
  },
  {
    id: 19,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.5 Explain techniques used in penetration testing.",
    questionType: "multipleChoiceMultiple",
    questionText: "Which of the following are common phases of a penetration test? (Choose three)",
    options: [
      { id: "a", text: "Reconnaissance" },
      { id: "b", text: "Patch Management" },
      { id: "c", text: "Exploitation" },
      { id: "d", text: "Post-Exploitation (Maintaining Access)" },
      { id: "e", text: "User Training" }
    ],
    correctAnswer: ["a", "c", "d"],
    explanation: "Common phases of a penetration test include Reconnaissance (gathering information), Scanning/Enumeration, Gaining Access (Exploitation), Maintaining Access (Post-Exploitation), and Covering Tracks/Reporting. Patch management and user training are security practices but not direct phases of a pen test itself."
  },
  {
    id: 20,
    domain: "3.0 Security Architecture",
    topic: "3.4 Given a scenario, implement secure network designs.",
    questionType: "multipleChoiceSingle",
    questionText: "What is the primary purpose of network segmentation?",
    options: [
      { id: "a", text: "To increase overall network bandwidth" },
      { id: "b", text: "To isolate network traffic and reduce the attack surface" },
      { id: "c", text: "To ensure all devices use the same IP addressing scheme" },
      { id: "d", text: "To automatically update firmware on all network devices" }
    ],
    correctAnswer: ["b"],
    explanation: "Network segmentation involves dividing a network into smaller, isolated subnets. This helps to contain security breaches, reduce the attack surface, and improve performance by isolating traffic."
  },
  {
    id: 21,
    domain: "4.0 Security Operations",
    topic: "4.2 Given an incident, utilize appropriate incident response processes.",
    questionType: "multipleChoiceSingle",
    questionText: "According to common incident response models (e.g., NIST), which phase typically involves actions to limit the scope and impact of an ongoing security incident?",
    options: [
      { id: "a", text: "Preparation" },
      { id: "b", text: "Detection and Analysis" },
      { id: "c", text: "Containment, Eradication, and Recovery" },
      { id: "d", text: "Post-Incident Activity (Lessons Learned)" }
    ],
    correctAnswer: ["c"],
    explanation: "The Containment phase of incident response focuses on limiting the damage and preventing further spread of an incident. Eradication involves removing the cause of the incident, and Recovery involves restoring systems to normal operation."
  },
  {
    id: 22,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.4 Explain the importance of data privacy and protection.",
    questionType: "multipleChoiceSingle",
    questionText: "Which regulation is primarily focused on data protection and privacy for individuals within the European Union (EU)?",
    options: [
      { id: "a", text: "HIPAA" },
      { id: "b", text: "GDPR" },
      { id: "c", text: "SOX" },
      { id: "d", text: "PCI DSS" }
    ],
    correctAnswer: ["b"],
    explanation: "The General Data Protection Regulation (GDPR) is a comprehensive data privacy law enacted by the European Union to protect the personal data of individuals within the EU and the European Economic Area (EEA)."
  },
  {
    id: 23,
    domain: "1.0 General Security Concepts",
    topic: "1.1 Compare and contrast various types of security controls.",
    questionType: "fillInTheBlank",
    questionText: "A security control that is intended to discourage a potential attacker from attempting an intrusion is known as a ________ control.",
    options: [],
    correctAnswer: ["deterrent"],
    explanation: "Deterrent controls are designed to discourage attackers. Examples include warning signs, security guards, and the threat of legal action."
  },
  {
    id: 24,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.6 Explain common techniques to mitigate vulnerabilities and attacks.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following is a primary defense against malware that encrypts files and demands payment for their release?",
    options: [
      { id: "a", text: "Implementing strong password policies" },
      { id: "b", text: "Regularly backing up data and testing restores" },
      { id: "c", text: "Disabling unused user accounts" },
      { id: "d", text: "Using a network intrusion detection system (NIDS)" }
    ],
    correctAnswer: ["b"],
    explanation: "Regularly backing up data to an offline or isolated location and ensuring those backups can be restored is a critical defense against ransomware. If infected, an organization can restore its data from backups without paying the ransom."
  },
  {
    id: 25,
    domain: "3.0 Security Architecture",
    topic: "3.5 Given a scenario, implement secure wireless network designs.",
    questionType: "multipleChoiceSingle",
    questionText: "Which wireless security protocol is considered the most secure for modern Wi-Fi networks?",
    options: [
      { id: "a", text: "WEP" },
      { id: "b", text: "WPA" },
      { id: "c", text: "WPA2-PSK (AES)" },
      { id: "d", text: "WPA3" }
    ],
    correctAnswer: ["d"],
    explanation: "WPA3 (Wi-Fi Protected Access 3) is the latest and most secure wireless security protocol, offering significant improvements over WPA2, including stronger encryption and protection against certain types of attacks."
  },
  {
    id: "ec1_1", // Re-integrating the previously extracted question with a unique ID
    domain: "1.0 General Security Concepts", 
    topic: "1.1 Compare and contrast various types of security controls.",
    questionType: "multipleChoiceMultiple",
    questionText: "Which of the following answers can be used to describe technical security controls? (Select 3 answers)",
    options: [
      { id: "a", text: "Focused on protecting material assets" },
      { id: "b", text: "Sometimes called logical security controls" },
      { id: "c", text: "Executed by computer systems (instead of people)" },
      { id: "d", text: "Also known as administrative controls" },
      { id: "e", text: "Implemented with technology" },
      { id: "f", text: "Primarily implemented and executed by people (as opposed to computer systems)" }
    ],
    correctAnswer: ["b", "c", "e"], 
    explanation: "Technical security controls are implemented using technology and are often executed by computer systems. They are also referred to as logical controls. Examples include firewalls, intrusion detection systems, and encryption. Administrative controls involve policies and procedures, while physical controls protect tangible assets."
  }


];

// To make questions accessible in other JS files if needed (e.g., app.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}



  // Adding more questions to ensure comprehensive coverage
  {
    id: 26,
    domain: "3.0 Security Architecture",
    topic: "3.6 Given a scenario, apply cybersecurity solutions to the cloud.",
    questionType: "multipleChoiceSingle",
    questionText: "A company is migrating its on-premises web application to a cloud provider. Which cloud security solution is specifically designed to protect web applications from common web exploits like SQL injection and cross-site scripting (XSS)?",
    options: [
      { id: "a", text: "Cloud Access Security Broker (CASB)" },
      { id: "b", text: "Security Information and Event Management (SIEM)" },
      { id: "c", text: "Web Application Firewall (WAF)" },
      { id: "d", text: "Next-Generation Firewall (NGFW)" }
    ],
    correctAnswer: ["c"],
    explanation: "A Web Application Firewall (WAF) is specifically designed to protect web applications by filtering and monitoring HTTP traffic between a web application and the Internet. It can help protect against attacks such as cross-site scripting (XSS), SQL injection, and other common web application vulnerabilities."
  },
  {
    id: 27,
    domain: "4.0 Security Operations",
    topic: "4.5 Summarize the techniques of digital forensics.",
    questionType: "multipleChoiceMultiple",
    questionText: "Which of the following are key considerations or steps in a digital forensics investigation? (Choose three)",
    options: [
      { id: "a", text: "Immediately rebooting the affected system to clear volatile memory" },
      { id: "b", text: "Establishing and maintaining a chain of custody for all evidence" },
      { id: "c", text: "Acquiring data using forensically sound methods (e.g., write-blockers, imaging)" },
      { id: "d", text: "Analyzing data directly on the original evidence media to save time" },
      { id: "e", text: "Documenting every step of the investigation process meticulously" }
    ],
    correctAnswer: ["b", "c", "e"],
    explanation: "Key principles in digital forensics include: maintaining a chain of custody to ensure evidence integrity, acquiring data using forensically sound methods (like imaging and write-blockers) to prevent alteration of original evidence, and meticulous documentation of the entire process. Rebooting can destroy volatile evidence, and analysis should be performed on copies, not the original media, to preserve it."
  },
  {
    id: 28,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.5 Given a scenario, apply controls to meet various security and privacy standards, regulations, and frameworks.",
    questionType: "multipleChoiceSingle",
    questionText: "An organization processes credit card payments and must comply with a specific industry security standard. Which standard is MOST relevant for protecting cardholder data?",
    options: [
      { id: "a", text: "ISO 27001" },
      { id: "b", text: "NIST Cybersecurity Framework" },
      { id: "c", text: "PCI DSS (Payment Card Industry Data Security Standard)" },
      { id: "d", text: "SOC 2 (Service Organization Control 2)" }
    ],
    correctAnswer: ["c"],
    explanation: "The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to ensure that ALL companies that accept, process, store or transmit credit card information maintain a secure environment."
  },
  {
    id: 29,
    domain: "1.0 General Security Concepts",
    topic: "1.6 Explain common threat intelligence concepts.",
    questionType: "multipleChoiceSingle",
    questionText: "A security team receives a threat intelligence feed that provides information about known malicious IP addresses and domains. This type of information is best categorized as:",
    options: [
      { id: "a", text: "Strategic intelligence" },
      { id: "b", text: "Tactical intelligence" },
      { id: "c", text: "Operational intelligence" },
      { id: "d", text: "Technical intelligence" }
    ],
    correctAnswer: ["d"],
    explanation: "Technical intelligence provides details on specific indicators of compromise (IoCs) like malicious IP addresses, domains, file hashes, and malware signatures. This information is highly specific and used for detection and blocking. Tactical intelligence focuses on attacker TTPs, operational on specific campaigns, and strategic on high-level risk to the business."
  },
  {
    id: 30,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.7 Given a scenario, use appropriate tools and techniques to establish a security baseline.",
    questionType: "fillInTheBlank",
    questionText: "A snapshot of the security configuration of a system, which is then used as a reference point for future comparisons to detect deviations, is known as a security _________.",
    options: [],
    correctAnswer: ["baseline"],
    explanation: "A security baseline is a standardized level of minimum security configuration for a system or network. It serves as a reference point to measure against and helps identify any unauthorized changes or deviations."
  }
];

// To make questions accessible in other JS files if needed (e.g., app.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}

