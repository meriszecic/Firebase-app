import React, { useState, useEffect } from 'react';
import firebase from './firebase';


const StudentCrud = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const[image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState(String(new Date().toJSON().slice(0, 10)));
  const [createdBy, setCreatedBy] = useState('');
  const [lastEditor, setLastEditor] = useState('not edited yet');



  const [user,setUser] = useState(null);


  useEffect(() => {
    const database = firebase.database();
    const studentsRef = database.ref('students');

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setCreatedBy(user.displayName);
    });


    studentsRef.on('value', (snapshot) => {
      const studentData = snapshot.val();
      if (studentData) {
        const studentsArray = Object.entries(studentData).map(([id, data]) => ({ id, ...data }));
        setStudents(studentsArray);
      }
    });

    return () => {
      studentsRef.off();
      unsubscribe(); 
    };
  }, []);

  const addStudent = () => {
    const database = firebase.database();
    const studentsRef = database.ref('students');
  
    const newStudent = {
      [`${name} ${surname}`]: {
        name,
        surname,
        age,
        createdBy,
        image,
        createdAt,
        lastEditor
      }
    };
  
    if (editMode) {
      studentsRef.child(editId).update({age: `${age}`, name: `${name}`, surname: `${surname}`, image: image, lastEditor: user.displayName}, (error) => {
        if (error) {
          console.error('Error updating student:', error);
        } else {
          setImage('');
          setCreatedAt('');
          setCreatedBy('');
          setLastEditor('not edited yet');
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
          setImage('');
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
    setImage(student.image);
    setLastEditor(user.displayName)
  };

  return (
    <div>
      <h1>Student CRUD</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="img url" value={image} onChange={(e) => setImage(e.target.value)} />

        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={addStudent}>{editMode ? 'Update Student' : 'Add Student'}</button>
      </div>

        {students.map((student) => (
          <div style={{marginBottom:'50px', marginTop:'50px'}} key={student.id}>
            <b>{student.name} {student.surname}, Age: {student.age}</b><br></br>
            <img src={student.image} width="250px" alt='slika studenta'/><br></br>
            <p>Student created at: <b>{student.createdAt}</b></p> 
           <p>Student created by: <b>{student.createdBy}</b></p>
            <p>Last edited by: <b>{student.lastEditor}</b></p>
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default StudentCrud;
