export interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: BlogBlock[];
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string };

export const blogs: Blog[] = [
  {
    slug: "why-i-stopped-using-state-management-libraries",
    title: "Why I Stopped Using State Management Libraries",
    date: "Jan 2026",
    excerpt:
      "React's built-in state is enough for 90% of apps. Here's why I dropped Redux and never looked back.",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "For years, the first thing I'd install in any React project was Redux. It felt like a rite of passage — you weren't a \"real\" React developer until you'd wrestled with reducers, actions, and middleware. But somewhere along the way, I started questioning why I was adding so much complexity to apps that didn't need it.",
      },
      {
        type: "heading",
        text: "The Turning Point",
      },
      {
        type: "paragraph",
        text: "I was building a dashboard for a client — maybe 15 components deep. I had Redux Toolkit set up, RTK Query for data fetching, and a dozen slices managing everything from user preferences to modal states. Then I realized: most of my \"global\" state was actually just server cache.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// Before: Redux slice for user data
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

// After: React Query
const { data: user, isLoading } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
});`,
      },
      {
        type: "paragraph",
        text: "The difference was staggering. I deleted over 400 lines of boilerplate and the app actually became easier to reason about. React Query handled caching, background refetching, and error states — all the things I was manually wiring up in Redux.",
      },
      {
        type: "heading",
        text: "What About \"Real\" Client State?",
      },
      {
        type: "paragraph",
        text: "Here's the thing most people don't realize: true client-only state — things like \"is this modal open\" or \"which tab is selected\" — is almost always local to a component or a small subtree. useState and useContext handle this perfectly.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// A simple context for theme — no library needed
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggle: () => void;
}>({ theme: 'light', toggle: () => {} });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};`,
      },
      {
        type: "quote",
        text: "The best code is the code you never have to write. State management libraries are often the code you didn't need to write in the first place.",
      },
      {
        type: "heading",
        text: "When You Actually Need a State Library",
      },
      {
        type: "paragraph",
        text: "I'm not saying state management libraries are useless. If you're building a collaborative editor, a complex form wizard with cross-step dependencies, or an offline-first app with optimistic updates, then yes — reach for Zustand or Jotai. But for the vast majority of CRUD apps, dashboards, and marketing sites? Save yourself the complexity.",
      },
    ],
  },
  {
    slug: "the-art-of-writing-clean-commit-messages",
    title: "The Art of Writing Clean Commit Messages",
    date: "Dec 2025",
    excerpt: "Your git log is a story. Make it worth reading.",
    readTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "I've reviewed thousands of pull requests over the years, and nothing tells me more about a developer's discipline than their commit messages. A clean git log isn't just nice to have — it's a communication tool that pays dividends when debugging at 2 AM.",
      },
      {
        type: "heading",
        text: "The Anatomy of a Good Commit Message",
      },
      {
        type: "paragraph",
        text: "A great commit message answers three questions: What changed? Why did it change? And what effect does it have? The subject line handles the \"what,\" and the body handles the \"why.\"",
      },
      {
        type: "code",
        language: "bash",
        code: `# Bad
git commit -m "fix bug"
git commit -m "update stuff"
git commit -m "wip"

# Good
git commit -m "fix: prevent duplicate API calls on rapid tab switching"
git commit -m "refactor: extract auth logic into useAuth hook"
git commit -m "feat: add keyboard shortcuts for navigation (closes #142)"`,
      },
      {
        type: "paragraph",
        text: "Notice how the good examples are scannable, searchable, and tell a story. Six months from now, when you're bisecting a regression, you'll thank yourself.",
      },
      {
        type: "heading",
        text: "Conventional Commits Changed My Workflow",
      },
      {
        type: "paragraph",
        text: "Adopting Conventional Commits wasn't just about aesthetics — it enabled automated changelogs, semantic versioning, and made code review significantly faster. When every commit starts with feat:, fix:, or refactor:, you can scan a PR in seconds.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// commitlint.config.ts
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};`,
      },
      {
        type: "quote",
        text: "Write every commit message as if the person reading it is a sleep-deprived developer who will be debugging your code at 3 AM. That person might be you.",
      },
    ],
  },
  {
    slug: "building-for-yourself-first",
    title: "Building for Yourself First",
    date: "Nov 2025",
    excerpt:
      "Every good product I've built started as something I personally needed.",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "The best products don't come from market research or competitor analysis. They come from scratching your own itch. Every meaningful tool I've built started with a simple frustration: \"Why doesn't this exist?\"",
      },
      {
        type: "heading",
        text: "The Dogfooding Advantage",
      },
      {
        type: "paragraph",
        text: "When you're your own first user, you have an unfair advantage. You don't need user interviews to understand pain points — you feel them. You don't need analytics to know which features matter — you use them every day. This tight feedback loop is irreplaceable.",
      },
      {
        type: "paragraph",
        text: "My best side projects all followed this pattern: I needed a tool, built the simplest version that solved my problem, and only then discovered others had the same need.",
      },
      {
        type: "heading",
        text: "Start Embarrassingly Small",
      },
      {
        type: "code",
        language: "typescript",
        code: `// My first version of a bookmark manager
// Literally just a JSON file and a CLI script
import { readFileSync, writeFileSync } from 'fs';

interface Bookmark {
  url: string;
  title: string;
  tags: string[];
  addedAt: string;
}

const add = (url: string, title: string, tags: string[]) => {
  const bookmarks: Bookmark[] = JSON.parse(
    readFileSync('./bookmarks.json', 'utf-8')
  );
  bookmarks.push({ url, title, tags, addedAt: new Date().toISOString() });
  writeFileSync('./bookmarks.json', JSON.stringify(bookmarks, null, 2));
  console.log(\`Added: \${title}\`);
};`,
      },
      {
        type: "paragraph",
        text: "That ugly CLI script eventually became a full-featured web app. But the key insight is: I shipped something useful in 30 minutes. I didn't spend three months building a \"platform.\"",
      },
      {
        type: "quote",
        text: "If you're not embarrassed by the first version of your product, you've launched too late. Build for yourself, ship fast, iterate based on real usage.",
      },
      {
        type: "heading",
        text: "The Trap of Building for Everyone",
      },
      {
        type: "paragraph",
        text: "The moment you start building for a hypothetical \"user,\" you start adding features nobody asked for. You build an admin panel before you have admins. You add OAuth with 5 providers before you have 5 users. Build what you need, nothing more.",
      },
    ],
  },
];
