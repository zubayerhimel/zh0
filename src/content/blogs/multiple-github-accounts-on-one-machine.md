---
slug: "multiple-github-accounts-on-one-machine"
title: "Using Multiple GitHub Accounts on One Machine with SSH"
date: "Nov 2026"
excerpt: "Work and personal GitHub on the same laptop, with no account switching and no more \"Repository not found\"."
readTime: "8 min read"
---

For a long time my laptop had one GitHub account: the work one. Then I wanted to push a side project from the same machine under my personal account, and it turned out to be harder than I expected.

The setup itself is simple. I made one small mistake in it, though, and that broke my work account the next morning. This post covers the whole setup, the mistake, and the one line that fixes it.

Throughout this post I'll use these placeholders. Swap in your own values:

- **Work account:** `work-username`, `you@company.com`, key `~/.ssh/id_ed25519`
- **Personal account:** `personal-username`, `you@personal.com`, key `~/.ssh/id_ed25519_personal`

## How it works

GitHub figures out who you are from the SSH key you connect with. If both accounts go through `git@github.com`, SSH needs some way to know which key to send. The trick is to give your personal account its own **host alias** in `~/.ssh/config`. The alias points to `github.com` but uses a different key. Repos that use the alias in their remote URL authenticate as your personal account. Everything else keeps using your work account.

There's nothing to switch, and Git picks the right identity from the remote URL.

## Step 1: Generate a key for your personal account

Every GitHub account needs its own key, because GitHub won't let you add the same public key to two accounts (it shows "Key is already in use"). I already had `~/.ssh/id_ed25519` for work, so I generated a second key under a different filename:

```bash
ssh-keygen -t ed25519 -C "you@personal.com" -f ~/.ssh/id_ed25519_personal
```

The `-f` flag matters. Leave it out and `ssh-keygen` will offer to overwrite your existing `id_ed25519`, which would delete your work key. You can add a passphrase or press Enter to skip it. A passphrase is a good idea, and the agent setup below means you won't have to type it all the time.

> On Windows, run these commands in Git Bash or PowerShell. `~/.ssh` maps to `C:\Users\<you>\.ssh`.

## Step 2: Make sure the SSH agent is running, then add the key

`ssh-add` only works if an agent is running. On macOS one is usually already running. On Linux or Git Bash, start one first:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_personal
```

On macOS, add `--apple-use-keychain` so the passphrase is saved in your Keychain:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_personal
```

On Windows with the built-in OpenSSH, enable the agent service once from an **admin** PowerShell:

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519_personal
```

## Step 3: Add the public key to your personal GitHub account

Copy the **public** key, the one that ends in `.pub`. Never share the private key.

```bash
# macOS
pbcopy < ~/.ssh/id_ed25519_personal.pub

# Windows (Git Bash)
clip < ~/.ssh/id_ed25519_personal.pub

# Linux / anywhere: print it and copy manually
cat ~/.ssh/id_ed25519_personal.pub
```

Sign in to your **personal** account, go to **Settings → SSH and GPG keys → New SSH key**, paste the key, choose **Authentication Key** as the type, and save.

## Step 4: Configure `~/.ssh/config`

Create the file if it doesn't exist yet. This is the config that worked for me:

```ssh-config
# Work account (default)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes

# Personal account
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
  AddKeysToAgent yes
```

`github-personal` isn't a real server. It's a nickname that tells SSH to connect to `github.com` with the personal key.

**Don't skip `IdentitiesOnly yes`.** I left it out the first time, and that's what broke my work account. The next section explains why.

On macOS you can also add `UseKeychain yes` to each block so the passphrase comes from your Keychain. Only do this on macOS. Other systems don't recognize the option and SSH will stop with a "Bad configuration option" error.

## Step 5: Test both connections

```bash
ssh -T git@github.com
# Hi work-username! You've successfully authenticated, but GitHub does not provide shell access.

ssh -T git@github-personal
# Hi personal-username! You've successfully authenticated, but GitHub does not provide shell access.
```

The first time you connect, SSH asks whether to trust GitHub's host key. Type `yes`. The "does not provide shell access" message is normal and means it worked.

What matters is the **username in the greeting**. If both commands greet the same account, something is wrong. See the troubleshooting section below.

## Step 6: Use the right URL for each repo

Work repos keep the normal URL:

```bash
git clone git@github.com:work-username/work-repo.git
```

For personal repos, replace `github.com` with your alias:

```bash
git clone git@github-personal:personal-username/personal-repo.git
```

For a personal repo you've already cloned, update its remote:

```bash
cd ~/path/to/personal-repo
git remote set-url origin git@github-personal:personal-username/personal-repo.git
git remote -v   # confirm the change
```

If a remote starts with `https://`, it doesn't use SSH at all, so none of this applies to it. Switch it to the SSH form shown above.

## Step 7: Set the correct commit identity

This step is easy to miss. **The SSH key decides who can push. It doesn't decide who the commits are from.** GitHub attributes each commit by the email in its metadata. If your global Git email is your work address, your personal commits will show up as work commits.

You can set the identity for each repo:

```bash
cd ~/path/to/personal-repo
git config user.name "Your Name"
git config user.email "you@personal.com"
```

The email must be one that's added to that GitHub account, or its private `@users.noreply.github.com` address. Otherwise the commits won't link to your profile.

### Set it once per folder

Setting the identity in every repo gets tedious, and if you forget once, a commit goes out with the wrong email. What I do now is keep all personal projects in one folder and let Git switch identities automatically with `includeIf`.

In `~/.gitconfig`:

```ini
[user]
  name = Your Name
  email = you@company.com

[includeIf "gitdir:~/personal/"]
  path = ~/.gitconfig-personal
```

In `~/.gitconfig-personal`:

```ini
[user]
  email = you@personal.com
```

Any repo under `~/personal/` now commits with your personal email, and everything else uses your work email. The trailing slash in `gitdir:~/personal/` is required. On Windows, use forward slashes, for example `gitdir/i:C:/Users/you/personal/`.

To check which identity a repo will use, run this inside it:

```bash
git config user.email
```

## Troubleshooting: "Repository not found" on work repos

This was the problem I hit. Right after I added the personal key, every `git pull` on a work repo started failing:

```text
ERROR: Repository not found.
fatal: Could not read from remote repository.
```

My first guess was that GitHub rejects you after the wrong key. That's not what happens. **The connection succeeded, but as the wrong account.**

When you connect, SSH offers keys one at a time. By default it offers **every key loaded in the agent**, not just the one in `IdentityFile`. My personal key was in the agent, SSH offered it first, and GitHub accepted it because the key is valid. It's just valid for my personal account. My personal account has no access to the company's private repos, and GitHub reports that as "Repository not found" instead of "access denied" so it doesn't reveal that the repo exists.

### Confirm it

Check which account `github.com` actually logs you into:

```bash
ssh -T git@github.com
```

If it says `Hi personal-username!`, that's the bug. To see exactly which keys SSH offers, run it in verbose mode:

```bash
ssh -vT git@github.com 2>&1 | grep -E "Offering|Authenticated"
```

### Fix it

Add `IdentitiesOnly yes` to **both** host blocks, as in the config from Step 4. With it, SSH only offers the key named in `IdentityFile` for that host, so it no longer matters what's in the agent or in what order.

Clearing the agent and re-adding keys in a "work first" order can seem to fix it. It stops working after a reboot or the next time you add a key. `IdentitiesOnly` keeps working.

Then check that the work repo's remote is right:

```bash
cd ~/path/to/work-repo
git remote -v
# should be git@github.com:work-username/... (not github-personal, not https://)
```

If it's wrong, fix it:

```bash
git remote set-url origin git@github.com:work-username/work-repo.git
```

Run both `ssh -T` tests again. Once each one greets the right account, you're done.

## Keeping it working after a reboot

The agent forgets its keys when you restart, but you don't need to put `ssh-add` lines in `.zshrc` or `.bashrc`:

- **With `IdentitiesOnly yes` and `IdentityFile`**, SSH loads the right key from disk when it needs it, whether or not it's in the agent. If the key has no passphrase, nothing else is needed.
- **`AddKeysToAgent yes`** adds the key to the agent the first time it's used, so you type the passphrase at most once per session.
- **On macOS**, run `ssh-add --apple-use-keychain` once for each key and add `UseKeychain yes` to the config. The passphrase stays in your Keychain across reboots.
- **On Windows**, the `ssh-agent` service set to *Automatic* in Step 2 keeps your keys between reboots.

## Summary

- **Work repos:** remote `git@github.com:work-username/...`, key `id_ed25519`, commits as `you@company.com`
- **Personal repos:** remote `git@github-personal:personal-username/...`, key `id_ed25519_personal`, commits as `you@personal.com`

The setup has three parts. The host alias decides which **key** is used. `IdentitiesOnly yes` makes sure only that key is sent. `user.email` decides who the commits are **from**. With all three in place, you don't need to switch anything again.
