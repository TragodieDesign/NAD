// ecosystem.config.js

module.exports = {
    apps: [
      {
        name: 'frontend-nad',
        script: 'npm',
        args: 'start',
        watch: '.',
      },
    ],
  };
  