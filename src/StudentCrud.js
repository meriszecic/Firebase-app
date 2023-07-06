import React, { useState, useEffect } from 'react';
import firebase from './firebase';

const StudentCrud = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    const database = firebase.database();
    const studentsRef = database.ref('students');

    studentsRef.on('value', (snapshot) => {
      const studentData = snapshot.val();
      if (studentData) {
        const studentsArray = Object.entries(studentData).map(([id, data]) => ({ id, ...data }));
        setStudents(studentsArray);
      }
    });

    return () => {
      studentsRef.off(); 
    };
  }, []);

  const addStudent = () => {
    const database = firebase.database();
    const studentsRef = database.ref('students');
  
    const newStudent = {
      [`${name} ${surname}`]: {
        name,
        surname,
        age
      }
    };
  
    if (editMode) {
      studentsRef.child(editId).update(newStudent, (error) => {
        if (error) {
          console.error('Error updating student:', error);
        } else {
          setName('');
          setSurname('');
          setAge('');
          setEditMode(false);
          setEditId('');
        }
      });
    } else {
      studentsRef.update(newStudent, (error) => {
        if (error) {
          console.error('Error adding student:', error);
        } else {
          setName('');
          setSurname('');
          setAge('');
        }
      });
    }
  };
  

  const deleteStudent = (id) => {
    const database = firebase.database();
    const studentRef = database.ref(`students/${id}`);

    studentRef.remove((error) => {
      if (error) {
        console.error('Error deleting student:', error);
      }
    });
  };

  const editStudent = (student) => {
    setName(student.name);
    setSurname(student.surname);
    setAge(student.age);
    setEditMode(true);
    setEditId(student.id);
  };

  return (
    <div>
      <h1>Student CRUD</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={addStudent}>{editMode ? 'Update Student' : 'Add Student'}</button>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} {student.surname}, Age: {student.age}
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentCrud;
