import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Users, BookOpen, CheckCircle, X } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAssignment, AssignmentProvider, type Teacher, type ClassData } from '@/contexts/AssignmentContext';

const BulkAssignmentHubContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state, dispatch, getTeacherAssignments, getClassProgress, getTeacherWorkload, canAssignTeacher } = useAssignment();
  
  // SEO
  useEffect(() => {
    document.title = 'Phân công Giảng dạy Hàng loạt';
    const desc = 'Giao diện phân công giảng dạy hàng loạt theo lớp và giáo viên';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, []);
  
  // Setup state
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [campus, setCampus] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [groupingMode, setGroupingMode] = useState<'class' | 'teacher'>('class');
  
  // Selection state
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [classSearch, setClassSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');

  // Generate demo classes when filters change
  useEffect(() => {
    if (campus) {
      generateDemoClasses();
    }
  }, [campus, gradeLevel]);

  const generateDemoClasses = () => {
    const campusPrefix = campus === 'main' ? 'A' : campus === 'branch1' ? 'B' : 'C';
    const grades = gradeLevel && gradeLevel !== 'all' ? [parseInt(gradeLevel)] : [6, 7, 8, 9];
    
    const demoClasses: ClassData[] = [];
    
    grades.forEach(grade => {
      for (let classNum = 1; classNum <= 3; classNum++) {
        const className = `${grade}${campusPrefix}${classNum}`;
        
        // Pre-assign some subjects randomly for demo
        const subjectAssignments: Record<string, string> = {};
        const shouldAssignSubjects = Math.random() > 0.3;
        
        if (shouldAssignSubjects) {
          state.subjects.forEach(subject => {
            if (Math.random() > 0.4) {
              const qualifiedTeachers = state.teachers.filter(t => 
                t.qualifiedSubjects.includes(subject.name)
              );
              if (qualifiedTeachers.length > 0) {
                subjectAssignments[subject.id] = qualifiedTeachers[Math.floor(Math.random() * qualifiedTeachers.length)].id;
              }
            }
          });
        }
        
        demoClasses.push({
          id: className,
          name: className,
          grade,
          campus,
          totalSubjects: state.subjects.length,
          homeroomTeacherId: Math.random() > 0.4 ? state.teachers[Math.floor(Math.random() * state.teachers.length)].id : undefined,
          subjectAssignments,
        });
      }
    });
    
    dispatch({ type: 'SET_CLASSES', payload: demoClasses });
  };

  const filteredClasses = state.classes.filter(cls =>
    cls.name.toLowerCase().includes(classSearch.toLowerCase())
  );

  const filteredTeachers = state.teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    teacher.code.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const selectedClass = state.classes.find(c => c.id === selectedClassId);
  const selectedTeacher = state.teachers.find(t => t.id === selectedTeacherId);

  const handleAssignSubject = (classId: string, subjectId: string, teacherId: string) => {
    const validation = canAssignTeacher(teacherId, classId, subjectId);
    if (!validation.canAssign) {
      toast({
        title: "Không thể phân công",
        description: validation.conflicts.join(', '),
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: 'ASSIGN_SUBJECT', payload: { classId, subjectId, teacherId } });
    toast({
      title: "Thành công",
      description: "Đã phân công giáo viên dạy môn học",
    });
  };

  const handleAssignHomeroom = (classId: string, teacherId: string) => {
    dispatch({ type: 'ASSIGN_HOMEROOM', payload: { classId, teacherId } });
    toast({
      title: "Thành công", 
      description: "Đã phân công giáo viên chủ nhiệm",
    });
  };

  const handleRemoveAssignment = (classId: string, subjectId?: string, isHomeroom?: boolean) => {
    dispatch({ type: 'REMOVE_ASSIGNMENT', payload: { classId, subjectId, isHomeroom } });
    toast({
      title: "Đã xóa",
      description: "Đã hủy phân công",
    });
  };

  const saveAllChanges = () => {
    dispatch({ type: 'SAVE_CHANGES' });
    toast({
      title: "Thành công",
      description: "Đã lưu tất cả phân công thành công!",
    });
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
                      <SelectItem value="all">Tất cả</SelectItem>
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
                disabled={!state.hasUnsavedChanges}
                className="ml-4"
              >
                {state.hasUnsavedChanges && (
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
                    {filteredClasses.map((cls) => {
                      const progress = getClassProgress(cls.id);
                      const homeroomTeacher = cls.homeroomTeacherId ? state.teachers.find(t => t.id === cls.homeroomTeacherId) : null;
                      
                      return (
                        <Card
                          key={cls.id}
                          className={`cursor-pointer transition-all hover:shadow-sm ${
                            selectedClassId === cls.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedClassId(cls.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{cls.name}</h3>
                              {homeroomTeacher && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  CN
                                </Badge>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {progress.assigned}/{progress.total} phân công hoàn tất
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {progress.percentage}%
                                </span>
                              </div>
                              
                              <Progress 
                                value={progress.percentage}
                                className="h-2"
                              />
                              
                              {progress.percentage === 100 && (
                                <div className="flex items-center text-green-600 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Đã hoàn tất
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="teacher">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm giáo viên..."
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
                    {filteredTeachers.map((teacher) => {
                      const workload = getTeacherWorkload(teacher.id);
                      const assignments = getTeacherAssignments(teacher.id);
                      
                      return (
                        <Card
                          key={teacher.id}
                          className={`cursor-pointer transition-all hover:shadow-sm ${
                            selectedTeacherId === teacher.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedTeacherId(teacher.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium text-sm">{teacher.name}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {teacher.code}
                                  </Badge>
                                </div>
                                
                                <div className="text-xs text-muted-foreground mt-1">
                                  {teacher.qualifiedSubjects.join(', ')}
                                </div>
                                
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">
                                      Đã phân công: {workload.current}/{workload.max} tiết
                                    </span>
                                    <span className="text-muted-foreground">
                                      {workload.percentage}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={workload.percentage}
                                    className="h-1.5"
                                  />
                                  
                                  {assignments.length > 0 && (
                                    <div className="mt-1 text-xs text-muted-foreground">
                                      {assignments.length} lớp được phân công
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 bg-background">
          {groupingMode === 'class' ? (
            selectedClass ? (
              <div className="h-full flex flex-col">
                {/* Workspace Header */}
                <div className="border-b bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Phân công cho lớp {selectedClass.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Khối {selectedClass.grade} • Cơ sở {campus === 'main' ? 'Trụ sở chính' : `Phân hiệu ${campus.slice(-1)}`}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {getClassProgress(selectedClass.id).assigned}/{getClassProgress(selectedClass.id).total} phân công hoàn tất
                        </div>
                        <Progress 
                          value={getClassProgress(selectedClass.id).percentage}
                          className="w-32 h-2 mt-1"
                        />
                      </div>
                      
                      {getClassProgress(selectedClass.id).percentage === 100 && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Hoàn tất
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assignment Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Homeroom Teacher Assignment */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Giáo viên Chủ nhiệm</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          {selectedClass.homeroomTeacherId ? (
                            <div className="flex items-center space-x-3 flex-1">
                              {(() => {
                                const teacher = state.teachers.find(t => t.id === selectedClass.homeroomTeacherId);
                                return teacher ? (
                                  <>
                                    <Avatar>
                                      <AvatarImage src={teacher.avatar} />
                                      <AvatarFallback>
                                        {teacher.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{teacher.name}</div>
                                      <div className="text-sm text-muted-foreground">{teacher.code}</div>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleRemoveAssignment(selectedClass.id, undefined, true)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : null;
                              })()}
                            </div>
                          ) : (
                            <div className="flex-1">
                              <Select onValueChange={(value) => handleAssignHomeroom(selectedClass.id, value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn giáo viên chủ nhiệm..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {state.teachers.map(teacher => (
                                    <SelectItem key={teacher.id} value={teacher.id}>
                                      <div className="flex items-center space-x-2">
                                        <span>{teacher.name}</span>
                                        <Badge variant="outline">{teacher.code}</Badge>
                                        <span className="text-xs text-muted-foreground">
                                          ({getTeacherWorkload(teacher.id).current}/{getTeacherWorkload(teacher.id).max} tiết)
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Subject Assignments */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Phân công môn học</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {state.subjects.map((subject) => {
                            const assignedTeacherId = selectedClass.subjectAssignments[subject.id];
                            const assignedTeacher = assignedTeacherId ? state.teachers.find(t => t.id === assignedTeacherId) : null;
                            const qualifiedTeachers = state.teachers.filter(t => t.qualifiedSubjects.includes(subject.name));
                            
                            return (
                              <div key={subject.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                <div className="w-32">
                                  <div className="font-medium">{subject.name}</div>
                                  <div className="text-sm text-muted-foreground">{subject.periodsPerWeek} tiết/tuần</div>
                                </div>
                                
                                <div className="flex-1">
                                  {assignedTeacher ? (
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={assignedTeacher.avatar} />
                                        <AvatarFallback>
                                          {assignedTeacher.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium text-sm">{assignedTeacher.name}</div>
                                        <div className="text-xs text-muted-foreground">{assignedTeacher.code}</div>
                                      </div>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleRemoveAssignment(selectedClass.id, subject.id)}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Select onValueChange={(value) => handleAssignSubject(selectedClass.id, subject.id, value)}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn giáo viên..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {qualifiedTeachers.map(teacher => {
                                          const workload = getTeacherWorkload(teacher.id);
                                          return (
                                            <SelectItem key={teacher.id} value={teacher.id}>
                                              <div className="flex items-center space-x-2">
                                                <span>{teacher.name}</span>
                                                <Badge variant="outline">{teacher.code}</Badge>
                                                <span className="text-xs text-muted-foreground">
                                                  ({workload.current}/{workload.max} tiết)
                                                </span>
                                              </div>
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Chọn một lớp để bắt đầu phân công</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Chọn lớp từ danh sách bên trái để xem và chỉnh sửa phân công giảng dạy
                  </p>
                </div>
              </div>
            )
          ) : (
            selectedTeacher ? (
              <div className="h-full flex flex-col">
                {/* Teacher Workspace Header */}
                <div className="border-b bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedTeacher.avatar} />
                        <AvatarFallback>
                          {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">
                          Phân công của giáo viên: {selectedTeacher.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedTeacher.code} • Chuyên môn: {selectedTeacher.qualifiedSubjects.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Tổng số tiết: {getTeacherWorkload(selectedTeacher.id).current}/{getTeacherWorkload(selectedTeacher.id).max} tiết/tuần
                      </div>
                      <Progress 
                        value={getTeacherWorkload(selectedTeacher.id).percentage}
                        className="w-32 h-2 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Teacher Assignments Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-4xl mx-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Danh sách phân công hiện tại</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {getTeacherAssignments(selectedTeacher.id).map((assignment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-20">
                                  <Badge variant="secondary">
                                    {assignment.className}
                                  </Badge>
                                </div>
                                
                                <div>
                                  {assignment.role === 'homeroom' ? (
                                    <div>
                                      <div className="font-medium flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                        Giáo viên Chủ nhiệm
                                      </div>
                                      <div className="text-sm text-muted-foreground">Quản lý lớp học</div>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="font-medium">{assignment.subjectName}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {assignment.periodsPerWeek} tiết/tuần
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveAssignment(
                                  assignment.classId,
                                  assignment.role === 'subject' ? state.subjects.find(s => s.name === assignment.subjectName)?.id : undefined,
                                  assignment.role === 'homeroom'
                                )}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          
                          {getTeacherAssignments(selectedTeacher.id).length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <p>Giáo viên chưa được phân công lớp học nào</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Chọn một giáo viên để xem phân công</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Chọn giáo viên từ danh sách bên trái để xem danh sách phân công hiện tại
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const BulkAssignmentHub = () => {
  return (
    <AssignmentProvider>
      <BulkAssignmentHubContent />
    </AssignmentProvider>
  );
};

export default BulkAssignmentHub;