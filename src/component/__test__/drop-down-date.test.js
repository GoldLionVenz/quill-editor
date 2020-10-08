import React from "react"
import ReactDOM from "react-dom";
import DropDownBreak from "../drop-down-date";
import SmmlEditor from "../index"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer"
afterEach(cleanup)

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    ReactDOM.render(<DropDownBreak/>,div)
}) 

it("renders select correctly", ()=>{
    const { getByTestId } = render(<DropDownBreak/>)

    expect(getByTestId("select")).toHaveTextContent("mdy")
})

it("renders select correctly", ()=>{
    const { getByTestId } = render(<DropDownBreak/>)

    expect(getByTestId("select")).toHaveTextContent("ymd")
})

it("matches snapshot", ()=>{
    const tree = renderer.create(<DropDownBreak/>).toJSON();
    expect(tree).toMatchSnapshot()
})