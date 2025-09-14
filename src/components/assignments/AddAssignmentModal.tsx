import React, { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';

interface SubjectAssignment {
  id: string;
  subject: string;
  hoursPerWeek: number;
  type: 'primary' | 'secondary';
}

interface FormData {
  academicYear: string;
  campus: string;
  teacherId: string;
  classId: string;
  subjectAssignments: SubjectAssignment[];
  roles: {
    isHomeRoomTeacher: boolean;
    isYouthLeader: boolean;
    teachesSpecialNeeds: boolean;
  };
}

interface Teacher {
  id: string;
  name: string;
  code: string;
}

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { toast } = useToast();
  const [isTeacherSearchOpen, setIsTeacherSearchOpen] = useState(false);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    academicYear: '2024-2025',
    campus: '',
    teacherId: '',
    classId: '',
    subjectAssignments: [
      { id: '1', subject: '', hoursPerWeek: 0, type: 'primary' }
    ],
    roles: {
      isHomeRoomTeacher: false,
      isYouthLeader: false,
      teachesSpecialNeeds: false,
    },
  });

  // Mock data
  const teachers: Teacher[] = [
    { id: '1', name: 'Nguyễn Văn An', code: 'GV001' },
    { id: '2', name: 'Trần Thị Bình', code: 'GV002' },
    { id: '3', name: 'Lê Văn Cường', code: 'GV003' },
    { id: '4', name: 'Phạm Thị Dung', code: 'GV004' },
    { id: '5', name: 'Hoàng Văn Em', code: 'GV005' },
  ];

  const subjects = [
    'Toán', 'Ngữ văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học',
    'Lịch sử', 'Địa lý', 'GDCD', 'Tin học', 'Thể dục', 'Âm nhạc', 'Mỹ thuật'
  ];

  const getClassesByCampus = (campus: string) => {
    const classes = {
      'main': ['6A1', '6A2', '7A1', '7A2', '8A1', '8A2', '9A1', '9A2'],
      'branch1': ['6B1', '6B2', '7B1', '7B2', '8B1', '8B2'],
      'branch2': ['6C1', '7C1', '8C1', '9C1'],
    };
    return classes[campus as keyof typeof classes] || [];
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    teacher.code.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const selectedTeacher = teachers.find(t => t.id === formData.teacherId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.academicYear) {
      newErrors.academicYear = 'Vui lòng chọn năm học';
    }
    if (!formData.campus) {
      newErrors.campus = 'Vui lòng chọn cơ sở';
    }
    if (!formData.teacherId) {
      newErrors.teacherId = 'Vui lòng chọn giáo viên';
    }
    if (!formData.classId) {
      newErrors.classId = 'Vui lòng chọn lớp';
    }

    // Validate subject assignments
    if (formData.subjectAssignments.length === 0) {
      newErrors.subjects = 'Phải có ít nhất một môn học được phân công';
    } else {
      formData.subjectAssignments.forEach((assignment, index) => {
        if (!assignment.subject) {
          newErrors[`subject_${index}`] = 'Vui lòng chọn môn học';
        }
        if (assignment.hoursPerWeek <= 0) {
          newErrors[`hours_${index}`] = 'Số tiết phải lớn hơn 0';
        }
      });

      // Check for duplicate subjects
      const subjectCounts = formData.subjectAssignments.reduce((acc, assignment) => {
        if (assignment.subject) {
          acc[assignment.subject] = (acc[assignment.subject] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      Object.entries(subjectCounts).forEach(([subject, count]) => {
        if (count > 1) {
          newErrors.duplicateSubjects = `Môn ${subject} đã được chọn nhiều lần`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Simulate API validation for conflicts
      const hasConflict = Math.random() < 0.1; // 10% chance of conflict for demo
      
      if (hasConflict && formData.roles.isHomeRoomTeacher) {
        toast({
          title: "Lỗi phân công",
          description: `Lớp ${formData.classId} đã có giáo viên chủ nhiệm.`,
          variant: "destructive",
        });
        return;
      }

      onSave(formData);
      toast({
        title: "Thành công",
        description: "Thêm phân công thành công!",
      });
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      academicYear: '2024-2025',
      campus: '',
      teacherId: '',
      classId: '',
      subjectAssignments: [
        { id: '1', subject: '', hoursPerWeek: 0, type: 'primary' }
      ],
      roles: {
        isHomeRoomTeacher: false,
        isYouthLeader: false,
        teachesSpecialNeeds: false,
      },
    });
    setErrors({});
    setTeacherSearch('');
  };

  const addSubjectAssignment = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      subjectAssignments: [
        ...prev.subjectAssignments,
        { id: newId, subject: '', hoursPerWeek: 0, type: 'secondary' }
      ]
    }));
  };

  const removeSubjectAssignment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subjectAssignments: prev.subjectAssignments.filter(assignment => assignment.id !== id)
    }));
  };

  const updateSubjectAssignment = (id: string, field: keyof SubjectAssignment, value: any) => {
    setFormData(prev => ({
      ...prev,
      subjectAssignments: prev.subjectAssignments.map(assignment =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment
      )
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm mới Phân công Giảng dạy</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Year */}
          <div>
            <Label className="text-sm font-medium">
              Năm học <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.academicYear}
              onValueChange={(value) => setFormData(prev => ({ ...prev, academicYear: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
              </SelectContent>
            </Select>
            {errors.academicYear && (
              <p className="text-red-500 text-sm mt-1">{errors.academicYear}</p>
            )}
          </div>

          {/* Campus */}
          <div>
            <Label className="text-sm font-medium">
              Cơ sở <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.campus}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, campus: value, classId: '' }));
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn cơ sở" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Trụ sở chính</SelectItem>
                <SelectItem value="branch1">Phân hiệu 1</SelectItem>
                <SelectItem value="branch2">Phân hiệu 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.campus && (
              <p className="text-red-500 text-sm mt-1">{errors.campus}</p>
            )}
          </div>

          {/* Teacher Search */}
          <div>
            <Label className="text-sm font-medium">
              Giáo viên <span className="text-red-500">*</span>
            </Label>
            <Popover open={isTeacherSearchOpen} onOpenChange={setIsTeacherSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isTeacherSearchOpen}
                  className="w-full justify-between mt-1"
                >
                  {selectedTeacher
                    ? `${selectedTeacher.name} - ${selectedTeacher.code}`
                    : "Tìm kiếm theo tên hoặc mã giáo viên..."
                  }
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Tìm kiếm giáo viên..."
                    value={teacherSearch}
                    onValueChange={setTeacherSearch}
                  />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy giáo viên.</CommandEmpty>
                    <CommandGroup>
                      {filteredTeachers.map((teacher) => (
                        <CommandItem
                          key={teacher.id}
                          value={`${teacher.name} ${teacher.code}`}
                          onSelect={() => {
                            setFormData(prev => ({ ...prev, teacherId: teacher.id }));
                            setIsTeacherSearchOpen(false);
                            setTeacherSearch('');
                          }}
                        >
                          {teacher.name} - {teacher.code}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.teacherId && (
              <p className="text-red-500 text-sm mt-1">{errors.teacherId}</p>
            )}
          </div>

          {/* Class */}
          <div>
            <Label className="text-sm font-medium">
              Lớp <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, classId: value }))}
              disabled={!formData.campus}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn lớp" />
              </SelectTrigger>
              <SelectContent>
                {getClassesByCampus(formData.campus).map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.classId && (
              <p className="text-red-500 text-sm mt-1">{errors.classId}</p>
            )}
          </div>
        </div>

        {/* Subject Assignments */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-sm font-medium">
              Phân công Môn học <span className="text-red-500">*</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSubjectAssignment}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm môn học
            </Button>
          </div>

          <div className="space-y-4">
            {formData.subjectAssignments.map((assignment, index) => (
              <div key={assignment.id} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-4">
                  <Label className="text-sm">Môn học</Label>
                  <Select
                    value={assignment.subject}
                    onValueChange={(value) => updateSubjectAssignment(assignment.id, 'subject', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[`subject_${index}`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`subject_${index}`]}</p>
                  )}
                </div>

                <div className="col-span-3">
                  <Label className="text-sm">Số tiết/tuần</Label>
                  <Input
                    type="number"
                    min="1"
                    value={assignment.hoursPerWeek}
                    onChange={(e) => updateSubjectAssignment(assignment.id, 'hoursPerWeek', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {errors[`hours_${index}`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`hours_${index}`]}</p>
                  )}
                </div>

                <div className="col-span-3">
                  <Label className="text-sm">Loại môn</Label>
                  <Select
                    value={assignment.type}
                    onValueChange={(value: 'primary' | 'secondary') => updateSubjectAssignment(assignment.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Môn chính</SelectItem>
                      <SelectItem value="secondary">Môn phụ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  {formData.subjectAssignments.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubjectAssignment(assignment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors.subjects && (
            <p className="text-red-500 text-sm mt-2">{errors.subjects}</p>
          )}
          {errors.duplicateSubjects && (
            <p className="text-red-500 text-sm mt-2">{errors.duplicateSubjects}</p>
          )}
        </div>

        {/* Roles */}
        <div className="mt-6">
          <Label className="text-sm font-medium mb-3 block">Vai trò</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="homeroom"
                checked={formData.roles.isHomeRoomTeacher}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    roles: { ...prev.roles, isHomeRoomTeacher: !!checked }
                  }))
                }
              />
              <Label htmlFor="homeroom" className="text-sm">Chủ nhiệm</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="youth"
                checked={formData.roles.isYouthLeader}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    roles: { ...prev.roles, isYouthLeader: !!checked }
                  }))
                }
              />
              <Label htmlFor="youth" className="text-sm">Đoàn đội</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="special"
                checked={formData.roles.teachesSpecialNeeds}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    roles: { ...prev.roles, teachesSpecialNeeds: !!checked }
                  }))
                }
              />
              <Label htmlFor="special" className="text-sm">HSKT</Label>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentModal;