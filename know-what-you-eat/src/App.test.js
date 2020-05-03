import React from "react";
import { shallow } from "enzyme";
import App from "./components/App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
describe("App Component Unit Test",()=>{
	test("App component loads", () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	  });
});
