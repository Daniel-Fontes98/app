import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export const fillTbPdfForm = async (
  fieldData: Record<string, string>,
  outputPath: string,
  examLocation: string,
  signatureA?: boolean
) => {
  try {
    const tbPdfPath = "src/certificateModels/CertificadoTB.pdf";
    const pdfBytes = await fs.readFile(tbPdfPath);
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

    const page_one = pdfDoc.getPages()[0];

    // Calculate the position for the lower right corner
    const lowerRightX = page_one!.getWidth() - pngDims.width - 180; // Adjust +60 as needed
    const lowerRightY = 155; // -55

    const lowerRightXStamp = page_one!.getWidth() - stampDims.width - 240;
    const lowerRightYStamp = 100;

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

    for (const [fieldName, fieldValue] of Object.entries(fieldData)) {
      try {
        const field = form.getTextField(fieldName);
        if (field) {
          field.setText(fieldValue);
        }
      } catch {}
    }

    form.flatten();

    const examPdfBytes = await fs.readFile(examLocation);
    const examPdfDoc = await PDFDocument.load(examPdfBytes);

    const copiedPages = await pdfDoc.copyPages(
      examPdfDoc,
      examPdfDoc.getPageIndices()
    );
    copiedPages.forEach((page) => {
      pdfDoc.addPage(page);
    });

    const outputPathDir = path.dirname(outputPath);
    await fs.mkdir(outputPathDir, { recursive: true });
    const pdfBytesWithFields = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytesWithFields);
  } catch (err) {
    console.log(err);
  }
};
