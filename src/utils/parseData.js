export default function parseData(data) {
  return Object.keys(data).map((key) => ({
    roomId: key,
    ...data[key],
  }));
}
