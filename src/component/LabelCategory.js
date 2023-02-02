import React from "react";

const LabelCategory = ({ title }) => {
  let color = "";
  switch (title) {
    case "Admin":
      color = "green";
      break;
    case "Accounting":
      color = "blue";
      break;
    case "SPV Account":
      color = "red";
      break;
    case "Manager Account":
      color = "yellow";
      break;
    default:
      break;
  }
  return <label className={`bg-${color}-100 px-3 py-1 rounded-full font-medium text-${color}-500 text-sm`}>{title}</label>;
};

export default LabelCategory;
