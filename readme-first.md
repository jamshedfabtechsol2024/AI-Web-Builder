# Naming Conventions & Code Standards

This guide outlines file and folder naming standards for our project. Consistent naming conventions make our codebase more maintainable and easier to navigate.

## File and Folder Names

- Use kebab-case for all file and folder names
  - All lowercase letters
  - Words separated by hyphens
  - No spaces, underscores, or camelCase

## Component Naming

// ✅ Correct - in user-profile.jsx
export function UserProfile() {
return <div>Profile Content</div>;
}

// ❌ Incorrect - mismatched name
export function Profile() { // Should be UserProfile to match file name
return <div>Profile Content</div>;
}

## Variable and Function Naming

// ✅ Correct
const userName = 'John';
const calculateTotal = (items) => { /_ ... _/ };
const API*KEY = 'abc123';
class UserRepository { /* ... \_/ }

// ❌ Incorrect
const user*name = 'John';
const CalculateTotal = (items) => { /* ... \_/ };
const apiKey = 'abc123'; // Should be UPPER_SNAKE_CASE for true constants

## Accessibility Standards

// ✅ Correct
<img src="/logo.png" alt="Company logo" />
<button type="button" onClick={handleClick} onKeyDown={handleKeyDown}>Submit</button>

// ❌ Incorrect
<img src="/logo.png" alt="image of logo" />

<div role="button" onClick={handleClick}>Submit</div>
<button onClick={handleClick}>Submit</button> // missing type

## React Best Practices

// ✅ Correct
function ItemList({ items }) {
return (
<>
{items.map((item) => (
<Item key={item.id} data={item} />
))}
</>
);
}

// ❌ Incorrect
function ParentComponent() {
// Don't define components inside other components
function ChildComponent() { return <div>Child</div>; }

return (

<div>
{items.map((item, index) => (
<Item key={index} data={item} /> // Don't use index as key
))}
</div>
);
}

## Error Handling

// ✅ Good: Comprehensive error handling
try {
const result = await fetchData();
return result;
} catch (error) {
console.error('API call failed:', error);
}

// ❌ Bad: Swallowing errors
try {
return await fetchData();
} catch (e) {
console.log(e);
}

## CSS Variable

// ✅ correct
bg-var(--background)

// ❌ Bad
bg-background

## Code Formatting and Quality (Recommanded)

-> npx ultracite format - Format and fix code automatically.
-> npx ultracite lint - Check for issues without fixing

For a complete list of coding standards, refer to the .github/copilot-instructions.md file.
