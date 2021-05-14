import loader from "./805.svg";

const Preloader = () => {
  return (
    <div>
      <img
        style={{
          display: "block",
          margin: "200px auto",
        }}
        src={loader}
        alt="Loading..."
      />
    </div>
  );
};

export default Preloader;
