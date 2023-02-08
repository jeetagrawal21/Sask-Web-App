import Grid from "@material-ui/core/Grid";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";

/* These are the different widgets you see on the screen - Alex */
import ActivityWidget from "../widgets/ActivityWidget";
// import BudgetWidget from "../widgets/BudgetWidget";
// import CircleProgressWidget from "../widgets/CircleProgressWidget";
import OverviewWidget from "../widgets/OverviewWidget";
// import ProgressWidget from "../widgets/ProgressWidget";
// import SalesByAgeWidget from "../widgets/SalesByAgeWidget";
// import SalesByCategoryWidget from "../widgets/SalesByCategoryWidget";
// import SalesHistoryWidget from "../widgets/SalesHistoryWidget";
import TeamProgressWidget from "../widgets/TeamProgressWidget";
// import UsersWidget from "../widgets/UsersWidget";

const overviewItems = [
  /* This is where I added responses for different questions from the survey */
  {
    // unit: "dashboard.overview.visits",
    // unit: "dashboard.overview.test",

    /* Not sure if this is the correct way to do this. Cant find the
    visits variable in another file to change so I am just changing manually,
    this applies for all 4 overview items - Alex */
    unit: "Headache severity past 30 days",
    value: "7",
  },
  {
    unit: "Fever severity past 30 days",
    value: "7",
  },
  {
    // unit: "dashboard.overview.orders",
    unit: "Hair loss severity past 30 days",
    value: "6",
  },
  {
    // unit: "dashboard.overview.users",
    unit: "Sleep apnea severity past 30 days",
    value: "6",
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={t("dashboard.title")} />
      </AdminAppBar>
      <Grid container spacing={2}>
        {overviewItems.map((item, index) => (
          <Grid key={index} item xs={6} md={3}>
            <OverviewWidget description={t(item.unit)} title={item.value} />
          </Grid>
        ))}
        {/* <Grid item xs={12} md={8}> */}
        <Grid item xs={12} md={12}>
          <ActivityWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <BudgetWidget /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Commented out the sales history widget - Alex */}
          {/* <SalesHistoryWidget value={567} /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Commented out the ProgressWidgets all 3 - Alex */}
          {/* <ProgressWidget
            avatar={<SupervisorAccountIcon />}
            mb={2}
            title={t("dashboard.visitProgress.title")}
            value={75}
          />
          <ProgressWidget
            avatar={<ShoppingBasketIcon />}
            mb={2}
            title={t("dashboard.orderProgress.title")}
            value={50}
          />
          <ProgressWidget
            avatar={<AttachMoneyIcon />}
            title={t("dashboard.salesProgress.title")}
            value={25}
          /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Commented out the progress widget - Alex */}
          {/* <CircleProgressWidget
            height={204}
            title={t("dashboard.progress.title")}
            value={75}
          /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Commented out the UsersWidget - Alex */}
          {/* <UsersWidget /> */}
        </Grid>

        {/* md used to b 8 for team progress widget - Alex */}
        <Grid item xs={12} md={12}>
          <TeamProgressWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Commented out the SalesByCategory widget - Alex */}
          {/* <SalesByCategoryWidget /> */}
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Commented out the SalesByAgeWidget - Alex */}
          {/* <SalesByAgeWidget /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
