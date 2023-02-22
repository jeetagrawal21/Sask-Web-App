import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import LandingLayout from "../components/LandingLayout";

const features = [
  { name: "Bootstraped with Create React App" },
  { name: "Components & Themes built on top of Material-UI" },
  { name: "Data Fetching with React Query" },
  { name: "Written in TypeScript" },
  { name: "Real-world examples" },
  { name: "Best Practices" },
  { name: "MIT License" },
];

const Landing = () => {
  const { userInfo } = useAuth();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <main>
        <Box
          sx={{
            py: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h1"
              align="center"
              color="text.primary"
              marginBottom={4}
            >
              {t("landing.title") as string }
            </Typography>
            <Stack
              sx={{ pt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to={`/${process.env.PUBLIC_URL}/request-account`}
                variant="outlined"
              >
                {t("landing.cta.secondary") as string}
              </Button>
              {userInfo ? (
                <Button
                  component={RouterLink}
                  to={`/${process.env.PUBLIC_URL}/admin`}
                  variant="contained"
                >
                  {t("landing.cta.mainAuth", { name: userInfo.firstName }) as string}
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to={`/${process.env.PUBLIC_URL}/login`}
                  variant="contained"
                >
                  {t("landing.cta.main") as string }
                </Button>
              )}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 6 }} maxWidth="md">
          <img
            alt="Application demo"
            src={`img/template-${theme.palette.mode}.png`}
            style={{
              borderRadius: 24,
              borderStyle: "solid",
              borderWidth: 4,
              borderColor: theme.palette.background.default,
              width: "100%",
            }}
          />
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Stack alignItems="center">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {t("landing.features.title") as string }
            </Typography>
            <List sx={{ pt: 3 }}>
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <StarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={feature.name} />
                </ListItem>
              ))}
            </List>
            <Button
              component="a"
              href={process.env.REACT_APP_SOURCE_LINK}
              rel="noopener noreferrer"
              target="_blank"
              sx={{ mt: 3 }}
              variant="outlined"
            >
              {t("landing.features.more") as string }
            </Button>
          </Stack>
        </Container>
      </main>
    </LandingLayout>
  );
};

export default Landing;
