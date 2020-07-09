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
    const {gift, deleteGift,updateGift, updateWisher,updateItem,updateImgURL,updateDes,updateLink,index } = this.props;
    return <div className="container">

    <div className="show-page">

    <h2 id="wisher-name">{gift.wisher} wishes for</h2>
    <div>
    <img className="gift-img" src={gift.image} alt=""/>
    </div>

    <div className="details">
    <h2> {gift.item}</h2>
    <h2>{gift.des}</h2>
    <h3><a href={gift.link} target="_blank">LINK</a></h3>
    </div>

    <div className="func-btns">
    <button className="btns" onClick={this.toggleShow}>EDIT</button>
    <button className="btns" value={gift.id} onClick={deleteGift}>DELETE</button>
    </div>

    </div>

    { this.state.show ?
        <div className="edit-form">
          <form id={gift.id} onSubmit={updateGift}>
            <input className="update-input" onKeyUp={updateWisher} type="text" placeholder="Name" required/>
            <input className="update-input" onKeyUp={updateItem} type="text" placeholder="Gift" required/>
            <input className="update-input" onKeyUp={updateImgURL} type="text" placeholder="Image URL" required/>
            <input className="update-input" onKeyUp={updateDes} type="text" placeholder="Description" required/>
            <input className="update-input" onKeyUp={updateLink} type="text" placeholder="Link" required/>
            <input type="submit" value="Update Wish"/>
          </form>
        </div> : null }
        </div>

  }

}

class App extends React.Component{
    state = {
      gifts:[],
      show:false
    }

    toggleShow = () => {
        this.setState({
            show:!this.state.show
        })
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


    deleteGift = (event) => {
        axios.delete('/gifts/' + event.target.value).then(
            (response) => {
              this.setState({
                  gifts:response.data
              })
            }
        )
    }

    updateGift = (event) =>{
      event.preventDefault();
      const id = event.target.getAttribute('id');
      axios.put(
        '/gifts/' + id,
        {
          wisher:this.state.updatedWisher,
          item:this.state.updatedItem,
          image:this.state.updatedImgURL,
          des:this.state.updatedDes,
          link:this.state.updatedLink,
        }
      ).then(
        (response) => {
            this.setState({
                gifts:response.data
            })
        }
      )
    }

    updateWisher = (event) => {
      this.setState({
        updatedWisher:event.target.value,

      })
    }
    updateItem = (event) => {
      this.setState({
        updatedItem:event.target.value,

      })
    }
    updateImgURL = (event) => {
      this.setState({
        updatedImgURL:event.target.value,

      })
    }
    updateDes = (event) => {
      this.setState({
        updatedDes:event.target.value,

      })
    }
    updateLink = (event) => {
      this.setState({
        updatedLink:event.target.value,

      })
    }

  render = () => {
    return <div>
    <nav className="nav-bar"><button className="nav-btns">WISHES</button><button onClick={this.toggleShow} className="nav-btns">MAKE A WISH</button></nav>

    { this.state.show ?
    <div className="create-form">
      <form onSubmit={this.createGift}>

       <input onKeyUp={this.createWisher} type="text" placeholder="name" required/><br/>
       <input onKeyUp={this.createItem} type="text" placeholder="Gift" required/><br/>
       <input onKeyUp={this.createImgURL} type="text" placeholder="ImageURL" required/><br/>
       <input onKeyUp={this.createDes} type="text" placeholder="Description" required/><br/>
       <input onKeyUp={this.createLink} type="text" placeholder="Link" required/><br/>
       <input type="submit" value="Make a Wish"/>
      </form>
    </div> : null}

    {
      this.state.gifts.map(

        (gift,index) => {
          return  <Gift gift={gift}
                       index={index}
                       deleteGift={this.deleteGift}
                       updateGift={this.updateGift}
                       updateWisher={this.updateWisher}
                       updateItem={this.updateItem}
                       updateImgURL={this.updateImgURL}
                       updateDes={this.updateDes}
                       updateLink={this.updateLink}



              ></Gift>
        })

    }

    </div>
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
