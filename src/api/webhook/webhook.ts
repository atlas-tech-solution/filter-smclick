import { env } from "@/config/env";
import { NewChatMessageEvent } from "@/services/smclick/types";
import { APIError,  } from "encore.dev/api";

const INSTANCE = env.SMCLICK_INSTANCE_ID;
const ALLOWED_DEPARTMENTS = env.SMCLICK_ALLOWED_DEPARTMENTS;

export const WebhookMiddleware = (body: NewChatMessageEvent) => {
  const instanceId = body.infos.chat.instance.id;
  const department = body.infos.chat.department?.id;
  const fromMe = body.infos.message.from_me;
  const attendant = body.infos.chat.attendant;
  const chatId = body.infos.chat.id;
  const isText = body.infos.message.type === "text";

  if (!instanceId || instanceId !== INSTANCE)
    throw APIError.invalidArgument("Unexpected `instance_id`, skipping...");
  if (!!department && !ALLOWED_DEPARTMENTS.includes(department))
    throw APIError.invalidArgument("Unexpected `department_id`, skipping... departament=" + department);
  if (!!attendant?.length)
    throw APIError.invalidArgument("There is an attendant on this chat, skipping... chat=" + chatId);
  if (!isText)
    throw APIError.invalidArgument("Message is not a text, skipping...");
  if (fromMe)
    throw APIError.invalidArgument("Message `from_me`, skipping...");
}

export function withWebhookMiddleware(
  handler: (body: NewChatMessageEvent) => Promise<{ received: true }>
) {
  return async (body: NewChatMessageEvent): Promise<{ received: true }> => {
    WebhookMiddleware(body);
    return handler(body);
  };
}