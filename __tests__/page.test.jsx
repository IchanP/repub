import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/[locale]/page";
import { NextIntlClientProvider } from "next-intl";

// Mock ReaderWrapper to prevent errors during testing
jest.mock("@/components/logic/ReaderLogic/ReaderWrapper", () => ({
  __esModule: true /*  */,
  default: () => (
    <div data-testid="mock-reader">Mock ReaderWrapper Component</div>
  ),
}));

const locale = "en";
const messages = {
  HomePage: {
    welcome: "Welcome!",
  },
};

describe("Page", () => {
  it("renders main", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Home />
      </NextIntlClientProvider>,
    );

    const div = screen.getByRole("main");

    expect(div).toBeInTheDocument();
  });
});
