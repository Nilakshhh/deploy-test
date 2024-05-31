import "./Member.css";

function Member({ imageSrc, name, description }) {
  return (
    <div className="staff-wrapper maxwidth">
      <article className="staff-box">
        <img src={imageSrc} alt={name} />
        <header>{name}</header>
        <p>{description}</p>
      </article>
    </div>
  );
}

export default Member;
