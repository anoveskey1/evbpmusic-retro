import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const withRouter = (Story: any) => (
  <Router>
    <Story />
  </Router>
);
