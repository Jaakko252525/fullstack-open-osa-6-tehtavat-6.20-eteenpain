


import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)




export const createAnecdote = newAnecdote => {
  console.log('newAnecdote in axios POST', newAnecdote)
  axios.post(baseUrl, newAnecdote).then(res => res.data)

}

export const changeAnecdote = (anecdote) => {

  const newObject = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }

  console.log('this is anecdote in PUT req', anecdote)
  axios.put(baseUrl + '/' + anecdote.id, newObject)
}



