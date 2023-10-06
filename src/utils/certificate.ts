import { PDFCheckBox, PDFDocument, PDFTextField } from "pdf-lib";
import fs from "fs/promises";

export async function fillPDFForm(
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
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(fieldValue);
      }
    }

    for (const name of checkboxData) {
      const field = form.getCheckBox(name);
      if (field) {
        field.check();
      }
    }

    form.flatten();

    const pdfBytesWithFields = await pdfDoc.save();

    await fs.writeFile(outputPath, pdfBytesWithFields);
    console.log("Filled PDF saved:", outputPath);
  } catch (error) {
    console.error("Error:", error);
  }
}
