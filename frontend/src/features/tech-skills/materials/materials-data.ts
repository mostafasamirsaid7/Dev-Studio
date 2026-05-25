import {
  Globe,
  Server,
  Container,
  FlaskConical,
  Database,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  ListTree,
  Code2,
  Shapes,
  type LucideIcon,
} from "lucide-react";

export type MaterialType = "book" | "course" | "docs" | "tool";

export interface Material {
  title: string;
  author?: string;
  url: string;
  desc: string;
  type: MaterialType;
  free?: boolean;
}

export interface Area {
  id: string;
  label: string;
  icon: LucideIcon;
  materials: Material[];
}

export interface AreaGroup {
  label: string;
  areas: Area[];
}

export const TYPE_LABELS: Record<MaterialType, string> = {
  book: "Book",
  course: "Course",
  docs: "Docs",
  tool: "Tool",
};

export const TYPE_COLORS: Record<MaterialType, string> = {
  book: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  course: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  docs: "bg-green-500/10 text-green-500 border-green-500/20",
  tool: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export const AREA_GROUPS: AreaGroup[] = [
  {
    label: "Domains",
    areas: [
      {
        id: "frontend",
        label: "Frontend",
        icon: Globe,
        materials: [
          { title: "javascript.info", url: "https://javascript.info", type: "docs", free: true, desc: "The most complete, modern JS tutorial — from basics to advanced topics." },
          { title: "You Don't Know JS", author: "Kyle Simpson", url: "https://github.com/getify/You-Dont-Know-JS", type: "book", free: true, desc: "Deep-dive series on JavaScript internals — scope, closures, async, and more." },
          { title: "web.dev", url: "https://web.dev", type: "docs", free: true, desc: "Google's authoritative resource for web performance, accessibility, and PWAs." },
          { title: "React Official Docs", url: "https://react.dev", type: "docs", free: true, desc: "The new React docs — Hooks, Server Components, and all modern patterns." },
          { title: "CSS for JS Developers", author: "Josh Comeau", url: "https://css-for-js.dev", type: "course", desc: "Interactive course that truly explains how CSS works — transforms, layout, animations." },
          { title: "Frontend Masters", url: "https://frontendmasters.com", type: "course", desc: "Expert-taught courses on React, TypeScript, performance, and architecture." },
          { title: "The Odin Project", url: "https://www.theodinproject.com", type: "course", free: true, desc: "Full-stack curriculum with projects — HTML, CSS, JS, React, Node." },
          { title: "Eloquent JavaScript", author: "Marijn Haverbeke", url: "https://eloquentjavascript.net", type: "book", free: true, desc: "Timeless book covering JS fundamentals through data structures and async." },
          { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", type: "docs", free: true, desc: "Official TypeScript docs — type system, utility types, and config guide." },
          { title: "Vite Docs", url: "https://vitejs.dev", type: "docs", free: true, desc: "Official Vite documentation — fast bundler, plugins, SSR configuration." },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        icon: Server,
        materials: [
          { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", url: "https://dataintensive.net", type: "book", desc: "The definitive guide to distributed systems, databases, and data pipelines." },
          { title: "Clean Architecture", author: "Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-architecture/9780134494272/", type: "book", desc: "SOLID principles, layered architecture, and dependency management." },
          { title: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices", type: "docs", free: true, desc: "3000-star GitHub collection of production Node.js patterns and security tips." },
          { title: "roadmap.sh — Backend", url: "https://roadmap.sh/backend", type: "docs", free: true, desc: "Curated visual roadmap for backend engineering." },
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "docs", free: true, desc: "How to design large-scale systems — load balancing, CDN, caching, CAP theorem." },
          { title: "The Pragmatic Programmer", author: "Hunt & Thomas", url: "https://pragprog.com/titles/tpp20/", type: "book", desc: "Career-defining habits: DRY, tracer bullets, broken windows, and software craftsmanship." },
          { title: "FastAPI Documentation", url: "https://fastapi.tiangolo.com", type: "docs", free: true, desc: "Modern Python API framework — async, type hints, OpenAPI auto-generation." },
          { title: "REST API Design Rulebook", author: "Mark Massé", url: "https://www.oreilly.com/library/view/rest-api-design/9781449317904/", type: "book", desc: "Principles for designing consistent, intuitive REST APIs at scale." },
        ],
      },
      {
        id: "devops",
        label: "DevOps",
        icon: Container,
        materials: [
          { title: "The DevOps Handbook", author: "Kim, Humble, Debois", url: "https://itrevolution.com/product/the-devops-handbook-second-edition/", type: "book", desc: "The definitive guide to DevOps transformation — flow, feedback, and continuous learning." },
          { title: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/", type: "docs", free: true, desc: "Everything you need to deploy, scale, and manage containerized workloads." },
          { title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", type: "docs", free: true, desc: "Official Docker learning path — containers, images, Compose, and networking." },
          { title: "The Phoenix Project", author: "Kim, Behr, Spafford", url: "https://itrevolution.com/product/the-phoenix-project/", type: "book", desc: "A novel about DevOps — how IT and business succeed together through flow and feedback." },
          { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "docs", free: true, desc: "Automate CI/CD pipelines directly in GitHub — workflows, secrets, runners." },
          { title: "Accelerate", author: "Forsgren, Humble, Kim", url: "https://itrevolution.com/book/accelerate/", type: "book", desc: "Data-driven research on what makes high-performing software delivery teams." },
          { title: "12-Factor App", url: "https://12factor.net", type: "docs", free: true, desc: "Methodology for building modern, portable, scalable SaaS applications." },
          { title: "Terraform Docs", url: "https://developer.hashicorp.com/terraform/docs", type: "docs", free: true, desc: "Infrastructure as Code — provision cloud resources declaratively across providers." },
        ],
      },
      {
        id: "testing",
        label: "Testing",
        icon: FlaskConical,
        materials: [
          { title: "The Art of Unit Testing", author: "Roy Osherove", url: "https://www.artofunittesting.com", type: "book", desc: "Classic guide to writing readable, maintainable unit tests — mocks, stubs, and design for testability." },
          { title: "Testing Trophy", author: "Kent C. Dodds", url: "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications", type: "docs", free: true, desc: "The case for integration tests as the foundation of a solid test suite." },
          { title: "Testing Library Docs", url: "https://testing-library.com/docs/", type: "docs", free: true, desc: "Query by user-visible behavior, not implementation details." },
          { title: "Playwright Docs", url: "https://playwright.dev/docs/intro", type: "docs", free: true, desc: "Reliable end-to-end browser automation — cross-browser, parallel, auto-wait." },
          { title: "Google Testing Blog", url: "https://testing.googleblog.com", type: "docs", free: true, desc: "Engineering-level posts on testing strategy, flakiness, and CI at scale." },
          { title: "Test-Driven Development", author: "Kent Beck", url: "https://www.oreilly.com/library/view/test-driven-development/0321146530/", type: "book", desc: "The original TDD book — Red, Green, Refactor cycle explained by its creator." },
          { title: "Vitest Docs", url: "https://vitest.dev", type: "docs", free: true, desc: "Blazing-fast Vite-native unit test framework — drop-in Jest replacement." },
        ],
      },
      {
        id: "database",
        label: "Database",
        icon: Database,
        materials: [
          { title: "Use The Index, Luke", url: "https://use-the-index-luke.com", type: "docs", free: true, desc: "SQL performance explained — how indexes really work, query plans, and tuning." },
          { title: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/", type: "docs", free: true, desc: "Comprehensive Postgres reference — JSONB, CTEs, window functions, replication." },
          { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", url: "https://dataintensive.net", type: "book", desc: "Replication, partitioning, transactions, and distributed consensus." },
          { title: "Redis University", url: "https://university.redis.com", type: "course", free: true, desc: "Free official Redis courses — data structures, pub/sub, streams, and clustering." },
          { title: "MongoDB University", url: "https://learn.mongodb.com", type: "course", free: true, desc: "Free MongoDB learning paths — aggregation, indexing, Atlas." },
          { title: "Prisma Docs", url: "https://www.prisma.io/docs", type: "docs", free: true, desc: "Modern TypeScript ORM — schema-first, type-safe queries, migrations." },
          { title: "Database Internals", author: "Alex Petrov", url: "https://www.databass.dev", type: "book", desc: "How database engines work — storage, B-trees, LSM trees, distributed systems." },
          { title: "SQL Performance Explained", author: "Markus Winand", url: "https://sql-performance-explained.com", type: "book", desc: "Focused, practical book on writing fast SQL — indexes, execution plans, N+1 avoidance." },
        ],
      },
    ],
  },
  {
    label: "Engineering Depth",
    areas: [
      {
        id: "architecture",
        label: "Architecture",
        icon: Layers,
        materials: [
          { title: "Clean Architecture", author: "Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-architecture/9780134494272/", type: "book", desc: "Boundaries, use cases, and the dependency rule — the canonical guide to layered software architecture." },
          { title: "Patterns of Enterprise Application Architecture", author: "Martin Fowler", url: "https://martinfowler.com/books/eaa.html", type: "book", desc: "The catalog of enterprise patterns: Active Record, Repository, Service Layer, CQRS, and more." },
          { title: "Software Architecture: The Hard Parts", author: "Ford, Richards, Sadalage, Dehghani", url: "https://architecturethehardparts.com", type: "book", desc: "Trade-off analysis for distributed architectures — decomposition, data ownership, sagas." },
          { title: "Fundamentals of Software Architecture", author: "Ford & Richards", url: "https://fundamentalsofsoftwarearchitecture.com", type: "book", desc: "Architectural thinking, styles, characteristics, and decision-making for practitioners." },
          { title: "Martin Fowler — Architecture", url: "https://martinfowler.com/architecture/", type: "docs", free: true, desc: "Articles on hexagonal architecture, event sourcing, CQRS, microservices, and more." },
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "docs", free: true, desc: "Large-scale system design — load balancers, caches, CDN, CAP theorem, sharding." },
          { title: "Architectural Katas", url: "https://nealford.com/katas/", type: "tool", free: true, desc: "Practice architectural thinking with open-ended design challenges used at conferences." },
          { title: "Building Microservices", author: "Sam Newman", url: "https://samnewman.io/books/building_microservices_2nd_edition/", type: "book", desc: "Decomposing monoliths, service boundaries, inter-service communication, and resilience." },
          { title: "Domain-Driven Design", author: "Eric Evans", url: "https://www.domainlanguage.com/ddd/", type: "book", desc: "The original DDD book — ubiquitous language, bounded contexts, aggregates, and domain events." },
          { title: "Implementing DDD", author: "Vaughn Vernon", url: "https://vaughnvernon.com/?page_id=168", type: "book", desc: "Hands-on DDD — aggregates, repositories, domain services, and event-driven design." },
        ],
      },
      {
        id: "design-systems",
        label: "Design Systems",
        icon: Palette,
        materials: [
          { title: "Atomic Design", author: "Brad Frost", url: "https://atomicdesign.bradfrost.com", type: "book", free: true, desc: "The foundational methodology for building component hierarchies — atoms, molecules, organisms, templates, pages." },
          { title: "Design Systems Handbook", author: "InVision", url: "https://www.designbetter.co/design-systems-handbook", type: "book", free: true, desc: "Building and scaling design systems — governance, tokens, documentation, and adoption." },
          { title: "Storybook Docs", url: "https://storybook.js.org/docs", type: "docs", free: true, desc: "The industry-standard tool for building, documenting, and testing UI components in isolation." },
          { title: "Radix UI Docs", url: "https://www.radix-ui.com/primitives", type: "docs", free: true, desc: "Accessible, unstyled component primitives — the correct foundation for any design system." },
          { title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", type: "docs", free: true, desc: "Utility-first CSS — design tokens as classes, responsive, dark mode, and theming." },
          { title: "Style Dictionary", url: "https://styledictionary.com", type: "tool", free: true, desc: "Amazon's design token management tool — transforms tokens into any platform format." },
          { title: "shadcn/ui", url: "https://ui.shadcn.com", type: "tool", free: true, desc: "Copy-paste accessible components built on Radix and Tailwind — owned by your codebase." },
          { title: "Design Tokens Community Group", url: "https://design-tokens.github.io/community-group/", type: "docs", free: true, desc: "W3C community specification for design token formats — the standard for cross-tool token sharing." },
          { title: "Shopify Polaris", url: "https://polaris.shopify.com", type: "docs", free: true, desc: "One of the most thorough public design system docs — principles, patterns, and component guidelines." },
          { title: "Supernova", url: "https://supernova.io", type: "tool", desc: "Design system management platform — syncs tokens from Figma, generates docs and code." },
        ],
      },
      {
        id: "solid",
        label: "SOLID & Patterns",
        icon: Shapes,
        materials: [
          { title: "Clean Code", author: "Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/", type: "book", desc: "The most influential book on writing clean, readable code — naming, functions, classes, and boundaries." },
          { title: "SOLID Principles (Oodesign)", url: "https://www.oodesign.com/solid-design-principles.html", type: "docs", free: true, desc: "Clear, example-driven explanation of all five SOLID principles with before/after comparisons." },
          { title: "Design Patterns", author: "Gang of Four", url: "https://refactoring.guru/design-patterns", type: "docs", free: true, desc: "All 23 GoF patterns explained with real-world examples, diagrams, and code in multiple languages." },
          { title: "Head First Design Patterns", author: "Freeman & Robson", url: "https://www.oreilly.com/library/view/head-first-design/9781492077992/", type: "book", desc: "The most approachable introduction to design patterns — visual, conversational, and deeply memorable." },
          { title: "Refactoring", author: "Martin Fowler", url: "https://refactoring.com", type: "book", desc: "A catalog of 60+ refactoring techniques — when and how to safely improve existing code structure." },
          { title: "SOLID Principles (Coding Interview University)", url: "https://github.com/ardalis/SolidSample", type: "docs", free: true, desc: "Code samples showing SOLID violations and their fixes in a step-by-step progression." },
          { title: "Enterprise Integration Patterns", author: "Hohpe & Woolf", url: "https://www.enterpriseintegrationpatterns.com", type: "book", desc: "65 patterns for integrating enterprise applications — messaging, routing, transformation." },
          { title: "A Philosophy of Software Design", author: "John Ousterhout", url: "https://web.stanford.edu/~ouster/cgi-bin/book.php", type: "book", desc: "Tactical vs. strategic design, deep vs. shallow modules — a fresh perspective on complexity." },
          { title: "Refactoring Guru", url: "https://refactoring.guru", type: "docs", free: true, desc: "Interactive catalog of design patterns and code smells with multi-language examples and UML diagrams." },
        ],
      },
      {
        id: "clean-code",
        label: "Clean Code",
        icon: Code2,
        materials: [
          { title: "Clean Code", author: "Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/", type: "book", desc: "Timeless guide on naming, small functions, comments, error handling, and code boundaries." },
          { title: "The Pragmatic Programmer", author: "Hunt & Thomas", url: "https://pragprog.com/titles/tpp20/", type: "book", desc: "DRY principle, tracer bullets, broken windows, code generation, and pragmatic philosophy." },
          { title: "Refactoring", author: "Martin Fowler", url: "https://refactoring.com", type: "book", desc: "How to safely restructure existing code — catalog of 60+ named refactoring techniques." },
          { title: "A Philosophy of Software Design", author: "John Ousterhout", url: "https://web.stanford.edu/~ouster/cgi-bin/book.php", type: "book", desc: "Deep module design, information hiding, comment-driven design, and managing complexity." },
          { title: "Code Complete", author: "Steve McConnell", url: "https://www.microsoftpressstore.com/store/code-complete-9780735619678", type: "book", desc: "900-page encyclopedia of software construction — the most comprehensive code quality reference." },
          { title: "Working Effectively with Legacy Code", author: "Michael Feathers", url: "https://www.oreilly.com/library/view/working-effectively-with/0131177052/", type: "book", desc: "Techniques for safely modifying untested code — seam points, characterization tests, and incremental improvement." },
          { title: "SonarQube", url: "https://www.sonarsource.com/products/sonarqube/", type: "tool", desc: "Static analysis platform that detects code smells, bugs, and security vulnerabilities across 30+ languages." },
          { title: "ESLint Docs", url: "https://eslint.org/docs/latest/", type: "docs", free: true, desc: "The standard JavaScript/TypeScript linter — enforce code quality rules across your team." },
          { title: "Conventional Commits", url: "https://www.conventionalcommits.org", type: "docs", free: true, desc: "A specification for human and machine-readable commit messages — enables changelogs and semantic versioning." },
        ],
      },
      {
        id: "performance",
        label: "Performance",
        icon: Zap,
        materials: [
          { title: "High Performance Browser Networking", author: "Ilya Grigorik", url: "https://hpbn.co", type: "book", free: true, desc: "TCP, TLS, HTTP/1, HTTP/2, WebSocket, and WebRTC — understanding the network is understanding performance." },
          { title: "Web Performance in Action", author: "Jeremy Wagner", url: "https://www.manning.com/books/web-performance-in-action", type: "book", desc: "Practical guide to optimizing page load, assets, fonts, and perceived performance." },
          { title: "web.dev — Performance", url: "https://web.dev/performance/", type: "docs", free: true, desc: "Google's structured guide to Core Web Vitals, LCP, FID, CLS — measuring and improving performance." },
          { title: "Chrome DevTools — Performance", url: "https://developer.chrome.com/docs/devtools/performance/", type: "docs", free: true, desc: "How to profile, record, and analyze runtime performance using Chrome's built-in tools." },
          { title: "Lighthouse", url: "https://developer.chrome.com/docs/lighthouse/", type: "tool", free: true, desc: "Automated auditing for performance, accessibility, SEO, and PWA — built into Chrome." },
          { title: "WebPageTest", url: "https://www.webpagetest.org", type: "tool", free: true, desc: "Real-browser performance testing with waterfall charts, filmstrips, and detailed diagnostics." },
          { title: "Bundlephobia", url: "https://bundlephobia.com", type: "tool", free: true, desc: "Check the cost of adding any npm package — size, download time, and tree-shaking support." },
          { title: "Systems Performance", author: "Brendan Gregg", url: "https://www.brendangregg.com/systems-performance.html", type: "book", desc: "The definitive book on OS and application performance — profiling, tracing, and tuning at every layer." },
          { title: "Designing for Performance", author: "Lara Hogan", url: "https://larahogan.me/design/", type: "book", free: true, desc: "Performance as a design decision — how visuals, fonts, and layout choices affect load time." },
        ],
      },
      {
        id: "security",
        label: "Security",
        icon: ShieldCheck,
        materials: [
          { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "docs", free: true, desc: "The most critical web application security risks — injections, broken auth, SSRF, and more." },
          { title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto", url: "https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook-p-9781118026472", type: "book", desc: "Comprehensive attacker-perspective guide to finding and exploiting web vulnerabilities." },
          { title: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org", type: "docs", free: true, desc: "Actionable, concise cheat sheets on authentication, XSS, SQL injection, CSRF, and 60+ more topics." },
          { title: "Hacking: The Art of Exploitation", author: "Jon Erickson", url: "https://nostarch.com/hacking2.htm", type: "book", desc: "Low-level exploitation — buffer overflows, shellcode, and understanding the attacker mindset." },
          { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", type: "course", free: true, desc: "Free, hands-on labs covering every major web vulnerability class — built by the Burp Suite team." },
          { title: "Cryptography I — Coursera", author: "Dan Boneh", url: "https://www.coursera.org/learn/crypto", type: "course", free: true, desc: "Stanford's rigorous cryptography course — block ciphers, MACs, public-key crypto, and TLS." },
          { title: "TryHackMe", url: "https://tryhackme.com", type: "tool", desc: "Gamified cyber security learning with browser-based VMs — beginner to advanced paths." },
          { title: "HackTheBox", url: "https://www.hackthebox.com", type: "tool", desc: "Advanced hands-on hacking labs and CTF challenges for sharpening penetration testing skills." },
          { title: "Secure by Design", author: "Johnsen, Deogun, Sawano", url: "https://www.manning.com/books/secure-by-design", type: "book", desc: "How to embed security into the software design process — domain modeling, avoiding dangerous primitives." },
        ],
      },
      {
        id: "algorithms",
        label: "Algorithms & DSA",
        icon: ListTree,
        materials: [
          { title: "Introduction to Algorithms (CLRS)", author: "Cormen et al.", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", type: "book", desc: "The algorithm bible — proof-based coverage of sorting, graphs, dynamic programming, NP-completeness." },
          { title: "The Algorithm Design Manual", author: "Steven Skiena", url: "https://www.algorist.com", type: "book", desc: "Part textbook, part encyclopedia — 75 algorithmic war stories and a catalog of 150+ algorithms." },
          { title: "Neetcode 150", url: "https://neetcode.io/practice", type: "tool", free: true, desc: "Curated 150 LeetCode problems grouped by pattern — with video explanations for each solution." },
          { title: "CS50x — Harvard", url: "https://cs50.harvard.edu/x/", type: "course", free: true, desc: "World's largest CS course — algorithms, data structures, memory, and problem solving from scratch." },
          { title: "Algorithms, Part I — Princeton", url: "https://www.coursera.org/learn/algorithms-part1", type: "course", free: true, desc: "Union-find, sorting, priority queues, and symbol tables with Java — by Sedgewick & Wayne." },
          { title: "Algorithms, Part II — Princeton", url: "https://www.coursera.org/learn/algorithms-part2", type: "course", free: true, desc: "Graphs, minimum spanning trees, shortest paths, tries, and compression — continuation of Part I." },
          { title: "LeetCode", url: "https://leetcode.com", type: "tool", desc: "The industry-standard platform for practicing algorithmic problems — 3000+ problems with editorial." },
          { title: "Visualgo", url: "https://visualgo.net", type: "tool", free: true, desc: "Interactive algorithm and data structure visualizations — BST, heap, graph traversal, sorting." },
          { title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com", type: "docs", free: true, desc: "Quick reference for time and space complexities of common data structures and algorithms." },
          { title: "Grokking Algorithms", author: "Aditya Bhargava", url: "https://www.manning.com/books/grokking-algorithms", type: "book", desc: "Visually illustrated introduction to algorithms — binary search, graphs, dynamic programming, k-NN." },
        ],
      },
    ],
  },
];

export const ALL_AREAS = AREA_GROUPS.flatMap((g) => g.areas);

export const FILTERS: { id: MaterialType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "book", label: "Books" },
  { id: "course", label: "Courses" },
  { id: "docs", label: "Docs" },
  { id: "tool", label: "Tools" },
];
