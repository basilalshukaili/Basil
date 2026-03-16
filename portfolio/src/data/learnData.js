/**
 * Full content tree for "Learn with Basil" cybersecurity academy.
 * `available: true` means the page has real content; false = "Coming Soon".
 */

export const categories = [
  {
    slug: 'pre-cybersecurity',
    title: 'Pre-Cybersecurity Fundamentals',
    description:
      'Essential knowledge required before diving into cybersecurity, including networking, operating systems, programming, and more.',
    icon: 'BookOpen',
    color: 'from-blue-500 to-cyan-400',
    subcategories: [
      {
        slug: 'networking',
        title: 'Networking',
        description:
          'Explore the fundamental concepts of computer networking, including models, protocols, and architectures.',
        icon: 'Network',
        available: true,
        topics: [
          {
            slug: 'osi-model',
            title: 'OSI Model',
            description:
              'Explore the seven-layer conceptual model that standardizes the functions of a telecommunication or computing system.',
            icon: 'Layers',
            available: true,
            tableData: {
              headers: ['Layer', 'Name', 'Function'],
              rows: [
                ['7', 'Application', 'User interface and application access'],
                ['6', 'Presentation', 'Data translation, encryption, compression'],
                ['5', 'Session', 'Session establishment, management, termination'],
                ['4', 'Transport', 'End-to-end connections, reliability, flow control'],
                ['3', 'Network', 'Logical addressing, routing, path determination'],
                ['2', 'Data Link', 'Physical addressing, error detection, media access'],
                ['1', 'Physical', 'Bit transmission, physical connections, signaling'],
              ],
            },
            subtopics: [
              {
                slug: 'physical-layer',
                title: 'Physical Layer',
                description: 'Learn about the first layer of the OSI model that deals with bit-level transmission.',
                icon: 'Cable',
                available: true,
              },
              {
                slug: 'data-link-layer',
                title: 'Data Link Layer',
                description: 'Explore the second layer that handles physical addressing and media access.',
                icon: 'Link',
                available: false,
              },
              {
                slug: 'network-layer',
                title: 'Network Layer',
                description: 'Learn about logical addressing and routing between networks.',
                icon: 'GitBranch',
                available: false,
              },
              {
                slug: 'transport-layer',
                title: 'Transport Layer',
                description: 'Understand end-to-end transport, reliability, and flow control.',
                icon: 'ArrowLeftRight',
                available: false,
              },
              {
                slug: 'session-layer',
                title: 'Session Layer',
                description: 'Learn about session establishment, management, and termination.',
                icon: 'Handshake',
                available: false,
              },
              {
                slug: 'presentation-layer',
                title: 'Presentation Layer',
                description: 'Explore data formatting, encryption, and compression.',
                icon: 'FileText',
                available: false,
              },
              {
                slug: 'application-layer',
                title: 'Application Layer',
                description: 'Understand the topmost layer providing user interfaces and services.',
                icon: 'AppWindow',
                available: false,
              },
            ],
          },
          {
            slug: 'tcp-ip-model',
            title: 'TCP/IP Model',
            description: 'Learn about the four-layer model that powers the Internet and most modern networks.',
            icon: 'Globe',
            available: false,
            subtopics: [
              { slug: 'application-layer', title: 'Application Layer', available: false },
              { slug: 'transport-layer', title: 'Transport Layer', available: false },
              { slug: 'internet-layer', title: 'Internet Layer', available: false },
              { slug: 'network-access-layer', title: 'Network Access Layer', available: false },
            ],
          },
          {
            slug: 'network-protocols',
            title: 'Network Protocols',
            description: 'Understand the rules and conventions that govern communication between network devices.',
            icon: 'FileCode',
            available: false,
            subtopics: [],
          },
          {
            slug: 'wireless-networks',
            title: 'Wireless Networks',
            description: 'Explore wireless communication technologies, standards, and security considerations.',
            icon: 'Wifi',
            available: false,
            subtopics: [],
          },
        ],
      },
      {
        slug: 'operating-systems',
        title: 'Operating Systems',
        description: 'Learn about different operating systems, their components, and security features.',
        icon: 'Monitor',
        available: false,
        topics: [],
      },
      {
        slug: 'programming',
        title: 'Programming',
        description: 'Understand programming concepts and languages essential for cybersecurity.',
        icon: 'Code',
        available: false,
        topics: [],
      },
      {
        slug: 'databases',
        title: 'Databases',
        description: 'Explore database concepts, SQL, NoSQL, and database security principles.',
        icon: 'Database',
        available: false,
        topics: [],
      },
      {
        slug: 'system-architecture',
        title: 'System Architecture',
        description: 'Learn about computer architecture, client-server models, and cloud computing.',
        icon: 'Cpu',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    description:
      'Core concepts and principles of cybersecurity, including security domains, compliance frameworks, and security operations.',
    icon: 'ShieldCheck',
    color: 'from-emerald-500 to-teal-400',
    subcategories: [
      {
        slug: 'security-concepts',
        title: 'Security Concepts',
        description: 'Core principles like CIA triad, authentication, authorization, and defense in depth.',
        icon: 'KeyRound',
        available: false,
        topics: [],
      },
      {
        slug: 'security-domains',
        title: 'Security Domains',
        description: 'Application, data, identity, network, and physical security domains.',
        icon: 'LayoutGrid',
        available: false,
        topics: [],
      },
      {
        slug: 'compliance-frameworks',
        title: 'Compliance Frameworks',
        description: 'NIST, ISO 27001, GDPR, HIPAA, and PCI-DSS frameworks.',
        icon: 'ClipboardCheck',
        available: false,
        topics: [],
      },
      {
        slug: 'security-operations',
        title: 'Security Operations',
        description: 'Incident response, monitoring, vulnerability management, and security awareness.',
        icon: 'Activity',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'offensive-security',
    title: 'Offensive Security',
    description:
      'Techniques and methodologies used to identify vulnerabilities and test security controls, including reconnaissance and exploitation.',
    icon: 'Crosshair',
    color: 'from-red-500 to-orange-400',
    subcategories: [
      {
        slug: 'reconnaissance',
        title: 'Reconnaissance',
        description: 'Footprinting, OSINT, passive & active reconnaissance, and enumeration.',
        icon: 'Search',
        available: false,
        topics: [],
      },
      {
        slug: 'vulnerability-assessment',
        title: 'Vulnerability Assessment',
        description: 'Scanning, vulnerability databases, risk assessment, and reporting.',
        icon: 'Bug',
        available: false,
        topics: [],
      },
      {
        slug: 'exploitation',
        title: 'Exploitation',
        description: 'Web vulnerabilities, network exploits, privilege escalation, and social engineering.',
        icon: 'Zap',
        available: false,
        topics: [],
      },
      {
        slug: 'post-exploitation',
        title: 'Post-Exploitation',
        description: 'Lateral movement, persistence, data exfiltration, and covering tracks.',
        icon: 'Footprints',
        available: false,
        topics: [],
      },
      {
        slug: 'specialized-attack-vectors',
        title: 'Specialized Attack Vectors',
        description: 'Cloud, IoT, mobile, and wireless attack techniques.',
        icon: 'Target',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'defensive-security',
    title: 'Defensive Security',
    description:
      'Strategies and tools to protect systems and networks from attacks, including network defense and endpoint security.',
    icon: 'ShieldHalf',
    color: 'from-violet-500 to-purple-400',
    subcategories: [
      {
        slug: 'network-defense',
        title: 'Network Defense',
        description: 'Firewalls, IDS/IPS, network segmentation, VPN, and zero trust networking.',
        icon: 'ShieldAlert',
        available: false,
        topics: [],
      },
      {
        slug: 'endpoint-security',
        title: 'Endpoint Security',
        description: 'EDR, antivirus, disk encryption, and host hardening.',
        icon: 'Laptop',
        available: false,
        topics: [],
      },
      {
        slug: 'application-security',
        title: 'Application Security',
        description: 'Secure coding, code review, API security, and SAST/DAST.',
        icon: 'FileCode2',
        available: false,
        topics: [],
      },
      {
        slug: 'cloud-security',
        title: 'Cloud Security',
        description: 'Cloud security models, IaaS, PaaS, and SaaS security.',
        icon: 'Cloud',
        available: false,
        topics: [],
      },
      {
        slug: 'identity-access-management',
        title: 'Identity & Access Management',
        description: 'Authentication, authorization, identity providers, and privileged access.',
        icon: 'UserCheck',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'security-engineering',
    title: 'Security Engineering',
    description:
      'Building secure systems from the ground up, including secure architecture design, cryptography, and security automation.',
    icon: 'Wrench',
    color: 'from-amber-500 to-yellow-400',
    subcategories: [
      {
        slug: 'cryptography',
        title: 'Cryptography',
        description: 'Symmetric & asymmetric encryption, hashing, PKI, and digital signatures.',
        icon: 'Lock',
        available: false,
        topics: [],
      },
      {
        slug: 'secure-architecture-design',
        title: 'Secure Architecture Design',
        description: 'Threat modeling, security requirements, design patterns, and testing.',
        icon: 'Building',
        available: false,
        topics: [],
      },
      {
        slug: 'secure-communications',
        title: 'Secure Communications',
        description: 'TLS/SSL, VPN protocols, secure email, and messaging.',
        icon: 'MessagesSquare',
        available: false,
        topics: [],
      },
      {
        slug: 'security-automation',
        title: 'Security Automation',
        description: 'SOAR, DevSecOps pipelines, security APIs, and orchestration.',
        icon: 'Bot',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'governance-risk-compliance',
    title: 'Governance, Risk & Compliance',
    description:
      'Managing security from a business perspective, including policies, risk management, and compliance frameworks.',
    icon: 'Scale',
    color: 'from-pink-500 to-rose-400',
    subcategories: [
      {
        slug: 'security-governance',
        title: 'Security Governance',
        description: 'Policies, standards, guidelines, and procedures.',
        icon: 'Landmark',
        available: false,
        topics: [],
      },
      {
        slug: 'risk-management',
        title: 'Risk Management',
        description: 'Risk assessment, treatment, monitoring, and business impact analysis.',
        icon: 'TrendingUp',
        available: false,
        topics: [],
      },
      {
        slug: 'compliance-management',
        title: 'Compliance Management',
        description: 'Audit preparation, gap analysis, evidence collection, and remediation.',
        icon: 'ListChecks',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'specialized-security',
    title: 'Specialized Security',
    description:
      'Security considerations for specific domains, including cloud, IoT, mobile, ICS, and blockchain security.',
    icon: 'Puzzle',
    color: 'from-indigo-500 to-blue-400',
    subcategories: [
      {
        slug: 'cloud-security',
        title: 'Cloud Security',
        description: 'AWS, Azure, GCP, and multi-cloud security strategies.',
        icon: 'CloudCog',
        available: false,
        topics: [],
      },
      {
        slug: 'iot-security',
        title: 'IoT Security',
        description: 'IoT vulnerabilities, protocols, hardening, and privacy.',
        icon: 'Wifi',
        available: false,
        topics: [],
      },
      {
        slug: 'mobile-security',
        title: 'Mobile Security',
        description: 'Android, iOS, mobile threats, and hardening.',
        icon: 'Smartphone',
        available: false,
        topics: [],
      },
      {
        slug: 'ics-security',
        title: 'ICS/SCADA Security',
        description: 'Industrial control systems, SCADA, ICS protocols, and defense.',
        icon: 'Factory',
        available: false,
        topics: [],
      },
      {
        slug: 'blockchain-security',
        title: 'Blockchain Security',
        description: 'Smart contracts, cryptocurrency, blockchain fundamentals, and privacy.',
        icon: 'Boxes',
        available: false,
        topics: [],
      },
      {
        slug: 'devsecops',
        title: 'DevSecOps',
        description: 'Secure SDLC, CI/CD security, container security, and IaC.',
        icon: 'GitMerge',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'career-development',
    title: 'Career Development',
    description:
      'Resources for building a career in cybersecurity, including certifications, career paths, and professional development.',
    icon: 'GraduationCap',
    color: 'from-teal-500 to-green-400',
    subcategories: [
      {
        slug: 'certifications',
        title: 'Certifications',
        description: 'CompTIA Security+, CISSP, CEH, OSCP, and CISM study guides.',
        icon: 'Award',
        available: false,
        topics: [],
      },
      {
        slug: 'career-paths',
        title: 'Career Paths',
        description: 'SOC Analyst, Penetration Tester, Security Engineer, Architect, and CISO.',
        icon: 'Route',
        available: false,
        topics: [],
      },
      {
        slug: 'professional-development',
        title: 'Professional Development',
        description: 'Networking, resume building, interview prep, and continuous learning.',
        icon: 'Rocket',
        available: false,
        topics: [],
      },
    ],
  },
  {
    slug: 'emerging-technologies',
    title: 'Emerging Technologies',
    description:
      'Security implications of cutting-edge technologies, including AI security, quantum computing, and zero trust.',
    icon: 'Sparkles',
    color: 'from-fuchsia-500 to-pink-400',
    subcategories: [
      {
        slug: 'ai-security',
        title: 'AI Security',
        description: 'Machine learning security, adversarial attacks, AI ethics, and privacy.',
        icon: 'Brain',
        available: false,
        topics: [],
      },
      {
        slug: 'quantum-computing',
        title: 'Quantum Computing',
        description: 'Quantum fundamentals, threats, and post-quantum cryptography.',
        icon: 'Atom',
        available: false,
        topics: [],
      },
      {
        slug: 'zero-trust',
        title: 'Zero Trust',
        description: 'Zero trust architecture, principles, and implementation.',
        icon: 'ShieldOff',
        available: false,
        topics: [],
      },
      {
        slug: 'emerging-tech-security',
        title: 'Emerging Tech Security',
        description: '5G security, AR/VR security, and edge computing security.',
        icon: 'Antenna',
        available: false,
        topics: [],
      },
    ],
  },
];

/* ─── Content for the Physical Layer page (only populated leaf) ─── */
export const physicalLayerContent = {
  title: 'Physical Layer (OSI Layer 1)',
  meta: {
    readingTime: '15 minutes',
    difficulty: 'Beginner',
    lastUpdated: 'April 2025',
  },
  intro:
    'The Physical Layer is the first and lowest layer of the OSI (Open Systems Interconnection) model. It defines the electrical, mechanical, procedural, and functional specifications for activating, maintaining, and deactivating physical connections for bit transmission between network devices.',
  sections: [
    {
      heading: 'Key Functions of the Physical Layer',
      text: 'The Physical Layer is responsible for the following key functions:',
      list: [
        'Bit-level transmission between devices',
        'Definition of voltage levels, timing of voltage changes, physical data rates, and maximum transmission distances',
        'Definition of physical network topology and physical connections',
        'Conversion between digital bits and electrical/optical/radio signals',
        'Specification of cables, connectors, and network interface cards',
      ],
    },
    {
      heading: 'Physical Layer Components',
      text: 'The Physical Layer encompasses various hardware components that enable the transmission of raw data:',
      subsections: [
        {
          heading: 'Transmission Media',
          text: 'The Physical Layer defines the transmission media used to carry the signals:',
          list: [
            { bold: 'Copper Cables:', text: 'Including twisted pair (UTP/STP) and coaxial cables' },
            {
              bold: 'Fiber Optic Cables:',
              text: 'Using light pulses to transmit data, including single-mode and multi-mode fiber',
            },
            { bold: 'Wireless Media:', text: 'Radio frequencies, microwaves, and infrared' },
          ],
        },
        {
          heading: 'Connectors and Interfaces',
          text: 'The Physical Layer specifies the connectors and interfaces used to connect devices:',
          list: [
            { bold: 'RJ-45:', text: 'Common connector for Ethernet networks' },
            { bold: 'BNC:', text: 'Used with coaxial cables' },
            { bold: 'Fiber Connectors:', text: 'SC, ST, LC, and others' },
            { bold: 'USB:', text: 'Universal Serial Bus connectors' },
            { bold: 'Serial and Parallel Ports:', text: 'Older interface types' },
          ],
        },
        {
          heading: 'Network Devices',
          text: 'Several network devices operate at the Physical Layer:',
          list: [
            { bold: 'Repeaters:', text: 'Amplify or regenerate signals to extend network reach' },
            { bold: 'Hubs:', text: 'Connect multiple devices in a network segment' },
            { bold: 'Network Interface Cards (NICs):', text: 'Connect computers to networks' },
            { bold: 'Transceivers:', text: 'Convert between different signal types' },
            { bold: 'Media Converters:', text: 'Convert between different media types (e.g., copper to fiber)' },
          ],
        },
      ],
    },
    {
      heading: 'Signaling Methods',
      text: 'The Physical Layer defines how bits are represented as signals:',
      list: [
        { bold: 'Digital Signaling:', text: 'Using discrete voltage levels to represent binary data' },
        { bold: 'Analog Signaling:', text: 'Using continuous wave forms' },
        {
          bold: 'Manchester Encoding:',
          text: 'A common encoding scheme that combines data and clock signals',
        },
        {
          bold: 'NRZ (Non-Return to Zero):',
          text: 'A binary code where 1s and 0s are represented by different voltage levels',
        },
      ],
    },
    {
      heading: 'Transmission Media Comparison',
      table: {
        headers: ['Transmission Media', 'Speed Capability', 'Max Distance', 'Interference Susceptibility'],
        rows: [
          ['Twisted Pair (Cat5e)', '1 Gbps', '100 meters', 'Medium'],
          ['Twisted Pair (Cat6)', '10 Gbps', '55-100 meters', 'Low-Medium'],
          ['Coaxial', '10-100 Mbps', '500 meters', 'Low'],
          ['Single-mode Fiber', '100+ Gbps', '10+ kilometers', 'Very Low'],
          ['Multi-mode Fiber', '10-100 Gbps', '2 kilometers', 'Very Low'],
          ['Wireless (Wi-Fi 6)', '9.6 Gbps (theoretical)', '30-100 meters', 'High'],
        ],
      },
    },
    {
      heading: 'Physical Layer Standards',
      text: 'Various organizations define standards for the Physical Layer:',
      list: [
        { bold: 'IEEE 802.3:', text: 'Ethernet standards (e.g., 10BASE-T, 100BASE-TX, 1000BASE-T)' },
        { bold: 'IEEE 802.11:', text: 'Wi-Fi standards' },
        { bold: 'ITU-T:', text: 'Telecommunications standards' },
        { bold: 'ANSI:', text: 'American National Standards Institute' },
        { bold: 'TIA/EIA:', text: 'Telecommunications Industry Association standards' },
      ],
    },
    {
      heading: 'Security Considerations at the Physical Layer',
      text: 'The Physical Layer presents several security challenges and considerations:',
      list: [
        { bold: 'Physical Access Control:', text: 'Preventing unauthorized access to network infrastructure' },
        { bold: 'Wiretapping:', text: 'Unauthorized interception of data transmissions' },
        { bold: 'Jamming:', text: 'Deliberate interference with wireless signals' },
        { bold: 'Hardware Tampering:', text: 'Modification of network devices' },
        { bold: 'Environmental Threats:', text: 'Protection against fire, water, and other physical hazards' },
      ],
    },
    {
      heading: 'Physical Layer Security Best Practices',
      isInfoBox: true,
      text: 'To secure the Physical Layer of your network:',
      list: [
        'Implement physical access controls to network equipment',
        'Use tamper-evident seals on network devices',
        'Regularly inspect network infrastructure for unauthorized devices',
        'Use fiber optic cables for sensitive communications (harder to tap)',
        'Implement proper cable management to prevent accidental damage',
        'Consider electromagnetic shielding for sensitive environments',
        'Maintain appropriate environmental controls (temperature, humidity)',
      ],
    },
  ],
  nextSteps: [
    { title: 'Data Link Layer (OSI Layer 2)', slug: 'data-link-layer', available: false },
    { title: 'Network Access Layer (TCP/IP)', slug: 'network-access-layer', available: false },
    { title: 'Wireless Networks', slug: 'wireless-networks', available: false },
  ],
};

/* ─── Helper to look up nodes in the tree ─── */
export function findCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function findSubcategory(catSlug, subSlug) {
  const cat = findCategory(catSlug);
  return cat?.subcategories?.find((s) => s.slug === subSlug);
}

export function findTopic(catSlug, subSlug, topicSlug) {
  const sub = findSubcategory(catSlug, subSlug);
  return sub?.topics?.find((t) => t.slug === topicSlug);
}

export function findSubtopic(catSlug, subSlug, topicSlug, subtopicSlug) {
  const topic = findTopic(catSlug, subSlug, topicSlug);
  return topic?.subtopics?.find((st) => st.slug === subtopicSlug);
}
