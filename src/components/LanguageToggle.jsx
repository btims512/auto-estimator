import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEs = i18n.language === "es";
  const toggle = () => i18n.changeLanguage(isEs ? "en" : "es");

  return (
    <div className="lang-switch-container">
      <div className="lang-cell">
        <span className="lang-label">EN</span>
      </div>

      <div className="lang-cell toggle-cell">
        <label className="toggle-switch">
          <input type="checkbox" checked={isEs} onChange={toggle} />
          <span className="slider" />
        </label>
      </div>

      <div className="lang-cell">
        <span className="lang-label">ES</span>
      </div>
    </div>
  );
}
