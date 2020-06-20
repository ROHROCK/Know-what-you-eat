import History from "../History";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// import {jest} from '@jest/globals'
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// // at the time of testing , only one object was there
// // User : rohitsa4@gmail.com is being tested here
global.localStorage = {
  getItem: () => "3d8cc8bb-0579-412e-9005-0e213af876c0",
};
describe("Unit tests for History",()=>{
	test.skip("History Component Loads Correctly", () => {
		const dashboard = shallow(<History />);
		expect(dashboard).toMatchSnapshot();
	});
	test.skip("Component Loaded", () => {
		const dashboard = document.createElement('div') 
		ReactDOM.render(<BrowserRouter><History /></BrowserRouter>,dashboard);
		expect(dashboard).toMatchSnapshot();
	});
});
