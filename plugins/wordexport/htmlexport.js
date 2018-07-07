function htmlExport(fileName, data) {

  var head = "<!DOCTYPE html>\r\n"
  head += "<html lang=\"zh\">\r\n";
  head += "\t<head>\r\n";
  head += "\t\t<meta charset=\"UTF-8\">\r\n";
  head += "\t\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\r\n";
  head += "\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n";
  head += "\t\t<title>" + fileName.substring(0, fileName.lastIndexOf(".")) + "</title>\r\n";
  head += "\t</head>\r\n\t<body>\r\n";

  var footer = "\r\n\t</body>\r\n</html>\r\n";

  var saveData = "";
  saveData += head;
  saveData += data;
  saveData += footer;
  // Create a Blob with the file contents
  var blob = new Blob([saveData], {
      type: "application/html;charset=utf-8"
  });
  saveAs(blob, fileName);
}
