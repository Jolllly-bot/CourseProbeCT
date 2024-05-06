// services/firestore/comments.js
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';

const db = getFirestore(app);

// Add a new comment to a course
export const addComment = async (courseId, commentData) => {
  const courseRef = doc(db, 'courses', courseId);
  const commentsCollectionRef = collection(courseRef, 'comments');
  return addDoc(commentsCollectionRef, commentData);
};

// Get all comments for a specific course
export const getComments = async (courseId) => {
  const courseRef = doc(db, 'courses', courseId);
  const commentsCollectionRef = collection(courseRef, 'comments');
  const snapshot = await getDocs(commentsCollectionRef);
  const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return comments;
};

// Update a specific comment
export const updateComment = async (courseId, commentId, newData) => {
  const commentRef = doc(db, 'courses', courseId, 'comments', commentId);
  return updateDoc(commentRef, newData);
};

// Delete a specific comment
export const deleteComment = async (courseId, commentId) => {
  const commentRef = doc(db, 'courses', courseId, 'comments', commentId);
  return deleteDoc(commentRef);
};
