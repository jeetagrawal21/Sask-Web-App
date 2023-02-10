// import Grid from "@material-ui/core/Grid";
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

import Grid from "@material-ui/core/Grid";
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

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
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
    return <Empty title={t("profile.activity.empty")} />;
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
            {t("My Story Timeline")}
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
