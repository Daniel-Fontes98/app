import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function fillPDFForm(
  pdfPath: string,
  outputPath: string,
  outputSingle: string,
  fieldData: Record<string, string>,
  checkboxData: string[],
  examsLocations: string[]
) {
  try {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

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
          console.log(field.getName());
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

    console.log("Filled PDF saved:", outputPath);
    console.log("First page PDF saved:", outputSingle);
  } catch (error) {
    console.error("Error:", error);
  }
}
