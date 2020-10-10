import React, { useState } from "react";
import { axiosWithAuth } from '../api/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  const { push } = useHistory()

  console.log('colors', colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    console.log('colorToEdit:', colorToEdit)
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log('saveEdit: res: ', res);
        push('/bubble_page')
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "saveEdit failed: response from server: ",
            err.response.data
          );
        } else {
          console.error("saveEdit failed", err);
        }
      });

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('color:', color)
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then((res) => {
        console.log('deleteColor: res: ', res);
        push('/bubble_page')
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "deleteColor failed: response from server: ",
            err.response.data
          );
        } else {
          console.error("deleteColor failed", err);
        }
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul data-testid='color'>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
