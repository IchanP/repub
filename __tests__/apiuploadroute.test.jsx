/**
 * @jest-environment node
 */
import { POST } from "../src/app/api/upload/route";
let formData;

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
  expect(response.status).toBe(
    statusCode,
    `Expected status code ${statusCode} but got ${response.status}`,
  );

  if (response.status !== 301) {
    const json = await response.json();
    expect(json.message).toBe(
      responseMessage,
      `Expected message "${responseMessage}" but got "${json.message}"`,
    );
  }
  return response;
};

beforeEach(() => {
  formData = new FormData();
});

// https://dev.to/dforrunner/unit-test-nextjs-13-app-router-api-routes-with-jest-and-react-testing-library-with-examples-including-prisma-example-367a
// TODO READ ABOVE FOR TESTING
describe("API Route: /api/upload", () => {
  it("Should return 301 when file type is epub and filesize is less than 90mb", async () => {
    const mockFile = createFile("valid.epub", "application/epub+zip");
    formData.append("file", mockFile);
    const req = mockFormDataRequest(formData);
    expectResponse(req, 301, "File uploaded successfully");
  });

  it("Should return a 400 when upload content is missing", async () => {
    formData = null;
    const req = mockFormDataRequest(formData);
    expectResponse(req, 400, "Missing upload content.");
  });

  it("Should return a 400 when file type is not epub", async () => {
    const mockFile = createFile("invalid.pdf", "application/pdf");
    formData.append("file", mockFile);

    const req = mockFormDataRequest(formData);
    expectResponse(req, 400, "Invalid file type.");
  });

  it("Should return a 400 when file is larger than 90mb", async () => {
    const mockFile = createFile("invalid.epub", "application/epub+zip");
    Object.defineProperty(mockFile, "size", { value: 90_000_001 });
    formData.append("file", mockFile);

    const req = mockFormDataRequest(formData);
    expectResponse(req, 400, "File is too large. Maximum size is 90mb.");
  });
});

function createFile(fileName, type) {
  return new File(["dummy content"], fileName, {
    type: type,
  });
}
