import api from '@/Services'
import { Config } from '@/Config'

export default async () => {
  const response = await api.get( Config.API_DATA_SLUG+'/campaigns/')
  return response.data
}
