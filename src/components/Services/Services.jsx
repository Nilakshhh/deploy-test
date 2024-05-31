import { useState, useEffect } from "react";
import "./Services.css";
import ServiceCard from "./ServiceCard";
import axios from "axios";

function Services() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [servicesDataa, setServicesData] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        var url = apiUrl + "/admins/service"
        const response = await axios.get(url);
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchServices();
  });

  // Transform servicesDataa to the required format
  const transformData = (data) => {
    const formattedData = data.reduce((acc, service) => {
      const { title, description, cost, link } = service;
      const normalizedTitle = title.trim().toLowerCase();
  
      const existingCategory = acc.find((item) => item.title.toLowerCase() === normalizedTitle);
      if (existingCategory) {
        existingCategory.services.push({ description, cost, link });
      } else {
        acc.push({
          title: title.trim(),
          services: [{ description, cost, link }],
        });
      }
  
      return acc;
    }, []);
  
    return formattedData;
  };
  

  const servicesData = transformData(servicesDataa);
  
  return (
    <div className="services-container" id="services">
      <h2 className="section-title">Our Services</h2>
      <div className="service-cards-wrapper">
        {servicesData.map((serviceGroup, index) => (
          <ServiceCard
            key={index}
            title={serviceGroup.title}
            services={serviceGroup.services}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
