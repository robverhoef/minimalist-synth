import Knob from "../components/Knob/index"

export default {
  title: "Components/Knob",
  component: Knob,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      description: "disable component",
      control: "boolean",
    },
    minValue: {
      description: "minimum value, default: 1",
      control: {
        type: "number",
        min: 0,
        max: 99,
        step: 1,
      },
    },
    maxValue: {
      control: {
        description: "maximum value, default: 10",
        type: "number",
        min: 2,
        max: 100,
        step: 1,
      },
    },
    value: {
      control: {
        type: "number",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    step: {
      description: "step size, default: 1",
      control: {
        type: "number",
        min: 0.0001,
        max: 2,
      },
    },
    precision: {
      description: "number of decimals",
      control: {
        type: "number",
        min: 0,
        max: 3,
      },
    },
  },
  args: {
    disabled: false,
    minValue: 0,
    maxValue: 100,
    value: 50,
    step: 1,
    precision: 2
  },
}
export const Default = {}