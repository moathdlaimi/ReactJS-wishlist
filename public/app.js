class App extends React.Component{
    state = {
      gifts:[]
    }

    componentDidMount = () => {
        axios.get('/gifts').then(
          (response) => {
            this.setState({
                gifts:response.data
            })
          }
        )
    }


  render = () => {
    return <div> HELLO REACT
    {
      this.state.gifts.map(
        (gift) => {
          return <h1>{gift.wisher}</h1>
        }
      )
    }

    </div>
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
