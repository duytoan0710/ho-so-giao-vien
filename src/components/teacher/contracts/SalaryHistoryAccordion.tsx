
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

interface SalaryRecord {
  id: string;
  effectiveDate?: Date;
  rank: string;
  grade: string;
  salaryCoefficient: string;
  exceedPercentage: string;
  attractionAllowance: string;
  seniorityAllowance: string;
  professionAllowance: string;
  leadershipAllowance: string;
}

const SalaryHistoryAccordion = () => {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([
    { 
      id: '1', 
      effectiveDate: undefined, 
      rank: '', 
      grade: '', 
      salaryCoefficient: '', 
      exceedPercentage: '',
      attractionAllowance: '',
      seniorityAllowance: '',
      professionAllowance: '',
      leadershipAllowance: ''
    }
  ]);

  const addSalaryRecord = () => {
    const newRecord: SalaryRecord = {
      id: Date.now().toString(),
      effectiveDate: undefined,
      rank: '',
      grade: '',
      salaryCoefficient: '',
      exceedPercentage: '',
      attractionAllowance: '',
      seniorityAllowance: '',
      professionAllowance: '',
      leadershipAllowance: ''
    };
    setSalaryRecords([...salaryRecords, newRecord]);
  };

  const deleteSalaryRecord = (id: string) => {
    if (salaryRecords.length > 1) {
      setSalaryRecords(salaryRecords.filter(record => record.id !== id));
    }
  };

  const updateSalaryRecord = (id: string, field: string, value: any) => {
    setSalaryRecords(salaryRecords.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="salary-history">
        <AccordionTrigger className="text-lg font-semibold">
          Lịch sử Lương & Phụ cấp
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {salaryRecords.map((record, index) => (
              <div key={record.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Ngày hưởng</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !record.effectiveDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {record.effectiveDate ? format(record.effectiveDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={record.effectiveDate}
                          onSelect={(date) => updateSalaryRecord(record.id, 'effectiveDate', date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Ngạch/Hạng</Label>
                    <Select value={record.rank} onValueChange={(value) => updateSalaryRecord(record.id, 'rank', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn ngạch/hạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gv-tieu-hoc">Giáo viên Tiểu học</SelectItem>
                        <SelectItem value="gv-thcs">Giáo viên THCS</SelectItem>
                        <SelectItem value="gv-thpt">Giáo viên THPT</SelectItem>
                        <SelectItem value="gv-cao-cap">Giáo viên Cao cấp</SelectItem>
                        <SelectItem value="gv-chinh">Giáo viên Chính</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Bậc lương</Label>
                    <Select value={record.grade} onValueChange={(value) => updateSalaryRecord(record.id, 'grade', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn bậc" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`bac-${i + 1}`}>Bậc {i + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Hệ số lương</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={record.salaryCoefficient}
                      onChange={(e) => updateSalaryRecord(record.id, 'salaryCoefficient', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phần trăm vượt khung (%)</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={record.exceedPercentage}
                      onChange={(e) => updateSalaryRecord(record.id, 'exceedPercentage', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phụ cấp thu hút</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="0"
                      value={record.attractionAllowance}
                      onChange={(e) => updateSalaryRecord(record.id, 'attractionAllowance', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phụ cấp thâm niên</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="0"
                      value={record.seniorityAllowance}
                      onChange={(e) => updateSalaryRecord(record.id, 'seniorityAllowance', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phụ cấp ưu đãi nghề</Label>
                    <Input
                      className="mt-1"
                      type="number"
                      placeholder="0"
                      value={record.professionAllowance}
                      onChange={(e) => updateSalaryRecord(record.id, 'professionAllowance', e.target.value)}
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700">Phụ cấp lãnh đạo</Label>
                      <Input
                        className="mt-1"
                        type="number"
                        placeholder="0"
                        value={record.leadershipAllowance}
                        onChange={(e) => updateSalaryRecord(record.id, 'leadershipAllowance', e.target.value)}
                      />
                    </div>
                    {salaryRecords.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteSalaryRecord(record.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addSalaryRecord} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Quyết định lương
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SalaryHistoryAccordion;
