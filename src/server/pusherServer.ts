import Pusher from "pusher";
import { env } from "~/env.mjs";

export const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: "eu",
  useTLS: true,
});
