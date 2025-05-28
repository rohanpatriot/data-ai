import html2canvas from "html2canvas";

export const exportWidgetToPng = async (widgetElement: HTMLElement, widgetName: string) => {
    try {
        if (!widgetElement) {
            throw new Error('Widget element not found');
        }

        console.debug('Exporting widget:', widgetName);

        const canvas = await html2canvas(widgetElement, {
            scale: 2, // Higher quality
            useCORS: true,
            logging: false,
        });

        const link = document.createElement('a');
        link.download = `perplexigrid-wdiget.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();

    } catch (error) {
        console.error('Error exporting widget:', error);
        throw error;
    }
};