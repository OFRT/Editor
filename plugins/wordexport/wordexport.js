function wordExport(fileName, data) {
  var saveData = "<html xmlns:v=\"urn:schemas-microsoft-com:vml\"";
  saveData += "xmlns:o=\"urn:schemas-microsoft-com:office:office\"";
  saveData += "xmlns:w=\"urn:schemas-microsoft-com:office:word\"";
  saveData += "xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\"";
  saveData += "xmlns=\"http://www.w3.org/TR/REC-html40\">";
  saveData += data;
  saveData += "</html>";
  // Create a Blob with the file contents
  var blob = new Blob([saveData], {
      type: "application/msword;charset=utf-8"
  });
  saveAs(blob, fileName);
}
