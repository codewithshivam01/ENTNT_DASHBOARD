
import React, { useContext } from "react";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function EquipmentList() {
  const { equipment, remove } = useContext(EquipmentContext);
  const { user } = useContext(AuthContext); 

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-400 ">Equipment Inventory</h1>

        {/* Show Add Equipment only if NOT staff */}
        { user?.role !== "Customer" &&  (
          <Link
            to="/equipment/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Equipment
          </Link>
        )}
      </div>

      {equipment.length === 0 ? (
        <p className="text-gray-500">
          No equipment found. {user?.role !== "Staff" ? "Add one above." : ""}
        </p>
      ) : (
        <table className="w-full bg-white  dark:text-gray-400 dark:bg-slate-800 rounded shadow overflow-hidden">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              {["Name", "Category", "Condition", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="text-left dark:text-gray-400  px-4 py-2">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {equipment.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-2">{e.name}</td>
                <td className="px-4 py-2">{e.category}</td>
                <td className="px-4 py-2">{e.condition}</td>
                <td className="px-4 py-2">{e.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/equipment/${e.id}`}
                    className="text-indigo-600  dark:text-green-50 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/equipment/${e.id}/edit`}
                    className="text-blue-600 dark:text-green-50 hover:underline"
                  >
                    Edit
                  </Link>
                  {user?.role !== "Staff" && user?.role !== "Customer" &&(
                    <button
                      onClick={() => remove(e.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete   
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
