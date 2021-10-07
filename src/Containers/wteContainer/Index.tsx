import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, Text, ScrollView, Image } from 'react-native'
import { ActivityCard, TopBar } from '@/Components'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import { navigate } from '@/Navigators/Root'

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
        { backgroundColor: Colors.darker },
      ]}
    >
      <TopBar screen={'Comer'} customFunction={(t) => setSearch(t)}  title={t('home.wte')} />
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
    </View>
  )
}

export default IndexWTEContainer
