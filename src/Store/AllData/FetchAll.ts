import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import FetchAllDatanService from '@/Services/AllData/FetchAll'

export default {
  initialState: buildAsyncState('fetchAll'),
  action: buildAsyncActions('alldata/fetchAll', FetchAllDatanService),
  reducers: buildAsyncReducers({
    errorKey: 'fetchAll.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'fetchAll.loading',
  }),
}