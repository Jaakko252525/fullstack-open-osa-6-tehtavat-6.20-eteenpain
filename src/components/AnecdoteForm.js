import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote } from '../services/requests'
import { createContext, useReducer } from 'react'

import { useContext } from 'react'

import StoreContext from '../contexts/addedOrVotedContext'

import Notification from './Notification'

const anecdotePasserToNoti = (state, action) => {
  switch (action.type){
    case 'ADD':
      console.log('state in ADD', state)
      console.log('action in ADD', action.additionalState.content)
      return action.additionalState.content
    
    default:
      return state

}

}



const AnecdoteForm = () => {

  const [anecdoteStored, anecdoteStoredDispatch] = useReducer(anecdotePasserToNoti, '')

  const [store, dispatch] = useContext(StoreContext)


  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const addAnecdote = async (event) => {
    event.preventDefault()

    if (event.target.anecdote.value.length < 5) {
      dispatch({type: "SHORT"})
    }

     
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    anecdoteStoredDispatch({type:"ADD", additionalState: event.target.anecdote.value})
    // putting true to store o it shows NOTI component
    dispatch({type: "SHOW"})


  }



  return (
    <div>
      <h3>create new</h3>
      <Notification anecdoteProp={anecdoteStored} />
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
