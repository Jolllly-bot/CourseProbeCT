import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ClassQuestionsPage() {
    const { data: session, status } = useSession();
    const [questions, setQuestions] = useState([]);
    const router = useRouter();
    const classCode = router.query.classCode;

    const createQuestion = async (event) => {
        event.preventDefault(); 
        const response = await fetch("/api/class-codes/" + router.query.classCode + "/question", {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
            },
            body: JSON.stringify({
                name: event.target.nameInput.value || "Anonymous",
                question: event.target.questionInput.value,
            }),
        });
        if (response.ok) {
            event.target.nameInput.value = "";
            event.target.questionInput.value = "";
        }
        getQuestions();
    }

    const getQuestions = async () => {
        const res = await fetch(`/api/class-codes/${classCode}/question`)
        setQuestions(await res.json());
      }

    const onQuestionDelete = async (questionId) => {
        const response = await fetch("/api/class-codes/" + classCode + "/question/" + questionId, {
            method: "DELETE",
            headers: {
                'Content-Type' : "application/json",
            },
        });
        if (response.ok) {
            await getQuestions();
        }
    }

    useEffect(() => {
        getQuestions();
    }, [getQuestions])

    return (
        <div>
            <div className="title">{classCode } Questions</div>

            <section className="section">
                {session ? 
                (<div> </div>): 
                (
                    <form onSubmit={(event) => createQuestion(event)}>
                        <div>
                            <div> What is your name?</div>
                            <p className="control">
                                <input
                                className="input"
                                type="text"
                                name="nameInput"
                                placeholder="Name"
                                ></input>
                            </p>
                            <div> What is your question?</div>
                            <p className="control">
                                <input
                                className="input"
                                type="text"
                                name="questionInput"
                                placeholder="Enter question"
                                ></input>
                            </p>
                            <p className="control">
                                <button className="button is-primary">Submit</button>
                            </p>
                        </div>
                    </form>
                )
                }
            </section>

            <section>
            <div className="container">
                {questions.map(q => (
                <div key={q.id} className="box">
                    <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <div className="level">
                                <div className="level-left">
                                    <p>
                                        <strong>{q.name || 'Anonymous'}</strong>
                                        <br />
                                        {q.question}
                                        
                                    </p>
                                </div>
                                <div className="level-right"><br />
                                {q.createdAt ? 
                                    new Date(q.createdAt).toString() : 'No date'}
                                {session ? (
                                    <button className="button is-danger"
                                        onClick={() => onQuestionDelete(q.id)}>
                                        Delete
                                    </button>
                                ) : (<div> </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    </article>
                </div>
                ))}
            </div>
            </section>
        </div>
    );
    }
