# Vibe Check Slack Bot

A Slack bot that checks in with team members about their current "vibe" and collects feedback to help track team morale.

## Features

- Daily vibe check prompts in Slack
- Three response options: Great 🎉, Okay 👍, Bad 😢
- Feedback collection through modal forms
- MongoDB storage for tracking responses
- Easy to deploy and configure

## Tech Stack

- Node.js
- Slack Bolt Framework
- MongoDB Atlas
- Express.js

## Prerequisites

- Node.js installed
- MongoDB Atlas account
- Slack workspace with admin access
- `.env` file with required credentials

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd vibe-check-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
MONGODB_URI=your-mongodb-uri
PORT=3000
```

## Configuration

1. Create a Slack App at [api.slack.com](https://api.slack.com/apps)
2. Enable Socket Mode
3. Add the following bot token scopes:
   - chat:write
   - im:history
   - im:write
   - commands
4. Install the app to your workspace

## Usage

1. Start the server:
```bash
npm start
```

2. Use the slash command in Slack:
```
/vibecheck
```

3. Monitor feedback in MongoDB Compass or VS Code MongoDB extension

## Database Queries

Example MongoDB queries are available in `playground-1.mongodb.js`:
- View all feedback
- Filter by vibe type
- Get feedback counts
- View recent responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
