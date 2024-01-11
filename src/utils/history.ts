import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function fillHistoryForm(
  pdfPath: string,
  outputPath: string,
  fieldData: Record<string, string>,
  checkboxData: string[]
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

    const firstPageDoc = await PDFDocument.create();
    const [firstPage] = await firstPageDoc.copyPages(pdfDoc, [0]);
    firstPageDoc.addPage(firstPage);

    const outputPathDir = path.dirname(outputPath);

    await fs.mkdir(outputPathDir, { recursive: true });

    const pdfBytesWithFields = await pdfDoc.save();

    await fs.writeFile(outputPath, pdfBytesWithFields);

    console.log("Filled History saved:", outputPath);
  } catch (error) {
    console.error("Error:", error);
  }
}
