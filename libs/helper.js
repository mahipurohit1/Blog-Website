import data from "../pages/api/data";
export default async function getPost(id) {
  const { Posts } = data;
  if (id) {
    return Posts.find((value) => value.id == id);
  }

  return Posts;
}
