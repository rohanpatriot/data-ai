import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "@/assets/logo.svg";

export type ExportFormat = 'PDF' | 'PNG' | 'JSON';

const LOGO_PATH = logo;
const BRAND_COLOR = '#6C757D';

const svgToPng = (svgUrl: string, width: number, height: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    img.onerror = () => reject(new Error('Failed to load SVG'));
    img.src = svgUrl;
  });
};

export const exportGrid = async (format: ExportFormat, projectName: string) => {
  try {
    const gridElement = document.getElementById('grid-container');
    
    if (!gridElement) {
      throw new Error('Grid element not found');
    }

    // Get the actual size of the grid content, not just the visible part
    const gridContent = gridElement.querySelector('.layout') || gridElement;
    const scrollWidth = gridContent.scrollWidth;
    const scrollHeight = gridContent.scrollHeight;

    const canvas = await html2canvas(gridElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      width: scrollWidth,
      height: scrollHeight,
      windowWidth: scrollWidth,
      windowHeight: scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    const pngLogo = await svgToPng(logo, 150, 150);

    if (format === 'PDF') {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const dashboardTitle = projectName || 'Dashboard';
      pdf.setFontSize(18);
      pdf.text(dashboardTitle, pageWidth / 2, 15, { align: 'center' });
      
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 25, imgWidth, imgHeight);
      
      const logoImg = new Image();
      logoImg.src = LOGO_PATH;
      
      const footerY = pageHeight - 10;
      pdf.setFontSize(10);
      pdf.setTextColor(BRAND_COLOR); // Set the brand color
      pdf.text('Created with', 10, footerY);
      
      const logoWidth = 28;
      const logoHeight = 7; 
      const textWidth = pdf.getTextWidth('Created with');
      pdf.addImage(pngLogo, 'PNG', 10 + textWidth + 2, footerY - 5, logoWidth, logoHeight);

      pdf.save('perplexigrid-dashboard.pdf');
    } else if (format === 'PNG') {
      const templateCanvas = document.createElement('canvas');
      const ctx = templateCanvas.getContext('2d');
      
      // Add padding for title and footer
      const padding = 60; // Space for title and footer
      templateCanvas.width = canvas.width;
      templateCanvas.height = canvas.height + padding;
      
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, templateCanvas.width, templateCanvas.height);
        
        const dashboardTitle = projectName || 'Dashboard';
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(dashboardTitle, templateCanvas.width / 2, 30);
        
        ctx.drawImage(canvas, 0, 50);
        
        const logoImg = new Image();
        
        const footerY = templateCanvas.height - 15;
        ctx.font = '12px Arial';
        ctx.fillStyle = BRAND_COLOR;
        ctx.textAlign = 'left';
        
        ctx.fillText('Created by', 20, footerY);
        const textWidth = ctx.measureText('Created with').width;
        
        logoImg.onload = () => {
          const logoWidth = 40; // pixels, rectangular shape
          const logoHeight = 20; // pixels
          ctx.drawImage(logoImg, 20 + textWidth + 5, footerY - 15, logoWidth, logoHeight);
          
          const link = document.createElement('a');
          link.download = 'perplexigrid-dashboard.png';
          link.href = templateCanvas.toDataURL('image/png', 1.0);
          link.click();
        };
        
        logoImg.src = pngLogo;
        
        setTimeout(() => {
          if (!logoImg.complete) {
            const link = document.createElement('a');
            link.download = 'perplexigrid-dashboard.png';
            link.href = templateCanvas.toDataURL('image/png', 1.0);
            link.click();
          }
        }, 1000);
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
