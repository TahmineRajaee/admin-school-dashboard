import React from "react";

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      time: "2025-04-05",
      title: "School Website",
      description:
        "Our new website is now live! Please review your department's pages and report any issues to the IT desk.",
    },
    {
      id: 2,
      time: "2026-07-10",
      title: "New Staff Members",
      description:
        " Please join us in welcoming 5 new teachers who will be joining us this semester. Their profiles are available on the staff portal.",
    },
    {
      id: 3,
      time: "2026-10-20",
      title: "Workshop Proposals",
      description:
        "Submissions are now open for leading a workshop at the upcoming Professional Development Day. Deadline is November 20th.",
    },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-lg mt-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold my-4">Announcements</h2>
      </div>
      <div className="flex flex-col gap-4">
        {announcements &&
          announcements.map((announcements) => (
            <div
              className="p-4 rounded-md bg-indigo-100"
              key={announcements.id}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcements.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {announcements.time}
                </span>
              </div>
              <p className="mt-1 text-gray-400 text-sm">
                {announcements.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
