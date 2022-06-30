import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCollection } from "../../hooks/useCollection";
// Styles
import './Create.css'

const categories =
  [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business" },
    { value: "programming", label: "Programming" },
    { value: "gaming", label: "Gaming" },
    { value: "other", label: "Other" }
  ]

export default function Create ()
{
  const { documents } = useCollection( "users" );
  const [ users, setUsers ] = useState( [] );


  //Form field values
  const [ name, setName ] = useState( '' );
  const [ details, setDetails ] = useState( '' );
  const [ dueDate, setDueDate ] = useState( '' );
  const [ priority, setPriority ] = useState( '' );
  const [ category, setCategory ] = useState( '' );
  const [ assignedUsers, setAssignedUsers ] = useState( [] );

  useEffect( () =>
  {
    if ( documents )
    {
      const options = documents.map( user =>
      {
        return { value: user, label: user.displayName }
      } );
      setUsers( options );
    }
  }, [ documents ] );

  const handleSubmit = ( e ) =>
  {
    e.preventDefault();
    console.log( name, details, dueDate, priority, category.value, assignedUsers );
  }


  return (
    <div className="create-form">
      <h2 className='page-title' >Create a new project</h2>
      <form onSubmit={ handleSubmit }>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={ ( e ) => setName( e.target.value ) }
            value={ name }
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={ ( e ) => setDetails( e.target.value ) }
            value={ details }
          ></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            required
            type="date"
            onChange={ ( e ) => setDueDate( e.target.value ) }
            value={ dueDate }
          />
        </label>
        <label>
          <span>Priority (max 5):</span>
          <input
            type="number"
            max="10"
            onChange={ ( e ) => setPriority( e.target.value ) }
            value={ priority }
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            onChange={ ( option ) => setCategory( option ) }
            options={ categories }
          />
        </label>
        <label>
          <span>Assign To:</span>
          <Select
            onChange={ ( option ) => setAssignedUsers( option ) }
            options={ users }
            isMulti
          />
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </div>
  );
}