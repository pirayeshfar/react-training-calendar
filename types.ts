
export interface Course {
  id: number;
  classTitle: string;
  centerName: string;
  startDate: string;
  capacity: string;
  fee: number;
  signupUrl: string;
}

export type CourseFormData = Omit<Course, 'id' | 'fee'> & { fee: string };
