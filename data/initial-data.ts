import type { Course } from '../types';

export const initialCourses: Course[] = [
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
