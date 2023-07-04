
import { useContext } from 'react'
import StoreContext from '../contexts/addedOrVotedContext'





const Notification = ({anecdoteProp}) => {

  const [store, dispatch] = useContext(StoreContext)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('storeeeee', store)

  if (store === "hmm") {
    
    dispatch({ type: 'NOSHOW' })
    
    
    return (<p>Too short anecdote :/ </p>)
  }


  console.log('storeeeee', store)
  if (store === false) return null

  //getting last anecdote from DB


  // waiting 5sec then changing store value to false
  const tiemoutFunction = () => {
    console.log('In timeout, waiting 5 seconds');

    setTimeout(() => {
      dispatch({ type: 'NOSHOW' });
      console.log('5 seconds have passed!');
      console.log('store now?', store);
    }, 5000);
  }


  tiemoutFunction()

  return (
    <div style={style}>
      anecdote "{anecdoteProp}" voted      
    </div>
  )
}

export default Notification
