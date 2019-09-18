import React, { createContext } from 'react'
import items from './data.js'
const RoomContext = createContext()

export default class RoomProvider extends React.Component {

  state = {
    rooms:[],
    featuredRooms:[],
    sortedRooms:[],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  componentDidMount() {
     let rooms = this.formateData(items)
     let featuredRooms = rooms.filter(room => room.featured === true)

     this.setState({
       rooms,
       featuredRooms,
       sortedRooms: rooms,
       loading: false
     })
  }

  formateData(items) {
     let tempItems = items.map(item => {
        let id = item.sys.id
        let images = item.fields.images.map(image => image.fields.file.url )
        let room = {...item.fields,id,images}
        return room;
     })

     return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms]
    let room = tempRooms.find(room => room.slug === slug)
    return room;
  }

  handleChange = e => {
     const target = e.target;
     const value = target.type === "checkbox" ? target.checked : target.value;
     const name = target.name

     this.setState({
       [name] : value
     },this.filterRooms)
  }

  filterRooms =() => {
    //distruct
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    

    this.setState({
      sortedRooms: tempRooms
   });
  }

  render () {
      return (
        <RoomContext.Provider value={{
            ...this.state,
            getRoom:this.getRoom,
            handleChange:this.handleChange
          }}>
            { this.props.children }
        </RoomContext.Provider>
      )
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomContext, RoomProvider, RoomConsumer };
