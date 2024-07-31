import { useState, useEffect } from "react";
import axios from "axios";
import Member from "./Member";
import "./Team.css";

function Team() {
  const [members, setMembers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admins/team`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchMembers();
  }, [apiUrl]);

  // Debugging: Log the members data
  console.log(members);

  return (
    <div className="team-container" id="team">
      <h2 className="section-title">Our Team</h2>
      <div className="members-grid">
        {members.map((member) => {
          // Ensure imageSrc has a leading slash if necessary
          const imageUrl = `${apiUrl}/${member.photo}`.replace(/\\/g, '/');
          console.log(imageUrl); // Debugging URL

          return (
            <Member
              key={member._id}
              imageSrc={imageUrl}
              name={member.name}
              description={member.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Team;
