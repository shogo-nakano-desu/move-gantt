import { ThemeProvider } from "@material-ui/core/styles";
import { render } from "@testing-library/react";
import React from "react";
import Theme from "../../components/Theme";

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
