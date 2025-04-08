const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Your Dialogflow project ID and session client setup
const projectId = process.env.PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// At the beginning of your application
try {
    // Test that we can list intents to verify authentication
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
    const projectAgentPath = intentsClient.projectAgentPath(projectId);
    console.log('Authentication successful - connected to project:', projectId);
  } catch (error) {
    console.error('Authentication failed:', error);
  }

// Route to handle chat messages
app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  
  if (!message || !sessionId) {
    return res.status(400).json({ error: 'Message and sessionId are required' });
  }

  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'th-TH',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    return res.json({
      fulfillmentText: result.fulfillmentText,
      intent: result.intent.displayName,
      confidence: result.intentDetectionConfidence
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});