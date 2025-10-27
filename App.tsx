import React, { useState, useCallback, useEffect } from 'react';
import type { Course, CourseFormData } from './types';
import { CourseForm } from './components/CourseForm';
import { CourseTable } from './components/CourseTable';
import { ReadmeModal } from './components/ReadmeModal';
import { Toast } from './components/Toast';
import { ConfirmationModal } from './components/ConfirmationModal';
import { initialCourses } from './data/initial-data';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const savedCourses = window.localStorage.getItem('courses');
      return savedCourses ? JSON.parse(savedCourses) : initialCourses;
    } catch (error) {
      console.error("Could not parse courses from localStorage", error);
      return initialCourses;
    }
  });

  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({ message: '', type: 'success', show: false });
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error("Could not save courses to localStorage", error);
    }
  }, [courses]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true });
  };

  const handleAddCourse = useCallback((courseData: CourseFormData) => {
    setCourses(prevCourses => {
      const newCourse: Course = {
        id: Date.now(),
        ...courseData,
        fee: Number(courseData.fee)
      };
      return [newCourse, ...prevCourses];
    });
    showToast('دوره با موفقیت اضافه شد.', 'success');
  }, []);

  const handleDeleteRequest = useCallback((id: number) => {
    setCourseToDelete(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (courseToDelete !== null) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseToDelete));
      setCourseToDelete(null);
      showToast('دوره با موفقیت حذف شد.', 'error');
    }
  }, [courseToDelete]);

  const cancelDelete = () => {
    setCourseToDelete(null);
  };

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
                <CourseTable courses={courses} onDeleteCourse={handleDeleteRequest} isAdmin={true} />
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
      
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <ConfirmationModal
        isOpen={courseToDelete !== null}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="تایید حذف دوره"
        message="آیا از حذف این دوره اطمینان دارید؟ این عمل قابل بازگشت نیست."
      />
    </div>
  );
};

export default App;