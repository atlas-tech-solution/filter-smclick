import { NewChatMessageEvent } from "@/services/smclick/types";
import { api } from "encore.dev/api";
import { withWebhookMiddleware } from "./webhook";
import { env } from "@/config/env";

const URL_REQUEST = env.URL_REQUEST;

export const newChatMessageEvent = api<NewChatMessageEvent, { received: true }>(
  { expose: true, method: "POST", path: "/webhook/smclick" },
  withWebhookMiddleware(async (body) => {
    (await fetch(URL_REQUEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }));
    return { received: true };
  })
);