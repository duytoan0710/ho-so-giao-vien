
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const EducationAccordion = () => {
  return (
    <Accordion type="single" defaultValue="education-info" collapsible>
      <AccordionItem value="education-info">
        <AccordionTrigger className="text-lg font-semibold">
          Đào tạo
        </AccordionTrigger>
        <AccordionContent>
          <div className="form-grid">
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">KQ B.dưỡng L.xuyên [51]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Xuất sắc</SelectItem>
                    <SelectItem value="good">Tốt</SelectItem>
                    <SelectItem value="satisfactory">Khá</SelectItem>
                    <SelectItem value="needs-improvement">Cần cải thiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">T.độ c.môn n.vụ [52]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Xuất sắc</SelectItem>
                    <SelectItem value="good">Tốt</SelectItem>
                    <SelectItem value="satisfactory">Khá</SelectItem>
                    <SelectItem value="basic">Cơ bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">T.độ LL CT [53]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Xuất sắc</SelectItem>
                    <SelectItem value="good">Tốt</SelectItem>
                    <SelectItem value="satisfactory">Khá</SelectItem>
                    <SelectItem value="basic">Cơ bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">T.độ quản lý GD [54]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Xuất sắc</SelectItem>
                    <SelectItem value="good">Tốt</SelectItem>
                    <SelectItem value="satisfactory">Khá</SelectItem>
                    <SelectItem value="basic">Cơ bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Th.gia BD nghiệp vụ QLGD [55]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="in-progress">Đang tham gia</SelectItem>
                    <SelectItem value="not-attended">Chưa tham gia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Th.gia BD CBQL/GV cốt cán [56]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="in-progress">Đang tham gia</SelectItem>
                    <SelectItem value="not-attended">Chưa tham gia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Th.gia BD thay sách [57]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="in-progress">Đang tham gia</SelectItem>
                    <SelectItem value="not-attended">Chưa tham gia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Ngoại ngữ chính [58]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">Tiếng Anh</SelectItem>
                    <SelectItem value="french">Tiếng Pháp</SelectItem>
                    <SelectItem value="chinese">Tiếng Trung</SelectItem>
                    <SelectItem value="japanese">Tiếng Nhật</SelectItem>
                    <SelectItem value="korean">Tiếng Hàn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">T.độ D.tạo N.Ngữ [59]</Label>
                <Input className="form-input" placeholder="Trình độ đào tạo ngoại ngữ" />
              </div>

              <div className="form-group">
                <Label className="form-label">Nhóm C.Chỉ N.Ngữ [60]</Label>
                <Input className="form-input" placeholder="Nhóm chứng chỉ ngoại ngữ" />
              </div>

              <div className="form-group">
                <Label className="form-label">Loại C.Chỉ N.Ngữ [61]</Label>
                <Input className="form-input" placeholder="Loại chứng chỉ ngoại ngữ" />
              </div>

              <div className="form-group">
                <Label className="form-label">Điểm N.Ngữ [62]</Label>
                <Input className="form-input" placeholder="Điểm ngoại ngữ" />
                <Button variant="outline" className="mt-2 text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Khung N.Lực N.Ngữ [63]</Label>
                <Input className="form-input" placeholder="Khung năng lực ngoại ngữ" />
              </div>

              <div className="form-group">
                <Label className="form-label">T.độ tin học [64]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Cơ bản</SelectItem>
                    <SelectItem value="intermediate">Trung cấp</SelectItem>
                    <SelectItem value="advanced">Nâng cao</SelectItem>
                    <SelectItem value="expert">Chuyên gia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EducationAccordion;
