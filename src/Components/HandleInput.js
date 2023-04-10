import React from "react";

function HandleInput(props) {
  const { handleEdit, handleDelete } = props;

  return (
    <div className="overflow-x-auto">
      <table className=" border-collapse border border-slate-400">
        <tr>
          <th className=" text-stone-100 px-4 py-2 border border-slate-300">
            {" "}
            Image
          </th>

          <th className=" text-stone-100 px-4 py-2 border border-slate-300">
            {" "}
            Name
          </th>
          {/* <th>Last Name</th> */}
          <th className=" text-stone-100 px-4 py-2 border border-slate-300">
            Birth Date
          </th>
          <th className="text-stone-100  px-4 py-2 border border-slate-300">
            Address
          </th>
          <th className="text-stone-100  px-4 py-2 border border-slate-300">
            Birth Place
          </th>
          <th className="text-stone-100  px-4 py-2 border border-slate-300">
            Mobile Number
          </th>
          <th className="text-stone-100  px-4 py-2 border border-slate-300">
            Edit
          </th>
          <th className="text-stone-100  px-4 py-2 border border-slate-300">
            Delete
          </th>
        </tr>
        {props.formData.map((data, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-slate-300">
              <img
                src={data.Image}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              {data.firstName} {data.lastName}
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              {data.Birthdate}
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              {data.address1} {data.address2}
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              {data.birthPlace}
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              {data.MobileNum}
            </td>
            <td className="text-stone-100  px-4 py-2 border border-slate-300">
              <button
                className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            </td>
            <td className="px-4 py-2 border border-slate-300">
              <button
                className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default HandleInput;
