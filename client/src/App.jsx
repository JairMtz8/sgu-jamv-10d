import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get("http://localhost:8081/sgu-api/users").then((res) => setUsers(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === null) {
      // CREATE
      axios.post("http://localhost:8081/sgu-api/users", form).then(() => {
        loadUsers();
        setForm({ nombre: "", correo: "", telefono: "" });
      });
    } else {
      // UPDATE
      axios.put(`http://localhost:8081/sgu-api/users/${editingId}`, form).then(() => {
        loadUsers();
        setEditingId(null);
        setForm({ nombre: "", correo: "", telefono: "" });
      });
    }
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8081/sgu-api/users/${id}`).then(() => loadUsers());
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setForm({
      nombre: user.nombre,
      correo: user.correo,
      telefono: user.telefono,
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Verdana, sans-serif", backgroundColor: "#f4f7fa" }}>
      <h2 style={{ marginBottom: 20, fontSize: 24, color: "#333" }}>Gestión de Usuarios</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 30,
          borderRadius: 8,
          padding: 15,
          background: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          placeholder="Nombre"
          value={form.nombre}
          style={{
            padding: "8px 12px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #ddd",
            outline: "none",
          }}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Correo"
          value={form.correo}
          style={{
            padding: "8px 12px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #ddd",
            outline: "none",
          }}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
        <input
          placeholder="Teléfono"
          value={form.telefono}
          style={{
            padding: "8px 12px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #ddd",
            outline: "none",
          }}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />

        <button
          style={{
            padding: "8px 16px",
            fontSize: 14,
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          Guardar
        </button>

      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#1178eeff" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Correo</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Teléfono</th>
            <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Acción</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: "12px", border: "1px solid #ddd", color: "black" }}>{u.nombre}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd", color: "black" }}>{u.correo}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd", color: "black" }}>{u.telefono}</td>

              <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                <button
                  onClick={() => editUser(u)}
                  style={{
                    padding: "6px 12px",
                    marginRight: 8,
                    background: "#ffa726",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteUser(u.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
