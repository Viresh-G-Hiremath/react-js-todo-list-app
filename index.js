const App = () => {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [updateId, setUpdateId] = React.useState(null);
  const [searchKey, setSearchKey] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);

  React.useEffect(()=>{
    setSearchList(list);
  },[list])


  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(value);
      if(value.trim() == '') return;
      if(updateId !==null) {
            const newList = list.map((li, i)=> {
                  if(i == updateId) return value;
                  return li;
            });
            setList(newList);
            setValue("");
            setUpdateId(null);
            return;
      }
    const newList = [...list, value];
    setList(newList);
    
    setValue("");
  };
  const handleUpdate=(id)=>{
      const newList = list.find((li,i)=> i=== id );
      setValue(newList);
      setUpdateId(id);
  };

  const handleDelete=(id)=>{
      const newList = list.filter((li,i)=> i != id );
      setList(newList);
  };

  const handleSearch = (e) => {

      const key = e.target.value;
      setSearchKey(key);
     
      const newList = list.filter((li) => key == '' || li.startsWith(key));
      setSearchList(newList);
  };

  return (
    <>
      <header className='header'>
        <h3>Item Lister</h3>
        <input type='search' value={searchKey} placeholder='Search items...' onChange={handleSearch}/>
      </header>
      <main className='main'>
        <form onSubmit={handleSubmit}>
          <h4>Add Items</h4>
          <input type='text' value={value} onChange={handleChange} />
          <input type='submit' value='Submit' />
        </form>
        <div className='items'>
          <h5>Items</h5>
          <ul>
            {searchList.length > 0 &&
              searchList.map((li, i) => {
                return (
                  <li id={i} key={i} onClick={()=>handleUpdate(i)}>
                    {li}
                    <button onClick={()=>handleDelete(i)} >X</button>
                  </li>
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
