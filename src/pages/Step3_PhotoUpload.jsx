import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormContext } from "../FormContext";

export default function Step3_PhotoUpload() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, updateData } = useContext(FormContext);
  const [photos, setPhotos] = useState(data.photos || {});

  const openWidget = (field) => {
    const selector = `#upload_${field}`;
    document.querySelector(selector).innerHTML = "";

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "YOUR_CLOUD_NAME",
        uploadPreset: "YOUR_UNSIGNED_PRESET",
        inline: true,
        container: selector,
      },
      (err, result) => {
        if (!err && result.event === "success") {
          const url = result.info.secure_url;
          const updated = { ...photos, [field]: url };
          setPhotos(updated);
          updateData({ photos: updated });
        }
      }
    );
    widget.open();
  };

  const fields = ["front", "back", "left", "right", "closeup"];

  return (
    <div className="main-container">
      <h2>{t("upload_title")}</h2>
      <p>{t("upload_instruction")}</p>

      <div className="photo-grid">
        {fields.map((field) => (
          <div key={field}>
            <div id={`upload_${field}`} className="photo-widget-container" />

            <button className="photo-button" onClick={() => openWidget(field)}>
              {
                photos[field] ? (
                  <img
                    src={photos[field]}
                    alt={field}
                    style={{ maxHeight: "80px" }}
                  />
                ) : (
                  t(`upload_${field}`)
                ) /* <-- localized label */
              }
            </button>
          </div>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={() => navigate("/customer-info")}
      >
        {t("next")}
      </button>
    </div>
  );
}
