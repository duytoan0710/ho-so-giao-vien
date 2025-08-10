
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface TrainingRecord {
  id: string;
  major: string;
  school: string;
  graduationYear: number;
}

const TrainingSpecialtyAccordion = () => {
  const [records, setRecords] = useState<TrainingRecord[]>([
    { id: '1', major: '', school: '', graduationYear: new Date().getFullYear() }
  ]);

  const addRecord = () => {
    const newRecord: TrainingRecord = {
      id: Date.now().toString(),
      major: '',
      school: '',
      graduationYear: new Date().getFullYear()
    };
    setRecords([...records, newRecord]);
  };

  const deleteRecord = (id: string) => {
    if (records.length > 1) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const updateRecord = (id: string, field: string, value: any) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="training-specialty">
        <AccordionTrigger className="text-lg font-semibold">
          Chuyên ngành Đào tạo
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {records.map((record, index) => (
              <div key={record.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Chuyên ngành chính</Label>
                    <Select value={record.major} onValueChange={(value) => updateRecord(record.id, 'major', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn chuyên ngành" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toan">Toán học</SelectItem>
                        <SelectItem value="van">Ngữ văn</SelectItem>
                        <SelectItem value="ly">Vật lý</SelectItem>
                        <SelectItem value="hoa">Hóa học</SelectItem>
                        <SelectItem value="sinh">Sinh học</SelectItem>
                        <SelectItem value="su">Lịch sử</SelectItem>
                        <SelectItem value="dia">Địa lý</SelectItem>
                        <SelectItem value="anh">Tiếng Anh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Trường đào tạo</Label>
                    <Input
                      className="mt-1"
                      placeholder="Nhập tên trường"
                      value={record.school}
                      onChange={(e) => updateRecord(record.id, 'school', e.target.value)}
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700">Năm tốt nghiệp</Label>
                      <Input
                        className="mt-1"
                        type="number"
                        min="1980"
                        max="2030"
                        placeholder="2024"
                        value={record.graduationYear}
                        onChange={(e) => updateRecord(record.id, 'graduationYear', parseInt(e.target.value))}
                      />
                    </div>
                    {records.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteRecord(record.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addRecord} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Chuyên ngành
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TrainingSpecialtyAccordion;
