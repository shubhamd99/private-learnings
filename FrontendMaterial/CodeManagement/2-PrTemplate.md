# Pull Request (PR) Templates

In large organizations with multiple microteams, maintaining consistency in code reviews is crucial for streamlining processes and ensuring code quality. PR templates serve as standardized instruction sets that guide developers to provide all necessary context before merging code into production.

## Why Use PR Templates?

- **Consistency**: Ensures all teams follow the same standards regardless of the project.
- **Improved Reviews**: Makes it easier for reviewers to provide feedback when all context is available.
- **Resource Optimization**: Catching bugs early through structured reviews saves significant organizational time and money.
- **Knowledge Sharing**: Provides enough information so that colleagues can modify the code even in the author's absence.

---

## Key Components of an Effective PR Template

### 1. PR Title & Ticket ID

- Always include the JIRA or Ticket ID (e.g., `[TASK-1234] Added a to-do-remove option`).
- Helps in tracking tasks through integrated tools like GitHub/Bitbucket and JIRA.

### 2. PR Description

- **Current vs. New Behavior**: Clearly explain what was there and what has changed.
- **Rationale**: Why is this change required and what problem does it solve?
- **Dependencies**: List any dependency changes or downstream module requirements.

### 3. Testing & Validation

- **Methodology**: Describe exactly how the change was tested (Unit, Integration, Performance).
- **Test Case Documentation**: Mandatory link to a valid test case document if the "Tested" label is applied.
- **Performance Impact**: Characterize any positive or negative impacts on system performance.

### 4. Deployment & Infrastructure

- **Deployment Steps**: Prerequisites (SSL certificates, encryption keys), post-monitoring, and rollback plans.
- **Database Changes**: List migrations, new queries (with EXPLAIN results), and ensure scripts are idempotent.
- **Config Changes**: Detail updates to environment variables or configuration files.
- **Backward Compatibility**: Identify and describe handling for any breaking changes.

---

## Developer & Reviewer Checklists

### Developer Checklist

- [ ] Code follows project style guidelines.
- [ ] Performed self-review and commented on complex logic.
- [ ] Added positive and negative test cases.
- [ ] Updated relevant documentation (README, Tech Specs).
- [ ] Assigned Primary (SME) and Secondary (Syntax/Readability) reviewers.

### Reviewer Checklist

- [ ] **Primary Reviewer**: Confirms logic, functionality, and tests.
- [ ] **Secondary Reviewer**: Confirms syntax, readability, and non-SME understanding.
- [ ] **Changelog**: Ensures `Changelog.md` is updated.

---

## Universal PR Template Example

Below is a sample template suitable for both Frontend and Backend development:

```markdown
# PR Description

- **Current Behavior**:
- **New Behavior**:
- **Rationale**:
- **Dependencies**:

## How Has This Been Tested?

- Details of tests run and impact analysis:
- Performance impacts (characterization and testing results):

### Test cases document link:

- Mandatory if "Tested" label is added.
- Must be a valid, accessible URL.

| Test Case Document URL                        |
| --------------------------------------------- |
| Please paste test case document link here.... |

## Deploy Steps

- Pre-requisites, post-monitoring, and rollback details.

## Backward Incompatible Changes

- List and handling strategy for breaking changes.

## Database Changes

- Migrations, new queries, and idempotent script details.
- Commands to run migrations and EXPLAIN results.

## Config Changes

- Environment variable updates or configuration modifications.

## Dev Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have added positive and negative tests that prove my fix is effective or that my feature works
- [ ] Any dependent changes have been merged and published in downstream modules
- [ ] Appropriate labels have been added for bug/feature/enhancement/cosmetic and breaking/non-breaking
- [ ] Relevant documentation / readme / tech spec / has been added or updated
- [ ] Corresponding config changes have been added for stage/perf/prod/bank uat envs
- [ ] Primary Reviewer added - SME (Subject Matter Expert) of the topic has been added as primary reviewer (SLA 2 days)
- [ ] Secondary Reviewer added - Secondary reviewer new to the topic has been added for syntax and readability review (SLA 2 days)

## Reviewer Checklist

- [ ] PR has right logic changes and functionality with tests is implemented as expected - Confirmed by Primary
- [ ] PR is readable for dev new to topic and has no syntactical issues - Confirmed by Secondary
- [ ] [Changelog.md](../release/changelog.md) is updated with necessary details
```
