---
slug: "why-i-stopped-using-state-management-libraries"
title: "Why I Stopped Using State Management Libraries"
date: "Jan 2026"
excerpt: "React's built-in state is enough for 90% of apps. Here's why I dropped Redux and never looked back."
readTime: "6 min read"
---

For years, the first thing I'd install in any React project was Redux. It felt like a rite of passage — you weren't a "real" React developer until you'd wrestled with reducers, actions, and middleware. But somewhere along the way, I started questioning why I was adding so much complexity to apps that didn't need it. Read more about [React State Management](https://react.dev/learn/managing-state).

![Coding on a laptop](https://images.unsplash.com/photo-1618477247222-ac591305ec62?q=80&w=2670&auto=format&fit=crop)
*Minimalist coding setup*

## The Turning Point

I was building a dashboard for a client — maybe 15 components deep. I had Redux Toolkit set up, RTK Query for data fetching, and a dozen slices managing everything from user preferences to modal states. Then I realized: most of my "global" state was actually just server cache.

```tsx
// Before: Redux slice for user data
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
});
```

The difference was staggering. I deleted over 400 lines of boilerplate and the app actually became easier to reason about. React Query handled caching, background refetching, and error states — all the things I was manually wiring up in Redux.

## What About "Real" Client State?

Here's the thing most people don't realize: true client-only state — things like "is this modal open" or "which tab is selected" — is almost always local to a component or a small subtree. useState and useContext handle this perfectly.

```tsx
// A simple context for theme — no library needed
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
};
```

> "The best code is the code you never have to write. State management libraries are often the code you didn't need to write in the first place."

## When You Actually Need a State Library

I'm not saying state management libraries are useless. If you're building a collaborative editor, a complex form wizard with cross-step dependencies, or an offline-first app with optimistic updates, then yes — reach for Zustand or Jotai. But for the vast majority of CRUD apps, dashboards, and marketing sites? Save yourself the complexity.
