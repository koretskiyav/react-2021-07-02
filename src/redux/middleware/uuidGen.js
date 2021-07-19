import { v4 as uuidv4 } from 'uuid'

export default (store) => (next) => (action) => {

  // change condition
  if (action.payload && !action.payload.id) {
    const uuid =  uuidv4()
    console.log(uuid)
    // action.payload.id = uuid
  }

  next(action)
}