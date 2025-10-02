import React, { useState, useEffect } from 'react';

export default function App() {
  const [name, setName]   = useState('');
  const [age, setAge]     = useState('');
  const [major, setMajor] = useState('');
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('students');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (e) => {
    e.preventDefault();
    // simple validation
    if (!name.trim() || !age.trim() || !major.trim()) return alert('Please fill all fields.');
    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum <= 0) return alert('Age must be a positive number.');
    setStudents(prev => [...prev, { id: Date.now(), name: name.trim(), age: ageNum, major: major.trim() }]);
    setName(''); setAge(''); setMajor('');
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student Information System</h1>
        <p className="subtitle">Developed By: <b>101470474</b> || <b>Mariia Shmidt</b> || <b>DevOps</b></p>

        <form className="form" onSubmit={addStudent}>
          <label className="row">
            <span className="label">Name:</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </label>

          <label className="row">
            <span className="label">Age:</span>
            <input
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 20"
              inputMode="numeric"
            />
          </label>

          <label className="row">
            <span className="label">Major:</span>
            <input
              className="input"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Computer Science"
            />
          </label>

          <div className="actions">
            <button className="btn" type="submit">Add Student</button>
          </div>
        </form>

        <h2 className="listTitle">Student List</h2>
        {students.length === 0 ? (
          <p className="empty">No students added yet</p>
        ) : (
          <ul className="list">
            {students.map(s => (
              <li className="item" key={s.id}>
                <div>
                  <div className="itemName">{s.name}</div>
                  <div className="itemMeta">Age: {s.age} &nbsp;•&nbsp; Major: {s.major}</div>
                </div>
                <button className="remove" onClick={() => removeStudent(s.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
