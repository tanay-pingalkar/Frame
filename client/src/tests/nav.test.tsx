import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { cleanup, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Nav from "../components/nav";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("testing frame component", () => {
  let store: MockStoreEnhanced<unknown>;
  beforeEach(() => {
    store = mockStore({
      userInfo: {
        name: "a name",
      },
      isAuth: true,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("should render Nav properly", async () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "replace");
    render(
      <Provider store={store}>
        <Router history={history}>
          <Nav></Nav>
        </Router>
        ,
      </Provider>
    );
    const btn = screen.getAllByText("Post frame");
    const toggler = screen.getByTestId("toggler");
    expect(toggler.childElementCount).toBe(8);
    expect(screen.getAllByText("Home").length).toBe(1);
    expect(screen.getAllByText("Notification").length).toBe(1);
    expect(screen.getAllByText("a name").length).toBe(1);
    expect(screen.getAllByText("Search").length).toBe(1);
    expect(btn.length).toBe(1);
    act(() => {
      screen.getByTestId("button").click();
    });

    expect(pushSpy).toBeCalledWith("/app/upload");
    console.log();
  });
  it("should render Nav when logging is false", () => {
    store = mockStore({
      userInfo: {},
      isAuth: "loggin",
    });
    render(
      <Provider store={store}>
        <Nav></Nav>
      </Provider>
    );
    expect(screen.getAllByText("loggin").length).toBe(1);
  });
  it("should match snapshot", () => {
    const snapshot = renderer.create(
      <Provider store={store}>
        <Nav></Nav>
      </Provider>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
