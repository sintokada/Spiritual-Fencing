import { AppData } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToCSV = (data: AppData, month: string) => {
  // Filter logs for the specific month
  const logsInMonth = Object.values(data.logs).filter(log => 
    log.date.startsWith(month)
  ).sort((a, b) => a.date.localeCompare(b.date));

  if (logsInMonth.length === 0) {
    alert("No data to export for this month.");
    return;
  }

  // Create Headers: Date, then Activity Names
  const headers = ['Date', ...data.activities.map(a => a.name)];
  
  // Create Rows
  const rows = logsInMonth.map(log => {
    const row = [log.date];
    data.activities.forEach(act => {
      row.push((log.scores[act.id] || 0).toString());
    });
    return row.join(',');
  });

  // Combine
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create Download Link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `spiritual_fencing_${month}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (elementId: string, month: string) => {
  const input = document.getElementById(elementId);
  if (!input) return;

  try {
    const canvas = await html2canvas(input, {
      scale: 2, // Higher resolution
      backgroundColor: '#fafaf9' // bg-stone-50
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Handle multi-page if report is very long
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`spiritual_fencing_report_${month}.pdf`);
  } catch (error) {
    console.error("PDF generation failed", error);
    alert("Could not generate PDF. Please try again.");
  }
};