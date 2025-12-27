import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

/* ---------- DEMO REQUESTS ---------- */
const DEMO_REQUESTS = [
  {
    _id: "req1",
    role: "Software Engineer",
    interviewType: "Technical",
    level: "Beginner",
    preferredDate: "2025-01-15",
    status: "Pending",
  },
  {
    _id: "req2",
    role: "Data Analyst",
    interviewType: "HR",
    level: "Intermediate",
    preferredDate: "2025-01-12",
    status: "Scheduled",
  },
];

export default function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/practice/my-requests");
      setRequests(res.data?.length ? res.data : DEMO_REQUESTS);
    } catch {
      setRequests(DEMO_REQUESTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Student Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Track your interview practice requests and upcoming sessions.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/book-slot"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition"
          >
            <h3 className="text-lg font-semibold">
              Apply for Practice
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Submit a new interview practice request
            </p>
          </Link>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white">
              Total Requests
            </h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {requests.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white">
              Upcoming Interview
            </h3>
            <p className="text-slate-400 mt-2">
              {requests.some((r) => r.status === "Scheduled")
                ? "Check your email / WhatsApp"
                : "Not scheduled yet"}
            </p>
          </div>
        </div>

        {/* MY REQUESTS */}
        <section className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            My Practice Requests
          </h2>

          {loading ? (
            <p className="text-slate-400">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-slate-400">
              You have not submitted any practice requests yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 text-sm">
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Level</th>
                    <th className="px-4 py-3 text-left">Preferred Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-t border-slate-700 text-slate-300"
                    >
                      <td className="px-4 py-3">{req.role}</td>
                      <td className="px-4 py-3">
                        {req.interviewType}
                      </td>
                      <td className="px-4 py-3">{req.level}</td>
                      <td className="px-4 py-3">
                        {req.preferredDate}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs
                            ${
                              req.status === "Pending"
                                ? "bg-yellow-600/20 text-yellow-400"
                                : req.status === "Scheduled"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-slate-600/20 text-slate-400"
                            }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
