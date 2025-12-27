import { useEffect, useState } from "react";
import api from "../../api/axios";
import CreateSlot from "./CreateSlot";

export default function ExecutiveDashboard() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/slot/all"); // Backend should provide all slots
      setSlots(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Executive Dashboard</h2>

      {/* Create Slot Component */}
      <CreateSlot fetchSlots={fetchSlots} />

      <h3>All Interview Slots</h3>
      {loading ? (
        <p>Loading...</p>
      ) : slots.length === 0 ? (
        <p>No slots created yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Role</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.role}</td>
                <td>{slot.interviewType}</td>
                <td>{slot.date}</td>
                <td>{slot.time}</td>
                <td>{slot.isBooked ? "Booked" : "Available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
