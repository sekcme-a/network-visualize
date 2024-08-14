export const parseTsvData = (tsvData) => {
  const lines = tsvData.trim().split('\n');
  const headers = lines[0].split('\t');

  return lines.slice(1).map(line => {
    const data = line.split('\t');
    return headers.reduce((obj, header, index) => {
      obj[header] = data[index];
      return obj;
    }, {});
  });
};
