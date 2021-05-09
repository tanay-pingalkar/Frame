import Frame from "../components/frame";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { client } from "../graphql/client";
import { frame } from "../utils/types";

const mockStore = configureMockStore([thunk]);

jest.mock("../graphql/client");

describe("testing frame component", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  let data: frame;
  beforeEach(() => {
    store = mockStore({
      userInfo: {
        id: "1",
      },
    });
    data = {
      isLiked: false,
      likeNumber: 100,

      frame: {
        title: "title",
        description: "description",
        frame: "frame",
        user: {
          name: "user",
        },
        id: "5",
      },
    };
    render(
      <Provider store={store}>
        <Frame frame={data} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render frame properly", () => {
    const item = screen.getByTestId("card");
    expect(item).toBeInTheDocument();
    expect(item.className).toBe("card");
  });

  it("should render title properly", () => {
    const item = screen.getByTestId("title");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent("title");
    expect(item.className).toBe("title");
  });
  it("should render name properly", () => {
    const item = screen.getByTestId("name");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent("user");
    expect(item.className).toBe("name");
  });
  it("should render image properly", () => {
    const item = screen.getByTestId("img");
    expect(item).toBeInTheDocument();
    expect(item.className).toBe("img");
  });

  it("should render like properly", async () => {
    const main = screen.getByTestId("like");
    const item = screen.getByTestId("like-num");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent("100".toString());
    const mockRes = { like: { like: true, errorMsg: null } };
    // @ts-ignore
    client.request.mockResolvedValue(mockRes);
    act(() => {
      fireEvent.click(main);
    });

    await waitFor(() => {
      expect(main).toHaveTextContent("101");
    });

    const mocknewRes = { like: { like: false, errorMsg: "disliked" } };

    // @ts-ignore
    client.request.mockResolvedValue(mocknewRes);
    act(() => {
      fireEvent.click(main);
    });

    await waitFor(() => {
      expect(main).toHaveTextContent("100");
    });
  });

  it("should match snapshot", () => {
    const frame = renderer
      .create(
        <Provider store={store}>
          <Frame frame={data} />
        </Provider>
      )
      .toJSON();
    expect(frame).toMatchSnapshot();
  });

  it("should match snapshot when true", () => {
    const trueData = data;
    trueData.isLiked = true;
    const frame = renderer
      .create(
        <Provider store={store}>
          <Frame frame={trueData} />
        </Provider>
      )
      .toJSON();
    expect(frame).toMatchSnapshot();
  });
});
