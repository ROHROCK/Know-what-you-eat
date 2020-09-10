import Dashboard from "../Register";
import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import '../../../test/setup-test-framework';

// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// at the time of testing , only one object was there
// User : rohitsa4@gmail.com is being tested here
window.localStorage.setItem("token","3d8cc8bb-0579-412e-9005-0e213af876c0");

describe("Unit tests for Dashboard", () => {

  test.skip("Dashboard redirects to login when no token",()=>{
    window.localStorage.removeItem("token");
    // Test here the logic for routing tests !
    window.localStorage.setItem("token","3d8cc8bb-0579-412e-9005-0e213af876c0");
  })
  test("Dashboard Component Loads Correctly", () => {
    // const history = {push: jest.fn()};
    const comp = document.createElement('div');
    // ReactDOM.render(<Dashboard />,comp);
    ReactDOM.render(<BrowserRouter><Dashboard /></BrowserRouter>,comp);
    // expect(dashboard).toMatchSnapshot({value:expect.any(Date)});
  });
  test.skip("Check if History is loaded when history button is clicked",()=>{

  });
  test.skip("Token removed when sign out button is clicked",()=>{

  });
  test.skip("Displays error when single image is given",()=>{

  });
});
