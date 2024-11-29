module.exports = {
  apps: [
    {
      name: "my-api",
      script: "./src/server.ts",
      interpreter: "ts-node",
      watch: true
    }
  ]
};
