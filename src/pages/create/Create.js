import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from '../../firebase/config';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from '../../hooks/useFirestore';
// Styles
import './Create.css'

const categories =
  [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business" },
    { value: "gaming", label: "Gaming" },
    { value: "other", label: "Other" }
  ]

export default function Create ()
{
  const history = useHistory();
  const { addDocument, response } = useFirestore( "projects" );
  const { documents } = useCollection( "users" );
  const [ users, setUsers ] = useState( [] );
  const { user } = useAuthContext();


  //Form field values
  const [ name, setName ] = useState( '' );
  const [ details, setDetails ] = useState( '' );
  const [ dueDate, setDueDate ] = useState( '' );
  const [ priority, setPriority ] = useState( '' );
  const [ category, setCategory ] = useState( '' );
  const [ assignedUsers, setAssignedUsers ] = useState( [] );
  const [ formError, setFormError ] = useState( null );

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

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    setFormError( null );
    if ( !category )
    {
      setFormError( "Please select a project category." );
      return;
    }
    if ( assignedUsers.length < 1 )
    {
      setFormError( "Please assign the project to at least one user." );
      return;
    }

    const createdBy =
    {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map( ( u ) =>
    {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    } );

    const project =
    {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate( new Date( dueDate ) ),
      priority,
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument( project );
    if ( !response.error )
    {
      history.push( "/" );
    }
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

          { formError && <p className='error'>{ formError }</p> }
        </form>
      </div>
    );
  }