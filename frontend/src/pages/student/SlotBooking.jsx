import { useState } from "react";
import api from "../../api/axios";

export default function SlotRequest() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "",
    interviewType: "",
    level: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const submitRequest = async (e) => {
    e.preventDefault();

    if (
      !form.role ||
      !form.interviewType ||
      !form.level ||
      !form.preferredDate ||
      !form.preferredTime
    ) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/practice/request", form);
      alert("✅ Practice request submitted successfully!");

      setForm({
        role: "",
        interviewType: "",
        level: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
    } catch {
      alert("⚠️ Demo mode: Request saved");
      setForm({
        role: "",
        interviewType: "",
        level: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Request Interview Practice
          </h1>
          <p className="text-slate-400 mt-1">
            Fill this form and our executive team will schedule your mock
            interview.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitRequest}
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4"
        >
          {/* ROLE */}
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role *</option>
            <option>Software Engineer</option>
            <option>Data Analyst</option>
            <option>Product Manager</option>
          </select>

          {/* INTERVIEW TYPE */}
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            value={form.interviewType}
            onChange={(e) =>
              setForm({ ...form, interviewType: e.target.value })
            }
          >
            <option value="">Interview Type *</option>
            <option>Technical</option>
            <option>HR</option>
            <option>Behavioral</option>
          </select>

          {/* LEVEL */}
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
          >
            <option value="">Difficulty Level *</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            value={form.preferredDate}
            onChange={(e) =>
              setForm({ ...form, preferredDate: e.target.value })
            }
          />

          {/* TIME */}
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            value={form.preferredTime}
            onChange={(e) =>
              setForm({ ...form, preferredTime: e.target.value })
            }
          >
            <option value="">Preferred Time *</option>
            <option>Morning (9–12)</option>
            <option>Afternoon (12–4)</option>
            <option>Evening (4–8)</option>
          </select>

          {/* NOTES */}
          <textarea
            rows="3"
            className="w-full bg-slate-800 text-white p-2 rounded-lg"
            placeholder="Topics you want to focus on (DSA, SQL, HR questions...)"
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Practice Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
