import "./card.css";

const Card = ({ title, value }) => {
  return (
    <>
      <div className="weather-card">
        <p className="title">{title}</p>
        <p>{value}</p>
      </div>
    </>
  );
};

export default Card;
