/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePDF = async (elementId: string, fileName: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        return element.tagName === 'IFRAME' || element.tagName === 'SCRIPT';
      },
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.color = 'rgb(0, 0, 0)';
        }
      },
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(fileName)
  } catch (error: any) {
    console.error('PDF Generation Error:', error)
    if (error.message && error.message.includes('lab')) {
      throw new Error('Color format not supported. Please try again.')
    }
    throw new Error(error.message || 'Failed to generate PDF')
  }
}
