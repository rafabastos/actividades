import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchAll from './FetchAll'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
}

export default buildSlice('alldata', [FetchAll], sliceInitialState).reducer

export interface AllDataState {
  item: {
    data: any
  }
  fetchAll: {
    loading: boolean
    error: any
  }
}