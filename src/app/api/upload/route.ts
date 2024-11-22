import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/logger";
import { EpubProcessor } from "@/services/EpubProcessor";

const MAX_FILE_SIZE = 90_000_000; // 90mb

// TODO make this internal only

/**
 *  /api/upload route. Expects the request to contain a formData that has a "file" key.
 * Returns a 400 if file key is missing.
 * Returns a 400 if the file is bigger than 90mb.
 * Returns a 400 if the file is not of type application/epub+zip.
 * @param {NextRequest} request - Must contain form data. The form data must have a file key.
 *
 * @returns {NextResponse} - Returns a redirect on succesful upload to the reading page.
 */
export async function POST(request: NextRequest) {
  try {
    logger.info("POST api/upload", request);
    const epubStream = await request.formData();
    if (!epubStream) throw new Error("Missing upload content.");
    const epubFile = epubStream.get("file") as File;
    validateFile(epubFile);

    const processor = new EpubProcessor(epubFile);
    await processor.run();

    return NextResponse.redirect("http://localhost.com", 301); // TODO change this proper path in the future
  } catch (err: unknown) {
    // TODO better error handling
    logger.error("ERROR api/upload", err);
    return err instanceof Error
      ? NextResponse.json({ message: err.message }, { status: 400 })
      : NextResponse.json(
          { messagE: "An unknown error occurd." },
          { status: 400 },
        );
  }
}

/**
 * Validates that the file is of type epub and of less than 90mb.
 * @param {FormData} file - The file to validate.
 * @throws {Error} - Throws an error with status code 400 and an error message describing the issue.
 */
function validateFile(file: File) {
  if (file.type !== "application/epub+zip") {
    throw new Error("Invalid file type.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File is too large. Maximum size is 90mb.");
  }
}

