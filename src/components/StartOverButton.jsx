import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FormContext } from "../FormContext";

export default function StartOverButton() {
  const navigate = useNavigate();
  const { updateData } = useContext(FormContext);
  const { t } = useTranslation();

  const handleStartOver = () => {
    updateData({});
    navigate("/");
  };

  return (
    <button className="start-over" onClick={handleStartOver}>
      {t("start_over")}
    </button>
  );
}
