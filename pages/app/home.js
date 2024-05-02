import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InstructorHomePage() {
  const { data: session, status } = useSession();
  const [classCodes, setClassCodes] = useState([]);

  const createClassCode = async (event) => {
    event.preventDefault();

    const classCode = event.target.classCodeInput.value;
    const response = await fetch("/api/class-codes", {
      method: "POST",
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify({
        id: classCode
      }),
    });
    
    if (response.ok) {
        await getClassCodes()
    }
    // router.reload();
  }

  async function getClassCodes() {
    const response = await fetch("/api/class-codes");
    const data = await response.json();
    setClassCodes(data);
  }

  const onClassDelete = async (classCode) => {
    const response = await fetch("/api/class-codes", {
      method: "DELETE",
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify({
        id: classCode
      }),
    });

    if (response.ok) {
        await getClassCodes()
    }
  }

  useEffect(() => {
    getClassCodes();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (!session) {
    return <div>Not signed in</div>;
  }

//   console.log(classCodes);

  return (
    <>
      {/* <div className="title">Instructor Home</div> */}
      <div className="title ">Welcome back, {session.user.name}</div>

      <section className="section">
        <div className="title-is-5">Create Class Code</div>

        <form onSubmit={(event) => createClassCode(event)}>
            <div className="field has-addons">
                <p className="control">
                    <input
                    className="input"
                    type="text"
                    name="classCodeInput"
                    placeholder="Class code"
                    ></input>
                </p>
                <p className="control">
                    <button className="button is-primary">Create Class Code</button>
                </p>
            </div>
        </form>
      </section>

      <section className="section">
        <div className="title-is-5">Your Class Codes</div>
        <table className="table">
            <thead>
                <tr>
                <th>Class Code</th>
                <th>Date created</th>
                </tr>
            </thead>
            <tbody>
                {classCodes.map((classCode, index) => {
                return <tr key={index}>
                    <td>
                        <Link href={`/app/${classCode.id}`}>
                        {classCode.id}
                        </Link>
                    </td>
                    <td>
                        {classCode.createdAt ? 
                        new Date(classCode.createdAt).toString() : 'No date'}
                    </td>
                    <td>
                        <button className="button is-danger"
                        onClick={() => onClassDelete(classCode.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
                })}
            </tbody>
        </table>

        {/* <div>
            {JSON.stringify(classCodes)}</div> */}
      </section>
    </>
  );
}
