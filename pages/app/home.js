import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { deleteComment, getCommentsByUser } from "../../services/firestore/comments";
import { getCourses } from '../../services/firestore/courses';

export default function InstructorHomePage() {
  const [comments, setComments] = useState([]);
  const [courses, setCourses] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserComments(currentUser.uid);
        fetchCourses();
      } else {
        router.push('/'); // Redirect to login if not authenticated
      }
    });
  }, [router]);

  const fetchUserComments = async (userId) => {
    setIsLoading(true);
    try {
      const userComments = await getCommentsByUser(userId);
      setComments(userComments);
      console.log(userComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await getCourses();
      const courseMap = allCourses.reduce((acc, course) => {
        acc[course.id] = course.code; // Assume `course` object has an `id` and `code`
        return acc;
      }, {});
      setCourses(courseMap);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleDeleteComment = async (courseId, commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(courseId, commentId);
        fetchUserComments(auth.currentUser.uid); // Refresh comments after deletion
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  return (
    <>
      <div className="title">Welcome back, {user ? user.displayName : 'Guest'}</div>

      <section className="section">
        <div className="title-is-5" style={{ fontSize: '30px' }}>Your Comments</div>
        <div className="container">
          {isLoading ? (
            <p>Loading comments...</p>
          ) : (
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Rating</th>
                  <th>Year</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(comment => (
                  <tr key={comment.id}>
                    <td>
                      {courses[comment.courseId]}
                    </td>
                    <td>{comment.rating}</td>
                    <td>{comment.year}</td>
                    <td>{comment.createdAt.toDate().toDateString()}</td>
                    <td>
                      {user && comment.userId === user.uid && (
                        <>
                          <Link href={`/app/${comment.courseId}`}>
                            <button className="button is-info is-small" style={{ marginLeft: '10px' }}>
                              View
                            </button>
                          </Link>

                          <button className="button is-danger is-small"
                            onClick={() => handleDeleteComment(comment.courseId, comment.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
