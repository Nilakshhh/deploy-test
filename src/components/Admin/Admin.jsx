import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

import AdminService from "./AdminService";
import AdminProduct from "./AdminProduct";
import AdminReview from "./AdminReview";
import AdminMember from "./AdminMember";
import AdminNote from "./AdminNote";

function Admin() {
  const navigateTo = useNavigate();

  useEffect(() => {
    // Check if the cookie containing the token exists
    const token = getCookie("tresses_username");

    if (!token) {
      console.log("Redirecting to login...");
      navigateTo("/login");
    }
  });

  // Function to get cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <AdminMember />;
      case "tab2":
        return <AdminService />;
      case "tab3":
        return <AdminProduct />;
      case "tab4":
        return <AdminReview />;
      case "tab5":
        return <AdminNote />
      default:
        return <>hello</>;
    }
  };
  // Render admin page if user is logged in
  return (
    <>
      <div className="AdminTabs">
        <div className="tabs">
        <button
            className={activeTab === "tab1" ? "active" : ""}
            onClick={() => setActiveTab("tab1")}
          >
            Team
          </button>
          <button
            className={activeTab === "tab2" ? "active" : ""}
            onClick={() => setActiveTab("tab2")}
          >
            Services
          </button>
          <button
            className={activeTab === "tab3" ? "active" : ""}
            onClick={() => setActiveTab("tab3")}
          >
            Products
          </button>
          <button
            className={activeTab === "tab4" ? "active" : ""}
            onClick={() => setActiveTab("tab4")}
          >
            Reviews
          </button>
          <button
            className={activeTab === "tab5" ? "active" : ""}
            onClick={() => setActiveTab("tab5")}
          >
            Notes
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </>
  );
}

export default Admin;
