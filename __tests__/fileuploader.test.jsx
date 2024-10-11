import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import FileUpload from "@/components/logic/FileUpload";

// Helper function to render the component and upload a file
const uploadMockFile = (fileName, fileType) => {
  // eslint-disable-next-line no-undef
  const mockFile = new File(["content"], fileName, { type: fileType });

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
    uploadMockFile("test.txt", "text/plain");

    const errorMessage = screen.getByText(
      "Only files in ePub format are allowed.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("Removes the error message after valid ePub is selected", () => {
    uploadMockFile("test.txt", "text/plain");
    const errorMessage = screen.getByText(
      "Only files in ePub format are allowed.",
    );
    expect(errorMessage).toBeInTheDocument();

    uploadMockFile("valid.epub", "application/epub+zip");

    expect(errorMessage).not.toBeInTheDocument();
  });
});
