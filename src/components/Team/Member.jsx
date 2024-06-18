// src/Member.js
import "./Member.css";

function Member({ imageSrc, name, description }) {
  return (
    <li className="member-card">
      <div className="member-photo-container">
        <div
          className="member-photo"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      </div>
      <div className="member-details">
        <span className="member-name">{name}</span>
        <span className="member-description">{description}</span>
      </div>
    </li>
  );
}

export default Member;
