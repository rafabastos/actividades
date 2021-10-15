import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, Text, ScrollView, Image, Dimensions } from 'react-native'
import { ActivityCard, TopBar } from '@/Components'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import { navigate } from '@/Navigators/Root'
import { objectOf } from 'prop-types'

const ScreenWidth = Dimensions.get('window').width

const IndexWTEContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme()
  const selectActivity = (id: number, type: string) =>
    navigate('wteDetail', { id: id, type: type })

  const alldata = useSelector(
    (state: { alldata: AllDataState }) => state.alldata.item.data,
  )
  const filter = alldata.wtecategories.filter(
    (object: any) => object.what_to_eats.length > 0,
  )
  const [search, setSearch] = React.useState('')

  const campaigns = alldata.campaigns.find((c: any) => c.type === 'WTE')

  const getItemsFiltered = (data: any) => {
    if (search !== '') {
      console.log(' => aca ', data, filter)
      data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    }
    return data
  }

  return (
    <View
      style={[
        Layout.fill,
        Gutters.smallHPadding,
        { flex: 1, backgroundColor: Colors.darker },
      ]}
    >
      <TopBar screen={'Comer'} customFunction={(t) => setSearch(t)}  title={t('home.wte')} />
      <ScrollView>
        <View style={[{ backgroundColor: Colors.darker }]}>
          {filter.map((object: any, key: number) => (
            <View
              key={key + '_wte'}
              style={[Layout.column, Common.backgroundWhite, { marginTop: 20 }]}
            >
              <Text
                style={[
                  Layout.fill,
                  Fonts.textSmall,
                  { color: '#D9444D', marginBottom: 10 },
                ]}
              >
                {object.name}
              </Text>
              <FlatList
                data={getItemsFiltered(object.what_to_eats)}
                renderItem={({
                  item: { id, name, images_poster },
                  index,
                }: any) => {
                  return (
                    <ActivityCard
                      id={id}
                      key={id}
                      title={name}
                      image={images_poster?.[0]?.['url'] || ''}
                      onPress={() => {
                        selectActivity(id, 'wte')
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
        <View style={{ height: 100, width: ScreenWidth, right: 8,}}>
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

export default IndexWTEContainer
