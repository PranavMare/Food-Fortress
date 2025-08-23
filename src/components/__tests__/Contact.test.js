import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Contact renders", () => {
  render(<Contact />);

  // Option A: headline (preferred: role-based)
  expect(screen.getByRole("heading", { name: /contact food fortress/i })).toBeInTheDocument();

  // Option B: the sentence with “question” (substring via regex)
  expect(screen.getByText(/have a question/i)).toBeInTheDocument();

  // Option C: form fields (good accessibility checks)
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
});
