import data from "./data";
const handler = (req, res) => {
  const { Popular } = data;
  if (Popular) return res.status(200).json(Popular);
  return res.status(404).json({ error: "no data found" });
};

export default handler;
