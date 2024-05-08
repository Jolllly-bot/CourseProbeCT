import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { addComment, getComments, deleteComment, updateComment } from "../../services/firestore/comments";
import { getCourseById } from "../../services/firestore/courses";

export default function ClassCommentsPage() {
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [courseDetails, setCourseDetails] = useState({ name: '', code: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const classId = router.query.classCode;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            fetchComments(classId);
            fetchCourseDetails(classId);
                
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

    const handleEditClick = (commentId) => {
        setEditingCommentId(commentId === editingCommentId ? null : commentId);
    };

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
        <div style={{ fontSize: '18px' }}>
            <div className="title" style={{ textAlign: 'C'}}>{courseDetails.code} {courseDetails.name}</div>

            <section className="section">
                <div className="title is-5">Comments</div>
                <div className="container custom-scrollbar">
                    {comments.map(comment => (
                        <div key={comment.id} className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <div>
                                            <div className="level-left">
                                                {editingCommentId === comment.id ? (
                                                    <div>
                                                        <input className="input" type="text" value={comment.question}
                                                            onChange={(e) => {
                                                                const updatedComments = comments.map((c) =>
                                                                    c.id === comment.id ? { ...c, question: e.target.value } : c
                                                                );
                                                                setComments(updatedComments);
                                                            }}
                                                        />
                                                        <button className="button is-primary"
                                                            onClick={() => {
                                                                updateComment(classId, comment.id, { question: comment.question });
                                                                setEditingCommentId(null);
                                                            }}
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className="comment-text">
                                                        <strong>Someone from {comment.year}</strong>{" "}
                                                        <small>{comment.createdAt.toDate().toDateString()}</small>
                                                        <br />
                                                        {comment.question}
                                                        <br />
                                                        <br />
                                                        Rating: {comment.rating}, Difficulty: {comment.difficulty}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="level-right">
                                                {currentUser && comment.userId === currentUser.uid ? (
                                                    <button className="button is-info" onClick={() => handleEditClick(comment.id)}>
                                                        {editingCommentId === comment.id ? "Cancel" : "Edit"}
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


            <hr style={{ marginTop: '20px', height: '10px' }} /> {/* Added horizontal line */}
            
            <section className="section">
                <div className="title is-5">Add a Comment</div>
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
                            <div>Rate the difficulty & workload (0-10):</div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="difficultyInput"
                                    placeholder="0(easy peasy) - 10(very challenging)"
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
                    <p>Please sign in to add a new comment.</p>
                )}
            </section>
        </div>
    );
}
