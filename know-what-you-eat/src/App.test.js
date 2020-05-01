import React from "react";
import { render, cleanup } from "@testing-library/react";
import Login from "./components/Login";

afterEach(cleanup);

it("should take a snapshot", () => {
  const { asFragment } = render(<Login />);

  expect(asFragment(<Login />)).toMatchSnapshot();
});
