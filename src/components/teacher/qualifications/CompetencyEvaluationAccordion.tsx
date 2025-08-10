
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CompetencyEvaluation {
  id: string;
  framework: string;
  level: string;
  evaluationDate?: Date;
}

const CompetencyEvaluationAccordion = () => {
  const [evaluations, setEvaluations] = useState<CompetencyEvaluation[]>([
    { id: '1', framework: '', level: '', evaluationDate: undefined }
  ]);

  const addEvaluation = () => {
    const newEvaluation: CompetencyEvaluation = {
      id: Date.now().toString(),
      framework: '',
      level: '',
      evaluationDate: undefined
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
      <AccordionItem value="competency-evaluation">
        <AccordionTrigger className="text-lg font-semibold">
          Đánh giá Năng lực định kỳ
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {evaluations.map((evaluation, index) => (
              <div key={evaluation.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Khung năng lực</Label>
                    <Select value={evaluation.framework} onValueChange={(value) => updateEvaluation(evaluation.id, 'framework', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn khung năng lực" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teaching-competency">Năng lực giảng dạy</SelectItem>
                        <SelectItem value="subject-knowledge">Kiến thức chuyên môn</SelectItem>
                        <SelectItem value="classroom-management">Quản lý lớp học</SelectItem>
                        <SelectItem value="student-assessment">Đánh giá học sinh</SelectItem>
                        <SelectItem value="technology-integration">Tích hợp công nghệ</SelectItem>
                        <SelectItem value="professional-development">Phát triển nghề nghiệp</SelectItem>
                        <SelectItem value="communication">Giao tiếp và hợp tác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Mức độ</Label>
                    <Select value={evaluation.level} onValueChange={(value) => updateEvaluation(evaluation.id, 'level', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn mức độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Xuất sắc</SelectItem>
                        <SelectItem value="good">Tốt</SelectItem>
                        <SelectItem value="satisfactory">Khá</SelectItem>
                        <SelectItem value="needs-improvement">Cần cải thiện</SelectItem>
                        <SelectItem value="unsatisfactory">Không đạt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700">Ngày đánh giá</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !evaluation.evaluationDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {evaluation.evaluationDate ? format(evaluation.evaluationDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={evaluation.evaluationDate}
                            onSelect={(date) => updateEvaluation(evaluation.id, 'evaluationDate', date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {evaluations.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteEvaluation(evaluation.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addEvaluation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Đánh giá
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CompetencyEvaluationAccordion;
