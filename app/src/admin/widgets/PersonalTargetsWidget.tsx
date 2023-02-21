import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const targets = [
  { name: "Views", nameKey: "admin.home.targets.views", value: 75 },
  { name: "Followers", nameKey: "admin.home.targets.followers", value: 50 },
  { name: "Income", nameKey: "admin.home.targets.income", value: 25 },
];

const PersonalTargetsWidget = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader title={t("admin.home.targets.title") as string} />
      <CardContent>
        <List>
          {targets.map((target) => (
            <ListItem disableGutters key={target.name}>
              <ListItemText>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Typography component="div" variant="h6">
                    {t(target.nameKey) as string}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography component="div" variant="h6">
                    {`${target.value}%`}
                  </Typography>
                </Box>
                <LinearProgress
                  aria-label={`${t(target.nameKey)} progress`}
                  sx={{
                    color:
                      target.value >= 75
                        ? "primary.main"
                        : target.value <= 25
                        ? "error.main"
                        : "warning.main",
                  }}
                  color="inherit"
                  variant="determinate"
                  value={target.value}
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PersonalTargetsWidget;
