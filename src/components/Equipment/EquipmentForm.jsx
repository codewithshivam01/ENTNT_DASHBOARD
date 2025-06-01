// // src/components/Equipment/EquipmentForm.jsx
// import React, { useState, useContext, useEffect } from "react";
// import { EquipmentContext } from "../../contexts/EquipmentContext";
// import { useNavigate, useParams } from "react-router-dom";
// import { v4 as uuid } from "uuid";

// export default function EquipmentForm() {
//   const { add, update, equipment } = useContext(EquipmentContext);
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     condition: "",
//     status: "Available",
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Fill form when editing existing equipment
//   useEffect(() => {
//     if (id && id !== "new") {
//       const existing = equipment.find((e) => e.id === id);
//       if (existing) {
//         setForm(existing);
//       }
//     }
//   }, [id, equipment]);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const existing = equipment.find((e) => e.id === id);
//     if (!existing?.id) {
//       const newItem = { ...form, id: uuid() };
//       add(newItem);
//       console.log("New equipment added:", newItem);
//     } else {
//       update(form);
//       console.log("Equipment updated:", form);
//     }
//     navigate("/equipment");
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">
//         {id === "new" ? "Add New Equipment" : "Edit Equipment"}
//       </h2>

//       <form onSubmit={onSubmit}>
//         {/* Name */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             className="w-full border rounded p-2"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Category</label>
//           <input
//             type="text"
//             className="w-full border rounded p-2"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//             required
//           />
//         </div>

//         {/* Condition */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Condition</label>
//           <input
//             type="text"
//             className="w-full border rounded p-2"
//             value={form.condition}
//             onChange={(e) => setForm({ ...form, condition: e.target.value })}
//             required
//           />
//         </div>

//         {/* Status */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium">Status</label>
//           <select
//             className="w-full border rounded p-2"
//             value={form.status}
//             onChange={(e) => setForm({ ...form, status: e.target.value })}
//             required
//           >
//             <option value="Available">Available</option>
//             <option value="Rented">Rented</option>
//             <option value="Maintenance">Maintenance</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//         >
//           {id === "new" ? "Add Equipment" : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useContext, useEffect } from "react";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function EquipmentForm() {
  const { add, update, equipment } = useContext(EquipmentContext);
  const { user } = useContext(AuthContext); // ← get current user
  const [form, setForm] = useState({
    name: "",
    category: "",
    condition: "",
    status: "Available",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // ❌ Restrict Staff from accessing Add Equipment page
  useEffect(() => {
    if (id === "new" && user?.role === "Staff") {
      alert("Access Denied: Staff cannot add equipment.");
      navigate("/equipment");
    }
  }, [id, user, navigate]);

  // Fill form when editing existing equipment
  useEffect(() => {
    if (id && id !== "new") {
      const existing = equipment.find((e) => e.id === id);
      if (existing) {
        setForm(existing);
      }
    }
  }, [id, equipment]);

  const onSubmit = (e) => {
    e.preventDefault();
    const existing = equipment.find((e) => e.id === id);
    if (!existing?.id) {
      const newItem = { ...form, id: uuid() };
      add(newItem);
      console.log("New equipment added:", newItem);
    } else {
      update(form);
      console.log("Equipment updated:", form);
    }
    navigate("/equipment");
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {id === "new" ? "Add New Equipment" : "Edit Equipment"}
      </h2>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Condition</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            required
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="w-full border rounded p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {id === "new" ? "Add Equipment" : "Save Changes"}
        </button>
      </form>
         
    </div>
  );
}
