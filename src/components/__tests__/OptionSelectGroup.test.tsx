import { render } from "@testing-library/react-native";
import { OptionSelectGroup } from "../OptionSelectGroup";

describe("<OptionSelectGroup />", () => {
  test("Component renders", () => {
    render(
      <OptionSelectGroup
        options={[{ text: "Test", value: 1 }]}
        selectedIndex={0}
      />,
    );
  });
});
