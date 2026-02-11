---
slug: "the-art-of-writing-clean-commit-messages"
title: "The Art of Writing Clean Commit Messages"
date: "Dec 2025"
excerpt: "Your git log is a story. Make it worth reading."
readTime: "4 min read"
---

I've reviewed thousands of pull requests over the years, and nothing tells me more about a developer's discipline than their commit messages. A clean git log isn't just nice to have — it's a communication tool that pays dividends when debugging at 2 AM.

## The Anatomy of a Good Commit Message

A great commit message answers three questions: What changed? Why did it change? And what effect does it have? The subject line handles the "what," and the body handles the "why."

```bash
# Bad
git commit -m "fix bug"
git commit -m "update stuff"
git commit -m "wip"

# Good
git commit -m "fix: prevent duplicate API calls on rapid tab switching"
git commit -m "refactor: extract auth logic into useAuth hook"
git commit -m "feat: add keyboard shortcuts for navigation (closes #142)"
```

Notice how the good examples are scannable, searchable, and tell a story. Six months from now, when you're bisecting a regression, you'll thank yourself. 

## Conventional Commits Changed My Workflow

Adopting Conventional Commits wasn't just about aesthetics — it enabled automated changelogs, semantic versioning, and made code review significantly faster. When every commit starts with feat:, fix:, or refactor:, you can scan a PR in seconds.

```typescript
// commitlint.config.ts
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
```

> "Write every commit message as if the person reading it is a sleep-deprived developer who will be debugging your code at 3 AM. That person might be you."
