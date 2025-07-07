import { useTranslation } from "react-i18next";
import StartOverButton from "../components/StartOverButton";

export default function ThankYou() {
  const { t } = useTranslation();

  return (
    <div className="main-container thank-you">
      <h2>{t("thank_you")}</h2>
      <p>{t("we_ll_be_in_touch")}</p>

      <StartOverButton />
    </div>
  );
}
