import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase"; 
import { addComment, getComments, deleteComment } from "../../services/firestore/comments";
import { getCourseById } from "../../services/firestore/courses";

export default function ClassCommentsPage() {
    const [comments, setComments] = useState([]);
    const [courseDetails, setCourseDetails] = useState({ name: '', code: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const classId = router.query.classCode;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user && classId) {
                fetchComments(classId);
                fetchCourseDetails(classId);
            } else {
                fetchCourseDetails(classId);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router, classId]);

    async function fetchCourseDetails(courseId) {
        try {
            const course = await getCourseById(courseId);
            setCourseDetails(course);
        } catch (error) {
            console.error('Failed to fetch course details:', error);
            setCourseDetails({ name: 'Unknown', code: 'N/A' });
        }
    }

    async function fetchComments(classCode) {
        try {
            const fetchedComments = await getComments(classCode);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    }

    const createComment = async (event) => {
        event.preventDefault();
        if (!currentUser) return;

        const rating = event.target.ratingInput.value;
        const difficulty = event.target.difficultyInput.value;
        const question = event.target.questionInput.value;
        const year = event.target.yearInput.value;
        if (!question) return;

        const commentData = {
            userId: currentUser.uid,
            question,
            rating,
            difficulty,
            year,
            createdAt: new Date()
        };

        try {
            await addComment(classId, commentData);
            fetchComments(classId); 
            event.target.reset();
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const onQuestionDelete = async (commentId) => {
        try {
            await deleteComment(classId, commentId);
            fetchComments(classId); 
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <div>
            <div className="title">{courseDetails.code} {courseDetails.name} Comments</div>

            <section className="section">
                <div className="container">
                    {comments.map(comment => (
                        <div key={comment.id} className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <div className="level">
                                            <div className="level-left">
                                                <p>
                                                    <strong>Someone from {comment.year}</strong>
                                                    <br />
                                                    {comment.question}
                                                    <br />
                                                    <small>Rating: {comment.rating}, Difficulty: {comment.difficulty}</small>
                                                </p>
                                            </div>
                                            <div className="level-right">
                                                {/* {comment.createdAt ? 
                                                    new Date(comment.createdAt).toString() : 'No date'} */}
                                                {currentUser && comment.userId === currentUser.uid ? (
                                                    <button className="button is-danger"
                                                        onClick={() => onQuestionDelete(comment.id)}>
                                                        Delete
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                {currentUser ? (
                    <form onSubmit={createComment}>
                        <div>
                            <div>Year taken:</div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="yearInput"
                                    placeholder="Spring 2024"
                                    required
                                ></input>
                            </p>
                            <div>Rate the course (0-10):</div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="ratingInput"
                                    placeholder="0(not recommend) - 10(highly recommend)"
                                    min="0"
                                    max="10"
                                    required
                                ></input>
                            </p>
                            <div>Rate the difficulty& workload (0-10):</div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="difficultyInput"
                                    placeholder="0(easy peasy) - 10:(very challenging)"
                                    min="0"
                                    max="10"
                                    required
                                ></input>
                            </p>
                            <div>Please write your comment</div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="questionInput"
                                    placeholder="Prof ...; Assignment..; I spend...; I learned..."
                                    required
                                ></input>
                            </p>
                            <p className="control">
                                <button className="button is-primary">Submit</button>
                            </p>
                        </div>
                    </form>
                ) : (
                    <p>Please sign in to submit a comment.</p>
                )}
            </section>
        </div>
    );
}
