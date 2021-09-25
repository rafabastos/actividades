import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View, FlatList, Text, ScrollView, Image
} from 'react-native'
import { ActivityCard } from '@/Components'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import {navigate} from "@/Navigators/Root";

const IndexWTEContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const selectActivity = (id: number, type : string) => navigate('wteDetail', {id:id,type:type})

  const alldata = useSelector((state: { alldata: AllDataState }) => state.alldata.item.data)
  const filter = alldata.wtecategories.filter( (object : any) => object['what_to_eats'].length > 0)

  return (
      <View style={[Layout.fill, Gutters.smallHPadding, {backgroundColor : Colors.darker}]}>
        <ScrollView>
            <View style={[{width:'100%', alignItems: 'center'}]}><Image style={[{ marginTop: 0, width:'80%',height:30}]} source={Images.logoH} resizeMode='contain'  /></View>
            <Text style={[Layout.fill, Fonts.textCenter, Fonts.textRegular, { color : Colors.primary, marginTop: 5, fontWeight : '600' }]}>
                {t('home.wte')}
            </Text>
            <View style={[{backgroundColor : Colors.darker}]}>
                {filter.map((object: any) => (
                    <View style={[Layout.column, Common.backgroundWhite,{marginTop: 20}]}>
                        <Text style={[Layout.fill, Fonts.textSmall, {color: Colors.yellow, marginBottom: 10}]}>
                            {object.name}
                        </Text>
                        <FlatList
                            data={object['what_to_eats']}
                            renderItem={({
                                             item: {id, name, images_poster},
                                             index,
                                         }: any) => {
                                return (
                                    <ActivityCard
                                        id={id}
                                        key={id}
                                        title={name}
                                        image={images_poster?.[0]?.['url'] || ''}
                                        onPress={() => {
                                            selectActivity(id,'wte')
                                        }}/>
                                )
                            }}
                            horizontal/>
                    </View>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default IndexWTEContainer