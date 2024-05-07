import { useState, useEffect } from "react";
import { getCourses, addCourse, deleteCourse } from '../services/firestore/courses'; // Import deleteCourse function
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

  const handleDeleteCourse = async (courseId) => {
    try {
        await deleteCourse(courseId);
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        alert('Course deleted successfully!');
    } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course.');
    }
  };

  const filteredCourses = courses.filter(course => 
    (filter.size === 0 || Array.from(filter).some(dept => course.code.startsWith(dept))) &&
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <main>
        {/* Existing JSX here remains unchanged */}
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
                <a href={`/app/${course.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 0 20%' }} class="has-text-primary">
                  <strong style={{ fontSize: '1.8em' }}>{course.code}</strong>
                </a>
                <span style={{ fontSize: '1.8em', flex: '1 0 60%' }}>{course.name}</span>
                <button className="button is-danger" onClick={() => handleDeleteCourse(course.id)} style={{ marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section className="section">
        <p><strong>Not finding the course? Add here:</strong></p>
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
        </section>
      </main>
    </div>
  );
}
