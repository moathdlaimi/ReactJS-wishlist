class Gift extends React.Component{
    state = {
      show:false
    }

  toggleShow = () => {
      this.setState({
          show:!this.state.show
      })
  }

  render = () => {
    const {gift, deleteGift} = this.props;
    return <div>
    <h1>{gift.wisher} : {gift.item}</h1>
    <button className="" value={gift.id} onClick={deleteGift}>DELETE</button>

    </div>
    { this.state.show ?
        <div className="edit-form">
          <form id={gift.id} onSubmit={updateGift}>
            <input className="update-input" onKeyUp={updateWisher} type="text" placeholder="Name" required/>
            <input className="update-input" onKeyUp={updateItem} type="text" placeholder="Gift" required/>
            <input className="update-input" onKeyUp={updateImgURL} type="text" placeholder="Image URL" required/>
            <input className="update-input" onKeyUp={updateDes} type="text" placeholder="Description" required/>
            <input className="update-input" onKeyUp={updateLink} type="text" placeholder="Link" required/>
            <input id="update-button" type="submit" value="Update Wish"/>
          </form>
        </div> : null }

  }





}

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

    deleteGift = (event) => {
        axios.delete('/gifts/' + event.target.value).then(
            (response) => {
              this.setState({
                  gifts:response.data
              })
            }
        )
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
          return <Gift gift={gift}
                       deleteGift={this.deleteGift}


              ></Gift>
        })
    }

    </div>
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
