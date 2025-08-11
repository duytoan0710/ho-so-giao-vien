
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

const PersonalInfoAccordion = () => {
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [idCardDate, setIdCardDate] = React.useState<Date>();
  const [isPartyMember, setIsPartyMember] = React.useState(false);
  const [partyProbationDate, setPartyProbationDate] = React.useState<Date>();
  const [partyOfficialDate, setPartyOfficialDate] = React.useState<Date>();

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
                <Label className="form-label">Họ và tên [1]</Label>
                <Input className="form-input" placeholder="Nhập họ và tên" defaultValue="Nguyễn Văn An" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày sinh [2]</Label>
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
                <Label className="form-label">Giới tính [3]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Trạng thái CB [4]</Label>
                <Select defaultValue="active">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Đang làm việc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang làm việc</SelectItem>
                    <SelectItem value="retired">Đã nghỉ việc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="is-tuyen-moi"
                  className="form-checkbox"
                />
                <Label htmlFor="is-tuyen-moi" className="form-label mb-0">Là tuyển mới [4.1]</Label>
              </div>

              <div className="form-group">
                <Label className="form-label">Số CMND/CCCD [5]</Label>
                <Input className="form-input" placeholder="Nhập số CCCD/CMND" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày cấp [6]</Label>
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
                <Label className="form-label">Nơi cấp [7]</Label>
                <Input className="form-input" placeholder="Nhập nơi cấp CCCD" />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="vneid-level2"
                  className="form-checkbox"
                />
                <Label htmlFor="vneid-level2" className="form-label mb-0">VNeID mức độ 2 [8]</Label>
              </div>

              <div className="form-group">
                <Label className="form-label">Số định danh cá nhân [9]</Label>
                <Input className="form-input" placeholder="Nhập số định danh" />
              </div>

              <div className="form-group">
                <Label className="form-label">Email [10]</Label>
                <Input 
                  type="email" 
                  className="form-input" 
                  placeholder="Nhập địa chỉ email"
                  defaultValue="nva@school.edu.vn"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Điện thoại [11]</Label>
                <Input 
                  className="form-input" 
                  placeholder="Nhập số điện thoại"
                  defaultValue="0912345678"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Dân tộc [12]</Label>
                <Select defaultValue="kinh">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Kinh" />
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
                <Label className="form-label">Tôn giáo [13]</Label>
                <Select defaultValue="none">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Không" />
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
                <Label className="form-label">Số sổ BHXH [14]</Label>
                <Input className="form-input" placeholder="Nhập số sổ bảo hiểm" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="is-doan-vien"
                  className="form-checkbox"
                />
                <Label htmlFor="is-doan-vien" className="form-label mb-0">Là Đoàn viên [15]</Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="is-dang-vien"
                  checked={isPartyMember}
                  onCheckedChange={(checked) => setIsPartyMember(checked === true)}
                  className="form-checkbox"
                />
                <Label htmlFor="is-dang-vien" className="form-label mb-0">Là Đảng viên [16]</Label>
              </div>

              {isPartyMember && (
                <>
                  <div className="form-group">
                    <Label className="form-label">Ngày vào đảng dự bị [17]</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "form-input justify-start text-left font-normal",
                            !partyProbationDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {partyProbationDate ? format(partyProbationDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={partyProbationDate}
                          onSelect={setPartyProbationDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="form-group">
                    <Label className="form-label">Ngày vào đảng chính thức [18]</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "form-input justify-start text-left font-normal",
                            !partyOfficialDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {partyOfficialDate ? format(partyOfficialDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={partyOfficialDate}
                          onSelect={setPartyOfficialDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}

              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Thông tin tài khoản ngân hàng</h4>
                
                <div className="form-group">
                  <Label className="form-label">Ngân hàng [19]</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietcombank">Vietcombank</SelectItem>
                      <SelectItem value="techcombank">Techcombank</SelectItem>
                      <SelectItem value="bidv">BIDV</SelectItem>
                      <SelectItem value="agribank">Agribank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <Label className="form-label">Mã số thuế [20]</Label>
                  <Input className="form-input" placeholder="Nhập mã số thuế" />
                </div>
              </div>

              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Thông tin cư trú</h4>
                
                <div className="form-group">
                  <Label className="form-label">Nơi thường trú [21]</Label>
                  <Select defaultValue="hcm">
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Thành phố Hồ Chí Minh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hcm">Thành phố Hồ Chí Minh</SelectItem>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <Label className="form-label">Quê quán [22]</Label>
                  <Select defaultValue="hcm">
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Thành phố Hồ Chí Minh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hcm">Thành phố Hồ Chí Minh</SelectItem>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <Label className="form-label">Nơi khai sinh [23]</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Chọn theo tỉnh/thành phố Nơi khai sinh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hcm">Thành phố Hồ Chí Minh</SelectItem>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PersonalInfoAccordion;
