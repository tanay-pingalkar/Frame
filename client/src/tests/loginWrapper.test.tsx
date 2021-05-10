import thunk from "redux-thunk";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import LoginWrapper from "../components/loginWrapper";

describe("testing login wrapper component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render login wrapper properly", () => {
    render(
      <LoginWrapper>
        <h1>is a prop</h1>
      </LoginWrapper>
    );
    expect(screen.getAllByText("is a prop").length).toBe(1);
  });

  it("should match snapshoot", () => {
    const wrapper = renderer
      .create(
        <LoginWrapper>
          <h1>is a prop</h1>
        </LoginWrapper>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
