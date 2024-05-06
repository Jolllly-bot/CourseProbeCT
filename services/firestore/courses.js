import { doc, collection, getFirestore, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../firebase'; 

const db = getFirestore(app);

// Add a new course
export const addCourse = async (courseData) => {
  const coursesCollectionRef = collection(db, 'courses');
  return addDoc(coursesCollectionRef, courseData);
};

// Get all courses
export const getCourses = async () => {
  const coursesCollectionRef = collection(db, 'courses');
  const snapshot = await getDocs(coursesCollectionRef);
  const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return courses;
};

// Get a single course by ID
export const getCourseById = async (courseId) => {
  const courseRef = doc(db, 'courses', courseId);
  const snapshot = await getDoc(courseRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    throw new Error('Course not found!');
  }
};

// Update a specific course
export const updateCourse = async (courseId, newData) => {
  const courseRef = doc(db, 'courses', courseId);
  return updateDoc(courseRef, newData);
};

// Delete a specific course
export const deleteCourse = async (courseId) => {
  const courseRef = doc(db, 'courses', courseId);
  return deleteDoc(courseRef);
};
