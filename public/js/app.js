class NewEntry extends React.Component {
  state = {
    name: '',
    date: '',
    body: ''
  }
  render = () => {
    return <h1>App.js is linked</h1>
  }
}



ReactDOM.render(<App></App>, document.querySelector('main'))
