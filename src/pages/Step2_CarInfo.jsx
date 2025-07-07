import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormContext } from "../FormContext";
import vehicles from "../data/vehicles.json";

export default function Step2_CarInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, updateData } = useContext(FormContext);
  const years = Array.from(
    { length: new Date().getFullYear() - 1989 },
    (_, i) => 1990 + i
  );
  const [models, setModels] = useState([]);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      make: data.make || "",
      model: data.model || "",
      year: data.year || "",
      vin: data.vin || "",
      plate: data.plate || "",
    },
  });

  const selectedMake = watch("make");
  useEffect(() => {
    setModels(
      selectedMake && vehicles[selectedMake] ? vehicles[selectedMake] : []
    );
  }, [selectedMake]);

  const onSubmit = (vals) => {
    updateData(vals);
    navigate("/upload");
  };

  return (
    <div className="main-container">
      <h2>{t("tell_us_about")}</h2>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label>{t("car_make")}</label>
          <select {...register("make")}>
            <option value="">{t("select_make")}</option>
            {Object.keys(vehicles).map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>{t("car_model")}</label>
          <select {...register("model")} disabled={!models.length}>
            <option value="">{models.length ? t("select_model") : "—"}</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>{t("year")}</label>
          <select {...register("year")}>
            <option value="">{t("select_year")}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>{t("vin_label")}</label>
          <input {...register("vin")} placeholder={t("vin_placeholder")} />
        </div>

        <div className="form-field">
          <label>{t("license_label")}</label>
          <input
            {...register("plate")}
            placeholder={t("license_placeholder")}
          />
        </div>

        <button type="submit" className="submit-button">
          {t("next")}
        </button>
      </form>
    </div>
  );
}
