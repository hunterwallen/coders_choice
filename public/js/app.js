class NewPost extends React.Component {
  state= {
    name: '',
    date: '',
    body: ''
  }
  render = () => {
    return (
      <div className='newPostDiv'>
        <h3>Create New NARATiV</h3>
        <form onSubmit={this.createPost}>
          <label for='name'>Name</label>
          <input type='text' id='name'/>
          <label for='title'>Title</label>
          <input type='text' id='title'/>
          <label for='body'>Body</label>
          <textarea id='body'></textarea>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}



class App extends React.Component {
  state = {
    posts: []
  }
  render = () => {
    return (
      <NewPost></NewPost>
    )
  }
}



ReactDOM.render(<App></App>, document.querySelector('main'))
