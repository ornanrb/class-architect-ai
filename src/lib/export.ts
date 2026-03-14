import { LessonPlan } from "@/types/lesson-plan";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export async function exportToPdf(plan: LessonPlan) {
  const doc = new jsPDF();
  let y = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;

  const addText = (text: string, size: number, bold = false) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, pageWidth);
    for (const line of lines) {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(line, margin, y);
      y += size * 0.5;
    }
    y += 4;
  };

  addText(plan.title, 18, true);
  addText(`${plan.subject} | Grado: ${plan.grade} | Duración: ${plan.duration}`, 10);
  y += 4;

  addText("Objetivo General", 14, true);
  addText(plan.generalObjective, 10);

  addText("Objetivos Específicos", 14, true);
  plan.specificObjectives.forEach((o, i) => addText(`${i + 1}. ${o}`, 10));

  addText("Objetivos ABCD", 14, true);
  plan.abcdObjectives.forEach((o) => addText(`• ${o.full}`, 10));

  addText("Actividades", 14, true);
  plan.activities.forEach((a) => {
    addText(`${a.name} (${a.duration})`, 11, true);
    addText(a.description, 10);
    if (a.materials) addText(`Materiales: ${a.materials}`, 9);
  });

  addText("Rúbrica de Evaluación", 14, true);
  plan.rubric.forEach((r) => {
    addText(r.criterion, 11, true);
    addText(`Excelente: ${r.excellent}`, 9);
    addText(`Bueno: ${r.good}`, 9);
    addText(`En desarrollo: ${r.developing}`, 9);
    addText(`Inicio: ${r.beginning}`, 9);
    y += 2;
  });

  doc.save(`${plan.title.replace(/\s+/g, "_")}.pdf`);
}

export async function exportToDocx(plan: LessonPlan) {
  const heading = (text: string, level: typeof HeadingLevel[keyof typeof HeadingLevel]) =>
    new Paragraph({ text, heading: level, spacing: { before: 200, after: 100 } });

  const bullet = (text: string) =>
    new Paragraph({ children: [new TextRun(text)], bullet: { level: 0 }, spacing: { after: 60 } });

  const normal = (text: string) =>
    new Paragraph({ children: [new TextRun(text)], spacing: { after: 80 } });

  const children: Paragraph[] = [
    heading(plan.title, HeadingLevel.HEADING_1),
    normal(`${plan.subject} | Grado: ${plan.grade} | Duración: ${plan.duration}`),
    heading("Objetivo General", HeadingLevel.HEADING_2),
    normal(plan.generalObjective),
    heading("Objetivos Específicos", HeadingLevel.HEADING_2),
    ...plan.specificObjectives.map((o) => bullet(o)),
    heading("Objetivos ABCD", HeadingLevel.HEADING_2),
    ...plan.abcdObjectives.map((o) => bullet(o.full)),
    heading("Actividades", HeadingLevel.HEADING_2),
    ...plan.activities.flatMap((a) => [
      new Paragraph({ children: [new TextRun({ text: `${a.name} (${a.duration})`, bold: true })], spacing: { before: 100 } }),
      normal(a.description),
      ...(a.materials ? [normal(`Materiales: ${a.materials}`)] : []),
    ]),
    heading("Rúbrica de Evaluación", HeadingLevel.HEADING_2),
  ];

  const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

  const tableRows = [
    new TableRow({
      children: ["Criterio", "Excelente", "Bueno", "En desarrollo", "Inicio"].map(
        (text) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })], width: { size: 20, type: WidthType.PERCENTAGE }, borders })
      ),
    }),
    ...plan.rubric.map(
      (r) => new TableRow({
        children: [r.criterion, r.excellent, r.good, r.developing, r.beginning].map(
          (text) => new TableCell({ children: [normal(text)], width: { size: 20, type: WidthType.PERCENTAGE }, borders })
        ),
      })
    ),
  ];

  children.push(
    new Paragraph({ text: "" }),
  );

  const doc = new Document({
    sections: [{
      children: [
        ...children,
        new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${plan.title.replace(/\s+/g, "_")}.docx`);
}
