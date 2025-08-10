
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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

interface ITCertificate {
  id: string;
  type: string;
  issueDate?: Date;
}

const ITCertificatesAccordion = () => {
  const [certificates, setCertificates] = useState<ITCertificate[]>([
    { id: '1', type: '', issueDate: undefined }
  ]);

  const addCertificate = () => {
    const newCertificate: ITCertificate = {
      id: Date.now().toString(),
      type: '',
      issueDate: undefined
    };
    setCertificates([...certificates, newCertificate]);
  };

  const deleteCertificate = (id: string) => {
    if (certificates.length > 1) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  const updateCertificate = (id: string, field: string, value: any) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="it-certificates">
        <AccordionTrigger className="text-lg font-semibold">
          Chứng chỉ Tin học
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {certificates.map((certificate, index) => (
              <div key={certificate.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Loại chứng chỉ</Label>
                    <Select value={certificate.type} onValueChange={(value) => updateCertificate(certificate.id, 'type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn loại chứng chỉ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ic3">IC3 (Internet and Computing Core)</SelectItem>
                        <SelectItem value="mos">MOS (Microsoft Office Specialist)</SelectItem>
                        <SelectItem value="icdl">ICDL (International Computer Driving License)</SelectItem>
                        <SelectItem value="basic">Tin học cơ bản</SelectItem>
                        <SelectItem value="advanced">Tin học nâng cao</SelectItem>
                        <SelectItem value="office">Ứng dụng văn phòng</SelectItem>
                        <SelectItem value="programming">Lập trình cơ bản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700">Ngày cấp</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !certificate.issueDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {certificate.issueDate ? format(certificate.issueDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={certificate.issueDate}
                            onSelect={(date) => updateCertificate(certificate.id, 'issueDate', date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {certificates.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteCertificate(certificate.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addCertificate} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Chứng chỉ
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ITCertificatesAccordion;
