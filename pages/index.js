import { useState, useEffect } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse } from '../services/firestore/courses';
import { getComments } from '../services/firestore/comments';
import { auth } from "../firebase"; 

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(new Set());
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const coursesData = await getCourses();
            const coursesWithCommentCount = await Promise.all(
              coursesData.map(async (course) => {
                const comments = await getComments(course.id);
                return { ...course, commentCount: comments.length };
              })
            );
            setCourses(coursesWithCommentCount);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };
    auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    fetchCourses();
  }, []);

  const handleCourseCodeChange = (e) => {
    if (editingId) {
      setEditCode(e.target.value.toUpperCase());
    } else {
      setCourseCode(e.target.value.toUpperCase());
    }
  };

  const handleCourseNameChange = (e) => {
    if (editingId) {
      setEditName(e.target.value);
    } else {
      setCourseName(e.target.value);
    }
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

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditCode(course.code);
    setEditName(course.name);
  };

  const handleSave = async () => {
    try {
      await updateCourse(editingId, { name: editName, code: editCode });
      const updatedCourses = courses.map(course => 
        course.id === editingId ? { ...course, name: editName, code: editCode } : course
      );
      setCourses(updatedCourses);
      setEditingId(null);
      setEditName('');
      setEditCode('');
      // alert('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        setCourses(courses.filter(course => course.id !== id));
        alert('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course.');
      }
    }
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
      const docRef = await addCourse(courseData); // This returns a document reference
      const newCourseId = docRef.id; // Extracting the ID from the document reference
      const comments = await getComments(newCourseId); // Fetch comments for the new course
      const newCourse = { ...courseData, id: newCourseId, commentCount: comments.length }; // Include comment count
    setCourses(prevCourses => [...prevCourses, newCourse]);
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
              <a href="https://classes.cornell.edu/browse/roster/SP24" className="button is-success" style={{ height: '2.5em' }}>View all courses at Cornell</a>
            </div>
          </div>
        </section>
        <section className="section background-section">
          <p><strong>Not finding the course? Add here:</strong></p>
          <div className="columns is-centered" style={{ marginTop: '20px' }}>
            <div className="column is-3">
              <input type="text" className="input" style={{ height: '2.5em' }} value={courseCode} onChange={handleCourseCodeChange} placeholder="Course Code" />
            </div>
            <div className="column is-3">
              <input type="text" className="input" style={{ height: '2.5em' }} value={courseName} onChange={handleCourseNameChange} placeholder="Course Name" />
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
        </section>
        <section className="section custom-scrollbar" style={{ overflowY: 'auto', height: '600px' }}>
          <ul>
            {filteredCourses.map(course => (
              <li key={course.id} style={{ 
                padding: '10px', 
                backgroundColor: '#f0f0f0', 
                margin: '10px', 
                borderRadius: '10px',
                display: 'flex',  
                alignItems: 'center', 
                justifyContent: 'space-between' // Ensures space distribution
              }}>
                {editingId === course.id ? (
                  <>
                    <input className="input" value={editCode} onChange={(e) => handleCourseCodeChange(e)} style={{ marginRight: '10px', flex: '1 0 20%' }} />
                    <input className="input" value={editName} onChange={(e) => handleCourseNameChange(e)} style={{ marginRight: '10px', flex: '1 0 60%' }} />
                    <button className="button is-success" onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                        <strong style={{ fontSize: '1.5em' }}>{course.code}</strong>
                      <span style={{ fontSize: '1.5em', paddingLeft: '1.2em', flex: '1 0 80%' }}>{course.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <a href={`/app/${course.id}`} style={{ /* ... */ }} className="has-text-primary">
                        <strong style={{ marginRight: '10px' }}>See {course.commentCount} comments</strong>
                      </a>
                      {isLoggedIn && (
                        <div className="level-is-right">
                          <button className="button is-info is-light" onClick={() => handleEdit(course)}>Edit</button>
                          <button className="button is-danger is-light" onClick={() => handleDelete(course.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
