import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Added for navigation

/* ===================== CHANNELS ===================== */
const CHANNELS = [
  { label: "Hackathons", value: "hackathon" },
  { label: "Internships", value: "internship" },
  { label: "On-Campus", value: "oncampus" },
  { label: "Off-Campus", value: "offcampus" },
];

/* ===================== DUMMY DATA ===================== */
const DUMMY_DATA = [
  {
    _id: "h1",
    title: "Smart India Hackathon",
    description: "National-level hackathon by Govt of India.",
    deadline: "2025-01-20",
    category: "hackathon",
    link: "/opportunities/h1", // ✅ New link key
  },
  {
    _id: "h2",
    title: "HackWithIndia",
    description: "48-hour online hackathon.",
    deadline: "2025-01-18",
    category: "hackathon",
    link: "/opportunities/h2",
  },
  {
    _id: "h3",
    title: "CodeFest",
    description: "Global coding challenge.",
    deadline: "2025-02-05",
    category: "hackathon",
    link: "/opportunities/h3",
  },
  {
    _id: "i1",
    title: "Google Summer of Code",
    description: "Open-source internship program.",
    deadline: "2025-02-10",
    category: "internship",
    link: "/opportunities/i1",
  },
  {
    _id: "i2",
    title: "Microsoft Internship",
    description: "Paid internship for CS students.",
    deadline: "2025-01-17",
    category: "internship",
    link: "/opportunities/i2",
  },
  {
    _id: "o1",
    title: "TCS On-Campus Drive",
    description: "Hiring final-year students.",
    deadline: "2025-01-15",
    category: "oncampus",
    link: "/opportunities/o1",
  },
  {
    _id: "f1",
    title: "Amazon SDE Off-Campus",
    description: "Off-campus SDE hiring.",
    deadline: "2025-01-19",
    category: "offcampus",
    link: "/opportunities/f1",
  },
];

/* ===================== DEADLINE CHECK ===================== */
const isDeadlineNear = (dateStr) => {
  const today = new Date();
  const deadline = new Date(dateStr);
  const diffDays = (deadline - today) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};

/* ===================== COMPONENT ===================== */
export default function OpportunityFeed() {
  const [list, setList] = useState([]);
  const [activeChannel, setActiveChannel] = useState("hackathon");

  useEffect(() => {
    setTimeout(() => {
      setList(DUMMY_DATA);
    }, 400);
  }, []);

  const filteredList = list.filter(
    (item) => item.category === activeChannel
  );

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Student Opportunities
          </h1>
          <p className="text-slate-400 mt-1">
            Explore hackathons, internships, and placement drives
          </p>
        </div>

        {/* CHANNEL TABS */}
        <div className="flex flex-wrap gap-3">
          {CHANNELS.map((channel) => (
            <button
              key={channel.value}
              onClick={() => setActiveChannel(channel.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeChannel === channel.value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-400 border border-slate-700 hover:bg-slate-800"
                }
              `}
            >
              {channel.label}
            </button>
          ))}
        </div>

        {/* OPPORTUNITY CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((o) => (
            <div
              key={o._id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-600 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* CATEGORY */}
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/20 text-blue-400">
                  {o.category.toUpperCase()}
                </span>

                <h3 className="text-lg font-semibold text-white">
                  {o.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {o.description}
                </p>
              </div>

              {/* DEADLINE + VIEW DETAILS */}
              <div className="mt-5 space-y-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${
                      isDeadlineNear(o.deadline)
                        ? "bg-red-600/20 text-red-400"
                        : "bg-slate-700/40 text-slate-400"
                    }
                  `}
                >
                  Deadline: {o.deadline}
                  {isDeadlineNear(o.deadline) && " ⏰ Closing Soon"}
                </span>

                <Link
                  to={o.link}
                  className="block text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredList.length === 0 && (
          <p className="text-center text-slate-400">
            No opportunities available for this category.
          </p>
        )}
      </div>
    </div>
  );
}
