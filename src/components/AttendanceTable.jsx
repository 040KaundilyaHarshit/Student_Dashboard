import React, { useRef, useState, useEffect } from "react";

const AttendanceCalendar = () => {
  // 1 for present, 0 for absent, null for upcoming months
  const attendanceData = [
    { month: "January", days: Array(31).fill(1), startDay: 3 },
    { month: "February", days: Array(28).fill(1), startDay: 6 },
    { month: "March", days: Array(31).fill(null), startDay: 6 },
    { month: "April", days: Array(30).fill(null), startDay: 2 },
    { month: "May", days: Array(31).fill(null), startDay: 4 },
    { month: "June", days: Array(30).fill(null), startDay: 0 },
    { month: "July", days: Array(31).fill(null), startDay: 2 },
    { month: "August", days: Array(31).fill(null), startDay: 5 },
    { month: "September", days: Array(30).fill(null), startDay: 1 }, // September starts on Monday
    { month: "October", days: Array(31).fill(null), startDay: 3 }, // October starts on Wednesday
    { month: "November", days: Array(30).fill(null), startDay: 6 },
    { month: "December", days: Array(31).fill(null), startDay: 1 },
  ];

  // Marked 5 non-consecutive days as absent (grey) in January
  const absentDaysInJanuary = [3, 7, 12, 18, 25]; // Example non-consecutive days
  attendanceData[0].days = attendanceData[0].days.map((_, index) =>
    absentDaysInJanuary.includes(index + 1) ? 0 : 1
  );

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleNext = () => {
    const container = containerRef.current;
    if (container && scrollPosition < attendanceData.length - 1) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition((prev) => Math.min(prev + 1, attendanceData.length - 1));
    }
  };

  const handlePrevious = () => {
    const container = containerRef.current;
    if (container && scrollPosition > 0) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setScrollPosition((prev) => Math.max(prev - 1, 0));
    }
  };

  // Update scroll position when the container is scrolled
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const newScrollPosition = Math.floor(scrollLeft / containerWidth);
        setScrollPosition(newScrollPosition);
      };
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Attendance Calendar</h3>
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          disabled={scrollPosition === 0}
        >
          &lt;
        </button>
        <div
          ref={containerRef}
          className="flex-1 mx-4 overflow-hidden flex gap-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {attendanceData.map((monthData, index) => (
            <div key={index} className="min-w-[200px] flex-shrink-0">
              <h4 className="text-md font-semibold text-center mb-2">
                {monthData.month}
              </h4>
              <div className="grid grid-cols-7 gap-1">
                {/* Fill empty cells for the starting day of the month */}
                {Array(monthData.startDay)
                  .fill(null)
                  .map((_, i) => (
                    <div key={`empty-${i}`} className="w-6 h-6" />
                  ))}
                {/* Render the days of the month */}
                {monthData.days.map((status, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 flex items-center justify-center rounded-sm ${
                      status === 1
                        ? "bg-green-300" // Present
                        : status === 0
                        ? "bg-gray-300" // Absent
                        : "bg-gray-100" // Upcoming month
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          disabled={scrollPosition >= attendanceData.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AttendanceCalendar;