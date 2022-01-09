import server from './app';
import config from './common/config';

const start = async () => {
  try {
    await server.listen(config.PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();