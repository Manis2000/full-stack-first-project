import React from "react";

export const BadList = ({
  badList,
  handleOnDelete,
  taskSwitcher,
  handleOnCheck,
}) => {
  const ttlHr = badList.reduce((acc, item) => acc + item.hr, 0);
  return (
    <div className="col-md">
      <h2 className="text-center">Bad List</h2>
      <hr />
      <table className="table table-striped table-hover">
        <tbody id="bad-task">
          {badList.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={item._id}
                  onChange={handleOnCheck}
                />
              </td>
              <td>{item.task}</td>
              <td>{item.hr}</td>
              <td class="text-end">
                <button
                  onClick={() => taskSwitcher(item._id, "entry")}
                  class="btn btn-warning"
                >
                  <i class="fa-solid fa-left-long"></i>
                </button>{" "}
                <button
                  onClick={() => handleOnDelete(item._id)}
                  class="btn btn-danger"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end fw-bold">You could have saved = {ttlHr} Hrs</div>
    </div>
  );
};
