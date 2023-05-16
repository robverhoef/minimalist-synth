import Button from "../components/Button/index"

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    large: {
      description: "A larger button",
      control: "boolean",
    },
    small: {
      description: "A smaller button",
      control: "boolean",
    },
    disabled: {
      description: "Disables this component",
      control: "boolean",
    },
    primary: {
      description: "Primary variant",
      control: "boolean",
    },
    secondary: {
      description: "Secondary variant, will override primary variant",
      control: "boolean",
    },
    outline: {
      description: "Bordered variation",
      control: "boolean",
    },
    radius: {
      description: "Border radius",
      control: "select",
      options: ["none", "small", "medium", "large", "round"],
    },
  },
  args: {
    disabled: false,
    primary: true,
    secondary: false,
    outline: false,
    radius: "small",
    children: "Default button",
    small: false,
    large: false
  },
}
export const Default = {}