class NewPost extends React.Component {
  state= {
    name: '',
    title: '',
    body: '',
    showDiv: 1
  }
  changeState = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    if(event.target.value === "") {
      event.target.nextSibling.style.display = 'block'
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
      document.querySelector('#submitNew').style.display = 'block'
    } else {
      document.querySelector('#submitNew').style.display = 'none'
    }
  }
  flipFlop = () => {
    if(this.state.showDiv === 1) {
      document.querySelector('#newPostForm').style.display = "block"
      document.querySelector('#postFeed').style.display = "none"
      this.setState({
        showDiv: 0
      })
    } else {
      document.querySelector('#postFeed').style.display = "block"
      document.querySelector('#newPostForm').style.display = "none"
      this.setState({
        showDiv: 1
      })
    }
  }
  submitPost = () => {
    this.setState({
      showDiv: 1
    })
    this.props.createPost(this.state)
  }
  render = () => {
    return (
      <div className='newPostDiv'>
        <button onClick={this.flipFlop}>
          <h3>Create New NARATiV</h3>
        </button>
        <form id='newPostForm' onSubmit={this.submitPost} style={{display: "none"}}>
          <label htmlFor='name'>Name</label>
          <h6>This field is required</h6>
          <input type='text' id='name' onChange={this.changeState}/>
          <label htmlFor='title'>Title</label>
          <h6>This field is required</h6>
          <input type='text' id='title' onChange={this.changeState}/>
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

  createPost = (data) => {
    event.preventDefault()
    document.querySelector('#newPostForm').reset()
    axios.post('/narativ', data).then(response => {
      this.setState({
        name: '',
        title: '',
        body: '',
        posts: response.data
      })
      document.querySelector('#newPostForm').style.display = 'none'
      document.querySelector('#postFeed').style.display = 'block'
    })
  }
  render = () => {
    return (
      <div>
        <NewPost createPost={this.createPost} flipFlop={this.flipFlop}></NewPost>
        <div id="postFeed" style={{display: "flex"}}>
          <ul>
            {this.state.posts.map(post => {
              <li className='singlePost'>
                <h3>{post.title}</h3>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App></App>, document.querySelector('main'))
