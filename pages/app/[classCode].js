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
            <div className="title ml-4 mt-4">
                {courseDetails.code} {courseDetails.name}
            </div>

            <section className="section">
                <div className="title is-4 mb-10">Comments</div>
                <div className="container custom-scrollbar">
                    {comments.map(comment => (
                        <div key={comment.id} className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <div>
                                            <div>
                                            {editingCommentId === comment.id ? (
                                            <div>
                                                <textarea
                                                className="textarea"
                                                rows="4"
                                                value={comment.question}
                                                onChange={(e) => {
                                                    const updatedComments = comments.map((c) =>
                                                    c.id === comment.id
                                                        ? { ...c, question: e.target.value }
                                                        : c
                                                    );
                                                    setComments(updatedComments);
                                                }}
                                                />
                                                
                                            </div>
                                            ) : (
                                            <p className="comment-text">
                                                <strong>Someone from {comment.year}</strong>{" "}
                                                <small>
                                                {comment.createdAt.toDate().toDateString()}
                                                </small>
                                                <br />
                                                {comment.question}
                                                <br />
                                                <div class="tags are-Medium">
                                                    <span class="tag is-primary is-light mt-3 mr-4">
                                                        Rating: {comment.rating}
                                                    </span>
                                                    <span class="tag is-warning is-light mt-3">
                                                        Difficulty: {comment.difficulty}
                                                    </span>
                                                </div>                                            
                                            </p>
                                            )}
                                            </div>
                                            <div className="level-right">
                                                {currentUser && comment.userId === currentUser.uid ? (
                                                    <>
                                                    {editingCommentId === comment.id ? (
                                                        <button
                                                        className="button is-primary"
                                                        onClick={() => {
                                                            updateComment(classId, comment.id, {
                                                            question: comment.question,
                                                            });
                                                            setEditingCommentId(null);
                                                        }}
                                                        >
                                                        Update
                                                        </button>) : (null)}
                                                    <button className="button is-info is-light" onClick={() => handleEditClick(comment.id)}>
                                                        {editingCommentId === comment.id ? "Cancel" : "Edit"}
                                                    </button>
                                                    </>
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
                <div className="title is-4 mb-10">Add a Comment</div>
                {currentUser ? (
                <form onSubmit={createComment} className="box">
                    <div className="field">
                    <label className="label">Year taken:</label>
                    <div className="control">
                        <input
                        className="input"
                        type="text"
                        name="yearInput"
                        placeholder="Spring 2024"
                        required
                        />
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Rate the course (0-10):</label>
                    <div className="control">
                        <input
                        className="input"
                        type="number"
                        name="ratingInput"
                        placeholder="0(not recommend) - 10(highly recommend)"
                        min="0"
                        max="10"
                        required
                        />
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">
                        Rate the difficulty & workload (0-10):
                    </label>
                    <div className="control">
                        <input
                        className="input"
                        type="number"
                        name="difficultyInput"
                        placeholder="0(easy peasy) - 10(very challenging)"
                        min="0"
                        max="10"
                        required
                        />
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Please write your comment</label>
                    <div className="control">
                        <textarea
                        className="textarea"
                        name="questionInput"
                        placeholder="Prof ...; Assignment..; I spend...; I learned..."
                        required
                        />
                    </div>
                    </div>

                    <div className="field">
                    <div className="control">
                        <button className="button is-primary">Submit</button>
                    </div>
                    </div>
                </form>
                ) : (
                <p>
                    Please sign in to add a new comment.
                </p>
                )}
            </section>
        </div>
    );
}
