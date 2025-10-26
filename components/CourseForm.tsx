
import React, { useState } from 'react';
import type { CourseFormData } from '../types';

interface CourseFormProps {
  onAddCourse: (course: CourseFormData) => void;
}

const initialFormState: CourseFormData = {
  classTitle: '',
  centerName: '',
  startDate: '',
  capacity: '',
  fee: '',
  signupUrl: '',
};

const InputField: React.FC<{ label: string; name: keyof CourseFormData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; required?: boolean; type?: string; }> = ({ label, name, value, onChange, placeholder, required = true, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="block w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
    </div>
);


export const CourseForm: React.FC<CourseFormProps> = ({ onAddCourse }) => {
  const [formData, setFormData] = useState<CourseFormData>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddCourse(formData);
    setFormData(initialFormState);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
      <h2 className="text-2xl font-semibold text-slate-700 mb-4 border-b pb-3">افزودن دوره جدید</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="نام کلاس / کارگاه" name="classTitle" value={formData.classTitle} onChange={handleChange} placeholder="مثال: دوره جامع پایتون" />
        <InputField label="مرکز برگزار کننده" name="centerName" value={formData.centerName} onChange={handleChange} placeholder="مثال: جهاد دانشگاهی" />
        <InputField label="تاریخ شروع" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="مثال: ۱۴۰۳/۰۷/۱۰" />
        <InputField label="ظرفیت" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="مثال: ۲۰ نفر" />
        <InputField label="شهریه (تومان)" name="fee" value={formData.fee} onChange={handleChange} placeholder="فقط عدد وارد کنید" type="number" />
        <InputField label="لینک ثبت‌نام آنلاین" name="signupUrl" value={formData.signupUrl} onChange={handleChange} placeholder="https://example.com/register" type="url" />
        
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mt-4">
          ذخیره اطلاعات
        </button>
      </form>
    </div>
  );
};
