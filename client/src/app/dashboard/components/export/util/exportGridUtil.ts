import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type ExportFormat = 'PDF' | 'PNG' | 'JSON';

export const exportGrid = async (format: ExportFormat) => {
  try {
    const gridElement = document.getElementById('grid-container');
    
    if (!gridElement) {
      throw new Error('Grid element not found');
    }

    // Get the actual size of the grid content, not just the visible part
    const gridContent = gridElement.querySelector('.layout') || gridElement;
    const scrollWidth = gridContent.scrollWidth;
    const scrollHeight = gridContent.scrollHeight;

    // Create a canvas with the full content size
    const canvas = await html2canvas(gridElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      width: scrollWidth,
      height: scrollHeight,
      windowWidth: scrollWidth,
      windowHeight: scrollHeight,
      // Capture the full content, not just what's visible
      scrollX: 0,
      scrollY: 0
    });

    if (format === 'PDF') {
      // Create PDF with template elements
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit on page while maintaining aspect ratio
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add dashboard title
      const dashboardTitle = document.title || 'Dashboard';
      pdf.setFontSize(18);
      pdf.text(dashboardTitle, pageWidth / 2, 15, { align: 'center' });
      
      // Add the dashboard image
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 25, imgWidth, imgHeight);
      
      // Add branding footer
      const footerY = pageHeight - 10;
      pdf.setFontSize(10);
      pdf.text('Created with Perplexigrid', 10, footerY);
      
      pdf.save('perplexigrid-dashboard.pdf');
    } else if (format === 'PNG') {
      // For PNG, we'll create a new canvas with template elements
      const templateCanvas = document.createElement('canvas');
      const ctx = templateCanvas.getContext('2d');
      
      // Add padding for title and footer
      const padding = 60; // Space for title and footer
      templateCanvas.width = canvas.width;
      templateCanvas.height = canvas.height + padding;
      
      if (ctx) {
        // Fill background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, templateCanvas.width, templateCanvas.height);
        
        // Add dashboard title
        const dashboardTitle = document.title || 'Dashboard';
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(dashboardTitle, templateCanvas.width / 2, 30);
        
        // Draw the dashboard image
        ctx.drawImage(canvas, 0, 50);
        
        // Add branding footer
        const footerY = templateCanvas.height - 10;
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Created with Perplexigrid', 10, footerY);
        
        // Export the template canvas
        const link = document.createElement('a');
        link.download = 'perplexigrid-dashboard.png';
        link.href = templateCanvas.toDataURL('image/png', 1.0);
        link.click();
      } else {
        // Fallback to original canvas if context not available
        const link = document.createElement('a');
        link.download = 'grid-export.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      }
    } else if (format === 'JSON') {
      // Implement JSON export if needed
      console.log('JSON export not yet implemented');
    }
  } catch (error) {
    console.error('Error exporting grid:', error);
    throw error;
  }
};
