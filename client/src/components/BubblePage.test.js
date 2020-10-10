import React from "react";
import { render, screen, wait } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { axiosWithAuth as mockAxiosWithAuth } from '../api/axiosWithAuth'

const mockData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  }
]

const colorFixture = [
  {
    color: 'color',
    id: 1
  }
]

jest.mock("../api/axiosWithAuth");
mockAxiosWithAuth.mockResolvedValue(mockData)

test("Fetches data and renders the bubbles", async () => {

  mockAxiosWithAuth.mockResolvedValueOnce({ data: colorFixture })

  render(<BubblePage />)

  const { getByText, queryAllByTestId } = render(<BubblePage />);

  await wait()

  expect(queryAllById('color')).toHaveLength(1);


});
