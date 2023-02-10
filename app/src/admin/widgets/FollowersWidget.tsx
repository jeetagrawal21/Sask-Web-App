import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Poll from "@material-ui/icons/Poll";
import Article from "@material-ui/icons/Article";
import CalendarToday from "@material-ui/icons/CalendarToday";
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
                {t(social.name)}
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
