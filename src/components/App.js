import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  onChangeType = (event) => {
    this.setState({ filters: { ...this.state.filters, type: event.target.value } });
    //setState is asynchronous so it will take a little bit of time for it to resolve.
    //when I did console.log(this.state) directly after, it outputed "all" but once I
    //did setTimeout with a 1 sec delay, it outputed correctly.
  }

  fetchPets = async () => {
    let fetchAddress = ""
   this.state.filters.type === "all"? fetchAddress = '/api/pets': fetchAddress = `/api/pets?type=${this.state.filters.type}`
   let res = await fetch(fetchAddress)
    let data = await res.json()
    let pets = await this.setState({pets: data})
  }

  onFindPetsClick = async (event) => {
    const pets = await this.fetchPets()
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      if (pet.id === petId){
        return {...pet, isAdopted: true}
      }
      else{
        return pet
      }
    })
    this.setState({pets: pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
