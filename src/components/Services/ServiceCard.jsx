import React, { useRef, useEffect, useState } from "react";
import "./ServiceCard.css";

function ServiceCard({ title, services }) {
  const descriptionRefs = useRef([]);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    // Measure the width of each service description
    const widths = descriptionRefs.current.map((ref) => ref.getBoundingClientRect().width);
    // Find the maximum width
    const maxWidth = Math.max(...widths);
    setMaxWidth(maxWidth);
  }, [services]);

  return (
    <div className="service-card">
      <h3 className="service-title">{title}</h3>
      <ul className="service-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <div className="service-content">
              <p
                className="service-description"
                ref={(el) => (descriptionRefs.current[index] = el)}
                style={{ width: `${maxWidth}px` }}
              >
                {service.description}:
              </p>
              <a href={service.link} className="book-button">
                ${service.cost}{service.and_up ? " and up" : ""}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceCard;
