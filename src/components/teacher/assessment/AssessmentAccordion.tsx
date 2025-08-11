
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

const AssessmentAccordion = () => {
  return (
    <Accordion type="single" defaultValue="assessment-info" collapsible>
      <AccordionItem value="assessment-info">
        <AccordionTrigger className="text-lg font-semibold">
          Đánh giá, phân loại
        </AccordionTrigger>
        <AccordionContent>
          <div className="form-grid">
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Chuyên ngành chính [65]</Label>
                <Input className="form-input" defaultValue="Chuyên ngành chính" />
              </div>

              <div className="form-group">
                <Label className="form-label">Trình độ chính [66]</Label>
                <Input className="form-input" defaultValue="Trình độ chính" />
              </div>

              <div className="form-group">
                <Label className="form-label">Cơ sở đào tạo [67]</Label>
                <Input className="form-input" defaultValue="Cơ sở đào tạo" />
              </div>

              <div className="form-group">
                <Label className="form-label">Chuyên ngành khác [68]</Label>
                <Input className="form-input" defaultValue="Chuyên ngành khác" />
              </div>

              <div className="form-group">
                <Label className="form-label">Trình độ khác [69]</Label>
                <Input className="form-input" defaultValue="Trình độ khác" />
              </div>

              <div className="form-group">
                <Label className="form-label">G.viên có c.chỉ tiếng d.tộc t.số [70]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Có</SelectItem>
                    <SelectItem value="no">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Qua trình D.tạo B.dưỡng (Mẫu 2c) [71]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Đánh giá viên chức/ công chức [72]</Label>
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
                <Label className="form-label">Đ.giá chuẩn NN CBQL/GV [73]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Danh hiệu phong tặng [74]</Label>
                <Input className="form-input" placeholder="Nhập danh hiệu" />
              </div>

              <div className="form-group">
                <Label className="form-label">Giáo viên dạy giỏi [75]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="provincial">Cấp tỉnh</SelectItem>
                    <SelectItem value="national">Cấp quốc gia</SelectItem>
                    <SelectItem value="none">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Giáo viên chủ nhiệm giỏi [76]</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="provincial">Cấp tỉnh</SelectItem>
                    <SelectItem value="national">Cấp quốc gia</SelectItem>
                    <SelectItem value="none">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Qua trình công tác [77]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Khen thưởng [78]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Kỷ luật [79]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Quan hệ gia đình [80]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>

              <div className="form-group">
                <Label className="form-label">Quan hệ gia đình bên vợ chồng [81]</Label>
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  + Chi tiết
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AssessmentAccordion;
