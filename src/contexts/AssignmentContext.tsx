import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  currentLoad: number;
  maxLoad: number;
  qualifiedSubjects: string[];
  isAvailable: boolean;
}

export interface Subject {
  id: string;
  name: string;
  periodsPerWeek: number;
  isRequired: boolean;
}

export interface ClassData {
  id: string;
  name: string;
  grade: number;
  campus: string;
  totalSubjects: number;
  homeroomTeacherId?: string;
  subjectAssignments: Record<string, string>; // subjectId -> teacherId
}

interface AssignmentState {
  teachers: Teacher[];
  classes: ClassData[];
  subjects: Subject[];
  hasUnsavedChanges: boolean;
}

type AssignmentAction =
  | { type: 'SET_TEACHERS'; payload: Teacher[] }
  | { type: 'SET_CLASSES'; payload: ClassData[] }
  | { type: 'SET_SUBJECTS'; payload: Subject[] }
  | { type: 'ASSIGN_HOMEROOM'; payload: { classId: string; teacherId: string } }
  | { type: 'ASSIGN_SUBJECT'; payload: { classId: string; subjectId: string; teacherId: string } }
  | { type: 'REMOVE_ASSIGNMENT'; payload: { classId: string; subjectId?: string; isHomeroom?: boolean } }
  | { type: 'SAVE_CHANGES' }
  | { type: 'UPDATE_TEACHER_LOAD'; payload: { teacherId: string; load: number } };

const initialState: AssignmentState = {
  teachers: [],
  classes: [],
  subjects: [],
  hasUnsavedChanges: false,
};

function assignmentReducer(state: AssignmentState, action: AssignmentAction): AssignmentState {
  switch (action.type) {
    case 'SET_TEACHERS':
      return { ...state, teachers: action.payload };
      
    case 'SET_CLASSES':
      return { ...state, classes: action.payload };
      
    case 'SET_SUBJECTS':
      return { ...state, subjects: action.payload };
      
    case 'ASSIGN_HOMEROOM':
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.classId
            ? { ...cls, homeroomTeacherId: action.payload.teacherId }
            : cls
        ),
        hasUnsavedChanges: true,
      };
      
    case 'ASSIGN_SUBJECT':
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.classId
            ? {
                ...cls,
                subjectAssignments: {
                  ...cls.subjectAssignments,
                  [action.payload.subjectId]: action.payload.teacherId,
                },
              }
            : cls
        ),
        hasUnsavedChanges: true,
      };
      
    case 'REMOVE_ASSIGNMENT':
      return {
        ...state,
        classes: state.classes.map(cls => {
          if (cls.id === action.payload.classId) {
            if (action.payload.isHomeroom) {
              return { ...cls, homeroomTeacherId: undefined };
            } else if (action.payload.subjectId) {
              const { [action.payload.subjectId]: removed, ...rest } = cls.subjectAssignments;
              return { ...cls, subjectAssignments: rest };
            }
          }
          return cls;
        }),
        hasUnsavedChanges: true,
      };
      
    case 'UPDATE_TEACHER_LOAD':
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.teacherId
            ? { ...teacher, currentLoad: action.payload.load }
            : teacher
        ),
      };
      
    case 'SAVE_CHANGES':
      return { ...state, hasUnsavedChanges: false };
      
    default:
      return state;
  }
}

interface AssignmentContextType {
  state: AssignmentState;
  dispatch: React.Dispatch<AssignmentAction>;
  getTeacherAssignments: (teacherId: string) => Array<{
    classId: string;
    className: string;
    role: 'homeroom' | 'subject';
    subjectName?: string;
    periodsPerWeek?: number;
  }>;
  getClassProgress: (classId: string) => { assigned: number; total: number; percentage: number };
  getTeacherWorkload: (teacherId: string) => { current: number; max: number; percentage: number };
  canAssignTeacher: (teacherId: string, classId: string, subjectId?: string) => { canAssign: boolean; conflicts: string[] };
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export function AssignmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Initialize with demo data
  useEffect(() => {
    const demoTeachers: Teacher[] = [
      {
        id: '1',
        name: 'Nguyễn Văn An',
        code: 'GV001',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Toán', 'Tin học'],
        isAvailable: true,
      },
      {
        id: '2',
        name: 'Trần Thị Bình',
        code: 'GV002',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Ngữ văn', 'Lịch sử & Địa lý'],
        isAvailable: true,
      },
      {
        id: '3',
        name: 'Lê Văn Cường',
        code: 'GV003',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Vật lý', 'Toán'],
        isAvailable: true,
      },
      {
        id: '4',
        name: 'Phạm Thị Dung',
        code: 'GV004',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Hóa học', 'Sinh học'],
        isAvailable: true,
      },
      {
        id: '5',
        name: 'Hoàng Minh Tuấn',
        code: 'GV005',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Tiếng Anh'],
        isAvailable: true,
      },
      {
        id: '6',
        name: 'Ngô Thị Linh',
        code: 'GV006',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['GDCD', 'Lịch sử & Địa lý'],
        isAvailable: true,
      },
      {
        id: '7',
        name: 'Đặng Văn Thể',
        code: 'GV007',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        currentLoad: 0,
        maxLoad: 22,
        qualifiedSubjects: ['Thể dục'],
        isAvailable: true,
      },
    ];

    const demoSubjects: Subject[] = [
      { id: 'toan', name: 'Toán', periodsPerWeek: 4, isRequired: true },
      { id: 'nguvan', name: 'Ngữ văn', periodsPerWeek: 5, isRequired: true },
      { id: 'tienganh', name: 'Tiếng Anh', periodsPerWeek: 3, isRequired: true },
      { id: 'lichsudialy', name: 'Lịch sử & Địa lý', periodsPerWeek: 3, isRequired: true },
      { id: 'gdcd', name: 'GDCD', periodsPerWeek: 1, isRequired: true },
      { id: 'tinhoc', name: 'Tin học', periodsPerWeek: 2, isRequired: true },
      { id: 'theduc', name: 'Thể dục', periodsPerWeek: 2, isRequired: true },
    ];

    dispatch({ type: 'SET_TEACHERS', payload: demoTeachers });
    dispatch({ type: 'SET_SUBJECTS', payload: demoSubjects });
  }, []);

  const getTeacherAssignments = (teacherId: string) => {
    const assignments: Array<{
      classId: string;
      className: string;
      role: 'homeroom' | 'subject';
      subjectName?: string;
      periodsPerWeek?: number;
    }> = [];

    state.classes.forEach(cls => {
      // Homeroom assignments
      if (cls.homeroomTeacherId === teacherId) {
        assignments.push({
          classId: cls.id,
          className: cls.name,
          role: 'homeroom',
        });
      }

      // Subject assignments
      Object.entries(cls.subjectAssignments).forEach(([subjectId, assignedTeacherId]) => {
        if (assignedTeacherId === teacherId) {
          const subject = state.subjects.find(s => s.id === subjectId);
          if (subject) {
            assignments.push({
              classId: cls.id,
              className: cls.name,
              role: 'subject',
              subjectName: subject.name,
              periodsPerWeek: subject.periodsPerWeek,
            });
          }
        }
      });
    });

    return assignments;
  };

  const getClassProgress = (classId: string) => {
    const cls = state.classes.find(c => c.id === classId);
    if (!cls) return { assigned: 0, total: 0, percentage: 0 };

    const assigned = Object.keys(cls.subjectAssignments).length + (cls.homeroomTeacherId ? 1 : 0);
    const total = state.subjects.length + 1; // subjects + homeroom
    const percentage = total > 0 ? Math.round((assigned / total) * 100) : 0;

    return { assigned, total, percentage };
  };

  const getTeacherWorkload = (teacherId: string) => {
    const teacher = state.teachers.find(t => t.id === teacherId);
    if (!teacher) return { current: 0, max: 22, percentage: 0 };

    const assignments = getTeacherAssignments(teacherId);
    const current = assignments
      .filter(a => a.role === 'subject')
      .reduce((sum, a) => sum + (a.periodsPerWeek || 0), 0);

    const percentage = teacher.maxLoad > 0 ? Math.round((current / teacher.maxLoad) * 100) : 0;

    return { current, max: teacher.maxLoad, percentage };
  };

  const canAssignTeacher = (teacherId: string, classId: string, subjectId?: string) => {
    const conflicts: string[] = [];
    const teacher = state.teachers.find(t => t.id === teacherId);
    const cls = state.classes.find(c => c.id === classId);

    if (!teacher || !cls) {
      conflicts.push('Giáo viên hoặc lớp không tồn tại');
      return { canAssign: false, conflicts };
    }

    if (subjectId) {
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject && !teacher.qualifiedSubjects.includes(subject.name)) {
        conflicts.push(`${teacher.name} không có chuyên môn dạy ${subject.name}`);
      }

      const workload = getTeacherWorkload(teacherId);
      const subjectPeriods = subject?.periodsPerWeek || 0;
      if (workload.current + subjectPeriods > teacher.maxLoad) {
        conflicts.push(`Vượt quá khối lượng tối đa (${workload.current + subjectPeriods}/${teacher.maxLoad} tiết)`);
      }
    }

    return { canAssign: conflicts.length === 0, conflicts };
  };

  const contextValue: AssignmentContextType = {
    state,
    dispatch,
    getTeacherAssignments,
    getClassProgress,
    getTeacherWorkload,
    canAssignTeacher,
  };

  return (
    <AssignmentContext.Provider value={contextValue}>
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignment() {
  const context = useContext(AssignmentContext);
  if (context === undefined) {
    throw new Error('useAssignment must be used within an AssignmentProvider');
  }
  return context;
}