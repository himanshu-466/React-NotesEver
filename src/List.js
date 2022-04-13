import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function list(props) {
  return (
    <div className="item" align="center">
      <span>
        <input
          type="text"
          disabled
          className="item_input"
          value={props.title}
        />
        <button className="remove">
          <DeleteIcon
            style={{
              fontSize: "30px",
            }}
            onClick={() => {
              props.taskdelete(props.id);
            }}
          />
        </button>
        <button className="edit">
          <EditIcon
            style={{ fontSize: "30px" }}
            onClick={() => {
              props.taskUpdate(props.id);
            }}
          />
        </button>
      </span>
    </div>
  );
}
