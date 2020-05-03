import History from "./History";
import React, { Component } from "react";
import { shallow, EnzymeAdapter } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import {jest} from '@jest/globals'

configure({ adapter: new Adapter() });
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// // at the time of testing , only one object was there
// // User : rohitsa4@gmail.com is being tested here
global.localStorage = {
  getItem: () => "3d8cc8bb-0579-412e-9005-0e213af876c0",
};
describe("Unit tests for History",()=>{
	test("History Component Loads Correctly", () => {
		const dashboard = shallow(<History />);
		expect(dashboard).toMatchSnapshot();
	});
	test("History Text displayed", () => {
		const dashboard = shallow(<History />);
		expect(dashboard.find("h1").text()).toBe("HISTORY");
	});
	test("List format is correct", () => {
		const dashboard = shallow(<History />);
		expect(dashboard.find("div.showData").exists);
	});
});
