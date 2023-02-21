// import Grid from "@mui/material/Grid";
// import React from "react";
// import AdminAppBar from "../components/AdminAppBar";
// import AdminToolbar from "../components/AdminToolbar";
// import RecentNotifications from "../components/RecentNotifications";
// import AchievementWidget from "../widgets/AchievementWidget";
// import FollowersWidget from "../widgets/FollowersWidget";
// import MeetingWidgets from "../widgets/MeetingWidgets";
// import PersonalTargetsWidget from "../widgets/PersonalTargetsWidget";
// import ViewsWidget from "../widgets/ViewsWidget";
// import WelcomeWidget from "../widgets/WelcomeWidget";

// const Home = () => {
//   return (
//     <React.Fragment>
//       <AdminAppBar>
//         <AdminToolbar>
//           <RecentNotifications />
//         </AdminToolbar>
//       </AdminAppBar>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6} lg={4}>
//           <WelcomeWidget />
//           <AchievementWidget />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <FollowersWidget />
//           <ViewsWidget />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <PersonalTargetsWidget />
//           <MeetingWidgets />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// };

// export default Home;

import Grid from "@mui/material/Grid";
import React from "react";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import RecentNotifications from "../components/RecentNotifications";
import AchievementWidget from "../widgets/AchievementWidget";
import FollowersWidget from "../widgets/FollowersWidget";
// import MeetingWidgets from "../widgets/MeetingWidgets";
// import PersonalTargetsWidget from "../widgets/PersonalTargetsWidget";
import ViewsWidget from "../widgets/ViewsWidget";
import WelcomeWidget from "../widgets/WelcomeWidget";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Trans, useTranslation } from "react-i18next";
import Empty from "../../core/components/Empty";
import { useDateLocale } from "../../core/hooks/useDateLocale";
import { logKeys } from "../../admin/config/activity";
import { useActivityLogs } from "../../admin/hooks/useActivityLogs";

const Home = () => {
  const locale = useDateLocale();
  const { t } = useTranslation();

  const { data } = useActivityLogs();

  if (!data || data.length === 0) {
    return <Empty title={t("profile.activity.empty") as string } />;
  }
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <RecentNotifications />
        </AdminToolbar>
      </AdminAppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <WelcomeWidget />
          <AchievementWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FollowersWidget />
          <ViewsWidget />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <PersonalTargetsWidget />
          <MeetingWidgets />
        </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h4" component="h2" align="center">
            {/* {t("My Story Timeline")} */}
            {`${t("My Story Timeline")}`}
          </Typography>
          <Box sx={{ "& .MuiTimelineItem-root:before": { content: "none" } }}>
            <Timeline>
              {data.map((log) => (
                <TimelineItem key={log.id}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector color="primary" />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Card>
                      <CardContent>
                        <Trans
                          components={{ bold: <strong /> }}
                          defaults="<bold>You</bold> modify resource <bold>{{ resouce }}</bold>"
                          i18nKey={logKeys[log.code]}
                          values={log.params}
                        />
                        <Typography component="div" marginTop={1} variant="caption">
                          {formatDistanceToNow(new Date(log.createdAt), {
                            addSuffix: true,
                            locale,
                          })}
                        </Typography>
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
