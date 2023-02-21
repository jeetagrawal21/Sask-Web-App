import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Result from "../../core/components/Result";
import { ReactComponent as NotFoundSvg } from "../assets/404.svg";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin`}
          variant="contained"
        >
          {t("common.backHome") as string }
        </Button>
      }
      image={<NotFoundSvg />}
      maxWidth="sm"
      subTitle={t("common.errors.notFound.subTitle") as string }
      title={t("common.errors.notFound.title") as string }
    />
  );
};

export default NotFound;
