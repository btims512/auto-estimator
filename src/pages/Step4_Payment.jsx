import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Step4_Payment() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePay = () => {
    // 👉 TEMPORARY BYPASS Stripe until you wire it up:
    navigate("/thank-you");
    // Later, restore this:
    // window.location.href = "https://buy.stripe.com/test_xyz";
  };

  const fee = "$29";

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{t("submit_pay")}</h2>
      <p>{t("flat_fee", { fee })}</p>
      <button
        onClick={handlePay}
        style={{
          padding: "1rem",
          borderRadius: "8px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {t("pay_now")}
      </button>
    </div>
  );
}
