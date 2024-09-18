import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/[locale]/page";
import { NextIntlClientProvider } from "next-intl";

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <NextIntlClientProvider locale="en">
        <Home />
      </NextIntlClientProvider>,
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
