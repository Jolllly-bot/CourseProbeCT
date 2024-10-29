// services/firestore/comments.js
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, query, where} from 'firebase/firestore';
import { app } from '../../firebase';

const db = getFirestore(app);

// Add a new comment to a course
export const addComment = async (courseId, commentData) => {
  const commentsRef = collection(db, 'comments');
  return addDoc(commentsRef, {
    ...commentData,
    courseId
  });
};

// Get all comments for a specific course
export const getComments = async (courseId) => {
  const commentsRef = collection(db, 'comments');
  const q = query(commentsRef, where('courseId', '==', courseId));
  const snapshot = await getDocs(q);
  const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return comments;
};

// Update a specific comment
export const updateComment = async (courseId, commentId, newData) => {
  const commentRef = doc(db, 'comments', commentId);
  return updateDoc(commentRef, newData);
};

// Delete a specific comment
export const deleteComment = async (courseId, commentId) => {
  const commentRef = doc(db, 'comments', commentId);
  return deleteDoc(commentRef);
};

export const getCommentsByUser = async (userId) => {
  const commentsRef = collection(db, 'comments');
  const q = query(commentsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const allComments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return allComments;
};