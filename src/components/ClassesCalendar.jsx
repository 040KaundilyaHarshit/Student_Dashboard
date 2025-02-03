import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, CardContent } from "@/components/ui/card";

// Sample holiday data ...replace it with API or some backend work
const holidays = [
  { date: "2025-01-26", name: "Republic Day" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-10-02", name: "Mahatma Gandhi Jayanti" },
  { date: "2025-12-25", name: "Christmas" },
];

// Sample class schedule data ...that is backend work
const classSchedule = {
  "2025-02-01": [
    { time: "10:00 AM", subject: "Mathematics" },
    { time: "1:00 PM", subject: "Physics" },
  ],
  "2025-02-02": [
    { time: "9:00 AM", subject: "Computer Science" },
    { time: "11:30 AM", subject: "Chemistry" },
  ],
};

const ClassesCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  // Helper function to format date as YYYY-MM-DD in local time
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatLocalDate(date); // Get the local date in YYYY-MM-DD format

  // Use useEffect to update the holiday when the date changes
  useEffect(() => {
    const holiday = holidays.find((h) => h.date === formattedDate);
    setSelectedHoliday(holiday ? holiday.name : null);
  }, [date]);

  // Function to determine if the date is a weekend (Saturday/Sunday)
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  // Function to style calendar tiles
  const tileClassName = ({ date }) => {
    const dateString = formatLocalDate(date); // Format date as YYYY-MM-DD in local time

    // styles for holidays
    if (holidays.some((holiday) => holiday.date === dateString)) {
      return "border-b-2 border-red-500 text-black"; // Red underline for holidays
    }

    // Apply styles for weekends (Sat/Sun)
    if (isWeekend(date)) {
      return "bg-blue-200 text-gray-700"; // Light blue for weekends
    }

    return ""; // Default (no special styling)
  };

  return (
    <Card className="bg-white p-6 shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <CardContent>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">📅 Upcoming Classes</h3>
        <div className="flex flex-col items-center">
          {/* Calendar */}
          <Calendar
            onChange={setDate}
            value={date}
            className="border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-2"
            tileClassName={tileClassName} // Apply custom styling for tiles
          />

          {/* Scheduled Classes or Holiday Message */}
          <div className="mt-6 w-full">
            <h4 className="text-xl font-semibold text-indigo-600">{date.toDateString()}</h4>
            {selectedHoliday ? (
              <p className="text-red-500 font-semibold mt-2">
                No classes today due to {selectedHoliday}.
              </p>
            ) : classSchedule[formattedDate]?.length > 0 ? (
              <ul className="mt-2 bg-gray-100 p-3 rounded-lg shadow-md">
                {classSchedule[formattedDate].map((cls, index) => (
                  <li key={index} className="py-2 text-gray-700">
                    ⏰ {cls.time} - 📖 {cls.subject}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No classes scheduled.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesCalendar;