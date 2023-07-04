import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, changeAnecdote } from './services/requests'

import { createContext, useReducer } from 'react'

import StoreContext from './contexts/addedOrVotedContext'


const addAnecdoteReducer = (state, action) => {


  switch (action.type) {
    case "SHOW":
        console.log('this is state in reducer', state)
        console.log('this is action in reducer', action)
        return state = true
    case "NOSHOW":
        console.log('changing store to false')
        return state = false

    case "SHORT":
      console.log('inside SHORT')
      return 'hmm'

    default:
        return state
  }
}


const anecdotePasserToNoti = (state, action) => {
  switch (action.type){
    case 'VOTE':
      console.log('state in VOTE', state)
      console.log('action in VOTE', action.additionalState.content)
      return action.additionalState.content
    
    default:
      return state

}

}


const App = () => {


  const [store, storeDispatch] = useReducer(addAnecdoteReducer, false)
  const [anecdoteStored, anecdoteStoredDispatch] = useReducer(anecdotePasserToNoti, '')

  const queryClient = useQueryClient()

  const result = useQuery('anecdotes', getAnecdotes)
  console.log('this is result', result)

  // Making vote functionality
  const updateAnecdoteMutation = useMutation(changeAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const handleVote = (anecdote) => {
    console.log('in vote function')
    updateAnecdoteMutation.mutate(anecdote)

    // changing store value
    const dik = () => {
      storeDispatch({type: "SHOW", additionalState: anecdote})
    
    }
    // putting anecdote to store
    const helou = () => {
      anecdoteStoredDispatch({type:"VOTE", additionalState: anecdote})
    }

    dik()
    helou()
  }


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError === true) {
    return <div>server failed...</div>
  }

  const anecdotes = result.data


  return (
    <StoreContext.Provider value={[store, storeDispatch]} >
    <div>
      <h3>Anecdote app</h3>
      <Notification anecdoteProp={anecdoteStored} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </StoreContext.Provider>
  )
}

export default App
