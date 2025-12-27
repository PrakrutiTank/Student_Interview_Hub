import api from "../../api/axios";

export default function CreateSlot() {
  const createSlot = async () => {
    await api.post("/slot/create", {
      role: "SDE",
      interviewType: "Technical",
      date: "2025-01-10",
      time: "5:00 PM"
    });
    alert("Slot Created");
  };

  return <button onClick={createSlot}>Create Slot</button>;
}
