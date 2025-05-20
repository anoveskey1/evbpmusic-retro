import { createContext } from "react";
import INavigationContext from "../types/INavigationContext";

const NavigationContext = createContext<INavigationContext | undefined>(
  undefined,
);

export default NavigationContext;
