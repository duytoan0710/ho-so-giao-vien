
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Plus, Trash2 } from 'lucide-react';

interface Assignment {
  id: string;
  academicYear: string;
  className: string;
  mainSubject: string;
  mainHours: string;
  secondarySubject: string;
  secondaryHours: string;
  sessionsPerDay: string;
  isHomeRoomTeacher: boolean;
  teachesSpecialNeeds: boolean;
  isYouthLeader: boolean;
}

interface CampusAssignmentsAccordionProps {
  campusName: string;
}

const CampusAssignmentsAccordion: React.FC<CampusAssignmentsAccordionProps> = ({ campusName }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: '1', 
      academicYear: '', 
      className: '', 
      mainSubject: '', 
      mainHours: '', 
      secondarySubject: '', 
      secondaryHours: '', 
      sessionsPerDay: '',
      isHomeRoomTeacher: false,
      teachesSpecialNeeds: false,
      isYouthLeader: false
    }
  ]);

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      academicYear: '',
      className: '',
      mainSubject: '',
      mainHours: '',
      secondarySubject: '',
      secondaryHours: '',
      sessionsPerDay: '',
      isHomeRoomTeacher: false,
      teachesSpecialNeeds: false,
      isYouthLeader: false
    };
    setAssignments([...assignments, newAssignment]);
  };

  const deleteAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  const updateAssignment = (id: string, field: string, value: any) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id ? { ...assignment, [field]: value } : assignment
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`campus-${campusName}`}>
        <AccordionTrigger className="text-lg font-semibold">
          Phân công tại: {campusName}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={assignment.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Năm học</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="2024"
                      value={assignment.academicYear}
                      onChange={(e) => updateAssignment(assignment.id, 'academicYear', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Lớp học</Label>
                    <Select value={assignment.className} onValueChange={(value) => updateAssignment(assignment.id, 'className', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn lớp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6a1">6A1</SelectItem>
                        <SelectItem value="6a2">6A2</SelectItem>
                        <SelectItem value="7a1">7A1</SelectItem>
                        <SelectItem value="7a2">7A2</SelectItem>
                        <SelectItem value="8a1">8A1</SelectItem>
                        <SelectItem value="8a2">8A2</SelectItem>
                        <SelectItem value="9a1">9A1</SelectItem>
                        <SelectItem value="9a2">9A2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Môn dạy chính</Label>
                    <Select value={assignment.mainSubject} onValueChange={(value) => updateAssignment(assignment.id, 'mainSubject', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn môn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toan">Toán</SelectItem>
                        <SelectItem value="van">Ngữ văn</SelectItem>
                        <SelectItem value="anh">Tiếng Anh</SelectItem>
                        <SelectItem value="ly">Vật lý</SelectItem>
                        <SelectItem value="hoa">Hóa học</SelectItem>
                        <SelectItem value="sinh">Sinh học</SelectItem>
                        <SelectItem value="su">Lịch sử</SelectItem>
                        <SelectItem value="dia">Địa lý</SelectItem>
                        <SelectItem value="gdcd">GDCD</SelectItem>
                        <SelectItem value="tin">Tin học</SelectItem>
                        <SelectItem value="td">Thể dục</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Số tiết chính/tuần</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="0"
                      value={assignment.mainHours}
                      onChange={(e) => updateAssignment(assignment.id, 'mainHours', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Môn dạy kiêm nhiệm</Label>
                    <Select value={assignment.secondarySubject} onValueChange={(value) => updateAssignment(assignment.id, 'secondarySubject', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn môn (tùy chọn)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Không có</SelectItem>
                        <SelectItem value="toan">Toán</SelectItem>
                        <SelectItem value="van">Ngữ văn</SelectItem>
                        <SelectItem value="anh">Tiếng Anh</SelectItem>
                        <SelectItem value="ly">Vật lý</SelectItem>
                        <SelectItem value="hoa">Hóa học</SelectItem>
                        <SelectItem value="sinh">Sinh học</SelectItem>
                        <SelectItem value="su">Lịch sử</SelectItem>
                        <SelectItem value="dia">Địa lý</SelectItem>
                        <SelectItem value="gdcd">GDCD</SelectItem>
                        <SelectItem value="tin">Tin học</SelectItem>
                        <SelectItem value="td">Thể dục</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Số tiết kiêm nhiệm/tuần</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="0"
                      value={assignment.secondaryHours}
                      onChange={(e) => updateAssignment(assignment.id, 'secondaryHours', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Số buổi dạy trên ngày</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="1"
                      value={assignment.sessionsPerDay}
                      onChange={(e) => updateAssignment(assignment.id, 'sessionsPerDay', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`homeroom-${assignment.id}`}
                      checked={assignment.isHomeRoomTeacher}
                      onCheckedChange={(checked) => updateAssignment(assignment.id, 'isHomeRoomTeacher', checked === true)}
                    />
                    <Label htmlFor={`homeroom-${assignment.id}`} className="text-sm">
                      Là giáo viên chủ nhiệm của lớp này
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`special-${assignment.id}`}
                      checked={assignment.teachesSpecialNeeds}
                      onCheckedChange={(checked) => updateAssignment(assignment.id, 'teachesSpecialNeeds', checked === true)}
                    />
                    <Label htmlFor={`special-${assignment.id}`} className="text-sm">
                      Dạy học sinh khuyết tật
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`youth-${assignment.id}`}
                      checked={assignment.isYouthLeader}
                      onCheckedChange={(checked) => updateAssignment(assignment.id, 'isYouthLeader', checked === true)}
                    />
                    <Label htmlFor={`youth-${assignment.id}`} className="text-sm">
                      Chuyên trách đoàn đội
                    </Label>
                  </div>
                </div>

                {assignments.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAssignment(assignment.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button onClick={addAssignment} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm phân công
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CampusAssignmentsAccordion;
