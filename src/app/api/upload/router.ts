import { type NextRequest } from "next/server";
import { logger } from "@/logger";

export function POST(request: NextRequest) {
  logger.info("POST api/upload ", request);
  // TODO implement
}
