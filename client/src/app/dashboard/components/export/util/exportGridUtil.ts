import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type ExportFormat = 'PDF' | 'PNG' | 'JSON';

export const exportGrid = async (format: ExportFormat) => {
  try {
    const gridElement = document.getElementById('grid-container');
    
    if (!gridElement) {
      throw new Error('Grid element not found');
    }

    const rect = gridElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const canvas = await html2canvas(gridElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      width: width,
      height: height,
    });

    if (format === 'PDF') {
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('grid-export.pdf');
    } else if (format === 'PNG') {
        const link = document.createElement('a');
        link.download = 'grid-export.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      }
  } catch (error) {
    console.error('Error exporting grid:', error);
    throw error;
  }
};
