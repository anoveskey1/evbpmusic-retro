import React from "react";
import { withRouter } from "./decorators";
import MenuButton, { MenuButtonProps } from "../components/MenuButton";

export default {
  argTypes: {
    ariaLabel: { control: "text" },
    isLink: { control: "boolean" },
    text: { control: "text" },
    to: {
      options: ["/", "/bio", "/music", "/links"],
      control: {
        type: "select",
      },
    },
  },
  component: MenuButton,
  decorators: [withRouter],
  title: "Button",
};

const Template = (args: MenuButtonProps & { isLink: boolean }) => {
  const { isLink, ...rest } = args;

  return (
    <MenuButton
      {...rest}
      onClick={isLink ? undefined : () => console.log("Button Clicked!")}
      to={isLink ? args.to : undefined}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ariaLabel: "menu button",
  isLink: false,
  text: "Click me",
  to: "/",
};
