import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

interface IItem {
  id: number;
  img: string;
  stat: string;
}

const Board: React.FC = () => {
  const [items, setItems] = useState<IItem[]>(
    [
      {
        id: 1,
        img: "data:image/png;base64,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",
        stat: "",
      },
      {
        id: 1,
        img: "data:image/png;base64,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",
        stat: "",
      },
      {
        id: 2,
        img: "https://png.pngtree.com/png-vector/20190929/ourmid/pngtree-woman-face-line-icons-vector-png-image_1768613.jpg",
        stat: "",
      },
      {
        id: 2,
        img: "https://png.pngtree.com/png-vector/20190929/ourmid/pngtree-woman-face-line-icons-vector-png-image_1768613.jpg",
        stat: "",
      },
      {
        id: 3,
        img: "https://d1bd5u3q1t3nu7.cloudfront.net/icons/1685/grinning-face-icon.png",
        stat: "",
      },
      {
        id: 3,
        img: "https://d1bd5u3q1t3nu7.cloudfront.net/icons/1685/grinning-face-icon.png",
        stat: "",
      },
      {
        id: 4,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXbgMq6YHI90tbrGdXrA6fsStxfPQqApQUr_AJp0HTYQXcs7xdx8_L5F72JH8dQpR6MM&usqp=CAU",
        stat: "",
      },
      {
        id: 4,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXbgMq6YHI90tbrGdXrA6fsStxfPQqApQUr_AJp0HTYQXcs7xdx8_L5F72JH8dQpR6MM&usqp=CAU",
        stat: "",
      },
      {
        id: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSO6ZO05vWU6fsN7Bk_k13O2SmgSJIHFSMOmQG5GR6jvqpLCZQw-QMMRAsicw8esB_U4E&usqp=CAU",
        stat: "",
      },
      {
        id: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSO6ZO05vWU6fsN7Bk_k13O2SmgSJIHFSMOmQG5GR6jvqpLCZQw-QMMRAsicw8esB_U4E&usqp=CAU",
        stat: "",
      },
      {
        id: 6,
        img: "https://c8.alamy.com/comp/JYAMWT/happy-man-face-icon-image-JYAMWT.jpg",
        stat: "",
      },
      {
        id: 6,
        img: "https://c8.alamy.com/comp/JYAMWT/happy-man-face-icon-image-JYAMWT.jpg",
        stat: "",
      },
      {
        id: 7,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3w2mru6_rCA8IK1kTsgxeq_SMj2vGX98kmgxW8f8mryZduqg4wrOYd4V4Ze6hDGwZhmU&usqp=CAU",
        stat: "",
      },
      {
        id: 7,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3w2mru6_rCA8IK1kTsgxeq_SMj2vGX98kmgxW8f8mryZduqg4wrOYd4V4Ze6hDGwZhmU&usqp=CAU",
        stat: "",
      },
      {
        id: 8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzTp6mLSfK1sWcegigouA4jBFDZ3lLtnrnyxQm9zvm8PU0PxzQM4bXrDKEgXzuI5DM7k&usqp=CAU",
        stat: "",
      },
      {
        id: 8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzTp6mLSfK1sWcegigouA4jBFDZ3lLtnrnyxQm9zvm8PU0PxzQM4bXrDKEgXzuI5DM7k&usqp=CAU",
        stat: "",
      },
    ].sort(() => Math.random() - 0.5)
  );
  const [prev, setPrev] = useState(-1);
  function check(current: number) {
    if (items[current].id == items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id: number) {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }
  return (
    <div className="container">
      {items.map((item: IItem, index) => (
        <Cell key={index} item={item} id={index} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Board;
