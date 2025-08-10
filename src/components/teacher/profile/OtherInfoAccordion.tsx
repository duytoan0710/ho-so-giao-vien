
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
import { Switch } from '@/components/ui/switch';

const OtherInfoAccordion = () => {
  const [isPolicyBeneficiary, setIsPolicyBeneficiary] = React.useState(false);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="other-info">
        <AccordionTrigger className="accordion-trigger">
          <span className="text-base font-medium">Thông tin khác</span>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <div className="space-y-6">
            <div className="form-group">
              <Label className="form-label">Năm vào ngành</Label>
              <Input 
                type="number" 
                className="form-input" 
                placeholder="Nhập năm vào ngành giáo dục"
                min="1980"
                max="2024"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="form-label mb-1">Cá nhân thuộc đối tượng chính sách</Label>
                <p className="text-sm text-text-muted">
                  Đánh dấu nếu giáo viên thuộc diện chính sách ưu tiên
                </p>
              </div>
              <Switch
                checked={isPolicyBeneficiary}
                onCheckedChange={setIsPolicyBeneficiary}
              />
            </div>

            <div className="form-group">
              <Label className="form-label">Ghi chú</Label>
              <Textarea 
                className="form-input resize-none" 
                rows={4}
                placeholder="Thông tin bổ sung khác..."
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OtherInfoAccordion;
