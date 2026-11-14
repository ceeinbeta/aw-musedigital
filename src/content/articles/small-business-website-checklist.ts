import { defineArticle } from "../define";

export default defineArticle({
  slug: "small-business-website-checklist",
  title: "What Every Small Business Website Needs: A Launch Checklist",
  seoTitle: "Small Business Website Checklist: What Every Site Needs",
  excerpt:
    "From a clear first sentence to cookie consent and a fast mobile experience, the essentials every small business website needs before launch, with notes for businesses in Spain and the EU.",
  type: "business-tutorial",
  edit: "business-edit",
  publishedAt: "2026-11-06",
  image: "websiteDesk",
  tags: ["Small business", "Websites", "SEO"],
  takeaways: [
    "Visitors should understand what you do and who it is for within a few seconds.",
    "Most visits happen on phones, so test every page on a small screen.",
    "In Spain and the EU you need a privacy policy, a cookie policy with real consent, and a legal notice.",
    "Basic search optimisation, such as clear titles, descriptions and a sitemap, helps people find you.",
  ],
  body: `
A small business website does not need to be large or complicated. It needs to do a few things very well: explain what you offer, build trust, make it easy to get in touch, and meet the legal requirements where you operate. Use this checklist before you launch, and again once a year.

## 1. A clear message

- **A first sentence that says what you do and for whom.** Visitors decide within seconds whether they are in the right place.
- **One main call to action** on each page, such as "Book a consultation" or "View the menu".
- **Plain language.** Write for your customers, not for other professionals in your field.

## 2. The essential pages

Most small businesses need only a handful of pages:

- **Home:** what you do, who it is for and why choose you.
- **Services or products:** what you offer, with enough detail to make a decision.
- **About:** the people behind the business. Our guide to [writing an About page](/journal/how-to-write-an-about-page) explains how.
- **Contact:** a form, an email address and, if relevant, a phone number, address and opening hours.
- **Legal pages:** see section 5.

## 3. Mobile first

In many sectors, more than half of visits come from phones. Check every page on a real phone:

- Text is readable without zooming.
- Buttons are large enough to tap.
- Nothing scrolls sideways.
- Forms are short and easy to fill in.

![A calm, uncluttered workspace](websiteWorkspace)

## 4. Speed

Slow sites lose visitors. The biggest improvements usually come from:

- **Compressing and resizing images** so they are no larger than they need to be.
- **Limiting third-party scripts**, such as chat widgets and trackers.
- **Choosing good hosting.**

Free tools such as Google PageSpeed Insights show where a site is slow and why.

## 5. Legal requirements in Spain and the EU

If you run a business website in Spain, several requirements apply. This is a summary, not legal advice, so check the details with a professional.

- **Legal notice (aviso legal):** Spain's information society law (LSSI-CE) requires business websites to show who runs them, including name or company name, tax ID and contact details.
- **Privacy policy:** under the GDPR, you must explain what personal data you collect, why, on what legal basis, who you share it with, how long you keep it and how people can exercise their rights.
- **Cookie policy and consent:** non-essential cookies, such as most analytics and advertising cookies, may only be set after visitors agree. Rejecting must be as easy as accepting.
- **Terms and conditions** if you sell online.
- **Clear disclosure** of advertising, sponsorship and commercial relationships.

## 6. Search basics

- A unique **title** and **meta description** for every page.
- One clear **main heading (H1)** per page.
- Descriptive **alternative text** on images.
- An **XML sitemap**, submitted to Google Search Console.
- A **Google Business Profile** if you serve local customers.

Helpful, original content answers the questions your customers actually ask, which is what both search engines and AI assistants look for.

## 7. Trust and security

- **HTTPS** on every page; most hosts provide it free.
- An email address on your **own domain** rather than a free webmail address.
- **Real photographs** and genuine testimonials, used with permission.
- **Up-to-date information:** prices, opening hours and copyright year.

## 8. Accessibility

Good accessibility helps everyone. Use sufficient colour contrast, make sure the site works with a keyboard, label form fields clearly, and add captions to video.

## 9. After launch

- Set up **backups** and keep software updated.
- Test the **contact form** regularly to make sure messages arrive.
- Review analytics, with visitor consent, to see which pages people use.
- Refresh your content at least once a year.

If you would rather have an expert handle the build, our studio designs and develops [websites for small businesses and creatives](/services/website-development).
`,
  faq: [
    {
      question: "What pages does a small business website need?",
      answer:
        "Usually a homepage, a services or products page, an About page, a contact page, and the legal pages required where you operate, such as a privacy policy, cookie policy and legal notice.",
    },
    {
      question: "Does a website in Spain need a cookie banner?",
      answer:
        "If the site uses non-essential cookies, such as most analytics or advertising cookies, it must ask for consent before setting them, and rejecting must be as easy as accepting. Sites that use only strictly necessary cookies do not need to ask for consent.",
    },
    {
      question: "What is an aviso legal?",
      answer:
        "It is the legal notice that Spain's LSSI-CE requires on business websites. It identifies who runs the site, including the name or company name, tax ID and contact details.",
    },
  ],
});
