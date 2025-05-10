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
    topic: "2.5 Explain common social engineering techniques.",
    questionType: "multipleChoiceSingle",
    questionText: "An attacker calls an employee pretending to be from the IT help desk and asks for the employee’s password to troubleshoot an issue. This is an example of which social engineering technique?",
    options: [
      { id: "a", text: "Phishing" },
      { id: "b", text: "Tailgating" },
      { id: "c", text: "Pretexting" },
      { id: "d", text: "Baiting" }
    ],
    correctAnswer: ["c"],
    explanation: "Pretexting is a form of social engineering where an attacker creates a fabricated scenario (a pretext) to gain the victim's trust and obtain sensitive information. Phishing is typically done via email, tailgating involves physical access, and baiting involves enticing a victim with a false promise."
  },
  {
    id: 20,
    domain: "3.0 Security Architecture",
    topic: "3.4 Summarize secure application development and deployment concepts.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following is a key benefit of performing input validation on user-supplied data in a web application?",
    options: [
      { id: "a", text: "It guarantees the application will be free of all vulnerabilities." },
      { id: "b", text: "It helps prevent common injection attacks like SQL injection and XSS." },
      { id: "c", text: "It encrypts all data transmitted between the client and server." },
      { id: "d", text: "It ensures the application is always available to users." }
    ],
    correctAnswer: ["b"],
    explanation: "Input validation is a critical security practice in application development. By checking and sanitizing user-supplied data, applications can prevent malicious input from being processed, which is a common vector for injection attacks like SQL injection and Cross-Site Scripting (XSS)."
  },
  {
    id: 21,
    domain: "4.0 Security Operations",
    topic: "4.2 Given a scenario, use appropriate data sources to support an investigation.",
    questionType: "multipleChoiceMultiple",
    questionText: "During an incident investigation involving a compromised web server, which of the following data sources would be most valuable? (Choose three)",
    options: [
      { id: "a", text: "Web server access logs" },
      { id: "b", text: "Employee performance reviews" },
      { id: "c", text: "Firewall logs" },
      { id: "d", text: "Physical access logs to the data center" },
      { id: "e", text: "Intrusion Detection System (IDS) alerts" }
    ],
    correctAnswer: ["a", "c", "e"],
    explanation: "For a compromised web server, web server access logs show requests made to the server, firewall logs show network traffic to and from the server, and IDS alerts can indicate malicious activity detected. Employee reviews and physical access logs are less directly relevant to a typical web server compromise investigation unless a physical or insider threat is specifically suspected."
  },
  {
    id: 22,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.4 Explain the importance of policies, processes, and procedures for security.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following best describes a security procedure?",
    options: [
      { id: "a", text: "A high-level statement of intent from management regarding security." },
      { id: "b", text: "A detailed, step-by-step guide on how to perform a specific security task." },
      { id: "c", text: "A broad plan outlining the goals of the security program." },
      { id: "d", text: "An assessment of potential threats and vulnerabilities." }
    ],
    correctAnswer: ["b"],
    explanation: "A security procedure provides detailed, step-by-step instructions for performing a specific task to implement a security policy. Policies are high-level statements, processes are sequences of actions, and procedures are the specifics of those actions."
  },
  {
    id: 23,
    domain: "1.0 General Security Concepts",
    topic: "1.7 Explain and apply common mitigation techniques and controls.",
    questionType: "multipleChoiceSingle",
    questionText: "Which security control is primarily aimed at preventing unauthorized physical access to a secure facility?",
    options: [
      { id: "a", text: "Firewall" },
      { id: "b", text: "Encryption" },
      { id: "c", text: "Mantrap" },
      { id: "d", text: "Antivirus software" }
    ],
    correctAnswer: ["c"],
    explanation: "A mantrap is a physical security control consisting of a small space with two sets of interlocking doors, suchthat the first set of doors must close before the second set opens. This is used to control access to secure areas by only allowing one person through at a time and preventing tailgating."
  },
  {
    id: 24,
    domain: "3.0 Security Architecture",
    topic: "3.5 Given a scenario, implement cybersecurity resilience.",
    questionType: "multipleChoiceSingle",
    questionText: "A company wants to ensure its critical web application remains available even if one of its data centers experiences an outage. Which resilience strategy would best achieve this?",
    options: [
      { id: "a", text: "Implementing strong password policies" },
      { id: "b", text: "Regularly patching the web server software" },
      { id: "c", text: "Deploying the application across multiple, geographically diverse data centers with load balancing and failover" },
      { id: "d", text: "Conducting daily vulnerability scans" }
    ],
    correctAnswer: ["c"],
    explanation: "Cybersecurity resilience involves the ability to prepare for, withstand, and recover from cyberattacks or disruptions. Deploying an application across multiple, geographically diverse data centers with load balancing and automatic failover mechanisms is a key strategy for achieving high availability and resilience against data center-level outages."
  },
  {
    id: 25,
    domain: "4.0 Security Operations",
    topic: "4.3 Explain various activities associated with vulnerability management.",
    questionType: "pbqFirewallConfig",
    questionText: "A security administrator needs to configure a firewall rule to allow internal users (network 192.168.1.0/24) to access an external web server (IP 203.0.113.50) on HTTPS. All other traffic to this server should be denied. Configure the rule components.",
    pbqData: {
        components: {
            sourceIp: "",
            destinationIp: "",
            destinationPort: "",
            protocol: "",
            action: ""
        }
    },
    options: [],
    correctAnswer: ["192.168.1.0/24", "203.0.113.50", "443", "TCP", "ALLOW"],
    explanation: "Source IP: 192.168.1.0/24 (internal network). Destination IP: 203.0.113.50 (external web server). Destination Port: 443 (HTTPS). Protocol: TCP (HTTPS uses TCP). Action: ALLOW. A default deny rule would block other traffic."
  },
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


// ui.js - UI manipulation functions for Security+ Exam Demo

const UI = {
    // Screen elements
    welcomeScreen: document.getElementById("welcome-screen"),
    learningInterface: document.getElementById("learning-interface"), // Corrected: was examInterface
    summaryPage: document.getElementById("summary-page"), // Corrected: was resultsPage or reviewPage

    // Exam interface elements
    questionCounterElem: document.getElementById("question-counter"), // Corrected: was questionCounter
    exhibitArea: document.getElementById("exhibit-area"),
    exhibitImage: document.getElementById("exhibit-image"),
    exhibitTextElem: document.getElementById("exhibit-text"),
    questionTextPElem: document.getElementById("question-text-p"), // Corrected: was questionTextP
    answerOptionsContainer: document.getElementById("answer-options"), // Corrected: was answerOptionsDiv
    pbqInteractionArea: document.getElementById("pbq-interaction-area"),
    feedbackArea: document.getElementById("feedback-area"),
    feedbackCorrectness: document.getElementById("feedback-correctness"),
    feedbackUserAnswer: document.getElementById("feedback-user-answer"),
    feedbackCorrectAnswer: document.getElementById("feedback-correct-answer"),
    feedbackExplanation: document.getElementById("feedback-explanation"),

    // Results page elements (within summaryPage)
    summaryDetails: document.getElementById("summary-details"), // Corrected: was overallScoreSpan, passFailStatusSpan, domainPerformanceDiv, reviewSummaryDiv

    showScreen: function(screenName) {
        this.welcomeScreen.classList.add("hidden");
        this.learningInterface.classList.add("hidden");
        this.summaryPage.classList.add("hidden");

        if (screenName === "welcome") this.welcomeScreen.classList.remove("hidden");
        else if (screenName === "learning") this.learningInterface.classList.remove("hidden"); // Corrected: was exam
        else if (screenName === "summary") this.summaryPage.classList.remove("hidden"); // Corrected: was results or review
    },

    renderQuestion: function(question, userAnswerData) {
        this.questionCounterElem.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`; // Use currentQuestionIndex from app.js
        this.questionTextPElem.textContent = question.questionText;
        this.answerOptionsContainer.innerHTML = ""; 
        this.pbqInteractionArea.innerHTML = ""; 

        if (question.exhibitUrl) {
            this.exhibitImage.src = "assets/exhibits/" + question.exhibitUrl.split("/").pop(); // Corrected path
            this.exhibitImage.alt = `Exhibit for question ${question.id}`;
            this.exhibitArea.classList.remove("hidden");
            this.exhibitTextElem.textContent = ""; 
        } else if (question.exhibitText) { 
            this.exhibitTextElem.textContent = question.exhibitText;
            this.exhibitImage.src = ""; 
            this.exhibitArea.classList.remove("hidden");
        } else {
            this.exhibitArea.classList.add("hidden");
        }

        const previouslySelectedAnswers = (userAnswerData && userAnswerData.attempted) ? userAnswerData.answer : [];

        switch (question.questionType) {
            case "multipleChoiceSingle":
            case "exhibit": 
                question.options.forEach(opt => {
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `q${question.id}`;
                    input.id = `q${question.id}_${opt.id}`;
                    input.value = opt.id;
                    if (previouslySelectedAnswers.includes(opt.id)) input.checked = true;
                    const label = document.createElement("label");
                    label.htmlFor = `q${question.id}_${opt.id}`;
                    label.textContent = opt.text;
                    li.appendChild(input);
                    li.appendChild(label);
                    this.answerOptionsContainer.appendChild(li);
                });
                break;

            case "multipleChoiceMultiple":
                question.options.forEach(opt => {
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = `q${question.id}`;
                    input.id = `q${question.id}_${opt.id}`;
                    input.value = opt.id;
                    if (previouslySelectedAnswers.includes(opt.id)) input.checked = true;
                    const label = document.createElement("label");
                    label.htmlFor = `q${question.id}_${opt.id}`;
                    label.textContent = opt.text;
                    li.appendChild(input);
                    li.appendChild(label);
                    this.answerOptionsContainer.appendChild(li);
                });
                break;

            case "fillInTheBlank":
                const fitbInput = document.createElement("input"); // Renamed to avoid conflict
                fitbInput.type = "text";
                fitbInput.id = `q${question.id}_blank`;
                fitbInput.className = "fill-in-blank-input";
                fitbInput.value = previouslySelectedAnswers[0] || "";
                this.answerOptionsContainer.appendChild(fitbInput);
                break;
            
            case "dragAndDrop":
                this.renderDragAndDrop(question, userAnswerData);
                break;

            case "pbqLogAnalysis":
                this.renderLogAnalysis(question, userAnswerData);
                break;
            
            case "pbqFirewallConfig": 
                const details = question.pbqData.components;
                this.pbqInteractionArea.innerHTML = `
                    <p>Configure the firewall rule:</p>
                    <div><label>Source IP: <input type="text" id="fw_src_ip" value="${(previouslySelectedAnswers && previouslySelectedAnswers[0]) || details.sourceIp || ''}"></label></div>
                    <div><label>Destination IP: <input type="text" id="fw_dest_ip" value="${(previouslySelectedAnswers && previouslySelectedAnswers[1]) || details.destinationIp || ''}"></label></div>
                    <div><label>Destination Port: <input type="text" id="fw_dest_port" value="${(previouslySelectedAnswers && previouslySelectedAnswers[2]) || details.destinationPort || ''}"></label></div>
                    <div><label>Protocol: <input type="text" id="fw_protocol" value="${(previouslySelectedAnswers && previouslySelectedAnswers[3]) || details.protocol || ''}"></label></div>
                    <div><label>Action (ALLOW/DENY): <input type="text" id="fw_action" value="${(previouslySelectedAnswers && previouslySelectedAnswers[4]) || details.action || ''}"></label></div>
                `;
                break;

            default:
                this.answerOptionsContainer.innerHTML = "<p>Question type not yet implemented.</p>";
        }
    },

    renderDragAndDrop: function(question, userAnswerData) {
        const { draggableItems, dropZones } = question.pbqData;
        const currentMapping = (userAnswerData && userAnswerData.attempted && userAnswerData.answer[0]) ? userAnswerData.answer[0] : {}; 

        const draggablesContainer = document.createElement("div");
        draggablesContainer.className = "draggables-container";
        draggablesContainer.innerHTML = "<p><strong>Drag items to the correct zones:</strong></p>";
        draggableItems.forEach(item => {
            const el = document.createElement("div");
            el.id = `drag_${question.id}_${item.id}`;
            el.className = "draggable-item";
            el.textContent = item.text;
            el.draggable = true;
            el.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", el.id);
            });
            draggablesContainer.appendChild(el);
        });
        this.pbqInteractionArea.appendChild(draggablesContainer);

        const dropZonesContainer = document.createElement("div");
        dropZonesContainer.className = "dropzones-container";
        dropZones.forEach(zone => {
            const el = document.createElement("div");
            el.id = `drop_${question.id}_${zone.id}`;
            el.className = "drop-zone";
            el.innerHTML = `<strong>${zone.label}</strong>`;
            el.addEventListener("dragover", (e) => e.preventDefault());
            el.addEventListener("drop", (e) => {
                e.preventDefault();
                const draggedItemId = e.dataTransfer.getData("text/plain");
                const draggedEl = document.getElementById(draggedItemId);
                if (draggedEl && el.contains(draggedEl) === false) { 
                    el.appendChild(draggedEl); 
                }
            });
            for (const itemId in currentMapping) {
                if (currentMapping[itemId] === zone.id) {
                    const previouslyDraggedEl = draggablesContainer.querySelector(`#drag_${question.id}_${itemId}`); // Look in draggables container
                    if (previouslyDraggedEl) el.appendChild(previouslyDraggedEl);
                }
            }
            dropZonesContainer.appendChild(el);
        });
        this.pbqInteractionArea.appendChild(dropZonesContainer);
    },

    renderLogAnalysis: function(question, userAnswerData) {
        const { logLines } = question.pbqData;
        const previouslySelectedLineNumber = (userAnswerData && userAnswerData.attempted && userAnswerData.answer[0]) ? parseInt(userAnswerData.answer[0]) : null;

        logLines.forEach((line, index) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "log-line";
            lineDiv.textContent = line;
            lineDiv.dataset.lineNumber = index + 1; 
            if (previouslySelectedLineNumber === (index + 1)) {
                lineDiv.classList.add("selected-log");
            }
            lineDiv.addEventListener("click", () => {
                const currentSelected = this.pbqInteractionArea.querySelector(".selected-log");
                if (currentSelected) currentSelected.classList.remove("selected-log");
                lineDiv.classList.add("selected-log");
            });
            this.pbqInteractionArea.appendChild(lineDiv);
        });
    },

    getUserAnswer: function(question) {
        let answer = [];
        switch (question.questionType) {
            case "multipleChoiceSingle":
            case "exhibit":
                const selectedRadio = this.answerOptionsContainer.querySelector(`input[name="q${question.id}"]:checked`);
                if (selectedRadio) answer.push(selectedRadio.value);
                break;
            case "multipleChoiceMultiple":
                const selectedCheckboxes = this.answerOptionsContainer.querySelectorAll(`input[name="q${question.id}"]:checked`);
                selectedCheckboxes.forEach(cb => answer.push(cb.value));
                break;
            case "fillInTheBlank":
                const inputField = document.getElementById(`q${question.id}_blank`);
                if (inputField && inputField.value.trim() !== "") answer.push(inputField.value.trim()); // Keep case for now, or decide on .toLowerCase() here or in checking logic
                break;
            case "dragAndDrop":
                const mapping = {};
                question.pbqData.dropZones.forEach(zone => {
                    const zoneEl = document.getElementById(`drop_${question.id}_${zone.id}`);
                    zoneEl.querySelectorAll(".draggable-item").forEach(itemEl => {
                        const itemId = itemEl.id.split("_")[2]; 
                        mapping[itemId] = zone.id;
                    });
                });
                if (Object.keys(mapping).length > 0) answer.push(mapping);
                break;
            case "pbqLogAnalysis":
                const selectedLogLine = this.pbqInteractionArea.querySelector(".selected-log");
                if (selectedLogLine) answer.push(selectedLogLine.dataset.lineNumber);
                break;
            case "pbqFirewallConfig":
                const srcIp = document.getElementById("fw_src_ip")?.value.trim();
                const destIp = document.getElementById("fw_dest_ip")?.value.trim();
                const destPort = document.getElementById("fw_dest_port")?.value.trim();
                const protocol = document.getElementById("fw_protocol")?.value.trim().toUpperCase();
                const action = document.getElementById("fw_action")?.value.trim().toUpperCase();
                if (srcIp || destIp || destPort || protocol || action) {
                     answer = [srcIp, destIp, destPort, protocol, action];
                }
                break;
        }
        return answer;
    },

    renderResultsPage: function(results, questionsData, userAnswersData) { // Renamed from renderReviewPage
        this.summaryDetails.innerHTML = ""; // Clears the summary details area
        const overallP = document.createElement("p");
        overallP.innerHTML = `<strong>Overall Score: ${results.overallScore}</strong>`;
        this.summaryDetails.appendChild(overallP);

        const domainPerformanceTitle = document.createElement("h3");
        domainPerformanceTitle.textContent = "Performance by Domain:";
        this.summaryDetails.appendChild(domainPerformanceTitle);

        for (const domainName in results.domainScores) {
            const ds = results.domainScores[domainName];
            const percentage = ds.total > 0 ? ((ds.correct / ds.total) * 100).toFixed(0) : 0;
            const p = document.createElement("p");
            p.textContent = `${domainName}: ${ds.correct}/${ds.total} (${percentage}% correct)`;
            this.summaryDetails.appendChild(p);
        }

        const reviewTitle = document.createElement("h3");
        reviewTitle.textContent = "Review Your Answers:";
        this.summaryDetails.appendChild(reviewTitle);

        questionsData.forEach((q, index) => {
            const userAnswer = userAnswersData[index];
            const item = document.createElement("div");
            item.className = "review-q-item";
            let statusText = "Not Attempted";
            if (userAnswer.attempted) {
                statusText = userAnswer.isCorrect ? "Correct" : "Incorrect";
            }
            item.innerHTML = `Q${index + 1} (${q.topic.substring(0,30)}...): <strong>${statusText}</strong>`;
            if (userAnswer.attempted && !userAnswer.isCorrect) item.style.color = "red";
            if (userAnswer.attempted && userAnswer.isCorrect) item.style.color = "green";
            
            item.addEventListener("click", () => {
                currentQuestionIndex = index; // Set global currentQuestionIndex
                this.showScreen("learning");
                loadQuestion(index); // Assumes loadQuestion is globally available from app.js
            });
            this.summaryDetails.appendChild(item);
        });
    }
};


// --- APP.JS CONTENT STARTS HERE ---
// (Ensure DOM elements are defined above or within this scope if not using UI object for them)

// Application State (already defined in original app.js, ensure no re-declaration if merging)
// let currentQuestionIndex = 0; // Already defined
// let questions = []; // Loaded from questions.js (now part of this file)
// let userAnswers = []; // Already defined

// DOM Elements from index.html (ensure these are consistently named and used)
// const welcomeScreen = document.getElementById("welcome-screen"); // Defined in UI
// const learningInterface = document.getElementById("learning-interface"); // Defined in UI
// const summaryPage = document.getElementById("summary-page"); // Defined in UI

const startDemoBtn = document.getElementById("start-demo-btn");
// const questionCounterElem = document.getElementById("question-counter"); // Defined in UI
// const exhibitArea = document.getElementById("exhibit-area"); // Defined in UI
// const exhibitImage = document.getElementById("exhibit-image"); // Defined in UI
// const exhibitTextElem = document.getElementById("exhibit-text"); // Defined in UI
// const questionTextPElem = document.getElementById("question-text-p"); // Defined in UI
// const answerOptionsContainer = document.getElementById("answer-options"); // Defined in UI
// const pbqInteractionArea = document.getElementById("pbq-interaction-area"); // Defined in UI
const submitAnswerBtn = document.getElementById("submit-answer-btn");
// const feedbackArea = document.getElementById("feedback-area"); // Defined in UI
// const feedbackCorrectness = document.getElementById("feedback-correctness"); // Defined in UI
// const feedbackUserAnswer = document.getElementById("feedback-user-answer"); // Defined in UI
// const feedbackCorrectAnswer = document.getElementById("feedback-correct-answer"); // Defined in UI
// const feedbackExplanation = document.getElementById("feedback-explanation"); // Defined in UI
const prevQuestionBtn = document.getElementById("prev-question-btn");
const nextQuestionBtn = document.getElementById("next-question-btn");
const endSessionBtn = document.getElementById("end-session-btn");
const restartDemoBtn = document.getElementById("restart-demo-btn");
// const summaryDetails = document.getElementById("summary-details"); // Defined in UI

// --- Initialization ---
function initializeDemo() { // Renamed from async function as questions are now local
    try {
        if (typeof questions === "undefined" || questions.length === 0) {
            console.error("Questions array not found or empty.");
            UI.feedbackArea.innerHTML = "<p>Error: Could not load questions. Please check the console.</p>";
            UI.feedbackArea.style.display = "block";
            return;
        }

        userAnswers = new Array(questions.length).fill(null).map(() => ({ attempted: false, answer: [], isCorrect: null, flagged: false }));
        currentQuestionIndex = 0;
        UI.showScreen("welcome");
    } catch (error) {
        console.error("Error initializing demo:", error);
        if(UI.feedbackArea) {
            UI.feedbackArea.innerHTML = `<p>Error initializing application: ${error.message}. Please check the console for more details.</p>`;
            UI.feedbackArea.style.display = "block";
        }
    }
}

// --- Event Listeners ---
if(startDemoBtn) startDemoBtn.addEventListener("click", () => {
    UI.showScreen("learning");
    loadQuestion(currentQuestionIndex);
});

if(prevQuestionBtn) prevQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

if(nextQuestionBtn) nextQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else if (currentQuestionIndex === questions.length -1 && userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].attempted) {
        // If it's the last question and it has been attempted, allow going to summary
        UI.renderResultsPage(calculateResults(), questions, userAnswers);
        UI.showScreen("summary");
    }
});

if(submitAnswerBtn) submitAnswerBtn.addEventListener("click", handleSubmitAnswer);

if(endSessionBtn) endSessionBtn.addEventListener("click", () => {
    UI.renderResultsPage(calculateResults(), questions, userAnswers);
    UI.showScreen("summary");
});

if(restartDemoBtn) restartDemoBtn.addEventListener("click", () => {
    initializeDemo(); 
});


// --- Core Logic ---
function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    const question = questions[index];
    const userAnswerData = userAnswers[index];
    UI.renderQuestion(question, userAnswerData);
    updateNavigationButtons();
    UI.feedbackArea.style.display = userAnswerData && userAnswerData.attempted ? "block" : "none";
    if (userAnswerData && userAnswerData.attempted) {
        displayFeedback(userAnswerData.isCorrect, question.correctAnswer, userAnswerData.answer, question.explanation);
    }
    submitAnswerBtn.disabled = userAnswerData && userAnswerData.attempted;
}

function handleSubmitAnswer() {
    const currentQ = questions[currentQuestionIndex];
    const selectedAnswer = UI.getUserAnswer(currentQ);

    if (selectedAnswer.length === 0 && 
        (currentQ.questionType === "multipleChoiceSingle" || 
         currentQ.questionType === "multipleChoiceMultiple" || 
         currentQ.questionType === "fillInTheBlank" || 
         currentQ.questionType === "pbqLogAnalysis" || 
         (currentQ.questionType === "dragAndDrop" && (!selectedAnswer[0] || Object.keys(selectedAnswer[0]).length === 0)) ||
         (currentQ.questionType === "pbqFirewallConfig" && selectedAnswer.every(val => val === ""))
         )
       ) {
        alert("Please select or provide an answer.");
        return;
    }

    userAnswers[currentQuestionIndex].answer = selectedAnswer;
    userAnswers[currentQuestionIndex].attempted = true;

    let isCorrect = false;
    if (currentQ.questionType === "dragAndDrop") {
        const userMapping = selectedAnswer[0] || {};
        const correctMapping = currentQ.pbqData.correctMapping;
        isCorrect = Object.keys(correctMapping).length === Object.keys(userMapping).length && 
                    Object.keys(correctMapping).every(key => correctMapping[key] === userMapping[key]);
    } else if (currentQ.questionType === "pbqLogAnalysis") {
        isCorrect = selectedAnswer.length > 0 && parseInt(selectedAnswer[0]) === currentQ.pbqData.correctLineNumber;
    } else if (currentQ.questionType === "pbqFirewallConfig") {
        isCorrect = currentQ.correctAnswer.length === selectedAnswer.length && 
                    currentQ.correctAnswer.every((val, i) => String(val).trim().toUpperCase() === String(selectedAnswer[i]).trim().toUpperCase());
    } else if (currentQ.questionType === "fillInTheBlank") {
        isCorrect = currentQ.correctAnswer.length === selectedAnswer.length &&
                    currentQ.correctAnswer.every(val => selectedAnswer.map(sa => String(sa).trim().toLowerCase()).includes(String(val).trim().toLowerCase()));
    
    } else { 
        isCorrect = currentQ.correctAnswer.length === selectedAnswer.length &&
                    currentQ.correctAnswer.every(val => selectedAnswer.map(sa => String(sa).toLowerCase()).includes(String(val).toLowerCase()));
    }
    
    userAnswers[currentQuestionIndex].isCorrect = isCorrect;

    displayFeedback(isCorrect, currentQ.correctAnswer, selectedAnswer, currentQ.explanation);
    submitAnswerBtn.disabled = true;
    updateNavigationButtons();
}

function displayFeedback(isCorrect, correctAnswer, userAnswer, explanation) {
    UI.feedbackCorrectness.textContent = isCorrect ? "Correct!" : "Incorrect.";
    UI.feedbackCorrectness.style.color = isCorrect ? "green" : "red";
    
    let userAnswerText = Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer;
    if (typeof userAnswer === "object" && !Array.isArray(userAnswer) && userAnswer !== null) {
        userAnswerText = JSON.stringify(userAnswer);
    }

    UI.feedbackUserAnswer.textContent = userAnswerText || "No answer provided";
    UI.feedbackCorrectAnswer.textContent = Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer;
    UI.feedbackExplanation.textContent = explanation || "N/A";
    UI.feedbackArea.style.display = "block";
}

function updateNavigationButtons() {
    if(prevQuestionBtn) prevQuestionBtn.disabled = currentQuestionIndex === 0;
    const currentAttempt = userAnswers[currentQuestionIndex];
    if(nextQuestionBtn) nextQuestionBtn.disabled = !(currentAttempt && currentAttempt.attempted) || currentQuestionIndex === questions.length - 1;
    
    // Change Next button text to "View Summary" on the last question if answered
    if (currentQuestionIndex === questions.length - 1 && currentAttempt && currentAttempt.attempted) {
        if(nextQuestionBtn) nextQuestionBtn.textContent = "View Summary";
    } else {
        if(nextQuestionBtn) nextQuestionBtn.textContent = "Next Question";
    }
}

function calculateResults() {
    let correctCount = 0;
    const domainScores = {};

    questions.forEach((q, index) => {
        if (userAnswers[index] && userAnswers[index].isCorrect) {
            correctCount++;
        }
        const domain = q.domain;
        if (!domainScores[domain]) {
            domainScores[domain] = { correct: 0, total: 0 };
        }
        domainScores[domain].total++;
        if (userAnswers[index] && userAnswers[index].isCorrect) {
            domainScores[domain].correct++;
        }
    });

    const overallScore = questions.length > 0 ? ((correctCount / questions.length) * 100).toFixed(0) + "%" : "0%";
    return { overallScore, domainScores, passFailStatus: "-" }; 
}


// --- Initial Load ---
document.addEventListener("DOMContentLoaded", initializeDemo);

// Remove module.exports from original files if they existed
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = questions; // Or UI, or app functions
// }

