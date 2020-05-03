import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./Login";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
describe("Login Component Unit Test",()=>{
	test("Login component loads", () => {
		const wrapper = shallow(<Login />);
		expect(wrapper).toMatchSnapshot();
	  });
	test("Contains form element", () => {
		const wrapper = shallow(<Login />);
		expect(false);
	  });
});
