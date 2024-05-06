import ClassLink from "../components/ClassLink";
import { getCourses, addCourse } from '../services/firestore/courses';
import { useState, useEffect } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      const fetchCourses = async () => {
          try {
              const coursesData = await getCourses();
              setCourses(coursesData);
          } catch (error) {
              console.error("Failed to fetch courses:", error);
          }
      };

      fetchCourses();}, []);
  
      const [courseName, setCourseName] = useState('');
      const [courseCode, setCourseCode] = useState('');
  
      const handleSubmit = async (event) => {
        console.log("submit");
          event.preventDefault();
          try {
              const courseData = {
                  name: courseName,
                  code: courseCode,
              };
              await addCourse(courseData);
              alert('Course added successfully!');
              setCourseName('');
              setCourseCode('');
          } catch (error) {
              console.error('Error adding course:', error);
              alert('Failed to add course.');
          }
      };

  return (
    <div>
      <main>
        <section class="hero is-medium is-link">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <p class="title">Ask and share questions during class</p>
              <p class="subtitle">
                Quickly  a URL where you can post questions during class
                and see what other users are saying
              </p>
              <ClassLink />
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>
        <h1>All Courses</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name} - {course.code}
                    </li>
                ))}
            </ul>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Course Code:</label>
                <input
                    type="text"
                    value={courseCode}
                    onChange={e => setCourseCode(e.target.value)}
                />
            </div>
            <div>
                <label>Course Name:</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={e => setCourseName(e.target.value)}
                />
            </div>
            <button type="submit">Add Course</button>
        </form>
        <section class="hero is-medium">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
            <div className="column">
              <p class="title">
                Share questions with the class using a custom URL
              </p>
              <p class="subtitle">
                Create your own temporary URL where you can save questions and
                view them in real time.
              </p>
            </div>
          </div>
        </section>

        <section class="hero is-medium has-background-white-ter	">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <p class="title">Ask a question</p>
              <p class="subtitle">
                Write a new questions to share with the class. Delete it if you
                made a mistake.
              </p>
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
