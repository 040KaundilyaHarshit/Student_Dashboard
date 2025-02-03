import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // Assuming Card and CardContent are available

const GradesAndSemesterSelector = () => {
  const [activeSemester, setActiveSemester] = useState(1); // Default to Sem 1
  const [isSliding, setIsSliding] = useState(false); // Track if sliding is happening

  // Grades data for each semester
  const semesterData = {
    1: {
      subjects: [
        { name: "Mathematics", grade: "A" },
        { name: "Science", grade: "B" },
        { name: "History", grade: "A" },
        { name: "English", grade: "B+" },
        { name: "Physics", grade: "A-" },
      ],
    },
    2: {
      subjects: [
        { name: "Mathematics", grade: "B+" },
        { name: "Science", grade: "A-" },
        { name: "History", grade: "A" },
        { name: "English", grade: "B" },
        { name: "Physics", grade: "A" },
      ],
    },
    3: {
      subjects: [
        { name: "Mathematics", grade: "A" },
        { name: "Science", grade: "A" },
        { name: "History", grade: "B+" },
        { name: "English", grade: "A-" },
        { name: "Physics", grade: "B" },
      ],
    },
    4: {
      subjects: [
        { name: "Mathematics", grade: "A-" },
        { name: "Science", grade: "B+" },
        { name: "History", grade: "A" },
        { name: "English", grade: "B" },
        { name: "Physics", grade: "A" },
      ],
    },
  };

  // Function to handle selecting a semester
  const handleSelectSemester = (semester) => {
    setIsSliding(true);
    setTimeout(() => {
      setActiveSemester(semester);
      setIsSliding(false);
    }, 300); // Matching the transition time
  };

  return (
    <div>
      {/* Semester Selector */}
      <div className="flex justify-around mb-4">
        {["1", "2", "3", "4"].map((semester) => (
          <button
            key={semester}
            className={`px-4 py-2 rounded-md ${
              activeSemester === parseInt(semester)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleSelectSemester(parseInt(semester))}
          >
            Sem {semester}
          </button>
        ))}
      </div>

      {/* Sliding Grades for the selected semester inside Card */}
      <Card>
        <CardContent>
          <div
            className={`transition-all duration-300 ease-in-out transform ${
              isSliding ? "opacity-0" : "opacity-100"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Grades for Semester {activeSemester}</h3>
            <ul className="mt-4">
              {semesterData[activeSemester]?.subjects.map((subject, index) => (
                <li key={index} className="flex justify-between py-1">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-gray-700">{subject.grade}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesAndSemesterSelector;