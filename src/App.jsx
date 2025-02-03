import React from "react";
import StudentInfo from "./components/StudentInfo.jsx";
import HomeworkCard from "./components/HomeworkCard.jsx";
import ClassesCalendar from "./components/ClassesCalendar.jsx";
import CGPAGraph from "./components/CGPAGraph.jsx";
import AttendanceTable from "./components/AttendanceTable.jsx";
import GradesAndSemesterSelector from "./components/gradeCGPA";
import { Card, CardContent } from "@/components/ui/card";

const App = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Student Info */}
      <StudentInfo />

      {/* Homework & Classes */}
      <div className="grid grid-cols-2 gap-6">
        <HomeworkCard />
        <ClassesCalendar />
      </div>

      {/* Grades & CGPA */}
      {/* Grades & CGPA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Grades and Semester Selector */}
        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <GradesAndSemesterSelector />
          </CardContent>
        </Card>

        {/* Total CGPA */}
        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold mb-2">Total CGPA</h3>
            <p className="text-3xl font-bold text-blue-500">3.8</p>
          </CardContent>
        </Card>

        {/* CGPA Graph */}
      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardContent>
          <CGPAGraph />
        </CardContent>
      </Card>
      
      </div>

      

      {/* Attendance */}
      <AttendanceTable />
    </div>
  );
};

export default App;