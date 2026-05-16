import type { Connector, SocialDraft, MailTemplate } from "../../types/tools";

const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export const seedConnectors: Connector[] = [
  {
    id: "conn_1",
    type: "companies",
    name: "Stripe",
    email: "partnerships@stripe.com",
    phone: undefined,
    notes: "Payment infra. Contact for startup credits. API-first, excellent docs.",
    createdAt: d(60),
    updatedAt: d(5),
  },
  {
    id: "conn_2",
    type: "companies",
    name: "Vercel",
    email: "sales@vercel.com",
    phone: undefined,
    notes: "Frontend cloud. Sponsor tier available for OSS projects.",
    createdAt: d(45),
    updatedAt: d(10),
  },
  {
    id: "conn_3",
    type: "companies",
    name: "PlanetScale",
    email: "hello@planetscale.com",
    phone: undefined,
    notes: "Serverless MySQL. Great branching workflow for DB migrations.",
    createdAt: d(30),
    updatedAt: d(20),
  },
  {
    id: "conn_4",
    type: "hr",
    name: "Sarah Chen — TechCorp HR",
    email: "s.chen@techcorp.io",
    phone: "+1 415 555 0100",
    notes: "Recruiter for senior eng roles. Prefers initial contact via email. Replied within 24h last time.",
    createdAt: d(14),
    updatedAt: d(2),
  },
  {
    id: "conn_5",
    type: "hr",
    name: "Marcus Webb — DevHire",
    email: "marcus@devhire.co",
    phone: undefined,
    notes: "Specialized in remote-first startups. Focuses on React/Node stack roles. Met at ReactConf.",
    createdAt: d(20),
    updatedAt: d(7),
  },
  {
    id: "conn_6",
    type: "hr",
    name: "Priya Nair — ScaleUp Talent",
    email: "priya.nair@scaleup.io",
    phone: "+44 20 7946 0123",
    notes: "UK + remote roles. Fintech and B2B SaaS focus. Quick to respond on LinkedIn.",
    createdAt: d(10),
    updatedAt: d(1),
  },
  {
    id: "conn_7",
    type: "clients",
    name: "Alex Rivera — SoloFounder.io",
    email: "alex@solofounder.io",
    phone: undefined,
    notes: "Indie hacker. Needs help with full-stack features monthly. Pays on time. Slack-based comms.",
    createdAt: d(90),
    updatedAt: d(3),
  },
  {
    id: "conn_8",
    type: "clients",
    name: "Nimbus Analytics",
    email: "dev@nimbusanalytics.com",
    phone: "+1 628 555 0199",
    notes: "Dashboard redesign project. Needs data viz expertise. Decision-maker: CTO Leo Park.",
    createdAt: d(25),
    updatedAt: d(4),
  },
  {
    id: "conn_9",
    type: "clients",
    name: "Bloom Studio",
    email: "studio@bloom.design",
    phone: undefined,
    notes: "Design agency. Subcontracts dev work. Prefers fixed-price. Good for filler work between projects.",
    createdAt: d(50),
    updatedAt: d(15),
  },
];

export const seedSocialDrafts: SocialDraft[] = [
  {
    id: "soc_1",
    platform: "linkedin",
    content: `Just shipped a feature I've been thinking about for weeks — a command palette (Cmd+K) for navigating between all your dev assets instantly.

No more clicking through tabs. Just start typing and jump straight to any prompt, agent, snippet, or component.

Built with cmdk + TanStack Router + some Zustand magic. The trick was keeping the index in memory and debouncing the search.

What QoL features do you build into your own tools first? 👇`,
    mediaUrls: [],
    createdAt: d(3),
    updatedAt: d(1),
  },
  {
    id: "soc_2",
    platform: "linkedin",
    content: `6 months of freelancing, 3 lessons learned:

1. Scope creep is the enemy — put everything in writing before starting
2. Hourly vs fixed: fixed is better for well-defined work, hourly for R&D
3. Your best clients come from referrals, not cold outreach

Building in public has been the single biggest lever for finding quality clients.

What would you add to the list?`,
    mediaUrls: [],
    createdAt: d(10),
    updatedAt: d(8),
  },
  {
    id: "soc_3",
    platform: "twitter",
    content: `hot take: the best thing about TypeScript isn't type safety

it's the tooling

autocomplete that actually works, refactors that don't break things, IDE errors before you even run the code

the types are just how you unlock the tooling`,
    mediaUrls: [],
    createdAt: d(5),
    updatedAt: d(4),
  },
  {
    id: "soc_4",
    platform: "twitter",
    content: `things I wish I knew before going freelance as a dev:

→ raise your rates sooner than you think
→ always have 3 months runway before quitting your job  
→ the proposal is half the work
→ bad clients don't get better with time
→ niching down doubles your close rate

took me 2 years to figure all of this out`,
    mediaUrls: [],
    createdAt: d(7),
    updatedAt: d(6),
  },
  {
    id: "soc_5",
    platform: "instagram",
    content: `My dev setup for 2026 ✦

Dark theme all day. Mechanical keyboard. Noise-cancelling headphones.

The tools change. The focus stays the same.

What's in your setup? Drop it below 👇

#developer #devsetup #coding #buildinpublic`,
    mediaUrls: [],
    createdAt: d(2),
    updatedAt: d(1),
  },
];

export const seedMailTemplates: MailTemplate[] = [
  {
    id: "mail_1",
    channel: "cover-letter",
    subject: "Application — Senior Full-Stack Engineer",
    content: `Hi {{hiring_manager_name}},

I'm reaching out about the {{role_title}} position at {{company_name}}. I've been following your work on {{company_product}} and I'm excited by the problems you're solving in {{company_domain}}.

I'm a full-stack engineer with {{years_experience}} years of experience, primarily working with {{tech_stack}}. Most recently, I {{recent_achievement}}.

What draws me to {{company_name}} specifically is {{specific_reason}}. I think my background in {{relevant_skill}} would let me contribute meaningfully from day one.

I'd love to learn more about the team and the role. Are you open to a 20-minute call this week?

Best,
{{your_name}}`,
    createdAt: d(30),
    updatedAt: d(5),
  },
  {
    id: "mail_2",
    channel: "cover-letter",
    subject: "Freelance Proposal — {{project_type}} Project",
    content: `Hi {{client_name}},

Thanks for reaching out about the {{project_type}} project. Based on your description, I have a clear picture of what you need and I'm confident I can deliver it.

Here's how I'd approach it:

Phase 1 — {{phase_1}} (~{{phase_1_duration}})
Phase 2 — {{phase_2}} (~{{phase_2_duration}})
Phase 3 — {{phase_3}} (~{{phase_3_duration}})

Timeline: {{total_timeline}}
Budget: {{budget_range}}

I've done similar work for {{past_client_example}} — happy to share details on a quick call.

To get started, I'd need:
- {{requirement_1}}
- {{requirement_2}}

Does this align with what you had in mind? Let me know a good time to connect.

{{your_name}}`,
    createdAt: d(20),
    updatedAt: d(8),
  },
  {
    id: "mail_3",
    channel: "gmail",
    subject: "Following up — {{original_topic}}",
    content: `Hi {{name}},

Following up on my previous message about {{original_topic}}.

I know things get busy — just wanted to make sure this didn't fall through the cracks.

{{follow_up_context}}

Happy to adjust the approach if needed. What works best for you?

{{your_name}}`,
    createdAt: d(15),
    updatedAt: d(3),
  },
  {
    id: "mail_4",
    channel: "gmail",
    subject: "Introduction — {{your_name}} / {{their_name}}",
    content: `Hi {{recipient_name}},

{{mutual_contact}} suggested I reach out — they thought we'd have a lot to talk about given your work on {{their_project}} and mine on {{your_project}}.

I'm particularly interested in {{topic_of_interest}}. I've been thinking about {{shared_problem}} and I'd love to hear your perspective.

Would you be open to a 15-minute chat sometime this week or next?

{{your_name}}`,
    createdAt: d(12),
    updatedAt: d(6),
  },
  {
    id: "mail_5",
    channel: "whatsapp",
    subject: undefined,
    content: `Hey {{name}} 👋

Quick update on {{project_name}} — {{status_update}}.

Next step: {{next_step}}. I'll have that ready by {{deadline}}.

Any questions in the meantime just ping me here.`,
    createdAt: d(7),
    updatedAt: d(1),
  },
  {
    id: "mail_6",
    channel: "whatsapp",
    subject: undefined,
    content: `Hi {{name}}! 

Wanted to check in on {{topic}}. {{context}}.

When's a good time to jump on a quick call to align? 📞`,
    createdAt: d(4),
    updatedAt: d(2),
  },
];
