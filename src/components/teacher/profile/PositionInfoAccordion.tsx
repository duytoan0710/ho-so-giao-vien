
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PositionInfoAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="position-info">
        <AccordionTrigger className="accordion-trigger">
          <span className="text-lg font-semibold">Vị trí công tác</span>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <div className="form-grid">
            <div className="form-group">
              <Label className="form-label">Nhóm cơ cấu</Label>
              <Select>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Chọn nhóm cơ cấu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leadership">Lãnh đạo</SelectItem>
                  <SelectItem value="professional">Chuyên môn</SelectItem>
                  <SelectItem value="administrative">Hành chính</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label className="form-label">Tên vị trí</Label>
              <Select>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principal">Ban Giám hiệu</SelectItem>
                  <SelectItem value="office">Tổ Văn phòng</SelectItem>
                  <SelectItem value="teacher">Giáo viên</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group lg:col-span-2">
              <Label className="form-label">Tổ Chuyên môn</Label>
              <Select>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Chọn tổ chuyên môn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math-it">Tổ Toán-Tin</SelectItem>
                  <SelectItem value="literature-history">Tổ Văn-Sử-Địa</SelectItem>
                  <SelectItem value="science">Tổ Lý-Hóa-Sinh</SelectItem>
                  <SelectItem value="foreign-language">Tổ Ngoại ngữ</SelectItem>
                  <SelectItem value="physical">Tổ Thể chất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PositionInfoAccordion;
