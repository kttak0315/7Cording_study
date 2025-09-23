const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

// 글 작성
async function writePost(collection, post) {
  post.hits = 0;
  post.createdDt = new Date().toISOString();
  return await collection.insertOne(post);
}

// 글 목록 (검색 + 페이지네이션)
async function list(collection, page, search) {
  const perPage = 10;
  const query = { title: new RegExp(search, "i") };
  const cursor = collection
    .find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ createdDt: -1 });

  const totalCount = await collection.countDocuments(query); // ← ✅ countDocuments() 사용
  const posts = await cursor.toArray();
  const paginatorObj = paginator({ totalCount, page, perPage });
  return [posts, paginatorObj];
}

// 조회 시 숨길 필드 정의
const projectionOption = {
  projection: {
    password: 0,
    "comments.password": 0,
  },
};

// 글 상세 보기 + 조회수 증가
async function getDetailPost(collection, id) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  return await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { hits: 1 } },
    projectionOption
  );
}

// 비밀번호 포함 조건으로 글 조회
async function getPostByIdAndPassword(collection, { id, password }) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  return await collection.findOne(
    { _id: new ObjectId(id), password },
    projectionOption
  );
}

// ID로 글 조회 (수정용)
async function getPostById(collection, id) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  return await collection.findOne(
    { _id: new ObjectId(id) },
    projectionOption
  );
}

// 글 수정
async function updatePost(collection, id, post) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  const { _id, ...postData } = post; // ← ✅ _id 제거
  const toUpdatePost = { $set: postData };

  return await collection.updateOne(
    { _id: new ObjectId(id) },
    toUpdatePost
  );
}

// 내보내기
module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostById,
  getPostByIdAndPassword,
  updatePost,
};