exports.rename = (path,id,tipo,extension) => {
  const newPath = path.split('\\');
  newPath.pop();
  newPath.push(`${id}_${tipo}_${Date.now()}.${extension.split('/')[1]}`);
  return newPath.join("\\");
}