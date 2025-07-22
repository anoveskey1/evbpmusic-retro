const requiredEnvVars = [
  "VITE_EVBP_MUSIC_BASE_URL",
  "VITE_EVBP_MUSIC_API_BASE_URL",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

console.log("All required environment variables are set.");
