import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { useRequestAccount } from "../hooks/useRequestAccount";

const RequestAccount = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const { requestAccount, isLoading } = useRequestAccount();

  const formik = useFormik({
    initialValues: {
      participantID: "",
    },
    validationSchema: Yup.object({
      participantID: Yup.string()
        .email(t("common.validations.participantID"))
        .required(t("common.validations.required")),
    }),
    onSubmit: (values) => handleRequestAccount(values.participantID),
  });

  const handleRequestAccount = async (participantID: string) => {
    requestAccount({ participantID })
      .then(() => {
        snackbar.success(t("auth.requestAccount.notifications.success"));
        // direct to register page for now, but user should only be able to register after admin approval
        navigate(`/${process.env.PUBLIC_URL}/register`);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  return (
    <BoxedLayout>
      <Typography component="h1" variant="h5">
        {t("auth.requestAccount.title")}
      </Typography>
      <Typography marginTop={3}>{t("auth.requestAccount.subTitle")}</Typography>
      <Box
        component="form"
        marginTop={3}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="participantID"
          label={t("auth.requestAccount.form.email.label")}
          name="participantID"
          autoComplete="participantID"
          autoFocus
          disabled={isLoading}
          value={formik.values.participantID}
          onChange={formik.handleChange}
          error={formik.touched.participantID && Boolean(formik.errors.participantID)}
          helperText={formik.touched.participantID && formik.errors.participantID}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          loading={isLoading}
          sx={{ mt: 2 }}
        >
          {t("auth.requestAccount.form.action")}
        </LoadingButton>
        <Button
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/login`}
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t("auth.requestAccount.form.back")}
        </Button>
      </Box>
    </BoxedLayout>
  );
};

export default RequestAccount;
