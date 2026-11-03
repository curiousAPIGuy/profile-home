import app from './app';
import { config } from './config';
import { initDb } from './db';
import { logger } from './utils/logger';

async function startServer() {
  try {
    await initDb();
    app.listen(config.port, () => {
      logger.info(
        `Creator Profile server running on http://localhost:${config.port} in ${config.nodeEnv} mode`
      );
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
