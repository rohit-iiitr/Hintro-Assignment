import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Header User-ID: ${req.headers['x-user-id']}`);
  next();
});

// Helper: Generate random number between min and max
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: Generate random dates within last 60 days
const getRandomDates = (count) => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const diffDays = getRandom(1, 60);
    const diffHours = getRandom(0, 23);
    const diffMinutes = getRandom(0, 59);
    const date = new Date(now.getTime() - (diffDays * 24 * 60 * 60 * 1000) - (diffHours * 60 * 60 * 1000) - (diffMinutes * 60 * 1000));
    dates.push(date.toISOString());
  }
  return dates.sort((a, b) => new Date(b) - new Date(a));
};

// Mock Static User Data
const profiles = {
  u1: {
    id: "u1",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    login_method: "google",
    status: "active",
    is_hintro_admin: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z"
  },
  u2: {
    id: "u2",
    email: "om.patel@hintro.ai",
    firstName: "Om",
    lastName: "Patel",
    login_method: "google",
    status: "active",
    is_hintro_admin: true,
    createdAt: "2025-02-10T08:00:00Z",
    updatedAt: "2026-05-23T12:00:00Z"
  }
};

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Hintro Mock Server' });
});

// Profile Endpoints
app.get('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const profile = profiles[userId] || profiles.u1;
  res.json(profile);
});

// Dashboard Endpoints
app.get('/api/auth/dashboard', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  
  if (userId === 'u1') {
    res.json({
      user: profiles.u1,
      subscription: null,
      usage: {
        kb_files: { used: 0, limit: 100, percentage: 0 },
        vocab_terms: 0,
        notes: 0
      }
    });
  } else {
    res.json({
      user: profiles.u2,
      subscription: {
        plan: "professional",
        billing_cycle: "monthly",
        status: "active"
      },
      usage: {
        kb_files: { used: 340, limit: 1000, percentage: 34 },
        vocab_terms: 104,
        notes: 24
      }
    });
  }
});

// Call Session Stats Endpoint
app.get('/api/call-sessions/stats', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';

  if (userId === 'u1') {
    res.json({
      totalSessions: 0,
      averageDuration: 0,
      totalAIInteractions: 0,
      lastSession: []
    });
  } else {
    // Generate randomized values on each call as requested by spec
    const totalSessions = getRandom(1, 200);
    const averageDuration = getRandom(1, 8000); // seconds
    const totalAIInteractions = getRandom(1, 70);
    const lastSession = getRandomDates(3);

    res.json({
      totalSessions,
      averageDuration,
      totalAIInteractions,
      lastSession
    });
  }
});

// Call History Endpoints
app.get('/api/call-sessions', (req, res) => {
  const userId = req.headers['x-user-id'] || 'u1';
  const limit = parseInt(req.query.limit) || 10;

  if (userId === 'u1') {
    res.json({
      callSessions: [],
      pagination: {
        page: 1,
        limit,
        totalCount: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    });
  } else {
    // Generate rich list of randomized sessions
    const clients = ['Acme Corp', 'TechStart', 'BigCorp', 'StartupXYZ', 'Enterprise Inc', 'Chevron Corp', 'Google Cloud', 'Figma Lab'];
    const descriptions = ['Product demo', 'Sales pitch', 'Discovery call', 'Design Review', 'Technical Sync', 'Alignment Standup', 'QBR Meeting'];
    const namesPool = ['Jane Smith', 'Alice Cooper', 'Bob Miller', 'Sophia Patel', 'Liam Chen', 'Emma Johnson', 'Noah Davis'];

    const totalCount = getRandom(15, 60);
    const callSessions = [];

    // Let's generate a consistent set of calls for u2
    const now = new Date();
    for (let i = 0; i < totalCount; i++) {
      const client = clients[getRandom(0, clients.length - 1)];
      const description = descriptions[getRandom(0, descriptions.length - 1)];
      const duration = getRandom(300, 3600); // seconds

      // Call timestamp
      const diffDays = getRandom(0, 45);
      const diffHours = getRandom(0, 23);
      const diffMinutes = getRandom(0, 59);
      const started = new Date(now.getTime() - (diffDays * 24 * 60 * 60 * 1000) - (diffHours * 60 * 60 * 1000) - (diffMinutes * 60 * 1000));
      const ended = new Date(started.getTime() + duration * 1000);

      // Participants list
      const partsCount = getRandom(2, 4);
      const participants = [{ name: 'Om Patel', isUser: true }];
      const usedNames = new Set(['Om Patel']);
      while (participants.length < partsCount) {
        const name = namesPool[getRandom(0, namesPool.length - 1)];
        if (!usedNames.has(name)) {
          participants.push({ name, isUser: false });
          usedNames.add(name);
        }
      }

      callSessions.push({
        _id: `cs_${i}`,
        user_id: "u2",
        status: "ended",
        client,
        description,
        started_at: started.toISOString(),
        ended_at: ended.toISOString(),
        total_duration_seconds: duration,
        language: ["en"],
        auto_gen_ai_response: Math.random() > 0.5,
        save_transcript: true,
        transcript: null,
        transcript_final: false,
        ai_interactions: getRandom(1, 8),
        call_framework_id: null,
        participants,
        ended_reason: "user_ended",
        createdAt: started.toISOString(),
        updatedAt: ended.toISOString()
      });
    }

    // Sort by started_at descending
    callSessions.sort((a, b) => new Date(b.started_at) - new Date(a.started_at));

    // Paginate
    const paginatedSessions = callSessions.slice(0, limit);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      callSessions: paginatedSessions,
      pagination: {
        page: 1,
        limit,
        totalCount,
        totalPages,
        hasNextPage: totalPages > 1,
        hasPrevPage: false
      }
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Hintro Mock API Server running at http://localhost:${PORT}`);
});
