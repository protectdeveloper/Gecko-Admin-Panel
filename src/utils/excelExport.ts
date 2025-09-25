import { toast } from 'sonner';
import { saveAs } from 'file-saver';
import { formatDateWithTime } from './formatTime';
import { GetManagementMachinesDTO } from '@/api/Machine/Machine.types';
import { GetManagementCustomersDTO } from '@/api/Customer/Customer.types';
import { GetManagementPackageDTO } from '@/api/Package/Package.types';
import { GetManagementPublicHolidayDTO } from '@/api/PublicHoliday/PublicHoliday.types';
import { GetManagementAccessMethodDTO } from '@/api/AccessMethod/AccessMethod.types';
import { GetManagementPackageTypeDTO } from '@/api/PackageType/PackageType.types';
import { GetManagementConnectionDTO } from '@/api/Connection/Connection.types';
import { GetManagementPackageContentDTO } from '@/api/PackageContent/PackageContent.types';
import { GetManagementMachineTypesDTO } from '@/api/MachineType/MachineType.types';
import { GetManagementCustomerMachineDTO } from '@/api/CustomerMachine/CustomerMachine.types';

export async function exportCustomersExcel(data: GetManagementCustomersDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementCustomersDTO['data'][0]) => ({
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

export async function exportMachinesExcel(data: GetManagementMachinesDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementMachinesDTO['data'][0]) => ({
    ['Bağlantı Adı']: item.connectionName || '-',
    ['Seri Numarası']: item.serialNumber || '-',
    ['IP Adresi']: item.ipAddress || '-',
    ['Firmware Versiyonu']: item.firmwareVersion || '-',
    ['Antipassback']: item.antipassback ? 'Açık' : 'Kapalı',
    ['Online Durumu']: item.isOnline ? 'Online' : 'Offline',
    ['Pass Delay Var mı?']: item.passDelay ? 'Evet' : 'Hayır',
    ['Pass Delay Süresi']: item.passDelayDuration + ' sn',
    ['Giriş Okuma']: item.entryReadingEnabled ? 'Açık' : 'Kapalı',
    ['Çıkış Okuma']: item.exitReadingEnabled ? 'Açık' : 'Kapalı',
    ['Durum']: item.isActive ? 'Aktif' : 'Pasif',
    ['Role Tetikleme Süresi']: item.relayTriggerDuration + ' sn',
    ['Zamanlayıcı Aralığı']: item.timerInterval || '-',
    ['Yeniden Başlatma Zamanı']: item.restartTime || '-',
    ['Ses Durumu']: item.hasSound ? 'Açık' : 'Kapalı',
    ['Ses Seviyesi']: item.volumeLevel || '-',
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
    const worksheet = workbook.addWorksheet('Makineler Raporu');

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
    const fileName = 'Makineler_Raporu' + datePart + '.xlsx';

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

export async function exportPackagesExcel(data: GetManagementPackageDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementPackageDTO['data'][0]) => ({
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
    const worksheet = workbook.addWorksheet('Paketler Raporu');

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
    const fileName = 'Paketler_Raporu' + datePart + '.xlsx';

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

export async function exportPublicHolidaysExcel(data: GetManagementPublicHolidayDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementPublicHolidayDTO['data'][0]) => ({
    ['Tatil Adı']: item.holidayName || '-',
    ['Başlangıç Tarihi']: item.startTime ? formatDateWithTime(item.startTime) : '-',
    ['Bitiş Tarihi']: item.endTime ? formatDateWithTime(item.endTime) : '-'
  }));

  if (!excelData.length) {
    toast.error('Sonuç bulunamadı, Excel dosyası oluşturulamadı.');
    return;
  }

  const ExcelJS = await import('exceljs');

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tatil Raporu');

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
    const fileName = 'Tatil_Raporu' + datePart + '.xlsx';

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

export async function exportAccessMethodsExcel(data: GetManagementAccessMethodDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementAccessMethodDTO['data'][0]) => ({
    ['Geçiş Yöntemi Adı']: item.methodName || '-',
    ['Açıklama']: item.description || '-',
    ['Sistem Adı']: item.systemName || '-',
    ['Tanımlayıcı Kod']: item.identifierCode || '-',
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
    const worksheet = workbook.addWorksheet('Geçiş Yöntemleri Raporu');

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
    const fileName = 'Geçiş_Yöntemleri_Raporu' + datePart + '.xlsx';

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

export async function exportPackageTypesExcel(data: GetManagementPackageTypeDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementPackageTypeDTO['data'][0]) => ({
    ['Paket Tipi']: item.typeName || '-',
    ['Sistem Adı']: item.systemName || '-',
    ['Açıklama']: item.description || '-',
    ['Kategori Adı']: item.categoryName || '-',
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
    const worksheet = workbook.addWorksheet('Paket Tipleri Raporu');

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
    const fileName = 'Paket_Tipleri_Raporu' + datePart + '.xlsx';

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

export async function exportConnectionsExcel(data: GetManagementConnectionDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementConnectionDTO['data'][0]) => ({
    ['Bağlantı Türü']: item.connectionType || '-',
    ['Bağlantı Dizesi']: item.connectionString || '-',
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
    const worksheet = workbook.addWorksheet('Bağlantılar Raporu');

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
    const fileName = 'Bağlantılar_Raporu' + datePart + '.xlsx';

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

export async function exportPackageContentExcel(data: GetManagementPackageContentDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementPackageContentDTO['data'][0]) => ({
    ['Paket Adı']: item.packageName || '-',
    ['Paket Tipi Adı']: item.packageTypeName || '-',
    ['Miktar']: item.quantity || '-',
    ['Birim Fiyatı']: item.unitPrice || '-',
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
    const worksheet = workbook.addWorksheet('Bağlantılar Raporu');

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
    const fileName = 'Bağlantılar_Raporu' + datePart + '.xlsx';

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

export async function exportMachinesTypesExcel(data: GetManagementMachineTypesDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementMachineTypesDTO['data'][0]) => ({
    ['Makine Tipi Adı']: item.typeName || '-',
    ['Sistem Adı']: item.systemName || '-',
    ['Açıklama']: item.description || '-',
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
    const worksheet = workbook.addWorksheet('Makine Tipleri Raporu');

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
    const fileName = 'Makine_Tipleri_Raporu' + datePart + '.xlsx';

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

export async function exportCustomersMachinesExcel(data: GetManagementCustomerMachineDTO['data'], searchParams: URLSearchParams) {
  const excelData: Record<string, any>[] = data.map((item: GetManagementCustomerMachineDTO['data'][0]) => ({
    ['Makine Adı']: item.machineName || '-',
    ['Açıklama']: item.description || '-',
    ['Montaj Adı']: item.assemblyName || '-',
    ['Tolerance (metre)']: item.tolerance || '-',
    ['Latitude (derece)']: item.latitude || '-',
    ['Longitude (derece)']: item.longitude || '-',
    ['Online Durumu']: item.isOnline ? 'Online' : 'Offline',
    ['TAS Durumu']: item.isTasEnabled ? 'Enabled' : 'Disabled',
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
    const worksheet = workbook.addWorksheet('Firma Makineleri Raporu');

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
    const fileName = 'Firma_Makineleri_Raporu' + datePart + '.xlsx';

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
