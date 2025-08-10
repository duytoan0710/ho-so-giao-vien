
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

interface TrainingProgram {
  id: string;
  programName: string;
  participationDate?: Date;
  trainingType: string;
  hasCertificate: boolean;
}

const TrainingAccordion = () => {
  const [trainings, setTrainings] = useState<TrainingProgram[]>([
    { 
      id: '1', 
      programName: '', 
      participationDate: undefined, 
      trainingType: '', 
      hasCertificate: false
    }
  ]);

  const addTraining = () => {
    const newTraining: TrainingProgram = {
      id: Date.now().toString(),
      programName: '',
      participationDate: undefined,
      trainingType: '',
      hasCertificate: false
    };
    setTrainings([...trainings, newTraining]);
  };

  const deleteTraining = (id: string) => {
    if (trainings.length > 1) {
      setTrainings(trainings.filter(training => training.id !== id));
    }
  };

  const updateTraining = (id: string, field: string, value: any) => {
    setTrainings(trainings.map(training => 
      training.id === id ? { ...training, [field]: value } : training
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="training">
        <AccordionTrigger className="text-lg font-semibold">
          Quá trình Bồi dưỡng chuyên môn
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {trainings.map((training, index) => (
              <div key={training.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Tên chương trình/khóa học</Label>
                    <Input
                      className="mt-1"
                      placeholder="Nhập tên chương trình"
                      value={training.programName}
                      onChange={(e) => updateTraining(training.id, 'programName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Ngày tham gia</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !training.participationDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {training.participationDate ? format(training.participationDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={training.participationDate}
                          onSelect={(date) => updateTraining(training.id, 'participationDate', date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Loại hình bồi dưỡng</Label>
                    <Select value={training.trainingType} onValueChange={(value) => updateTraining(training.id, 'trainingType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn loại hình" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chuyen-mon">Bồi dưỡng chuyên môn</SelectItem>
                        <SelectItem value="nghiep-vu">Bồi dưỡng nghiệp vụ</SelectItem>
                        <SelectItem value="lanh-dao">Bồi dưỡng lãnh đạo quản lý</SelectItem>
                        <SelectItem value="ngoai-ngu">Bồi dưỡng ngoại ngữ</SelectItem>
                        <SelectItem value="tin-hoc">Bồi dưỡng tin học</SelectItem>
                        <SelectItem value="ky-nang">Bồi dưỡng kỹ năng mềm</SelectItem>
                        <SelectItem value="khac">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`certificate-${training.id}`}
                      checked={training.hasCertificate}
                      onCheckedChange={(checked) => updateTraining(training.id, 'hasCertificate', checked === true)}
                    />
                    <Label htmlFor={`certificate-${training.id}`} className="text-sm">
                      Có chứng chỉ
                    </Label>
                  </div>

                  {trainings.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTraining(training.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button onClick={addTraining} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Khóa bồi dưỡng
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TrainingAccordion;
