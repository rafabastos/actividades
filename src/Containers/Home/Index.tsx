import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View, FlatList, Text, ScrollView, StyleSheet, Image, TextInput
} from 'react-native'
import { ActivityCard } from '@/Components'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import { navigate } from '@/Navigators/Root'
import Story from 'react-native-story'

const IndexHomeContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const selectActivity = (id: number, type : string) => navigate('homeDetail', {id:id,type:type})

  const alldata = useSelector((state: { alldata: AllDataState }) => state.alldata.item.data)

  console.error(alldata.stories)
  console.error(stories)


  return (
      <View style={[Layout.fill, Gutters.smallHPadding, {backgroundColor : Colors.darker}]}>
        <ScrollView>
            <View style={[{width:'100%', alignItems: 'center'}]}>
                <Image style={[{ marginTop: 0, width:'80%',height:30}]} source={Images.logoH} resizeMode='contain'  />
                </View>
            <Text style={[Layout.fill, Fonts.textCenter, Fonts.textRegular, { marginTop: 5, color : Colors.primary, fontWeight : '600', marginBottom: 0, paddingBottom: 0 }]}>
                {t('home.highlight')}
            </Text>
            <Story
            style={[{ marginTop: 100, color: Colors.white }]}
			unPressedBorderColor="#e95950"
			pressedBorderColor="#ebebeb"
			stories={alldata.stories}
		    />
            <View style={[{backgroundColor : Colors.darker}]}>
                <View
                    style={[
                        Layout.column,
                        Common.backgroundWhite,
                        {marginTop: 20}
                    ]}
                >
                    <Text style={[Layout.fill, Fonts.textSmall, { color : Colors.yellow, marginBottom: 10 }]}>
                        {t('home.wtd')}
                    </Text>
                    <FlatList
                        data={alldata.wtdactivities }
                        renderItem={({
                                         item: { id, name, images_poster},
                                         index,
                                     }: any) => {
                            return (
                                <ActivityCard
                                    id={id}
                                    key={id+index}
                                    title={name}
                                    image={images_poster?.[0]?.['url'] || ''}
                                    onPress={() => {
                                        selectActivity(id,'wtd')
                                    }}
                                />
                            )
                        }}
                        horizontal
                    />
                </View>
                <View
                    style={[
                        Layout.column,
                        Common.backgroundWhite,
                        {marginTop: 20}
                    ]}
                >
                    <Text style={[Layout.fill, Fonts.textSmall, { color : Colors.yellow, marginBottom: 10 }]}>
                        {t('home.wte')}
                    </Text>
                    <FlatList
                        data={alldata.wteactivities}
                        renderItem={({
                                         item: { id, name, images_poster},
                                         index,
                                     }: any) => {
                            return (
                                <ActivityCard
                                    id={id}
                                    key={id+index}
                                    title={name}
                                    image={images_poster?.[0]?.['url'] || ''}
                                    onPress={() => {
                                        selectActivity(id,'wte')
                                    }}
                                />
                            )
                        }}
                        horizontal
                    />
                </View>
                <View
                    style={[
                        Layout.column,
                        Common.backgroundWhite,
                        {marginTop: 20}
                    ]}
                >
                    <Text style={[Layout.fill, Fonts.textSmall, { color : Colors.yellow, marginBottom: 10 }]}>
                        {t('home.wts')}
                    </Text>
                    <FlatList
                        data={alldata.wtsactivities}
                        renderItem={({
                                         item: { id, title, images_poster},
                                         index,
                                     }: any) => {
                            return (
                                <ActivityCard
                                    id={id}
                                    key={id+index}
                                    title={title}
                                    image={images_poster?.[0]?.['url'] || '' }
                                    onPress={() => {
                                        selectActivity(id,'wts')
                                    }}
                                />
                            )
                        }}
                        horizontal
                    />
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

const stories = [
    {
      id: "4",
      source: {uri: "https://cdn.vox-cdn.com/thumbor/_6rgM0Rw0Q4rJNS68z92VaTc388=/0x0:2040x1360/1200x800/filters:focal(918x492:1244x818)/cdn.vox-cdn.com/uploads/chorus_image/image/67660827/IMG_A8E2311AD39C_1.0.jpeg"},
      user: "",
      avatar: {uri: "https://cdn.vox-cdn.com/thumbor/_6rgM0Rw0Q4rJNS68z92VaTc388=/0x0:2040x1360/1200x800/filters:focal(918x492:1244x818)/cdn.vox-cdn.com/uploads/chorus_image/image/67660827/IMG_A8E2311AD39C_1.0.jpeg"}
    },
    {
        id: "5",
        source: {uri: "https://cdnb.artstation.com/p/assets/images/images/029/699/355/large/luis-angel-serrano-saez-20200825-175321.jpg?1598374922"},
        user: "",
        avatar: {uri: "https://cdnb.artstation.com/p/assets/images/images/029/699/355/large/luis-angel-serrano-saez-20200825-175321.jpg?1598374922"}
      }
  ];

export default IndexHomeContainer