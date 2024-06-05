/* eslint-disable react/prop-types */

const Square = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        border: "2px solid",
        height: "100px",
        width: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      className="Square"
    >
      <h5>{props.value}</h5>
    </div>
  );
};

export default Square;
