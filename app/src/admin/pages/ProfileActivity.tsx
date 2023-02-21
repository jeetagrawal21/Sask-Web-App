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
import { logKeys } from "../config/activity";
import { useActivityLogs } from "../hooks/useActivityLogs";

const ProfileActivity = () => {
  const locale = useDateLocale();
  const { t } = useTranslation();

  const { data } = useActivityLogs();

  if (!data || data.length === 0) {
    return <Empty title={t("profile.activity.empty") as string } />;
  }

  return (
    <Box sx={{ "& .MuiTimelineItem-root:before": { content: "none" } }}>
      <Timeline>
        {data.map((log) => (
          <TimelineItem key={log.id}>
            <TimelineSeparator>
              <TimelineDot color="grey" />
              <TimelineConnector color="grey" />
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
  );
};

export default ProfileActivity;
