import React from 'react';
import type { Course } from '../types';

interface CourseTableProps {
  courses: Course[];
  onDeleteCourse?: (id: number) => void;
  isAdmin: boolean;
}

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const TableRow: React.FC<{ course: Course; index: number; total: number; onDeleteCourse?: (id: number) => void; isAdmin: boolean }> = ({ course, index, total, onDeleteCourse, isAdmin }) => {
    const rowNumber = total - index;
    const formattedFee = new Intl.NumberFormat('fa-IR').format(course.fee);

    const labels = [
        "ردیف", "نام کلاس/کارگاه", "مرکز برگزارکننده",
        "تاریخ شروع", "ظرفیت", "شهریه (تومان)", isAdmin ? "لینک ثبت‌نام" : "ثبت‌نام آنلاین"
    ];

    const data = [
        rowNumber,
        course.classTitle,
        course.centerName,
        course.startDate,
        course.capacity,
        formattedFee,
    ];
    
    // Mobile view structure
    return (
        <tr className="block md:table-row border-b md:border-b-0 border-slate-200 mb-4 md:mb-0 last:mb-0 last:border-b-0 bg-white md:bg-transparent md:hover:bg-slate-50 transition-colors duration-150">
            {data.map((item, i) => (
                <td key={i} className="flex justify-between items-center md:table-cell p-3 md:p-4 text-right md:border-b md:border-slate-200 md:text-slate-600">
                    <span className="font-bold text-slate-500 md:hidden">{labels[i]}:</span>
                    <span>{item}</span>
                </td>
            ))}
            <td className="flex justify-between items-center md:table-cell p-3 md:p-4 text-right md:border-b md:border-slate-200">
                <span className="font-bold text-slate-500 md:hidden">{isAdmin ? "عملیات" : "ثبت‌نام آنلاین"}:</span>
                {isAdmin ? (
                    <div className="flex items-center space-i-4">
                        <a href={course.signupUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">مشاهده لینک</a>
                        <button onClick={() => onDeleteCourse && onDeleteCourse(course.id)} className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium flex items-center">
                            <TrashIcon />
                            حذف
                        </button>
                    </div>
                ) : (
                    <a href={course.signupUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 inline-block w-full text-center md:w-auto">
                        ثبت‌نام آنلاین
                    </a>
                )}
            </td>
        </tr>
    );
};


export const CourseTable: React.FC<CourseTableProps> = ({ courses, onDeleteCourse, isAdmin }) => {
  if (courses.length === 0) {
    return <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg">دوره‌ای ثبت نشده است.</div>;
  }
  
  const headers = ["ردیف", "نام کلاس/کارگاه", "مرکز برگزارکننده", "تاریخ شروع", "ظرفیت", "شهریه (تومان)", isAdmin ? "عملیات" : "ثبت‌نام آنلاین"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-right">
        <thead className="hidden md:table-header-group">
          <tr className="bg-slate-100">
            {headers.map(header => (
                <th key={header} className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider border-b-2 border-slate-200">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
            {courses.map((course, index) => (
                <TableRow key={course.id} course={course} index={index} total={courses.length} onDeleteCourse={onDeleteCourse} isAdmin={isAdmin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};