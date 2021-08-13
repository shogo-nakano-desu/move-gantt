import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";

it("renders correctly", () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});
