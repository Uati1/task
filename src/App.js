import './App.css';
import { useState } from "react";

const App = () => {

  const [workers, setWorkers] = useState([{
    name: 'Jan',
    surname: 'Kowalski'
  }]);

  const [newWorker, setNewWorker]= useState({
    name: '',
    surname: ''
  })

  const [errorMsg, setErrorMsg] = useState('');
  const [active, setActive] = useState(true);

  const renderWorkers = (workers)=>{
    return workers.map((worker,index)=>{
      return(
        <>
          <div className="grid-item" >{worker.name}</div>
          <div className="grid-item" >{worker.surname}</div>
          <div className="delete" id={index} onClick={handleDelete}>delete</div>
        </>
      )
    })
  }

  const handleChange = (e) =>{
    e.target.name==='name'?
      setNewWorker({
        ...newWorker,
        name: e.target.value
      })
      :setNewWorker({
        ...newWorker,
        surname: e.target.value
      })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(newWorker.name === ''||newWorker.surname ===''){
      setErrorMsg('Pole Imię oraz pole Nazwisko nie mogą być puste')
    }else{
      setWorkers(prevState=>[...prevState, newWorker]);
      setNewWorker({
        name: '',
        surname: ''
      });
      setErrorMsg('');
      setActive(true);
    }
  }

  const displayForm = ()=> {
    setErrorMsg('')
    if(workers.length>=4){
      setErrorMsg('Nie można dodać więcej pracowników')
      setActive(true);
    }else{
      setActive(false);
    }
  }

  const handleDelete = (e)=>{
    setErrorMsg('')
    setWorkers(workers=> workers.filter((worker,index)=> index!= e.target.id));
  }

  return (
    <div className="container">
      <header className="header">
        <h1>App bar</h1>
      </header>
      <main className="element-b">
        <div className="content-container">
          <div className="element-c">
            <div className="wrapper">
              <div className="element-e">
              </div>
            </div>
          </div>
          <div className="table-container">
            <div className="grid-container">
              <div className="grid-item">Pracownicy</div>
              {renderWorkers(workers)}
            </div>
            {active?
              <button onClick={displayForm}>dodaj pracownika</button>
              :
              <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="name"/>
                <input type="text" onChange={handleChange} name="surname"/>
                <button type="submit">dodaj pracownika</button>
              </form>
            }
            
            
            
            <div className="error-msg">
              {errorMsg}
            </div>
          </div>
        </div>
        
        
      </main>
      <footer>
        <h4>footer</h4>
      </footer>
    </div>
  );
}

export default App;
