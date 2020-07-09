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

    createGift = (event) => {
      event.preventDefault();
      axios.post(
          '/gifts',
          {
            wisher:this.state.newWisher,
            item:this.state.newItem,
            image:this.state.newImage,
            des:this.state.newDes,
            link:this.state.newLink,

          }
      ).then(
        (response) => {
          this.setState({
            gifts:response.data
          })
        }
      )

    }

    createWisher = (event) => {
      this.setState({
          newWisher:event.target.value
      })
    }

    createItem = (event) => {
      this.setState({
          newItem:event.target.value
      })
    }

    createImgURL = (event) => {
      this.setState({
          newImage:event.target.value
      })
    }

    createDes = (event) => {
      this.setState({
          newDes:event.target.value
      })
    }

    createLink = (event) => {
      this.setState({
          newLink:event.target.value
      })
    }


  render = () => {
    return <div> <h1>REACT APP</h1>
    <div>
      <form onSubmit={this.createGift}>

       <input onKeyUp={this.createWisher} type="text" placeholder="name" required/><br/>
       <input onKeyUp={this.createItem} type="text" placeholder="Gift" required/><br/>
       <input onKeyUp={this.createImgURL} type="text" placeholder="ImageURL" required/><br/>
       <input onKeyUp={this.createDes} type="text" placeholder="Description" required/><br/>
       <input onKeyUp={this.createLink} type="text" placeholder="Link" required/><br/>
       <input type="submit" value="Make a Wish"/>
      </form>
    </div>
    {
      this.state.gifts.map(
        (gift) => {
          return <h1>{gift.wisher} : {gift.item}</h1>
        }
      )
    }

    </div>
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
