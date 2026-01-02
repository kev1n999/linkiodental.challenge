import "dotenv/config";
import app from "./server.js";
import { env } from "./config/env.js";
import { connect } from "./config/database.js";

async function bootstrap() {
  await connect(env.mongouri);
  app.listen(env.serverport, () => {
    console.log(`Server listening on http://localhost:${env.serverport}`);
  });
}

bootstrap();
