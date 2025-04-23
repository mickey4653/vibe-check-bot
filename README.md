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

## License

MIT License

Copyright (c) 2024 Michael I. Adeniyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Author

Michael I. Adeniyi