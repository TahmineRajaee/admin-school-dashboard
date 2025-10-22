"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calender() {
  const events = [
    {
      id: 1,
      title: "Book Fair",
      time: "12:00 PM - 2:00 PM",
      description:
        "The book fair is scheduled for next month in the main hall. 20 publishers have confirmed their attendance. Final logistics check needed.",
    },
    {
      id: 2,
      title: "Picnic",
      time: "8:00 AM - 3:00 PM",
      description:
        "All students and staff are invited. Permission slips are 80% collected. Arrange buses and food vendors.",
    },
    {
      id: 3,
      title: "Art Workshop",
      time: "12:00 PM - 2:00 PM",
      description:
        "Professional artist workshop scheduled for Saturday. Materials list needs approval. Maximum capacity: 30 students.",
    },
  ];

  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className="w-full p-4 bg-white rounded-lg">
        <Calendar onChange={onChange} value={value} />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold my-4">Events</h2>
        </div>
        <div className="flex flex-col gap-4">
          {events &&
            events.map((event) => (
              <div
                className="p-5 rounded-md border-2 border-pink-100 border-t-4"
                key={event.id}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-600">{event.title}</h2>
                  <span className="text-gray-300 text-xs">{event.time}</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">
                  {event.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
