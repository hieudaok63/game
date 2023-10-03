import React from "react";
import "./Cell.css";

interface CellProps {
  item: {
    id: number;
    img: string;
    stat: string;
  };
  id: number;
  handleClick: (id: number) => void;
}

const Cell: React.FC<CellProps> = ({ item, id, handleClick }: CellProps) => {
  const itemClass = item.stat ? " active " + item.stat : "";
  return (
    <div className={"card" + itemClass} onClick={() => handleClick(id)}>
      <img src={item.img} alt="" />
    </div>
  );
};

export default Cell;
