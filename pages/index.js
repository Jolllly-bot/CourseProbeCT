import { useState, useEffect } from "react";
import { getCourses, addCourse } from '../services/firestore/courses';
import { auth } from "../firebase"; 

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(new Set());
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      const fetchCourses = async () => {
          try {
              const coursesData = await getCourses();
              setCourses(coursesData);
          } catch (error) {
              console.error("Failed to fetch courses:", error);
          }
      };
      auth.onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });
      fetchCourses();
  }, []);

  const handleCourseCodeChange = (e) => {
    const upperCaseCode = e.target.value.toUpperCase();
    setCourseCode(upperCaseCode);
  };
  
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
    event.preventDefault();
    if (!isLoggedIn) {
        alert('Please login first.');
        return;
    }
    if (!courseCode.trim() || !courseName.trim()) {
        alert('Please enter both course code and course name before submitting.');
        return;
    }
    try {
        const courseData = { name: courseName, code: courseCode };
        await addCourse(courseData);
        alert('Course added successfully!');
        setCourses(prevCourses => [...prevCourses, {...courseData, id: new Date().getTime()}]);
        setCourseName('');
        setCourseCode('');
    } catch (error) {
        console.error('Error adding course:', error);
        alert('Failed to add course.');
    }
  };

  const filteredCourses = courses.filter(course => 
    (filter.size === 0 || Array.from(filter).some(dept => course.code.startsWith(dept))) &&
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <main>
        <section className="hero is-link" style={{ position: 'relative', overflow: 'hidden', width: '100vw', height: '56.25vw', maxHeight: '100vh' }}>
          <iframe 
            src="https://www.youtube.com/embed/n8Y34Axq2EM?enablejsapi=1&autoplay=1&loop=1&controls=0&rel=0&wmode=transparent&showinfo=0&mute=1&autohide=0&modestbranding=1&playsinline=1&hd=1&vq=hd1080&disablekb=1&origin=https%3A%2F%2Ftech.cornell.edu&widgetid=1&playlist=n8Y34Axq2EM" 
            style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '56.25vw', border: 'none', objectFit: 'cover' }}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="hero-body columns is-vcentered" style={{ position: 'relative', zIndex: '10' }}>
            <div className="column">
              <p className="title" style={{ fontSize: '2em' }}>Explore Cornell Tech Course Reviews</p>
              <p className="subtitle" style={{ fontSize: '1.5em' }}>
                Discover what students say about their courses at Cornell Tech
              </p>
              <a href="https://classes.cornell.edu/browse/roster/SP24" className="button is-success" style={{ height: '2.5em' }}>View Courses at Cornell</a>
            </div>
          </div>
        </section>
        <div className="columns is-centered" style={{ marginTop: '20px' }}>
          <div className="column is-3">
            <input type="text" className="input" style={{ height: '2.5em' }} value={courseCode} onChange={handleCourseCodeChange} placeholder="Course Code" />
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
            <button key={dept} onClick={() => handleFilterToggle(dept)} className={`button ${filter.has(dept) ? 'is-success' : ''}`} style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '5px' }}>
              {dept}
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <input type="text" className="input" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Course Name" style={{ height: '2.5em', width: '500px' }} />
        </div>
          <section className="section custom-scrollbar" style={{ overflowY: 'auto', height: '600px' }}>
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
                <a href={`/app/${course.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 0 20%' }}>
                  <strong style={{ fontSize: '1.8em' }}>{course.code}</strong>
                </a>
                <span style={{ fontSize: '1.8em', flex: '1 0 60%' }}>{course.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
