const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100  "
      style={{ height: "100vh" }}
    >
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
