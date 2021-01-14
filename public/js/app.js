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
      event.target.previousSibling.style.display = 'block'
    } else {
      event.target.previousSibling.style.display = 'none'
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

class EditPost extends React.Component {
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
        event.target.previousSibling.style.display = 'block'
      } else {
        event.target.previousSibling.style.display = 'none'
      }
      if(event.target.id === "name" || event.target.id === "title") {
        this.checkRequired()
      }
    }
    checkRequired = () => {
      let hasName = (document.querySelector('#editPostForm').querySelector('#name').value !== "")
      let hasTitle = (document.querySelector('#editPostForm').querySelector('#title').value !== "")
      if(hasName && hasTitle) {
        document.querySelector('#submitEdit').style.display = 'block'
      } else {
        document.querySelector('#submitEdit').style.display = 'none'
      }
    }
    flipFlop = (event) => {
      if(this.state.showDiv === 1) {
        document.querySelector('#editPostForm').style.display = "block"
        this.setState({
          name: event.target.nextSibling.querySelector('#name').value,
          title: event.target.nextSibling.querySelector('#title').value,
          body: event.target.nextSibling.querySelector('#body').value,
          showDiv: 0
        })
      } else {
        document.querySelector('#editPostForm').style.display = "none"
        this.setState({
          name: '',
          title: '',
          body: '',
          showDiv: 1
        })
      }
    }
    submitPost = (event) => {
      let id = event.target.getAttribute('_id')
      this.setState({
        showDiv: 1
      })
      this.props.editPost(this.state, id)
    }
    render = () => {
      return (
        <div className='editPostDiv'>
          <button onClick={this.flipFlop}>Edit this NARATiV</button>
          <form id='editPostForm' _id={this.props.id} onSubmit={this.submitPost} style={{display: "none"}}>
            <label htmlFor='name'>Name</label>
            <h6 style={{display: 'none'}}>This field is required</h6>
            <input type='text' id='name' onChange={this.changeState} defaultValue={this.props.name}/>
            <label htmlFor='title'>Title</label>
            <h6 style={{display: 'none'}}>This field is required</h6>
            <input type='text' id='title' onChange={this.changeState} defaultValue={this.props.title}/>
            <label htmlFor='body'>Body</label>
            <textarea id='body' onChange={this.changeState} defaultValue={this.props.body}></textarea>
            <input type='submit' id='submitEdit' style={{display: 'none'}}/>
          </form>
        </div>
      )
    }
  }


class App extends React.Component {
  state = {
    posts: []
  }
  componentDidMount = () => {
    axios.get('/narativ').then(response => {
      this.setState({
        posts: response.data
      })
    })
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
  editPost = (data, id) => {
    event.preventDefault()
    document.querySelector('#editPostForm').reset()
    axios.put('/narativ/' + id, data).then(response => {
      this.setState({
        name: '',
        title: '',
        body: '',
        posts: response.data
      })
      document.querySelector('#editPostForm').style.display = 'none'

    })
  }
  deletePost = (event) => {
    axios.delete('/narativ/' + event.target.id).then(response => {
      this.setState({
        name: '',
        title: '',
        body: '',
        posts: response.data
      })
    })
  }
  render = () => {
    return (
      <div>
        <NewPost createPost={this.createPost} flipFlop={this.flipFlop}></NewPost>
        <div id="postFeed" style={{display: "flex"}}>
          <ul id='postContainer'>
            {this.state.posts.map(post => {
              let thisDate = post.updatedAt.slice(5, 7) + '/' + post.updatedAt.slice(8, 10) + '/' + post.updatedAt.slice(0, 4)
              return (<li className='singlePost'>
                <h3>{post.title}</h3>
                <h6>by:{post.name}</h6>
                <h6 className='date'>on  {thisDate}</h6>
                <p>{post.body}</p>
                <div id='buttonDiv'>
                  <button id={post._id} onClick={this.deletePost}>Delete this NARATiV</button>
                  <EditPost body={post.body} name={post.name} title={post.title} editPost={this.editPost} id={post._id}></EditPost>
                </div>
              </li>
            )
            })}
          </ul>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App></App>, document.querySelector('main'))
