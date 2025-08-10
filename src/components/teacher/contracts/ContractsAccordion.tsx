
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

interface Contract {
  id: string;
  contractNumber: string;
  signDate?: Date;
  expiryDate?: Date;
  contractType: string;
}

const ContractsAccordion = () => {
  const [contracts, setContracts] = useState<Contract[]>([
    { id: '1', contractNumber: '', signDate: undefined, expiryDate: undefined, contractType: '' }
  ]);

  const addContract = () => {
    const newContract: Contract = {
      id: Date.now().toString(),
      contractNumber: '',
      signDate: undefined,
      expiryDate: undefined,
      contractType: ''
    };
    setContracts([...contracts, newContract]);
  };

  const deleteContract = (id: string) => {
    if (contracts.length > 1) {
      setContracts(contracts.filter(contract => contract.id !== id));
    }
  };

  const updateContract = (id: string, field: string, value: any) => {
    setContracts(contracts.map(contract => 
      contract.id === id ? { ...contract, [field]: value } : contract
    ));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="contracts">
        <AccordionTrigger className="text-lg font-semibold">
          Hợp đồng Lao động
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {contracts.map((contract, index) => (
              <div key={contract.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Số hợp đồng</Label>
                    <Input
                      className="mt-1"
                      placeholder="Nhập số hợp đồng"
                      value={contract.contractNumber}
                      onChange={(e) => updateContract(contract.id, 'contractNumber', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Ngày ký</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !contract.signDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {contract.signDate ? format(contract.signDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={contract.signDate}
                          onSelect={(date) => updateContract(contract.id, 'signDate', date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Ngày hết hạn</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !contract.expiryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {contract.expiryDate ? format(contract.expiryDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={contract.expiryDate}
                          onSelect={(date) => updateContract(contract.id, 'expiryDate', date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700">Hình thức Hợp đồng</Label>
                      <Select value={contract.contractType} onValueChange={(value) => updateContract(contract.id, 'contractType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Chọn hình thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Hợp đồng không thời hạn</SelectItem>
                          <SelectItem value="fixed-term">Hợp đồng có thời hạn</SelectItem>
                          <SelectItem value="probation">Hợp đồng thử việc</SelectItem>
                          <SelectItem value="seasonal">Hợp đồng theo mùa vụ</SelectItem>
                          <SelectItem value="project">Hợp đồng theo dự án</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {contracts.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteContract(contract.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addContract} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Hợp đồng
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ContractsAccordion;
