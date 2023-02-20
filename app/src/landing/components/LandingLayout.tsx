import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import Footer from "../../core/components/Footer";
import Logo from "../../core/components/Logo";
import SettingsDrawer from "../../core/components/SettingsDrawer";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <Paper square>
      <AppBar color="transparent" position="relative">
        <Toolbar>
          <Logo size={24} sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_NAME}
          </Typography>
          <IconButton
            color="default"
            aria-label="settings"
            component="span"
            onClick={handleSettingsToggle}
            size="large">
            <SettingsIcon />
          </IconButton>
          <SettingsDrawer
            onDrawerToggle={handleSettingsToggle}
            open={settingsOpen}
          />
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      <Footer />
    </Paper>
  );
};

export default LandingLayout;
