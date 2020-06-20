import React from "react";
import Register from "../Register";

describe("Register test", () => {
  test.skip("Component Loads Correctly", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard).toMatchSnapshot();
  });
  test.skip("Button text is Submit", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard.find("button").text()).toBe("Submit");
  });
  test.skip("Register Text is displayed properly", () => {
    const dashboard = shallow(<Register />);
    expect(dashboard.find("h1").text()).toBe("Please Register");
  });
  test.skip("Invalid Credentials should not be registered",()=>{
    const dashboard = shallow(<Register />);
    dashboard.setState({username:"rohithamster123@gmail.com",password:"password",passwordReEntered:"password"});
    const submitButton = dashboard.find("button");
    submitButton.simulate('click');
    expect(dashboard.state('username')).toEqual("rohithamster123@gmail.com")
  })
});
