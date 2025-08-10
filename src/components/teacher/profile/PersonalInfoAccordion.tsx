
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

const PersonalInfoAccordion = () => {
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [idCardDate, setIdCardDate] = React.useState<Date>();

  return (
    <Accordion type="single" defaultValue="personal-info" collapsible>
      <AccordionItem value="personal-info">
        <AccordionTrigger className="accordion-trigger">
          <span className="text-base font-medium">Thông tin cá nhân</span>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <div className="form-grid">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Mã định danh/Số hiệu</Label>
                <Input className="form-input" placeholder="Nhập mã định danh" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày sinh</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !birthDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày sinh"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Giới tính</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Dân tộc</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn dân tộc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kinh">Kinh</SelectItem>
                    <SelectItem value="tay">Tày</SelectItem>
                    <SelectItem value="thai">Thái</SelectItem>
                    <SelectItem value="hoa">Hoa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Tôn giáo</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn tôn giáo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Không</SelectItem>
                    <SelectItem value="buddhist">Phật giáo</SelectItem>
                    <SelectItem value="catholic">Công giáo</SelectItem>
                    <SelectItem value="protestant">Tin lành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Quê quán</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập thông tin quê quán"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số CCCD/CMND</Label>
                <Input className="form-input" placeholder="Nhập số CCCD/CMND" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày cấp CCCD</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !idCardDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {idCardDate ? format(idCardDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày cấp"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={idCardDate}
                      onSelect={setIdCardDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Nơi cấp CCCD</Label>
                <Input className="form-input" placeholder="Nhập nơi cấp CCCD" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Họ và tên</Label>
                <Input className="form-input" placeholder="Nhập họ và tên" defaultValue="Nguyễn Văn An" />
              </div>

              <div className="form-group">
                <Label className="form-label">Quốc tịch</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn quốc tịch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietnam">Việt Nam</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Chỗ ở hiện nay</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập địa chỉ hiện nay"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Email</Label>
                <Input 
                  type="email" 
                  className="form-input" 
                  placeholder="Nhập địa chỉ email"
                  defaultValue="nva@school.edu.vn"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số điện thoại</Label>
                <Input 
                  className="form-input" 
                  placeholder="Nhập số điện thoại"
                  defaultValue="0912345678"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số Sổ bảo hiểm</Label>
                <Input className="form-input" placeholder="Nhập số sổ bảo hiểm" />
              </div>

              <div className="form-group">
                <Label className="form-label">Số tài khoản ngân hàng</Label>
                <Input className="form-input" placeholder="Nhập số tài khoản" />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PersonalInfoAccordion;
