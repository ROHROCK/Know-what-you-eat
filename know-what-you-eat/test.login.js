
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

	test("It contains email input", ()=>{
        const wrapper = shallow(<Login />);
        expect(wrapper.find('#username')).toHaveLength(1);

	});

	test("It contains password input", ()=>{
        const wrapper = shallow(<Login />);
        expect(wrapper.find('#password')).toHaveLength(1);

	});



	test("should have only one button component", ()=>{
		const wrapper = shallow(<Login />);
		expect(wrapper.find('button')).toHaveLength(1);

	});

	test("button should have matching text", ()=>{
		const wrapper = shallow(<Login />);
		expect(wrapper.find('button').text()).toEqual('Submit');

	});


});

