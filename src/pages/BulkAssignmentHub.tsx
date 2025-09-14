import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Users, BookOpen, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  currentLoad: number;
  maxLoad: number;
  qualifiedSubjects: string[];
  isAvailable: boolean;
}

interface ClassData {
  id: string;
  name: string;
  grade: number;
  campus: string;
  totalSubjects: number;
  assignedSubjects: number;
  homeroomTeacher?: Teacher;
  subjects: ClassSubject[];
}

interface ClassSubject {
  id: string;
  name: string;
  periodsPerWeek: number;
  isRequired: boolean;
  assignedTeacher?: Teacher;
  hasConflict?: boolean;
  conflictMessage?: string;
}

interface Assignment {
  classId: string;
  subjectId: string;
  teacherId: string;
  role: 'teacher' | 'homeroom';
}

const BulkAssignmentHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Setup state
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [campus, setCampus] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [groupingMode, setGroupingMode] = useState<'class' | 'teacher'>('class');
  
  // Data state
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Selection state
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [classSearch, setClassSearch] = useState('');
  const [teacherSearches, setTeacherSearches] = useState<Record<string, string>>({});

  // Mock data initialization
  useEffect(() => {
    initializeMockData();
  }, [campus, gradeLevel]);

  const initializeMockData = () => {
    // Mock teachers
    const mockTeachers: Teacher[] = [
      {
        id: '1',
        name: 'Nguyễn Văn An',
        code: 'GV001',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        currentLoad: 18,
        maxLoad: 22,
        qualifiedSubjects: ['Toán', 'Tin học'],
        isAvailable: true,
      },
      {
        id: '2',
        name: 'Trần Thị Bình',
        code: 'GV002',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
        currentLoad: 20,
        maxLoad: 22,
        qualifiedSubjects: ['Ngữ văn', 'Lịch sử'],
        isAvailable: true,
      },
      {
        id: '3',
        name: 'Lê Văn Cường',
        code: 'GV003',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        currentLoad: 15,
        maxLoad: 22,
        qualifiedSubjects: ['Vật lý', 'Toán'],
        isAvailable: true,
      },
      {
        id: '4',
        name: 'Phạm Thị Dung',
        code: 'GV004',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        currentLoad: 19,
        maxLoad: 22,
        qualifiedSubjects: ['Hóa học', 'Sinh học'],
        isAvailable: true,
      },
    ];

    // Grade 6 standard subjects
    const grade6Subjects = [
      { name: 'Toán', periodsPerWeek: 4, isRequired: true },
      { name: 'Ngữ văn', periodsPerWeek: 5, isRequired: true },
      { name: 'Tiếng Anh', periodsPerWeek: 3, isRequired: true },
      { name: 'Lịch sử & Địa lý', periodsPerWeek: 3, isRequired: true },
      { name: 'GDCD', periodsPerWeek: 1, isRequired: true },
      { name: 'Tin học', periodsPerWeek: 2, isRequired: true },
      { name: 'Thể dục', periodsPerWeek: 2, isRequired: true },
    ];

    // Generate classes based on filters
    let mockClasses: ClassData[] = [];
    
    if (campus) {
      const campusPrefix = campus === 'main' ? 'A' : campus === 'branch1' ? 'B' : 'C';
      const grades = gradeLevel ? [parseInt(gradeLevel)] : [6, 7, 8, 9];
      
      grades.forEach(grade => {
        for (let classNum = 1; classNum <= 2; classNum++) {
          const className = `${grade}${campusPrefix}${classNum}`;
          const subjects = grade6Subjects.map(subject => ({
            id: `${className}_${subject.name}`,
            name: subject.name,
            periodsPerWeek: subject.periodsPerWeek,
            isRequired: subject.isRequired,
            assignedTeacher: Math.random() > 0.7 ? mockTeachers[Math.floor(Math.random() * mockTeachers.length)] : undefined,
          }));
          
          const assignedCount = subjects.filter(s => s.assignedTeacher).length;
          
          mockClasses.push({
            id: className,
            name: className,
            grade,
            campus,
            totalSubjects: subjects.length,
            assignedSubjects: assignedCount,
            subjects,
            homeroomTeacher: Math.random() > 0.5 ? mockTeachers[Math.floor(Math.random() * mockTeachers.length)] : undefined,
          });
        }
      });
    }

    setClasses(mockClasses);
    setTeachers(mockTeachers);
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(classSearch.toLowerCase())
  );

  const getTeacherSuggestions = (subjectName: string) => {
    return teachers
      .filter(teacher => teacher.qualifiedSubjects.includes(subjectName))
      .sort((a, b) => (a.currentLoad / a.maxLoad) - (b.currentLoad / b.maxLoad));
  };

  const assignTeacherToSubject = (classId: string, subjectId: string, teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    setClasses(prev => prev.map(cls => {
      if (cls.id === classId) {
        const updatedSubjects = cls.subjects.map(subject => {
          if (subject.id === subjectId) {
            return {
              ...subject,
              assignedTeacher: teacher,
              hasConflict: false,
              conflictMessage: undefined,
            };
          }
          return subject;
        });

        const assignedCount = updatedSubjects.filter(s => s.assignedTeacher).length;
        
        return {
          ...cls,
          subjects: updatedSubjects,
          assignedSubjects: assignedCount,
        };
      }
      return cls;
    }));

    setHasUnsavedChanges(true);
    
    // Update selected class if it's the current one
    if (selectedClass?.id === classId) {
      setSelectedClass(prev => {
        if (!prev) return prev;
        const updatedSubjects = prev.subjects.map(subject => {
          if (subject.id === subjectId) {
            return { ...subject, assignedTeacher: teacher };
          }
          return subject;
        });
        return { ...prev, subjects: updatedSubjects };
      });
    }
  };

  const assignHomeroomTeacher = (classId: string, teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    setClasses(prev => prev.map(cls => {
      if (cls.id === classId) {
        return { ...cls, homeroomTeacher: teacher };
      }
      return cls;
    }));

    setHasUnsavedChanges(true);
    
    if (selectedClass?.id === classId) {
      setSelectedClass(prev => prev ? { ...prev, homeroomTeacher: teacher } : prev);
    }
  };

  const saveAllChanges = () => {
    // Simulate saving
    toast({
      title: "Thành công",
      description: "Đã lưu tất cả phân công thành công!",
    });
    setHasUnsavedChanges(false);
  };

  const getProgressColor = (assigned: number, total: number) => {
    const percentage = (assigned / total) * 100;
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Setup Bar */}
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/assignment-management')}
                className="flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <h1 className="text-xl font-semibold">Phân công Giảng dạy Hàng loạt</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div>
                  <Label className="text-sm">Năm học</Label>
                  <Select value={academicYear} onValueChange={setAcademicYear}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Cơ sở</Label>
                  <Select value={campus} onValueChange={setCampus}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Chọn cơ sở" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Trụ sở chính</SelectItem>
                      <SelectItem value="branch1">Phân hiệu 1</SelectItem>
                      <SelectItem value="branch2">Phân hiệu 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Khối lớp</Label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả</SelectItem>
                      <SelectItem value="6">Khối 6</SelectItem>
                      <SelectItem value="7">Khối 7</SelectItem>
                      <SelectItem value="8">Khối 8</SelectItem>
                      <SelectItem value="9">Khối 9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={saveAllChanges}
                disabled={!hasUnsavedChanges}
                className="ml-4"
              >
                {hasUnsavedChanges && (
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
                )}
                Lưu tất cả thay đổi
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Selection Panel */}
        <div className="w-[30%] border-r bg-card">
          <div className="p-4">
            <Tabs value={groupingMode} onValueChange={(value) => setGroupingMode(value as 'class' | 'teacher')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="class" className="text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Theo Lớp
                </TabsTrigger>
                <TabsTrigger value="teacher" className="text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Theo Giáo viên
                </TabsTrigger>
              </TabsList>

              <TabsContent value="class" className="mt-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm lớp..."
                      value={classSearch}
                      onChange={(e) => setClassSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
                    {filteredClasses.map((cls) => (
                      <Card
                        key={cls.id}
                        className={`cursor-pointer transition-all hover:shadow-sm ${
                          selectedClass?.id === cls.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedClass(cls)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{cls.name}</h3>
                            {cls.homeroomTeacher && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                CN
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {cls.assignedSubjects}/{cls.totalSubjects} môn đã phân công
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {Math.round((cls.assignedSubjects / cls.totalSubjects) * 100)}%
                              </span>
                            </div>
                            
                            <Progress 
                              value={(cls.assignedSubjects / cls.totalSubjects) * 100}
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="teacher">
                <div className="text-center text-muted-foreground py-8">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chế độ xem theo giáo viên sẽ được phát triển trong phiên bản tới</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedClass ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Phân công cho lớp {selectedClass.name}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {selectedClass.assignedSubjects}/{selectedClass.totalSubjects} môn đã phân công
                </Badge>
              </div>

              {/* Homeroom Teacher Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Giáo viên Chủ nhiệm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    {selectedClass.homeroomTeacher ? (
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <Avatar>
                          <AvatarImage src={selectedClass.homeroomTeacher.avatar} />
                          <AvatarFallback>
                            {selectedClass.homeroomTeacher.name.split(' ').pop()?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedClass.homeroomTeacher.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedClass.homeroomTeacher.code} • {selectedClass.homeroomTeacher.currentLoad}/{selectedClass.homeroomTeacher.maxLoad} tiết
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => assignHomeroomTeacher(selectedClass.id, '')}
                        >
                          Thay đổi
                        </Button>
                      </div>
                    ) : (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-64 justify-start">
                            <Search className="w-4 h-4 mr-2" />
                            Chọn giáo viên chủ nhiệm...
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="start">
                          <Command>
                            <CommandInput placeholder="Tìm kiếm giáo viên..." />
                            <CommandList>
                              <CommandEmpty>Không tìm thấy giáo viên.</CommandEmpty>
                              <CommandGroup>
                                {teachers.map((teacher) => (
                                  <CommandItem
                                    key={teacher.id}
                                    onSelect={() => assignHomeroomTeacher(selectedClass.id, teacher.id)}
                                  >
                                    <div className="flex items-center space-x-3 w-full">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={teacher.avatar} />
                                        <AvatarFallback>
                                          {teacher.name.split(' ').pop()?.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <p className="font-medium">{teacher.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          {teacher.code} • {teacher.currentLoad}/{teacher.maxLoad} tiết
                                        </p>
                                      </div>
                                      <div className="text-xs">
                                        <div className={`w-2 h-2 rounded-full ${
                                          teacher.currentLoad / teacher.maxLoad < 0.8 ? 'bg-green-500' : 
                                          teacher.currentLoad / teacher.maxLoad < 0.95 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} />
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Subject Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Phân công Môn học
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedClass.subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="grid grid-cols-12 gap-4 items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="col-span-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{subject.name}</span>
                            {subject.isRequired && (
                              <Badge variant="secondary" className="text-xs">Bắt buộc</Badge>
                            )}
                          </div>
                        </div>

                        <div className="col-span-6">
                          {subject.assignedTeacher ? (
                            <div className="flex items-center space-x-3 p-2 bg-green-50 rounded border border-green-200">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={subject.assignedTeacher.avatar} />
                                <AvatarFallback>
                                  {subject.assignedTeacher.name.split(' ').pop()?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{subject.assignedTeacher.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {subject.assignedTeacher.code} • {subject.assignedTeacher.currentLoad}/{subject.assignedTeacher.maxLoad} tiết
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => assignTeacherToSubject(selectedClass.id, subject.id, '')}
                              >
                                Thay đổi
                              </Button>
                            </div>
                          ) : (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                  <Search className="w-4 h-4 mr-2" />
                                  Chọn giáo viên...
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80" align="start">
                                <Command>
                                  <CommandInput placeholder="Tìm kiếm giáo viên..." />
                                  <CommandList>
                                    <CommandEmpty>Không tìm thấy giáo viên.</CommandEmpty>
                                    
                                    {/* Smart suggestions */}
                                    {getTeacherSuggestions(subject.name).length > 0 && (
                                      <CommandGroup heading="Gợi ý phù hợp">
                                        {getTeacherSuggestions(subject.name).map((teacher) => (
                                          <CommandItem
                                            key={teacher.id}
                                            onSelect={() => assignTeacherToSubject(selectedClass.id, subject.id, teacher.id)}
                                          >
                                            <div className="flex items-center space-x-3 w-full">
                                              <Lightbulb className="w-4 h-4 text-amber-500" />
                                              <Avatar className="w-8 h-8">
                                                <AvatarImage src={teacher.avatar} />
                                                <AvatarFallback>
                                                  {teacher.name.split(' ').pop()?.charAt(0)}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div className="flex-1">
                                                <p className="font-medium">{teacher.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                  {teacher.code} • {teacher.currentLoad}/{teacher.maxLoad} tiết
                                                </p>
                                              </div>
                                              <div className="text-xs">
                                                <div className={`w-2 h-2 rounded-full ${
                                                  teacher.currentLoad / teacher.maxLoad < 0.8 ? 'bg-green-500' : 
                                                  teacher.currentLoad / teacher.maxLoad < 0.95 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`} />
                                              </div>
                                            </div>
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    )}

                                    <CommandGroup heading="Tất cả giáo viên">
                                      {teachers.map((teacher) => (
                                        <CommandItem
                                          key={teacher.id}
                                          onSelect={() => assignTeacherToSubject(selectedClass.id, subject.id, teacher.id)}
                                        >
                                          <div className="flex items-center space-x-3 w-full">
                                            <Avatar className="w-8 h-8">
                                              <AvatarImage src={teacher.avatar} />
                                              <AvatarFallback>
                                                {teacher.name.split(' ').pop()?.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                              <p className="font-medium">{teacher.name}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {teacher.code} • {teacher.currentLoad}/{teacher.maxLoad} tiết
                                              </p>
                                            </div>
                                            <div className="text-xs">
                                              <div className={`w-2 h-2 rounded-full ${
                                                teacher.currentLoad / teacher.maxLoad < 0.8 ? 'bg-green-500' : 
                                                teacher.currentLoad / teacher.maxLoad < 0.95 ? 'bg-yellow-500' : 'bg-red-500'
                                              }`} />
                                            </div>
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>

                        <div className="col-span-2">
                          <div className="text-center">
                            <span className="font-medium">{subject.periodsPerWeek}</span>
                            <span className="text-sm text-muted-foreground ml-1">tiết/tuần</span>
                          </div>
                        </div>

                        <div className="col-span-1">
                          {subject.hasConflict && (
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Chọn một lớp để bắt đầu phân công</h3>
                <p className="text-sm">
                  Chọn một lớp từ danh sách bên trái để bắt đầu phân công giáo viên và môn học.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkAssignmentHub;