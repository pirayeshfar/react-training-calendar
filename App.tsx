import React, { useState, useCallback } from 'react';
import type { Course, CourseFormData } from './types';
import { CourseForm } from './components/CourseForm';
import { CourseTable } from './components/CourseTable';
import { ReadmeModal } from './components/ReadmeModal';

const initialCourses: Course[] = [
  {
    id: 1,
    classTitle: 'دوره جامع برنامه نویسی وب',
    centerName: 'جهاد دانشگاهی علامه طباطبایی',
    startDate: '۱۴۰۳/۰۵/۱۵',
    capacity: '۲۰ نفر',
    fee: 5500000,
    signupUrl: 'https://jalameh.ir/register/1',
  },
  {
    id: 2,
    classTitle: 'کارگاه آموزش فتوشاپ مقدماتی',
    centerName: 'مرکز آموزش‌های آزاد',
    startDate: '۱۴۰۳/۰۶/۰۱',
    capacity: 'ظرفیت محدود',
    fee: 1200000,
    signupUrl: 'https://jalameh.ir/register/2',
  },
  {
    id: 3,
    classTitle: 'دوره تخصصی مدیریت پروژه',
    centerName: 'جهاد دانشگاهی علامه طباطبایی',
    startDate: '۱۴۰۳/۰۶/۲۰',
    capacity: '۱۵ نفر',
    fee: 4800000,
    signupUrl: 'https://jalameh.ir/register/3',
  },
];


const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  const handleAddCourse = useCallback((courseData: CourseFormData) => {
    setCourses(prevCourses => {
      const newCourse: Course = {
        id: Date.now(),
        ...courseData,
        fee: Number(courseData.fee)
      };
      return [newCourse, ...prevCourses];
    });
  }, []);

  const handleDeleteCourse = useCallback((id: number) => {
    if (window.confirm('آیا از حذف این دوره اطمینان دارید؟')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800">تقویم آموزشی حرفه‌ای</h1>
        <p className="text-slate-500 mt-2">مدیریت و نمایش دوره‌های آموزشی</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CourseForm onAddCourse={handleAddCourse} />
        </div>

        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 border-b pb-3">
                    پنل مدیریت دوره‌ها
                </h2>
                <CourseTable courses={courses} onDeleteCourse={handleDeleteCourse} isAdmin={true} />
            </div>
        </div>
      </main>

      <section className="mt-12">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4 border-b pb-3 text-center">
                پیش‌نمایش تقویم آموزشی برای کاربران سایت
            </h2>
            <p className="text-center text-slate-500 mb-6">این جدول همان چیزی است که کاربران با شورتکد [education_calendar] در سایت مشاهده می‌کنند.</p>
            <CourseTable courses={courses} isAdmin={false} />
        </div>
      </section>

      <footer className="text-center mt-12 py-4 text-slate-500 space-y-2">
        <p>
          <button 
            onClick={() => setIsReadmeOpen(true)} 
            className="text-blue-600 hover:underline font-semibold"
            aria-label="نمایش اطلاعات درباره پروژه"
          >
            درباره پروژه
          </button>
        </p>
        <p>Designed and Developed by <strong>Amir Saman Pirayeshfar</strong>.</p>
        <p className="text-sm">Inspired by the original WordPress plugin for <a href="https://jalameh.ir" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jahad Daneshgahi of Allameh Tabataba'i University</a>.</p>
      </footer>

      <ReadmeModal isOpen={isReadmeOpen} onClose={() => setIsReadmeOpen(false)} />
    </div>
  );
};

export default App;