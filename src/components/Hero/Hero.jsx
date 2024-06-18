import "./Hero.css";

function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container flex flex-col justify-center items-center">
      <h1 className="hero-text text-center mb-4">
        Tresses Salon DC
        <br />
        for Men & Women
      </h1>
      <p className="address-text text-center mb-4">
        1910 G Street, NW Washington, DC 20006
      </p>
      <div className="button-container flex justify-center">
        <a
          href="https://book.squareup.com/appointments/fae4e729-00fd-45a0-888e-09425cc201dc/location/BJ5D12553R8ET/services"
          className="btn-appointment"
          target="_blank"
          rel="noopener noreferrer"
        >
          BOOK AN APPOINTMENT
        </a>
        <button className="btn-contactus" onClick={scrollToContact}>
          CONTACT US
        </button>
      </div>
    </div>
  );
}

export default Hero;
