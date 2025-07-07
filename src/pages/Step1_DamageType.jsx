import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaCarCrash,
  FaTools,
  FaPaintBrush,
  FaLightbulb,
  FaWindowClose,
  FaCarSide,
  FaEllipsisH,
} from "react-icons/fa";
import StartOverButton from "../components/StartOverButton";

const damageOptions = [
  { key: "bumper_damage", icon: <FaCarCrash /> },
  { key: "door_dings", icon: <FaTools /> },
  { key: "scratches", icon: <FaPaintBrush /> },
  { key: "cracked_headlight", icon: <FaLightbulb /> },
  { key: "windshield_crack", icon: <FaWindowClose /> },
  { key: "dent", icon: <FaCarSide /> },
  { key: "other", icon: <FaEllipsisH /> },
];

export default function Step1_DamageType() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelect = (key) => {
    // TODO: save key in context
    navigate("/car-info");
  };

  return (
    <div className="main-container">
      {/* <StartOverButton /> */}
      <h2>{t("damage_title")}</h2>
      <div className="damage-grid">
        {damageOptions.map(({ key, icon }) => (
          <button
            key={key}
            className="damage-button"
            onClick={() => handleSelect(key)}
          >
            <div className="icon-large">{icon}</div>
            {t(key)}
          </button>
        ))}
      </div>
    </div>
  );
}
