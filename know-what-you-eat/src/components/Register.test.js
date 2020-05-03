import React from "react";
import { shallow, mount } from "enzyme";
import Register from "./Register";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Register test", () => {
  test("Component Loads Correctly", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard).toMatchSnapshot();
  });
  test("Button text is Submit", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard.find("button").text()).toBe("Submit");
  });
  test("Register Text is displayed properly", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard.find("h1").text()).toBe("Please Register");
  });
  test("Invalid Credentials should not be registered",()=>{
    const dashboard = shallow(<Register />);
    dashboard.setState({username:"rohithamster123@gmail.com",password:"password",passwordReEntered:"password"});
    const submitButton = dashboard.find("button");
    submitButton.simulate('click');
    expect(dashboard.state('username')).toEqual("rohithamster123@gmail.com")
  })
});
