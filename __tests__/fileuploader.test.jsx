import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import FileUpload from "@/components/logic/FileUpload";
import { File } from "buffer";
import { mock } from "node:test";
// Helper function to render the component and upload a file
const uploadMockFile = (mockFile) => {
  const uploadButton = screen.getByTestId("file-upload");
  fireEvent.change(uploadButton, { target: { files: [mockFile] } });
};

afterEach(() => {
  cleanup();
});
beforeEach(() => {
  render(<FileUpload />);
});

describe("FileUpload Component", () => {
  it("Renders error message on wrong file type", () => {
    const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
    uploadMockFile(mockFile);

    const errorMessage = screen.getByText(
      "Only files in ePub format are allowed.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("Removes the error message after valid ePub is selected", () => {
    const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
    uploadMockFile(mockFile);
    const errorMessage = screen.getByText(
      "Only files in ePub format are allowed.",
    );
    expect(errorMessage).toBeInTheDocument();

    const epubMockFile = new File(["content"], "valid.epub", {
      type: "application/epub+zip",
    });

    uploadMockFile(epubMockFile);

    expect(errorMessage).not.toBeInTheDocument();
  });

  it("Should display an error message if the file size is over 90mb", () => {
    const mockFile = new File(["content"], "valid.epub", {
      type: "application/epub+zip",
    });
    Object.defineProperty(mockFile, "size", { value: 90_000_001 });

    uploadMockFile(mockFile);

    const errorMesage = screen.getByText("Only files under 90mb are allowed.");

    expect(errorMesage).toBeInTheDocument();
  });
});
