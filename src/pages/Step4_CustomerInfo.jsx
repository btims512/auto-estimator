import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormContext } from "../FormContext";

export default function Step4_CustomerInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, updateData } = useContext(FormContext);

  // Create refs for each digit input
  const phoneRefs = Array.from({ length: 10 }, () => useRef(null));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      contactPreference: data.contactPreference || "",
    },
  });

  // Split phone number string to array of digits
  const phone = watch("phone") || "";
  const phoneArr = Array.from({ length: 10 }, (_, i) => phone[i] || "");

  // Handler for each phone box input
  const handlePhoneChange = (idx, e) => {
    let val = e.target.value.replace(/[^0-9]/g, "").slice(-1); // Only one digit
    let next = phoneArr.slice();
    next[idx] = val;
    setValue("phone", next.join(""));
    // Move to next box if entered
    if (val && idx < 9) phoneRefs[idx + 1].current?.focus();
    // Move to previous box if deleted
    if (!val && idx > 0) phoneRefs[idx - 1].current?.focus();
  };

  const onSubmit = (vals) => {
    updateData(vals);
    navigate("/payment");
  };

  return (
    <div className="main-container">
      <h2>{t("customer_info_title")}</h2>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="form-field">
          <label htmlFor="firstName">{t("first_name")}</label>
          <input
            id="firstName"
            {...register("firstName", { required: t("first_name_required") })}
            placeholder={t("first_name_placeholder")}
          />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="form-field">
          <label htmlFor="lastName">{t("last_name")}</label>
          <input
            id="lastName"
            {...register("lastName", { required: t("last_name_required") })}
            placeholder={t("last_name_placeholder")}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">{t("email_address")}</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: t("email_required"),
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: t("email_invalid"),
              },
            })}
            placeholder={t("email_placeholder")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">{t("phone_number")}</label>
          <div className="phone-input-boxes">
            {phoneArr.map((digit, idx) => (
              <span
                key={idx + "-wrap"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  ref={phoneRefs[idx]}
                  type="tel"
                  maxLength={1}
                  inputMode="numeric"
                  className="phone-box"
                  value={digit}
                  onChange={(e) => handlePhoneChange(idx, e)}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                  aria-label={`Phone digit ${idx + 1}`}
                />
                {(idx === 2 || idx === 5) && (
                  <span className="phone-dash">-</span>
                )}
              </span>
            ))}
          </div>
          {/* Validation message for phone number */}
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        {/* Contact Method */}
        <div className="form-field">
          <label htmlFor="contactPreference">{t("preferred_contact")}</label>
          <select
            id="contactPreference"
            {...register("contactPreference", {
              required: t("contact_required"),
            })}
            defaultValue=""
          >
            <option value="" disabled>
              {t("select_contact_method")}
            </option>
            <option value="email">{t("contact_email")}</option>
            <option value="phone">{t("contact_phone")}</option>
          </select>
          {errors.contactPreference && (
            <p className="error">{errors.contactPreference.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          {t("next")}
        </button>
      </form>
    </div>
  );
}
