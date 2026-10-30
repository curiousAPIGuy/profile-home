import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

app.listen(config.port, () => {
  logger.info(`Creator Profile server running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
});
