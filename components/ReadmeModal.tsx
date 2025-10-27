import React from 'react';

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="readme-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="بستن"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="prose prose-slate max-w-none text-right rtl leading-relaxed">
          <h1 id="readme-title" className="text-3xl font-bold text-slate-800 border-b pb-3 mb-4">تقویم آموزشی حرفه‌ای</h1>
          <p>
            این پروژه یک برنامه وب برای مدیریت و نمایش برنامه‌های درسی است که با الهام از یک افزونه وردپرس که در اصل توسط امیرسامان پیرایش‌فر برای <strong>جهاد دانشگاهی دانشگاه علامه طباطبایی</strong> (<a href="https://www.jalameh.ir" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.jalameh.ir</a>) ساخته شده، طراحی شده است.
          </p>
          <p>
            هدف، فراهم کردن یک رابط کاربری ساده اما قدرتمند برای مراکز آموزشی است تا دوره‌های فعال خود را لیست کنند. این دوره‌ها سپس در یک جدول تمیز، واکنش‌گرا و با ناوبری آسان به دانشجویان نمایش داده می‌شود و به آن‌ها امکان می‌دهد جزئیات دوره را مشاهده کرده و برای ثبت‌نام اقدام کنند.
          </p>
          
          <h2 className="text-2xl font-semibold text-slate-700 mt-6 border-b pb-2 mb-3">ویژگی‌ها</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>داشبورد ادمین</strong>: یک رابط کاربری ساده برای افزودن، مشاهده و حذف دوره‌ها.</li>
            <li><strong>جدول دوره‌های پویا</strong>: نمای عمومی که تمام دوره‌های موجود را لیست می‌کند.</li>
            <li><strong>طراحی کاملاً واکنش‌گرا</strong>: طرح‌بندی جدول به طور یکپارچه از دسکتاپ به دستگاه‌های تلفن همراه برای تجربه کاربری بهینه تطبیق می‌یابد.</li>
            <li><strong>پشتیبانی از راست به چپ (RTL)</strong>: رابط کاربری برای زبان‌های راست به چپ مانند فارسی طراحی شده است.</li>
            <li><strong>ثبت‌نام آسان</strong>: هر دوره شامل دکمه "ثبت‌نام آنلاین" است که مستقیماً به URL ثبت‌نام مشخص شده پیوند دارد.</li>
            <li><strong>پشته فناوری مدرن</strong>: ساخته شده با React، TypeScript و Tailwind CSS برای یک برنامه سریع، قابل نگهداری و از نظر بصری جذاب.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-700 mt-6 border-b pb-2 mb-3">چگونه کار می‌کند</h2>
          <ol className="list-decimal pr-6 space-y-2">
            <li><strong>افزودن دوره</strong>: از فرم "افزودن دوره جدید" در بخش ادمین برای وارد کردن جزئیاتی مانند عنوان دوره، مرکز آموزشی، تاریخ شروع، ظرفیت، شهریه و لینک ثبت‌نام استفاده کنید.</li>
            <li><strong>مدیریت دوره‌ها</strong>: "پنل مدیریت دوره‌ها" تمام دوره‌های اضافه شده را نمایش می‌دهد و به مدیران امکان می‌دهد جزئیات را بررسی کرده و در صورت نیاز ورودی‌ها را حذف کنند.</li>
            <li><strong>نمای عمومی</strong>: بخش "پیش‌نمایش تقویم آموزشی" دقیقاً نشان می‌دهد که جدول دوره چگونه برای دانشجویان در وب‌سایت ظاهر می‌شود. این جدول برای جاسازی در هر صفحه وب (در اصل از طریق یک شورت‌کد وردپرس) طراحی شده است.</li>
          </ol>

          <h2 className="text-2xl font-semibold text-slate-700 mt-6 border-b pb-2 mb-3">پشته فناوری</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>فرانت‌اند</strong>: React, TypeScript</li>
            <li><strong>استایل‌دهی</strong>: Tailwind CSS</li>
            <li><strong>زبان</strong>: فارسی (رابط کاربری)، انگلیسی (کدبیس و مستندات)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-700 mt-6 border-b pb-2 mb-3">توسعه‌دهنده</h2>
          <p>این برنامه توسط <strong>امیر سامان پیرایش‌فر</strong> طراحی و توسعه داده شده است.</p>
        </div>
      </div>
    </div>
  );
};
