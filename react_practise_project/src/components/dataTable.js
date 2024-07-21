import React, { useEffect, useRef, useState } from "react";

function DataTable() {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const outsideClick = useRef(false)


  useEffect(() => {
    if (!editId) return;
    let selectedItem = document.querySelectorAll(`[id='${editId}']`);
    selectedItem[0].focus();
  }, [editId]);


  useEffect(()=>{
    const handleClickOutside = (event) =>{
        if(outsideClick.current && !outsideClick.current.contains(event.target)){
            setEditId(false)
        }
    }
    document.addEventListener("click",handleClickOutside)

    return ()=>{
        document.removeEventListener("click",handleClickOutside)
    }
  },[])

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleAddClick() {
    if (formData.name && formData.gender && formData.age) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
      };
      setData([...data, newItem]);
      setFormData({ name: "", gender: "", age: "" });
    }
  }

  function handleDelete(id) {
    // console.log(id)
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  }
  // console.log(Date.now())


  function handleEdit(id, updatedData) {
    if (!editId || editId !== id) {
      return;
    }
    const updatedList = data.map((item)=>
    item.id===id?{...item,...updatedData}:item)
    setData(updatedList)
  }
      console.log(data);

  return (
    <div className="container">
      Datatable
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search"
          name="search-input"
          value={""}
          onChange={() => {}}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { name: e.target.innerText })
                  }
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { gender: e.target.innerText })
                  }
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { age: e.target.innerText })
                  }
                >
                  {item.age}
                </td>
                <td className="actions">
                  <button className="edit" onClick={() => setEditId(item.id)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  );
}
export default DataTable;
