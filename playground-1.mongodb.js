// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("vibecheck");

// Find all documents in the feedback collection
db.getCollection("feedback").find({});

// Or try these specific queries (uncomment to use):

// Find most recent feedback first
// db.getCollection("feedback").find({}).sort({ timestamp: -1 });

// Count feedback by vibe type
// db.getCollection("feedback").aggregate([
//     {
//         $group: {
//             _id: "$vibeType",
//             count: { $sum: 1 }
//         }
//     }
// ]);

// Find only "great" vibes
// db.getCollection("feedback").find({ vibeType: "vibe_great" });