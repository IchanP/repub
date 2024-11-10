import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/logger";

export async function POST(request: NextRequest) {
  try {
    logger.info("POST api/upload", request);
    const epubStream = await request.formData();
    console.log(epubStream);
    if (!epubStream) throw new Error("Invalid argument");

    validateFile(epubStream);

    return NextResponse.redirect("http://localhost.com", 301);
  } catch (err: unknown) {
    // TODO make this handle status code and messages better.
    logger.error("ERROR api/upload", err);
    return NextResponse.json(
      { message: "Missing upload content." },
      { status: 400 },
    );
  }
}

// TODO make validations for size and filetype
function validateFile(file: FormData) {}
