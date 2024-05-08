import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase"; 
import { deleteComment, getCommentsByUser } from "../../services/firestore/comments";

export default function InstructorHomePage() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserComments(auth.currentUser.uid);
      } else {
        // User not logged in, redirect them to login page
        router.push('/'); // Modify as per your login route
      }
    });
  }, [router]);

    const fetchUserComments = async (userId) => {
      setIsLoading(true); 
      try {
        const userComments = await getCommentsByUser(userId);
        setComments(userComments);
        console.log(userComments)
          setIsLoading(false);
      } catch (error) {
          console.error('Failed to fetch comments:', error);
          setIsLoading(false);  
      }
    };

    const handleDeleteComment = async (courseId, commentId) => {
      await deleteComment(courseId, commentId);
      fetchUserComments(auth.currentUser.uid); // Refresh comments after deletion
    };
    

//   console.log(classCodes);

  return (
    <>
      <div className="title ">Welcome back, {user? user.displayName: ''}</div>

      <section className="section">
        <div className="title-is-5">Your Comments</div>
            <div className="container">
                {isLoading ? (
                    <p>Loading comments...</p>
                ) : (
                    <table className="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Comment</th>
                                <th>Rating</th>
                                <th>Year</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map(comment => (
                                <tr key={comment.id}>
                                    
                                    <td><Link href={`/app/${comment.courseId}`}>
                                      <a>{comment.question}</a>
                                      </Link>
                                      </td>
                                    <td>{comment.rating}</td>
                                    <td>{comment.year}</td>
                                    <td>{comment.createdAt.toDate().toDateString()}</td>
                                    <td>
                                        {user && comment.userId === user.uid && (
                                            <button className="button is-danger is-small"
                                                onClick={() => onQuestionDelete(comment.id)}>
                                                Delete
                                            </button>
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
