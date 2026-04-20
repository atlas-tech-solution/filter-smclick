import { APIError } from "encore.dev/api";
import { z } from "zod";

const envSchema = z.object({
  SMCLICK_API_URL: z.url(),
  SMCLICK_API_KEY: z.string().min(1),
  SMCLICK_INSTANCES_ID: z.string().array(),
  SMCLICK_ALLOWED_DEPARTMENTS: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(8080),
  URL_REQUEST: z.url().min(1)
});

type Env = z.infer<typeof envSchema>;

function parseEnv() {
  const raw: Env = {
    SMCLICK_API_URL: process.env.SMCLICK_API_URL!,
    SMCLICK_API_KEY: process.env.SMCLICK_API_KEY!,
    SMCLICK_INSTANCES_ID: process.env.SMCLICK_INSTANCES_ID!.split(','),
    SMCLICK_ALLOWED_DEPARTMENTS: process.env.SMCLICK_ALLOWED_DEPARTMENTS!,
    URL_REQUEST: process.env.URL_REQUEST!,
    PORT: process.env.PORT! as any,
  };
  const envConfig = envSchema.safeParse(raw);
  if (envConfig.success) { return envConfig.data }
  else {
    throw APIError.internal(envConfig.error.message);
  }
}

export const env = parseEnv();
