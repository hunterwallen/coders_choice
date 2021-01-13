class NewPost extends React.Component {
  state= {
    name: '',
    title: '',
    body: ''
  }
  changeState = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    if(event.target.value === "") {
      event.target.nextSibling.style.display = 'flex'
    } else {
      event.target.nextSibling.style.display = 'none'
    }
    if(event.target.id === "name" || event.target.id === "title") {
      this.checkRequired()
    }
  }
  checkRequired = () => {
    let hasName = (document.querySelector('#newPostForm').querySelector('#name').value !== "")
    let hasTitle = (document.querySelector('#newPostForm').querySelector('#title').value !== "")
    if(hasName && hasTitle) {
      document.querySelector('#submitNew').style.display = 'flex'
    } else {
      document.querySelector('#submitNew').style.display = 'none'
    }
  }
  createPost = () => {

  }
  render = () => {
    return (
      <div className='newPostDiv'>
        <h3>Create New NARATiV</h3>
        <form id='newPostForm' onSubmit={this.createPost}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' onChange={this.changeState}/>
          <h6>This field is required</h6>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' onChange={this.changeState}/>
          <h6>This field is required</h6>
          <label htmlFor='body'>Body</label>
          <textarea id='body' onChange={this.changeState}></textarea>
          <input type='submit' id='submitNew' style={{display: 'none'}}/>
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
