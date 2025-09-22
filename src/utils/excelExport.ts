import { toast } from 'sonner';
import { saveAs } from 'file-saver';
import { formatDateWithTime } from './formatTime';

export async function exportCustomersExcel(data: any[], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: any) => ({
    ['Firma Adı']: item.customerName || '-',
    ['Firma Kodu']: item.customerCode || '-',
    ['Durum']: item.isActive ? 'Aktif' : 'Pasif',
    ['Oluşturulma Tarihi']: item.createdAt ? formatDateWithTime(item.createdAt) : '-',
    ['Güncellenme Tarihi']: item.updatedAt ? formatDateWithTime(item.updatedAt) : '-'
  }));

  if (!excelData.length) {
    toast.error('Sonuç bulunamadı, Excel dosyası oluşturulamadı.');
    return;
  }

  const ExcelJS = await import('exceljs');

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Firmalar Raporu');

    const headers = Object.keys(excelData[0]);
    worksheet.addRow(headers);
    excelData.forEach((rowData) => {
      worksheet.addRow(headers.map((header) => rowData[header]));
    });

    worksheet.columns.forEach((col, colIdx) => {
      const header = headers[colIdx];
      let maxLength = header.length;
      excelData.forEach((row) => {
        const value = String(row[header] || '');
        if (value.length > maxLength) maxLength = value.length;
      });
      col.width = maxLength + 2;
    });

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const datePart = startDate && endDate ? `_${startDate}_${endDate}` : `_${new Date().toISOString().split('T')[0]}`;
    const fileName = 'Firmalar_Raporu' + datePart + '.xlsx';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, fileName);
    toast.success('Excel dosyası başarıyla oluşturuldu.');
  } catch (error) {
    console.error(error);
    toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
  }
}
