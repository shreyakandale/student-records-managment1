const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateStudentPDF = (req, res) => {
  const studentId = req.params.id;

  // Fetch the student data (for example, using your Student model)
  Student.getById(studentId)
    .then(student => {
      // Create a document
      const doc = new PDFDocument();

      // Pipe the PDF to a file
      doc.pipe(fs.createWriteStream(`./pdfs/student_${studentId}.pdf`));

      // Add content to the PDF
      doc.fontSize(25).text('Student Report', { align: 'center' });

      // Add student details
      doc.fontSize(16).text(`Name: ${student.name}`);
      doc.text(`Roll: ${student.roll}`);
      doc.text(`Department: ${student.department}`);
      doc.text(`Year: ${student.year}`);
      doc.text(`Subjects: ${student.subjects.join(', ')}`);
      doc.text(`Grades: ${JSON.stringify(student.grades)}`);
      doc.text(`Attendance: ${student.attendance}%`);

      // Finalize PDF
      doc.end();

      res.status(200).json({
        message: 'PDF generated successfully!',
        downloadLink: `/pdfs/student_${studentId}.pdf`
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error generating PDF', error: err });
    });
};
