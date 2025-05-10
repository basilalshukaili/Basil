// questions.js
// This is a sample set of questions. Generating content for ALL topics and skills is a very large undertaking.
// This file will be populated with more questions covering all domains and objectives as per the Security+ SY0-701 curriculum.

const questions = [
  {
    id: 1,
    domain: "1.0 General Security Concepts",
    topic: "1.1 Compare and contrast various types of security controls.",
    questionType: "multipleChoiceSingle",
    questionText: "An organization implements security guards at the entrance of their facility. What type of security control is this?",
    exhibitUrl: null,
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
    exhibitUrl: null,
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
    exhibitUrl: null,
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
    exhibitUrl: "/assets/exhibits/dmz_diagram_empty.png", 
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
        correctMapping: { "item1": "zoneB", "item2": "zoneA" } 
    },
    correctAnswer: [], 
    explanation: "Firewalls are placed at the boundaries of the DMZ. Web servers are typically placed within the DMZ. IDS sensors can be placed in various locations to monitor traffic."
  },
  {
    id: 5,
    domain: "4.0 Security Operations",
    topic: "4.3 Explain various activities associated with vulnerability management.",
    questionType: "multipleChoiceSingle",
    questionText: "Which of the following vulnerability scan results indicates that a reported vulnerability does not actually exist on the system?",
    exhibitUrl: null,
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
    exhibitUrl: "/assets/exhibits/org_chart_security_roles.png", 
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
    correctAnswer: ["4"], 
    explanation: "Line 4 shows a common SQL injection pattern ('OR 1=1; --') being used in a product search query, attempting to bypass authentication or retrieve all data."
  },
  {
    id: 8,
    domain: "1.0 General Security Concepts",
    topic: "1.4 Explain the importance of using appropriate cryptographic solutions.",
    questionType: "multipleChoiceSingle",
    questionText: "Which cryptographic concept ensures that a sender cannot deny sending a message?",
    exhibitUrl: null,
    options: [
      { id: "a", text: "Confidentiality" },
      { id: "b", text: "Integrity" },
      { id: "c", text: "Non-repudiation" },
      { id: "d", text: "Availability" }
    ],
    correctAnswer: ["c"],
    explanation: "Non-repudiation provides proof of the origin of data and can prevent a sender from denying that they sent a message. Digital signatures are commonly used to achieve non-repudiation."
  },
  {
    id: 9,
    domain: "3.0 Security Architecture",
    topic: "3.1 Compare and contrast security implications of different architecture models.",
    questionType: "multipleChoiceMultiple",
    questionText: "What are the key characteristics of a Zero Trust security model? (Choose two)",
    exhibitUrl: null,
    options: [
      { id: "a", text: "Implicit trust for all internal network traffic" },
      { id: "b", text: "Verification for every user and device" },
      { id: "c", text: "Perimeter-based security as the primary defense" },
      { id: "d", text: "Least privilege access" },
      { id: "e", text: "Open access to all cloud resources" }
    ],
    correctAnswer: ["b", "d"],
    explanation: "Zero Trust is a security model based on the principle of 'never trust, always verify.' Key characteristics include verifying every user and device, and implementing least privilege access to resources."
  },
  {
    id: 10,
    domain: "4.0 Security Operations",
    topic: "4.1 Given a scenario, apply common security techniques to computing resources.",
    questionType: "pbqFirewallConfig", // Performance-Based Question: Firewall Configuration (Simulated)
    questionText: "A company wants to allow external users to access their public web server (IP: 192.0.2.80) on HTTPS only. The web server is in the DMZ. Which firewall rule would correctly implement this policy on the external firewall?",
    exhibitUrl: null,
    pbqData: {
        // This would involve a UI where the user selects/inputs rule components
        // For data structure, we might define the correct components
        components: {
            sourceIp: "Any",
            destinationIp: "192.0.2.80",
            destinationPort: "443",
            protocol: "TCP",
            action: "Allow"
        }
    },
    options: [],
    correctAnswer: [], // Evaluation based on matching pbqData.components
    explanation: "To allow external access to a web server on HTTPS, the firewall rule should permit TCP traffic from Any source IP to the web server's IP (192.0.2.80) on destination port 443 (HTTPS)."
  },
   {
    id: 11,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    topic: "2.3 Explain various types of vulnerabilities.",
    questionType: "multipleChoiceSingle",
    questionText: "A software vulnerability occurs when an application does not properly validate the size of data being written to a memory buffer, potentially allowing an attacker to overwrite adjacent memory. This is known as a:?",
    exhibitUrl: null,
    options: [
      { id: "a", text: "Race condition" },
      { id: "b", text: "Buffer overflow" },
      { id: "c", text: "Cross-site scripting (XSS)" },
      { id: "d", text: "SQL injection" }
    ],
    correctAnswer: ["b"],
    explanation: "A buffer overflow is a vulnerability where data is written beyond the boundaries of a fixed-length buffer, which can lead to system crashes or allow attackers to execute arbitrary code."
  },
  {
    id: 12,
    domain: "5.0 Security Program Management and Oversight",
    topic: "5.2 Given a scenario, implement risk management processes and concepts.",
    questionType: "multipleChoiceSingle",
    questionText: "An organization decides to purchase cybersecurity insurance to cover potential losses from a data breach. This is an example of which risk treatment strategy?",
    exhibitUrl: null,
    options: [
      { id: "a", text: "Risk avoidance" },
      { id: "b", text: "Risk acceptance" },
      { id: "c", text: "Risk mitigation" },
      { id: "d", text: "Risk transference (or sharing)" }
    ],
    correctAnswer: ["d"],
    explanation: "Risk transference (or sharing) involves shifting the financial impact of a risk to a third party, such as an insurance company."
  }

];



