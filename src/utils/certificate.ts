import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function fillPDFForm(
  pdfPath: string,
  outputPath: string,
  outputSingle: string,
  fieldData: Record<string, string>,
  checkboxData: string[],
  examsLocations: string[],
  signatureA?: boolean
) {
  try {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const carimboImagePath = "/public/Carimbo.png";
    const signatureImagePath = signatureA
      ? "/public/DrAngela.png"
      : "/public/DrPaula.png";
    const signatureImageFullPath = path.join(process.cwd(), signatureImagePath);
    const carimboImageFullPath = path.join(process.cwd(), carimboImagePath);

    const stampBytes = await fs.readFile(carimboImageFullPath);
    const stampImage = await pdfDoc.embedPng(stampBytes);

    const sigBytes = await fs.readFile(signatureImageFullPath);
    const pngImage = await pdfDoc.embedPng(sigBytes);

    const pngDims = pngImage.scale(0.3);
    const stampDims = stampImage.scale(0.23);

    // Get the first page of the PDF
    const page_one = pdfDoc.getPages()[0];

    // Calculate the position for the lower right corner
    const lowerRightX = page_one!.getWidth() - pngDims.width - 40; // Adjust 20 as needed
    const lowerRightY = 230; // Adjust as needed

    const lowerRightXStamp = page_one!.getWidth() - stampDims.width - 100;
    const lowerRightYStamp = 175;

    // Draw the PNG image on the first page
    page_one!.drawImage(pngImage, {
      x: lowerRightX,
      y: lowerRightY,
      width: pngDims.width,
      height: pngDims.height,
    });

    page_one!.drawImage(stampImage, {
      x: lowerRightXStamp,
      y: lowerRightYStamp,
      width: stampDims.width,
      height: stampDims.height,
    });

    // Draw the second signature on the fifth page
    const pageFive = pdfDoc.getPages()[5]; // Assuming the fifth page is at index 4

    // Calculate the position for the lower right corner of the fifth page
    const lowerRightXPageFive = pageFive!.getWidth() - pngDims.width - 330;
    const lowerRightYPageFive = 130;

    const lowerRightXPageFiveStamp =
      pageFive!.getWidth() - stampDims.width - 390;
    const lowerRightYPageFiveStamp = 75;

    // Draw the second signature on the fifth page
    pageFive!.drawImage(pngImage, {
      x: lowerRightXPageFive,
      y: lowerRightYPageFive,
      width: pngDims.width,
      height: pngDims.height,
    });

    pageFive!.drawImage(stampImage, {
      x: lowerRightXPageFiveStamp,
      y: lowerRightYPageFiveStamp,
      width: stampDims.width,
      height: stampDims.height,
    });

    for (const [fieldName, fieldValue] of Object.entries(fieldData)) {
      try {
        const field = form.getTextField(fieldName);
        if (field) {
          field.setText(fieldValue);
        }
      } catch {}
    }

    for (const name of checkboxData) {
      try {
        const field = form.getCheckBox(name);
        if (field) {
          field.check();
        }
      } catch {}
    }

    form.flatten();

    for (const examLocation of examsLocations) {
      const examPdfBytes = await fs.readFile(examLocation);
      const examPdfDoc = await PDFDocument.load(examPdfBytes);

      const copiedPages = await pdfDoc.copyPages(
        examPdfDoc,
        examPdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    const firstPageDoc = await PDFDocument.create();
    const [firstPage] = await firstPageDoc.copyPages(pdfDoc, [0]);
    firstPageDoc.addPage(firstPage);

    const outputPathDir = path.dirname(outputPath);
    const outputSinglePathDir = path.dirname(outputSingle);

    await fs.mkdir(outputPathDir, { recursive: true });
    await fs.mkdir(outputSinglePathDir, { recursive: true });

    const pdfBytesWithFields = await pdfDoc.save();
    const pdfBytesFirstPage = await firstPageDoc.save();

    await fs.writeFile(outputPath, pdfBytesWithFields);
    await fs.writeFile(outputSingle, pdfBytesFirstPage);
  } catch (error) {
    console.error("Error:", error);
  }
}
