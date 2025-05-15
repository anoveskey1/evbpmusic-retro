import { createContext } from "react";
import INavigationContextProps from "./INavigationContextProps";

const NavigationContext = createContext<INavigationContextProps | undefined>(
  undefined,
);

export default NavigationContext;
