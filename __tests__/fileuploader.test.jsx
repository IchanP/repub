import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import FileUpload from "@/components/logic/FileUpload";
import { File } from "buffer";
import axios from "axios";

jest.mock("axios");

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

  it("Should render the progress bar during upload", async () => {
    axios.post.mockImplementation((_url, _fileData, options) => {
      const total = 100;
      const uploadProgress = options.onUploadProgress;

      setTimeout(() => uploadProgress({ loaded: 50, total }), 200);
      setTimeout(() => uploadProgress({ loaded: 100, total }), 400);

      return Promise.resolve({ status: 200 });
    });

    const fileInput = screen.getByTestId("file-upload");
    const file = new File(["dummy content"], "book.epub", {
      type: "application/epub+zip",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByTestId("file-submit");
    fireEvent.click(uploadButton);

    // Check progress bar is visible during upload
    await waitFor(() => expect(screen.getByText("50%")).toBeInTheDocument());

    // Wait for upload to finish and progress bar to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("progressbar")).not.toBeInTheDocument();
    });
  });
});
