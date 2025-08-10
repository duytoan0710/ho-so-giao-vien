
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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

const PartyInfoAccordion = () => {
  const [isPartyMember, setIsPartyMember] = React.useState(false);
  const [partyOfficialDate, setPartyOfficialDate] = React.useState<Date>();
  const [partyProbationDate, setPartyProbationDate] = React.useState<Date>();
  const [unionDate, setUnionDate] = React.useState<Date>();
  const [militaryDate, setMilitaryDate] = React.useState<Date>();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="party-info">
        <AccordionTrigger className="accordion-trigger">
          <span className="text-base font-medium">Thông tin Đảng & Đoàn thể</span>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="party-member"
                checked={isPartyMember}
                onCheckedChange={(checked) => setIsPartyMember(checked === true)}
              />
              <Label htmlFor="party-member" className="form-label mb-0">Là đảng viên</Label>
            </div>

            {isPartyMember && (
              <div className="form-grid animate-slide-in">
                <div className="form-group">
                  <Label className="form-label">Ngày vào đảng chính thức</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "form-input justify-start text-left font-normal",
                          !partyOfficialDate && "text-text-muted"
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="form-group">
                  <Label className="form-label">Ngày vào đảng dự bị</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "form-input justify-start text-left font-normal",
                          !partyProbationDate && "text-text-muted"
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <Label className="form-label">Ngày vào đoàn</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !unionDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {unionDate ? format(unionDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={unionDate}
                      onSelect={setUnionDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày nhập ngũ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !militaryDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {militaryDate ? format(militaryDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={militaryDate}
                      onSelect={setMilitaryDate}
                      initialFocus
                      className="pointer-events-auto"
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

export default PartyInfoAccordion;
