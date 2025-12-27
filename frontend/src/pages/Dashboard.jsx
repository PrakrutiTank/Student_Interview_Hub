import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

/* ---------- DEMO DATA ---------- */
const DEMO_MEMBERS = [
  { _id: "m1", name: "Alice Johnson", role: "President" },
  { _id: "m2", name: "Bob Smith", role: "Vice President" },
  { _id: "m3", name: "Carol Lee", role: "Member" },
];

export default function ClubDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/club/members"); // Replace with your API
      setMembers(res.data?.length ? res.data : DEMO_MEMBERS);
    } catch {
      setMembers(DEMO_MEMBERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="bg-slate-950 px-6 py-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.OCFbaNpcwyHg8iwAx-BRdAHaEK?pid=Api&P=0&h=180"
            alt="Club Logo"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-600"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Coding & Tech Club
            </h1>
            <p className="text-slate-400 mt-1 max-w-lg text-sm md:text-base">
              Our club promotes coding, hackathons, and technical events for students. Join us to enhance your skills and collaborate on exciting projects!
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <Link
            to="/join-club"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 md:p-6 transition"
          >
            <h3 className="text-lg font-semibold">Join the Club</h3>
            <p className="text-sm opacity-90 mt-1">Become a member and participate in events</p>
          </Link>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-semibold text-white">Total Members</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-500 mt-1 md:mt-2">{members.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-semibold text-white">Upcoming Event</h3>
            <p className="text-slate-400 mt-1 md:mt-2">Hackathon 2025 - 15th Jan</p>
          </div>
        </div>

        {/* MEMBER LIST */}
        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Club Members</h2>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-slate-400 text-sm">No members found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-slate-800 text-slate-300">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id} className="border-t border-slate-700 text-slate-300">
                      <td className="px-4 py-2">{member.name}</td>
                      <td className="px-4 py-2">{member.role}</td>
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
