import React from "react";
import History from "./History";
import Navbar from "react-bootstrap/Navbar";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const component = renderer.create(<History />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
