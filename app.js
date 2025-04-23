require('dotenv').config();
const { App } = require('@slack/bolt');
const { MongoClient } = require('mongodb');

// MongoDB setup
const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN 
});

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db('vibecheck');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

app.command('/vibecheck', async ({ ack, body, client }) => {
  await ack();

  await client.chat.postMessage({
    channel: body.channel_id,
    text: "🌤️ Vibe check! How are you feeling today?",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*🌤️ Vibe Check Time!* \nHow are you feeling today? Let us know below 👇"
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": { "type": "plain_text", "text": "😊 Great" },
            "value": "great",
            "action_id": "vibe_great"
          },
          {
            "type": "button",
            "text": { "type": "plain_text", "text": "😐 Okay" },
            "value": "okay",
            "action_id": "vibe_okay"
          },
          {
            "type": "button",
            "text": { "type": "plain_text", "text": "😩 Not great" },
            "value": "bad",
            "action_id": "vibe_bad"
          }
        ]
      }
    ]
  });
});

app.action(/vibe_.*/, async ({ ack, body, client, action }) => {
  await ack();
  
  const vibes = {
    "vibe_great": {
      response: "😊 Awesome! Keep the good vibes going!",
      modalTitle: "Share Your Great Vibes!",
      modalPrompt: "What's making today awesome? Your positive energy can inspire others!"
    },
    "vibe_okay": {
      response: "😐 Hope the day gets better from here!",
      modalTitle: "Tell Us More",
      modalPrompt: "What could make your day better? We're here to help!"
    },
    "vibe_bad": {
      response: "😩 Take it easy today. We're here for you 💛",
      modalTitle: "We're Here to Support You",
      modalPrompt: "Would you like to share what's troubling you? We're here to listen and help."
    }
  };

  const currentVibe = vibes[action.action_id];

  await client.chat.postEphemeral({
    channel: body.channel.id,
    user: body.user.id,
    text: currentVibe.response
  });

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'vibe_modal',
        private_metadata: action.action_id, // Store the vibe type for later
        title: {
          type: 'plain_text',
          text: currentVibe.modalTitle
        },
        submit: {
          type: 'plain_text',
          text: 'Submit'
        },
        close: {
          type: 'plain_text',
          text: 'Cancel'
        },
        blocks: [
          {
            type: 'input',
            block_id: 'feedback_block',
            label: {
              type: 'plain_text',
              text: currentVibe.modalPrompt
            },
            element: {
              type: 'plain_text_input',
              action_id: 'feedback_input',
              multiline: true
            },
            optional: true
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error opening modal:', error);
  }

  if (action.action_id === "vibe_bad") {
    await client.chat.postEphemeral({
      channel: body.channel.id,
      user: body.user.id,
      text: "If you'd like to talk or need anything, feel free to DM me or reach out in #vibe-feedback. You're not alone 💬"
    });
  }
});

app.view('vibe_modal', async ({ ack, body, view, client }) => {
  await ack();
  
  const user = body.user.id;
  const feedback = view.state.values.feedback_block.feedback_input.value;
  const vibeType = view.private_metadata; // Get the stored vibe type
  
  if (feedback) {
    try {
      // Store in MongoDB
      const feedbackDoc = {
        userId: user,
        vibeType: vibeType,
        feedback: feedback,
        timestamp: new Date(),
        username: body.user.username
      };
      
      await db.collection('feedback').insertOne(feedbackDoc);

      // Send to private channel
      const vibeEmoji = {
        vibe_great: "😊",
        vibe_okay: "😐",
        vibe_bad: "😩"
      };

      await client.chat.postMessage({
        channel: process.env.FEEDBACK_CHANNEL_ID, // Add this to your .env file
        text: `New Vibe Check Feedback ${vibeEmoji[vibeType]}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New Vibe Check Feedback*\n\n*From:* <@${user}>\n*Mood:* ${vibeEmoji[vibeType]} ${vibeType.replace('vibe_', '')}\n*Feedback:* ${feedback}`
            }
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Submitted: <!date^${Math.floor(Date.now()/1000)}^{date_pretty} at {time}|${new Date().toLocaleString()}>`
              }
            ]
          }
        ]
      });

      // Send thank you message to user
      await client.chat.postEphemeral({
        channel: body.user.id,
        user: user,
        text: "Thanks for sharing! Your feedback helps us understand how to better support the team. 🙏"
      });
      
    } catch (error) {
      console.error('Error handling modal submission:', error);
    }
  }
});

(async () => {
  await connectDB();
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Vibe Check Bot is running!');
})();
