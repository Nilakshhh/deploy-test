import "./Team.css";
import Member from "./Member";

function Team() {
  return (
    <div className="team-container" id="team">
      <h2 className="section-title">Our Team</h2>
      <div className="members-grid">
        <Member
          imageSrc="photos/Claudia.webp"
          name="Claudia Gandarillas"
          description="Claudia is doing hair for 25 years"
        />
        <Member
          imageSrc="photos/Joao.webp"
          name="Joao Souza"
          description="Hair Designer and Master Colorist"
        />
        <Member
          imageSrc="photos/Rosaline.webp"
          name="Rosaline Chow"
          description="Hair design and Color specialist"
        />
        <Member
          imageSrc="photos/Gio.webp"
          name="Gio"
          description="Hair design and colorist for about 25 years in Colombia and Brazil"
        />
      </div>
    </div>
  );
}

export default Team;
