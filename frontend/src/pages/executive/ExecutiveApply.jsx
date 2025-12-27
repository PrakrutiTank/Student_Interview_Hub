import { useState } from "react";
import api from "../../api/axios";

const ExecutiveApply = () => {
  const [form, setForm] = useState({
    skills: "",
    interviewTypes: [],
    experience: "",
    motivation: "",
    rolePreference: "",
    availability: "",
    leadershipExperience: "",
    interviewCount: "",
    mockExperience: "",
    scenarioAnswer: "",
    confidence: 3,
    profileLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (type) => {
    setForm((prev) => ({
      ...prev,
      interviewTypes: prev.interviewTypes.includes(type)
        ? prev.interviewTypes.filter((t) => t !== type)
        : [...prev.interviewTypes, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await api.post("/executive/apply", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      });

      alert("✅ Application submitted successfully!");
      setForm({
        skills: "",
        interviewTypes: [],
        experience: "",
        motivation: "",
        rolePreference: "",
        availability: "",
        leadershipExperience: "",
        interviewCount: "",
        mockExperience: "",
        scenarioAnswer: "",
        confidence: 3,
        profileLink: "",
      });
    } catch (err) {
      alert("❌ Submission failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Executive Board Application
        </h2>
        <p className="text-slate-400 text-center mb-6">
          Student Interview Practice Club
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Skills */}
          <Input
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="DSA, Web, ML"
            required
          />

          {/* Interview Types */}
          <div>
            <label className="text-sm text-slate-300 font-medium">
              Interview Types You Can Handle
            </label>
            <div className="flex gap-6 mt-2">
              {["HR", "Technical"].map((type) => (
                <label key={type} className="flex gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.interviewTypes.includes(type)}
                    onChange={() => handleCheckbox(type)}
                    className="accent-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Role Preference */}
          <Select
            label="Preferred Role"
            name="rolePreference"
            value={form.rolePreference}
            onChange={handleChange}
            options={[
              "Technical Lead",
              "HR & Coordination",
              "Event Management",
              "Content & Question Design",
              "Outreach & Partnerships",
            ]}
            required
          />

          {/* Motivation */}
          <Textarea
            label="Why do you want to join the Executive Board?"
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            required
          />

          {/* Leadership Experience */}
          <Textarea
            label="Leadership / Volunteering Experience"
            name="leadershipExperience"
            value={form.leadershipExperience}
            onChange={handleChange}
          />

          {/* Interview Experience */}
          <Input
            label="Number of Interviews Faced"
            name="interviewCount"
            value={form.interviewCount}
            onChange={handleChange}
            type="number"
          />

          <Select
            label="Have you conducted mock interviews before?"
            name="mockExperience"
            value={form.mockExperience}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          {/* Scenario */}
          <Textarea
            label="Scenario: A junior member feels demotivated after failed interviews. What will you do?"
            name="scenarioAnswer"
            value={form.scenarioAnswer}
            onChange={handleChange}
            required
          />

          {/* Availability */}
          <Select
            label="Weekly Availability"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            options={["2–3 hours", "4–6 hours", "6+ hours"]}
            required
          />

          {/* Confidence */}
          <div>
            <label className="text-sm text-slate-300 font-medium">
              Communication Confidence (1–5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              name="confidence"
              value={form.confidence}
              onChange={handleChange}
              className="w-full mt-2"
            />
          </div>

          {/* Profile Link */}
          <Input
            label="LinkedIn / GitHub (optional)"
            name="profileLink"
            value={form.profileLink}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-slate-300 font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-slate-300 font-medium">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="w-full mt-1 px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm text-slate-300 font-medium">{label}</label>
    <select
      {...props}
      className="w-full mt-1 px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default ExecutiveApply;
