import ClassLink from "../components/ClassLink";
import { getCourses, addCourse } from '../services/firestore/courses';
import { useState, useEffect } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(new Set());
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [searchText, setSearchText] = useState('');  // State to hold the search text


  useEffect(() => {
      const fetchCourses = async () => {
          try {
              const coursesData = await getCourses();
              setCourses(coursesData);
          } catch (error) {
              console.error("Failed to fetch courses:", error);
          }
      };

      fetchCourses();
  }, []);

  const handleFilterToggle = (dept) => {
      const newFilter = new Set(filter);
      if (newFilter.has(dept)) {
          newFilter.delete(dept);
      } else {
          newFilter.add(dept);
      }
      setFilter(newFilter);
  };

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

  const filteredCourses = courses.filter(course => 
    (filter.size === 0 || Array.from(filter).some(dept => course.code.startsWith(dept))) &&
    course.name.toLowerCase().includes(searchText.toLowerCase())  // Filter by search text
  );

  return (
    <div>
      <main>
        <section className="hero is-medium is-link">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <p className="title">Ask and share questions during class</p>
              <p className="subtitle">
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
        <div className="columns is-centered"style={{ marginTop: '20px' }}>
          <div className="column is-3">
            <input type="text" className="input" style={{ height: '2.5em' }} value={courseCode} onChange={e => setCourseCode(e.target.value)} placeholder="Course Code" />
          </div>
          <div className="column is-3">
            <input type="text" className="input" style={{ height: '2.5em' }} value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="Course Name" />
          </div>
          <div className="column is-2">
            <button className="button is-success" style={{ height: '2.5em' }} onClick={handleSubmit}>Add Course</button>
          </div>
        </div>
        <div className="buttons has-addons is-centered" style={{ marginBottom: '20px' }}>
          {['CS', 'ECE', 'INFO', 'LAW', 'NBAY', 'ORIE', 'TECH'].map(dept => (
              <button
                key={dept}
                onClick={() => handleFilterToggle(dept)}
                className={`button ${filter.has(dept) ? 'is-success' : ''}`}
                style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '5px' }}
              >
                {dept}
              </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}> {/* Add a search input */}
          <input
            type="text"
            className="input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Course Name"
            style={{ height: '2.5em', width: '500px' }} 
          />
        </div>
        <section className="section" style={{ overflowY: 'auto', height: '600px' }}>
  <ul>
    {filteredCourses.map(course => (
      <li key={course.id} style={{ 
        padding: '10px', 
        backgroundColor: '#f0f0f0', 
        margin: '10px', 
        borderRadius: '10px',
        display: 'flex',  
        alignItems: 'center'  
      }}>
        <strong style={{ 
          fontSize: '1.8em', 
          flex: '1 0 20%'  
        }}>{course.code}</strong>
        <span style={{
          fontSize: '1.8em', 
          flex: '1 0 60%'  
        }}>{course.name}</span>
      </li>
    ))}
  </ul>
</section>
        <section className="hero is-medium">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
            <div className="column">
              <p className="title">
                Share questions with the class using a custom URL
              </p>
              <p className="subtitle">
                Create your own temporary URL where you can save questions and
                view them in real time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
