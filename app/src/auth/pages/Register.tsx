import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { useRegister } from "../hooks/useRegister";
import { UserInfo } from "../types/userInfo";

const Register = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const { isRegistering, register } = useRegister();

  

  const formik = useFormik({
    initialValues: {
      email: "",
      givenName1: "",
      givenName2: "",
      surname: "",
      question1: "",
      question2: "",
      question3: "",
      answer1: "",
      answer2: "",
      answer3: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required(t("common.validations.required")),
      givenName1: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      givenName2: Yup.string()
        .max(20, t("common.validations.max", { size: 20 })),
        surname: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      question1: Yup.string()
        .max(20, t("common.validations.max", { size: 100 }))
        .required(t("common.validations.required")),
      question2: Yup.string()
        .max(20, t("common.validations.max", { size: 100 }))
        .required(t("common.validations.required")),
      question3: Yup.string()
        .max(20, t("common.validations.max", { size: 100 }))
        .required(t("common.validations.required")),
      answer1: Yup.string()
        .max(20, t("common.validations.max", { size: 40 }))
        .required(t("common.validations.required")),
      answer2: Yup.string()
        .max(20, t("common.validations.max", { size: 40 }))
        .required(t("common.validations.required")),
      answer3: Yup.string()
        .max(20, t("common.validations.max", { size: 40 }))
        .required(t("common.validations.required")),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (values: Partial<UserInfo>) => {
    register(values as UserInfo)
      .then(() => {
        console.log(values)
        snackbar.success(t("auth.register.notifications.success"));
        navigate(`/${process.env.PUBLIC_URL}/login`);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };



  return (
    <Grid maxWidth={"100%"} 
      direction="row"
      display="grid"
      component={Paper} 
      justifyItems="center"
      alignContent="center"
      square
      sx={{ height: "100vh" }}
      >
      <Typography component="h1" variant="h3">
        {t("auth.register.title")}
      </Typography>
      <Box
        component="form"
        marginTop={3}
        noValidate
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: "50%",
          margin: "0"
        }}
      >
        <div 
          style={{
            display: "flex",
            width: "100%"
          }}>
          <TextField
            margin="normal"
            required
            label="Given Name 1"
            fullWidth
            name="firstName"
            autoComplete="given-name"
            disabled={isRegistering}
            value={formik.values.givenName1}
            onChange={formik.handleChange}
            error={formik.touched.givenName1 && Boolean(formik.errors.givenName1)}
            helperText={formik.touched.givenName1 && formik.errors.givenName1}
            style={{
              marginRight:"10px"
            }}
          />
          <TextField
            margin="normal"
            id="givenName2"
            fullWidth
            label="Given Name 2"
            name="givenName2"
            autoComplete="given-name-2"
            disabled={isRegistering}
            value={formik.values.givenName2}
            onChange={formik.handleChange}
            error={formik.touched.givenName2 && Boolean(formik.errors.givenName2)}
            helperText={formik.touched.givenName2 && formik.errors.givenName2}
            style={{
              marginLeft:"10px"
            }}
          />
        </div>
        <div 
          style={{
            display: "flex",
            width: "100%"
          }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Surname"
            name="surname"
            autoComplete="family-name"
            autoFocus
            disabled={isRegistering}
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
            style={{
              marginRight:"10px"
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("auth.register.form.email.label")}
            name="email"
            autoComplete="email"
            disabled={isRegistering}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{
              marginLeft:"10px"
            }}
          />
        </div>
        <Typography component="h1" variant="h5" style={{marginTop:"20px"}}>
          Security Questions
        </Typography>
        <div 
          style={{
            display: "flex",
            width: "100%"
          }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="question1"
            label="Security Question 1"
            name="question1"
            disabled={isRegistering}
            value={formik.values.question1}
            onChange={formik.handleChange}
            error={formik.touched.question1 && Boolean(formik.errors.question1)}
            helperText={formik.touched.question1 && formik.errors.question1}
            style={{
              marginRight:"10px"
            }}
            
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="answer1"
            label="Security Answer 1"
            name="answer1"
            disabled={isRegistering}
            value={formik.values.answer1}
            onChange={formik.handleChange}
            error={formik.touched.answer1 && Boolean(formik.errors.answer1)}
            helperText={formik.touched.answer1 && formik.errors.answer1}
            style={{
              marginLeft:"10px"
            }}
          />
        </div>
        <div 
          style={{
            display: "flex",
            width: "100%"
          }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="question2"
            label="Security Question 2"
            name="question2"
            disabled={isRegistering}
            value={formik.values.question2}
            onChange={formik.handleChange}
            error={formik.touched.question2 && Boolean(formik.errors.question2)}
            helperText={formik.touched.question2 && formik.errors.question2}
            style={{
              marginRight:"10px"
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="answer2"
            label="Security Answer 2"
            name="answer2"
            disabled={isRegistering}
            value={formik.values.answer2}
            onChange={formik.handleChange}
            error={formik.touched.answer2 && Boolean(formik.errors.answer2)}
            helperText={formik.touched.answer2 && formik.errors.answer2}
            style={{
              marginLeft:"10px"
            }}
          />
        </div>
        <div 
          style={{
            display: "flex",
            width: "100%"
          }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="question3"
            label="Security Question 3"
            name="question3"
            disabled={isRegistering}
            value={formik.values.question3}
            onChange={formik.handleChange}
            error={formik.touched.question3 && Boolean(formik.errors.question3)}
            helperText={formik.touched.question3 && formik.errors.question3}
            style={{
              marginRight:"10px"
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="answer3"
            label="Security Answer 3"
            name="answer3"
            disabled={isRegistering}
            value={formik.values.answer3}
            onChange={formik.handleChange}
            error={formik.touched.answer3 && Boolean(formik.errors.answer3)}
            helperText={formik.touched.answer3 && formik.errors.answer3}
            style={{
              marginLeft:"10px"
            }}
          />
        </div>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isRegistering}
          loading={isRegistering}
          sx={{ mt: 2 }}
        >
          {t("auth.register.submit")}
        </LoadingButton>
        <Button
          component={Link}
          to={`/${process.env.PUBLIC_URL}/login`}
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t("auth.register.back")}
        </Button>
      </Box>
      <Typography component="h3" variant="h5" style={{marginTop:"20px"}}>
      **Not connected to backend yet
        </Typography>
      <div>
      </div>
      </Grid>
  );
};

export default Register;
