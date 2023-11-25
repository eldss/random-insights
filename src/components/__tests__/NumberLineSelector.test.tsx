import { render, screen } from "@testing-library/react-native";
import {
  NumberLineSelector,
  NumberLineSelectorProps,
} from "../NumberLineSelector";

describe("<NumberLineSelector />", () => {
  const props: NumberLineSelectorProps = {
    selectedNumber: 20,
    setSelectedNumber: jest.fn,
    maxNumberSelectable: 60,
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Component renders", () => {
    render(<NumberLineSelector {...props} />);
    const component = screen.getByTestId("number-line-selector");
    expect(component).toBeVisible();
  });
});
