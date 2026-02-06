// The Facade Design Pattern provides a simplified interface to a complex subsystem.

// This pattern hides the complexities of the system and provides an interface to the client
// that can access the system in a much easier way

// It is particularly useful when dealing with complex libraries or frameworks
// where you only need to expose a subset of functionality to the client

// This helps in reducing the learning curve and increasing the usability of the system.

// Consider a simple example where we have a home theatre system with various components like DVD Player, Projector, Sound System, and Lights.
// The Facade will provide a simple interface to control the entire home theatre.

class DVDPlayer {
  on() {
    console.log("DVD Player is on");
  }
  play(movie) {
    console.log(`Playing ${movie}`);
  }
}

class Projector {
  on() {
    console.log("Projector is on");
  }
  setInput(input) {
    console.log(`Projector input set to ${input}`);
  }
}

class SoundSystem {
  on() {
    console.log("Sound System is on");
  }
  setVolume(level) {
    console.log(`Volume set to ${level}`);
  }
}

class Lights {
  dim(level) {
    console.log(`Lights dimmed to ${level}`);
  }
}

class HomeTheaterFacade {
  constructor(dvdPlayer, projector, soundSystem, lights) {
    this.dvdPlayer = dvdPlayer;
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.lights = lights;
  }

  watchMovie(movie) {
    console.log("Get ready to watch a movie...");
    this.dvdPlayer.on();
    this.projector.on();
    this.projector.setInput("DVD");
    this.soundSystem.on();
    this.soundSystem.setVolume(10);
    this.lights.dim(30);
    this.dvdPlayer.play(movie);
  }
}

// Usage
const dvdPlayer = new DVDPlayer();
const projector = new Projector();
const soundSystem = new SoundSystem();
const lights = new Lights();
const homeTheater = new HomeTheaterFacade(
  dvdPlayer,
  projector,
  soundSystem,
  lights,
);

homeTheater.watchMovie("Inception");

// Get ready to watch a movie...
// DVD Player is on
// Projector is on
// Projector input set to DVD
// Sound System is on
// Volume set to 10
// Lights dimmed to 30
// Playing Inception

// You have a frontend API layer that internally uses:
// fetch
// auth token manager
// cache
// retry logic
// error handler
// logger

// But your UI should just call:
// api.getUser(id)
// api.updateProfile(data)
// api.logout()

// Without Facade (Messy UI)
// Your React/UI code would look like:
// const token = auth.getToken();
// const cached = cache.get("/user/123");
// if (!cached) {
//   const res = await fetch(url, { headers: { Authorization: token }});
//   if (res.status === 401) logout();
//   const data = await res.json();
//   cache.set("/user/123", data);
// }

class AuthService {
  getToken() {
    return "TOKEN_ABC";
  }

  logout() {
    console.log("🔐 Logging out user");
  }
}

class CacheService {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }
}

class Logger {
  log(msg) {
    console.log("📝", msg);
  }

  error(msg) {
    console.error("❌", msg);
  }
}

class HttpClient {
  async get(url, options = {}) {
    console.log("🌐 Fetching:", url);

    // fake delay
    await new Promise((r) => setTimeout(r, 200));

    // fake 401
    if (Math.random() < 0.2) {
      return { status: 401 };
    }

    return {
      status: 200,
      json: async () => ({ id: 123, name: "Shubham" }),
    };
  }
}

class ApiFacade {
  constructor() {
    this.auth = new AuthService();
    this.cache = new CacheService();
    this.logger = new Logger();
    this.http = new HttpClient();
  }

  async getUser(userId) {
    const cacheKey = `user_${userId}`;

    // 1️⃣ Try cache
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.logger.log("Cache hit for user");
      return cached;
    }

    // 2️⃣ Prepare request
    const token = this.auth.getToken();

    const response = await this.http.get(`/api/users/${userId}`, {
      headers: {
        Authorization: token,
      },
    });

    // 3️⃣ Handle auth error
    if (response.status === 401) {
      this.logger.error("Unauthorized");
      this.auth.logout();
      throw new Error("Session expired");
    }

    // 4️⃣ Parse
    const data = await response.json();

    // 5️⃣ Cache
    this.cache.set(cacheKey, data);

    // 6️⃣ Log
    this.logger.log("User loaded");

    return data;
  }

  async updateProfile(profile) {
    this.logger.log("Updating profile...");
    // internally would:
    // - attach token
    // - handle errors
    // - invalidate cache
    console.log("✅ Profile updated", profile);
  }

  async logout() {
    this.cache = new CacheService(); // clear cache
    this.auth.logout();
  }
}

const api = new ApiFacade();

// UI code:
(async () => {
  try {
    const user = await api.getUser(123);
    console.log("User:", user);

    const user2 = await api.getUser(123); // cache hit
    console.log("User again:", user2);

    await api.updateProfile({ name: "New Name" });
    await api.logout();
  } catch (e) {
    console.error("UI error:", e.message);
  }
})();

// 🌐 Fetching: /api/users/123
// 📝 User loaded
// User: { id: 123, name: 'Shubham' }
// 📝 Cache hit for user
// User again: { id: 123, name: 'Shubham' }
// 📝 Updating profile...
// ✅ Profile updated { name: 'New Name' }
// 🔐 Logging out user
