import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Poll from "@mui/icons-material/Poll";
import Article from "@mui/icons-material/Article";
import CalendarToday from "@mui/icons-material/CalendarToday";
import React from "react";
import { useTranslation } from "react-i18next";

const socials = [
  {
    bgcolor: "primary.main",
    icon: <CalendarToday sx={{ color: "#fff" }} />,
    name: "Days Since Last Login",
    trend: <ArrowDropUpIcon sx={{ color: "success.main" }} />,
    unitKey: "admin.home.followers.units.likes",
    value: "26",
  },
  {
    bgcolor: "error.main",
    icon: <Article style={{ color: "#fff" }} />,
    name: "Last Survey Recorded",
    trend: <ArrowRightIcon sx={{ color: "action.disabled" }} />,
    unitKey: "admin.home.followers.units.love",
    value: "Nov 6, 2022",
  },
  {
    bgcolor: "warning.main",
    icon: <Poll style={{ color: "#fff" }} />,
    name: "Total Reponses Recorded",
    trend: <ArrowDropDownIcon sx={{ color: "error.main" }} />,
    unitKey: "admin.home.followers.units.smiles",
    value: "15",
  },
];

const FollowersWidget = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {socials.map((social) => (
        <Card key={social.name} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              aria-label={`${social.name} avatar`}
              sx={{ bgcolor: social.bgcolor, mr: 2 }}
            >
              {social.icon}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                {social.value}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {t(social.name) as string}
              </Typography>
            </Box>
            {social.trend}
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default FollowersWidget;
