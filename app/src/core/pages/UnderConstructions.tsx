import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Result from "../../core/components/Result";
import { ReactComponent as ConstructionsSvg } from "../assets/constructions.svg";

const UnderConstructions = () => {
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
      image={<ConstructionsSvg />}
      maxWidth="sm"
      subTitle={t("common.errors.underConstructions.subTitle") as string }
      title={t("common.errors.underConstructions.title") as string }
    />
  );
};

export default UnderConstructions;
