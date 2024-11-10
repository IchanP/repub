/**
 * @jest-environment node
 */
import { POST } from "../src/app/api/upload/route";
import FormData from "form-data";
import { Readable } from "stream";

global.File = class MockFile {
  constructor(chunks, name, options) {
    this.chunks = chunks;
    this.name = name;
    this.type = options.type;
    this.size = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }
};

let formData;
let fileContentStream;

const mockFormDataRequest = (formData) => {
  const req = new Request("http://localhost/api/upload", {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
    },
    body: formData,
  });

  // Mock the `formData()` method to return the provided FormData
  req.formData = async () => formData;
  return req;
};

const expectResponse = async (req, statusCode, responseMessage) => {
  const response = await POST(req);
  expect(response.status).toBe(statusCode);
  if (response.status !== 301) {
    const json = await response.json();
    expect(json.message).toBe(responseMessage);
  }
};

beforeEach(() => {
  formData = new FormData();
  fileContentStream = Readable.from(["content"]);
});

// https://dev.to/dforrunner/unit-test-nextjs-13-app-router-api-routes-with-jest-and-react-testing-library-with-examples-including-prisma-example-367a
// TODO READ ABOVE FOR TESTING
describe("API Route: /api/upload", () => {
  it("Should return 301 when file type is epub and filesize is less than 90mb", async () => {
    formData.append("file", fileContentStream, {
      filename: "valid.epub",
      type: "application/epub+zip",
    });

    const req = mockFormDataRequest(formData);
    expectResponse(req, 301, "File uploaded successfully");
  });

  it("Should return a 400 when upload content is missing", async () => {
    formData = null;
    const req = mockFormDataRequest(formData);
    expectResponse(req, 400, "Missing upload content.");
  });

  it("Should return a 400 when file type is not epub", async () => {
    formData.append("file", fileContentStream, {
      filename: "invalid.pdf",
      type: "application/pdf",
    });

    const req = mockFormDataRequest();
    expectResponse(req, 400, "Invalid file type.");
  });
  /* 
  it("Should return a 413 when file is larger than 90mb", async () => {
    formData.append("file", fileContentStream, {
      filename: "valid.epub",
      type: "application/epub+zip",
      size: 90_000_001,
    });

    const req = createReqObject();
    expectResponse(req, 413, "File is too large. Maximum size is 90mb.");
  }); */
});
