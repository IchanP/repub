import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FileUpload from "@/components/logic/FileUpload";

describe("File Uploader", () => {
  it("Renders error message on wrong file type", () => {
    render(<FileUpload />);
    // eslint-disable-next-line no-undef
    const mockFile = new File(["invalid content"], "test.txt", {
      type: "text/plain",
    });

    const uploadButton = screen.getByTestId("file-upload");
    fireEvent.change(uploadButton, { target: { files: [mockFile] } });

    const errorMessage = screen.getByText(
      "Only files in ePub format are allowed.",
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
