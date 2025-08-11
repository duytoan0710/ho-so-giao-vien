
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

const PositionInfoAccordion = () => {
  const [recruitmentDate, setRecruitmentDate] = React.useState<Date>();
  const [contractEndDate, setContractEndDate] = React.useState<Date>();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="position-info">
        <AccordionTrigger className="accordion-trigger">
          <span className="text-lg font-semibold">Vị trí việc làm, TCCD</span>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <div className="form-grid">
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Vị trí việc làm [25]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Giáo viên</SelectItem>
                    <SelectItem value="head-teacher">Tổ trưởng tổ chuyên môn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Nhóm chức vụ [26]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership">Lãnh đạo</SelectItem>
                    <SelectItem value="professional">Chuyên môn</SelectItem>
                    <SelectItem value="administrative">Hành chính</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Hình thức hợp đồng [27]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indefinite">Không xác định thời hạn</SelectItem>
                    <SelectItem value="definite">Có thời hạn</SelectItem>
                    <SelectItem value="project">Theo dự án</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày tuyển dụng [28]</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !recruitmentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {recruitmentDate ? format(recruitmentDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={recruitmentDate}
                      onSelect={setRecruitmentDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Số hợp đồng / Quyết định bổ nhiệm [29]</Label>
                <Input className="form-input" placeholder="Nhập số hợp đồng" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày hết hạn hợp đồng / Quyết định bổ nhiệm [30]</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !contractEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {contractEndDate ? format(contractEndDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={contractEndDate}
                      onSelect={setContractEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Cơ quan tuyển dụng [31]</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập tên cơ quan tuyển dụng"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Nghề nghiệp khi được tuyển dụng [32]</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập nghề nghiệp"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Nhiệm vụ kiêm nhiệm [33]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class-advisor">Chủ nhiệm lớp</SelectItem>
                    <SelectItem value="subject-head">Tổ trưởng chuyên môn</SelectItem>
                    <SelectItem value="none">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">S.tiết thực dạy trên tuần [34]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập số tiết"
                  min="0"
                  max="40"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">S.tiết thực k.nhiệm trên tuần [35]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập số tiết"
                  min="0"
                  max="20"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="hiv-training"
                  className="form-checkbox"
                />
                <Label htmlFor="hiv-training" className="form-label mb-0">Đã tập huấn KN sống (HIV, SKSS...) [36]</Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="hskt-training"
                  className="form-checkbox"
                />
                <Label htmlFor="hskt-training" className="form-label mb-0">Dạy HSKT học hòa nhập [37]</Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="family-education"
                  className="form-checkbox"
                />
                <Label htmlFor="family-education" className="form-label mb-0">Th.gia CT b.dưỡng T.xuyên [38]</Label>
              </div>

              <div className="form-group">
                <Label className="form-label">Ngành/Hạng [39]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I">Hạng I</SelectItem>
                    <SelectItem value="II">Hạng II</SelectItem>
                    <SelectItem value="III">Hạng III</SelectItem>
                    <SelectItem value="IV">Hạng IV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Mã số [40]</Label>
                <Input className="form-input" placeholder="Nhập mã số" />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="tccd-training"
                  className="form-checkbox"
                />
                <Label htmlFor="tccd-training" className="form-label mb-0">Có CC bồi dưỡng TCCD [41]</Label>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PositionInfoAccordion;
