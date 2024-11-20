import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/logger";
import util from "util";
// TODO add documentation for this route that it expects the formdata to have a key named file.
export async function POST(request: NextRequest) {
  try {
    logger.info("POST api/upload", request);
    const epubStream = await request.formData();
    if (!epubStream) throw new Error("Missing upload content.");
    const epubFile = epubStream.get("file");
    validateFile(epubFile);

    return NextResponse.redirect("http://localhost.com", 301);
  } catch (err: unknown) {
    // TODO make this handle status code and messages better.
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
function validateFile(file: FormDataEntryValue) {
  if (file.type !== "application/epub+zip") {
    throw new Error("Invalid file type.");
  }
}
