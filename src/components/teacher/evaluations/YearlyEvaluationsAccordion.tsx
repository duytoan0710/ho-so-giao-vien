
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

interface YearlyEvaluation {
  id: string;
  academicYear: string;
  classification: string;
  isExcellentTeacher: boolean;
  isExcellentHomeroom: boolean;
  isExcellentYouthLeader: boolean;
}

const YearlyEvaluationsAccordion = () => {
  const [evaluations, setEvaluations] = useState<YearlyEvaluation[]>([
    { 
      id: '1', 
      academicYear: '', 
      classification: '', 
      isExcellentTeacher: false,
      isExcellentHomeroom: false,
      isExcellentYouthLeader: false
    }
  ]);

  const addEvaluation = () => {
    const newEvaluation: YearlyEvaluation = {
      id: Date.now().toString(),
      academicYear: '',
      classification: '',
      isExcellentTeacher: false,
      isExcellentHomeroom: false,
      isExcellentYouthLeader: false
    };
    setEvaluations([...evaluations, newEvaluation]);
  };

  const deleteEvaluation = (id: string) => {
    if (evaluations.length > 1) {
      setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
    }
  };

  const updateEvaluation = (id: string, field: string, value: any) => {
    setEvaluations(evaluations.map(evaluation => 
      evaluation.id === id ? { ...evaluation, [field]: value } : evaluation
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="yearly-evaluations">
        <AccordionTrigger className="text-lg font-semibold">
          Kết quả Đánh giá cuối năm
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {evaluations.map((evaluation, index) => (
              <div key={evaluation.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Năm học</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="2024"
                      value={evaluation.academicYear}
                      onChange={(e) => updateEvaluation(evaluation.id, 'academicYear', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Xếp loại viên chức</Label>
                    <Select value={evaluation.classification} onValueChange={(value) => updateEvaluation(evaluation.id, 'classification', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn xếp loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xuat-sac">Xuất sắc</SelectItem>
                        <SelectItem value="tot">Tốt</SelectItem>
                        <SelectItem value="kha">Khá</SelectItem>
                        <SelectItem value="trung-binh">Trung bình</SelectItem>
                        <SelectItem value="yeu">Yếu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`excellent-teacher-${evaluation.id}`}
                      checked={evaluation.isExcellentTeacher}
                      onCheckedChange={(checked) => updateEvaluation(evaluation.id, 'isExcellentTeacher', checked === true)}
                    />
                    <Label htmlFor={`excellent-teacher-${evaluation.id}`} className="text-sm">
                      Đạt GVDG (Giáo viên dạy giỏi)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`excellent-homeroom-${evaluation.id}`}
                      checked={evaluation.isExcellentHomeroom}
                      onCheckedChange={(checked) => updateEvaluation(evaluation.id, 'isExcellentHomeroom', checked === true)}
                    />
                    <Label htmlFor={`excellent-homeroom-${evaluation.id}`} className="text-sm">
                      Đạt GVCN giỏi (Giáo viên chủ nhiệm giỏi)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`excellent-youth-${evaluation.id}`}
                      checked={evaluation.isExcellentYouthLeader}
                      onCheckedChange={(checked) => updateEvaluation(evaluation.id, 'isExcellentYouthLeader', checked === true)}
                    />
                    <Label htmlFor={`excellent-youth-${evaluation.id}`} className="text-sm">
                      Đạt TPT đội giỏi (Tổng phụ trách đội giỏi)
                    </Label>
                  </div>
                </div>

                {evaluations.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteEvaluation(evaluation.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button onClick={addEvaluation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Kết quả
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default YearlyEvaluationsAccordion;
