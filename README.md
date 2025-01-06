# Scoreboard Management for Minecraft Bedrock Development

[![npm version](https://badge.fury.io/js/%40mbext%2Fscoreboard.svg)](https://www.npmjs.com/package/@mbext/scoreboard)

`@mbext/scoreboard` A type-safe scoreboard management system for Minecraft Bedrock Edition (MCBE) add-ons. Provides a simple API for managing player scores with built-in zero-value protection.

## Features

- Type-safe operations with TypeScript generics
- Zero-value protection option
- Asynchronous operations
- Chainable methods
- Error handling for non-existent objectives
- Promise-based API

## Installation

To install `@mbext/scoreboard` in your minecraft add-on project, you have two options:

### Option 1: Use the package manager

1. Open a terminal and navigate to your project's root directory.
2. Run the following command to install the package:

```bash
npx @mbext/project init
```

1. Choose dependencies addons in prompt `@mbext/scoreboard`

### Option 2: Install via npm

1. Open a terminal and navigate to your project's root directory.
2. Run the following command to install the package:

```bash
npm i @mbext/scoreboard
```

3. Use the module with [ESBuild](https://jaylydev.github.io/posts/bundle-minecraft-scripts-esbuild/) or [Webpack](https://jaylydev.github.io/posts/scripts-bundle-minecraft/)

### Option 3: Clone the repository

1. Open a terminal and navigate to your project's root directory.
2. Run the following command to clone the repository:

```bash
git clone https://github.com/sausage404/mbext-scoreboard.git
```

3. Copy the `index.ts` and `index.d.ts` or `index.js` file from the cloned repository into your project's scripts folder.

## Basic Usage

Let's walk through how to use the scoreboard in your minecraft bedrock. We'll cover the essential operations with practical examples.

Create a scoreboard Instance With TypeScript

```typescript
import * as mc from "@minecraft/server";
import scoreboard, { CollectionValidator } from "@mbext/scoreboard";

// Define the structure of your data
interface User {
    id: string;
    name: string;
    age: number;
    money: number;
}

const validateUser: CollectionValidator<User>  = {
    id: (value) => value.length > 0,
    name: (value) => value.length > 0,
    age: (value) => value > 0,
    money: (value) => value >= 0
}

// Initialize the scoreboard
const scoreboard = new scoreboard<User>("users", mc.world, validateUser);

// Create a new user
const newUser: User = {
    id: "user123",
    name: "John Doe",
    age: 30,
    money: 1000,
};

// Insert the new user into the scoreboard
scoreboard.create(newUser);

// Read all users from the scoreboard
const users = scoreboard.findMany().forEach((user) => {
    console.log(user);
});
```

## License

@mbext/scoreboard is released under the [GNU General Public License v3](https://github.com/sausage404/mbext-scoreboard/blob/main/LICENSE).

## Issues

If you encounter any problems or have suggestions, please file an issue on the GitHub repository.