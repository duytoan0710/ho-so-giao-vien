
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const SalaryAccordion = () => {
  const [retirementDate, setRetirementDate] = React.useState<Date>();

  return (
    <Accordion type="single" defaultValue="salary-info" collapsible>
      <AccordionItem value="salary-info">
        <AccordionTrigger className="text-lg font-semibold">
          Phụ cấp
        </AccordionTrigger>
        <AccordionContent>
          <div className="form-grid">
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Mức phụ cấp thu hút nghề (%) [42]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập phần trăm"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Mức phụ cấp thâm niên (%) [43]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập phần trăm"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Mức phụ cấp ưu đãi nghề (%) [44]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập phần trăm"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Hệ số phụ cấp chức vụ lãnh đạo (%) [45]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập phần trăm"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">D.biến q.trình lương [46]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Bậc lương [47]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Bậc 1</SelectItem>
                    <SelectItem value="2">Bậc 2</SelectItem>
                    <SelectItem value="3">Bậc 3</SelectItem>
                    <SelectItem value="4">Bậc 4</SelectItem>
                    <SelectItem value="5">Bậc 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Phần trăm vượt khung (%) [48]</Label>
                <Input 
                  type="number" 
                  className="form-input" 
                  placeholder="Nhập phần trăm"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Hệ số lương [49]</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  className="form-input" 
                  placeholder="Nhập hệ số lương"
                  min="1"
                  max="10"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày hưởng [50]</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !retirementDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {retirementDate ? format(retirementDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={retirementDate}
                      onSelect={setRetirementDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SalaryAccordion;
