const SpinnerComponet = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-grow mx-2" aria-hidden="true"></div>
      <strong role="status">Cargando...</strong>
    </div>
  );
};

export default SpinnerComponet;
