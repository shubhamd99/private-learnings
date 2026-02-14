# Branch Management in Git

Branch management is the process of handling different lines of development within a project. It allows teams to work on features, bug fixes, or experiments in isolation without affecting the main production code.

## 1. Common Branching Strategies

- **Feature Branching**: Creating a dedicated branch for every new feature or task.
- **Git Flow**: A structured model using `main` (production), `develop` (integration), `feature`, `release`, and `hotfix` branches.
- **GitHub Flow**: A lightweight, trunk-based style focused on continuous delivery; features are developed on short-lived branches and merged into `main` via Pull Requests.
- **GitLab Flow**: Combines feature branching with environment-driven branches (e.g., `staging`, `production`).
- **Trunk-Based Development**: Developers push small updates frequently to a single "trunk" (`main`), minimizing long-lived branches.

---

## 2. Git Merge vs. Git Rebase

Both operations integrate changes from one branch into another, but they differ in how they handle commit history.

### Git Merge

- **Concept**: Combines the source and target branches by creating a new "Merge Commit".
- **Pros**: Preserves the complete historical context and chronological order; non-destructive.
- **Cons**: Can result in a cluttered, "spider-web" history if merges are frequent.

### Git Rebase

- **Concept**: Replays your local commits on top of the latest commit of the target branch, effectively "rewriting" history to be linear.
- **Pros**: Creates a clean, straight-line history; easier to follow.
- **Cons**: Rewrites history (dangerous for shared branches); can be complex if many conflicts arise during replaying.

---

## 3. Key Comparison: Rebase vs. Merge

| Feature                 | Git Merge                                        | Git Rebase                                                     |
| :---------------------- | :----------------------------------------------- | :------------------------------------------------------------- |
| **History**             | Non-linear; preserves all branch information.    | Linear; rewrites history into a single line.                   |
| **Commit Logs**         | Includes a "Merge commit" for every integration. | No merge commits; looks like features were built sequentially. |
| **Conflict Resolution** | Conflicts resolved once in the merge commit.     | Conflicts resolved for each commit during the rebase process.  |
| **Traceability**        | High; easy to see when a feature was integrated. | Lower; original commit timestamps/context might be altered.    |
| **Safety**              | Safer for shared/public branches.                | **Dangerous** for shared branches (public history rewrite).    |
| **Best For**            | Integrating completed features into `main`.      | Cleaning up local feature branches before merging.             |

---

## 4. Best Practices & Pitfalls

### Do's:

- **Rebase local branches**: Use rebase to keep your private feature branch up-to-date with `main` to avoid a messy history.
- **Merge for Public History**: Use merge when bringing a feature into a shared branch like `main` or `develop`.
- **Squash Commits**: Use interactive rebase (`git rebase -i`) to "squash" multiple minor commits into one meaningful commit before merging.
- **Frequent Updates**: Pull and integrate changes from the base branch frequently to minimize conflict size.

### Don'ts:

- **NEVER Rebase Shared Branches**: If others are working on the same branch, rebasing will break their history.
- **Don't ignore conflicts**: Always test thoroughly after resolving conflicts in either merge or rebase.

---

## 5. Advanced Techniques

- **Interactive Rebase (`git rebase -i`)**: Allows you to `pick`, `reword`, `edit`, `squash`, or `drop` commits.
- **Squashing**: Combining "WIP" or "Fix typo" commits into a single logical "Add login feature" commit for a cleaner PR.
- **Merge Strategies**: Using `-X ours` or `-X theirs` to automatically resolve conflicts by favoring one branch's changes.

## 6. Recommended Tools

- **GUI Clients**: Sourcetree, GitKraken, GitHub Desktop.
- **IDE Integration**: VS Code (GitLens), IntelliJ IDEA.
- **Diff/Merge Tools**: KDiff3, Meld, Beyond Compare.
