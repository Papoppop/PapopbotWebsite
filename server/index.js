require('dotenv').config();
// Core dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path'); // Add path module for working with file paths

// Database and models
const sequelize = require('./database');
const PapopbotDev = require('./models/PapopbotDev');
const DevDetails = require('./models/DevDetails');
const DevPosition = require('./models/DevPosition.js');
const DevImage = require('./models/DevImage');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

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

// Remove this section since we're handling it in helmet config
// Set Cross-Origin-Resource-Policy header
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
//   next();
// });

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
  methods: ['GET', 'OPTIONS'], // Add OPTIONS for preflight requests
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