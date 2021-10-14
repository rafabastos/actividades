import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, Text, ScrollView, Image, Dimensions } from 'react-native'
import { ActivityCard, TopBar } from '@/Components'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import { navigate } from '@/Navigators/Root'

const ScreenWidth = Dimensions.get('window').width

const IndexWTSContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme()
  const selectActivity = (id: number, type: string) =>
    navigate('wtsDetail', { id: id, type: type })

  const alldata = useSelector(
    (state: { alldata: AllDataState }) => state.alldata.item.data,
  )
  const filter = alldata.wtscategories.filter(
    (object: any) => object.what_to_sees.length > 0,
  )
  const [search, setSearch] = React.useState('')

  const campaigns = alldata.campaigns.find((c: any) => c.type === 'WTS')

  const getItemsFiltered = (data: any) => {
    if (search !== '') {
      console.log(' => aca ', data, filter)
      data = data.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))
    }
    return data
  }

  return (
    <View
      style={[
        Layout.fill,
        Gutters.smallHPadding,
        { backgroundColor: Colors.darker },
      ]}
    >
      <TopBar screen={'Ver'} customFunction={(t) => setSearch(t)}  title={t('home.wts')}  />
      <ScrollView>
        <View style={[{ backgroundColor: Colors.darker }]}>
          {filter.map((object: any, key: number) => (
            <View
              key={key}
              style={[Layout.column, Common.backgroundWhite, { marginTop: 20 }]}
            >
              <Text
                style={[
                  Layout.fill,
                  Fonts.textSmall,
                  { color: Colors.yellow, marginBottom: 10 },
                ]}
              >
                {object.name}
              </Text>
              <FlatList
                data={getItemsFiltered(object.what_to_sees)}
                renderItem={({
                  item: { id, title, images_poster },
                  index,
                }: any) => {
                  return (
                    <ActivityCard
                      id={id}
                      key={id}
                      title={title}
                      image={images_poster?.[0]?.['url'] || ''}
                      onPress={() => {
                        selectActivity(id, 'wts')
                      }}
                    />
                  )
                }}
                horizontal
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {(campaigns && campaigns.images[0]) &&
        <View style={{ height: 100, backgroundColor: 'red', width: ScreenWidth, right: 8,}}>
          <Image
            style={[{ marginTop: 0, width: ScreenWidth, height: 100 }]}
            source={{ uri: campaigns.images[0].url}}
            resizeMode='cover'
          />
          </View>
      }
    </View>
  )
}

export default IndexWTSContainer
