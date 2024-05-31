import "./ServiceCard.css";

function ServiceCard({ title, services }) {
  return (
    <div className="service-card">
      <h3 className="service-title">{title}</h3>
      <ul className="service-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <div className="service-content">
              <p className="service-description">{service.description}:</p>
              <a href={service.link} className="book-button">
                ${service.cost}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceCard;
