import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote } from '../services/requests'




const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('this is event', event.target.anecdote.value)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
