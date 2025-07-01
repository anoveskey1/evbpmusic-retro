import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationContext from "./NavigationContext";

const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const location = useLocation();

  // Predefined list of routes in alphabetical order
  const routes = ["/bio", "/contact", "/faq", "/links", "/music", "/news"];

  useEffect(() => {
    setHistory((prevHistory) => {
      if (prevHistory[prevHistory.length - 1] !== location.pathname) {
        return [...prevHistory, location.pathname];
      }

      return prevHistory;
    });
  }, [location]);

  const goBack = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      const previousPage = updatedHistory[updatedHistory.length - 1];
      setHistory(updatedHistory);
      return previousPage;
    }

    return null;
  };

  const goForward = () => {
    const currentPath = location.pathname;
    const currentIndex = routes.indexOf(currentPath);

    if (currentIndex !== -1 && currentIndex < routes.length - 1) {
      return routes[currentIndex + 1];
    }

    if (currentPath === "/news") {
      return routes[0];
    }

    return null;
  };

  const updateHistory = (newPath: string) => {
    setHistory((prevHistory) => [...prevHistory, newPath]);
  };

  return (
    <NavigationContext.Provider
      value={{ history, goBack, goForward, updateHistory }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
