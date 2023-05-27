import React from "react";
import { Box } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return <Box className="h-[calc(100vh - 80px)] p-4">{children}</Box>;
};

export default MainLayout;
