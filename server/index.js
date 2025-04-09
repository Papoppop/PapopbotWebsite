require('dotenv').config();
// Core dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path'); // Add path module for working with file paths
const dialogflow = require('@google-cloud/dialogflow');

// Database and models
const sequelize = require('./database');
const PapopbotDev = require('./models/PapopbotDev');
const DevDetails = require('./models/DevDetails');
const DevPosition = require('./models/DevPosition.js');
const DevImage = require('./models/DevImage');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Dialogflow configuration
const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Serve static files from public directory - this must come BEFORE helmet
app.use(express.static(path.join(__dirname, 'public')));

// Configure Helmet with settings that won't block images
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:"],
      "default-src": ["'self'"]
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resource sharing
  crossOriginEmbedderPolicy: false // Disable embedder policy which can block resources
}));

// Define allowed origins
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(origin => origin.trim());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('CORS policy does not allow access from this origin - Papop'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'], // Added POST for chatbot
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add cache headers for images
app.use('/images', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  res.setHeader('Vary', 'Accept-Encoding');
  next();
});

const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100
});
app.use('/api', limiter);

// Parse JSON requests
app.use(express.json());

// Chatbot endpoints
// Test route to verify the chatbot is running
app.get('/chat', (req, res) => {
  res.json({
    status: 'Chatbot is running',
    projectId: projectId,
    instructions: 'Send POST requests to this endpoint with message and sessionId'
  });
});

// Main chatbot endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    console.log(`Processing chat request - SessionID: ${sessionId}, Message: ${message}`);
    
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    console.log(`Intent: ${result.intent ? result.intent.displayName : 'No intent matched'}`);
    console.log(`Response: ${result.fulfillmentText}`);
    
    return res.json({
      fulfillmentText: result.fulfillmentText,
      intent: result.intent ? result.intent.displayName : null,
      confidence: result.intentDetectionConfidence
    });
  } catch (error) {
    console.error('Dialogflow Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

// Routes
app.use('/api', require('./routes'));

// Function to set up model relationships
function setupModelRelationships() {
  console.log('Setting up model relationships...');
  // One-to-One: Developer has one DevDetails
  PapopbotDev.hasOne(DevDetails, {
    foreignKey: 'devid',
    as: 'details'
  });
  DevDetails.belongsTo(PapopbotDev, {
    foreignKey: 'devid',
    as: 'developer'
  });

  // One-to-Many: Developer has many DevImages
  PapopbotDev.hasOne(DevImage, {
    foreignKey: 'devid',
    as: 'images'
  });
  DevImage.belongsTo(PapopbotDev, {
    foreignKey: 'devid',
    as: 'developer'
  });

  // One-to-Many: Developer has many DevPositions
  PapopbotDev.hasMany(DevPosition, {
    foreignKey: 'devid',
    as: 'positions'
  });
  DevPosition.belongsTo(PapopbotDev, {
    foreignKey: 'devid',
    as: 'developer'
  });
}

// Application startup sequence
async function startServer() {
  try {
    // Test database connection
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Set up model relationships
    setupModelRelationships();

    // Sync models with database (use { force: true } with caution - it drops tables)
    const syncOptions = {
      alter: process.env.NODE_ENV === 'development' // Only allow schema changes in development
    };
    console.log(`Syncing database with options: ${JSON.stringify(syncOptions)}...`);
    await sequelize.sync(syncOptions);
    console.log('Database synchronized successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`CORS configured for: ${allowedOrigins.join(', ') || 'ALL ORIGINS'}`);
      console.log(`Chatbot integrated on the same server (endpoint: /chat)`);
      console.log(`Dialogflow project ID: ${projectId}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with error code
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
startServer();