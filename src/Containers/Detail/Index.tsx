import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View, Text, ScrollView
} from 'react-native'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'

const IndexDetailsContainer = (route:any) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme()
  const { id, type } = route.route.params
    const alldata = useSelector((state: { alldata: AllDataState }) => state.alldata.item.data)

    let activities

    switch(type) {
        case 'wtd': {
            activities = alldata.wtdactivities
            break;
        }
        case 'wte': {
            activities = alldata.wteactivities
            break;
        }
        case 'wts': {
            activities = alldata.wtsactivities
            break;
        }
        default: {
            return;
        }
    }
    const activity = activities.filter( (object : any) => object['id'] == id)

  return (
    <View style={[Layout.fill, Gutters.smallHPadding, {backgroundColor : Colors.darker}]}>
        <ScrollView>
            <Text style={[Layout.fill, Fonts.textCenter, Fonts.textRegular, { color : Colors.primary, marginTop: 20, fontWeight : '600' }]}>
                {'Detalle'}
            </Text>
            <View style={[ {backgroundColor : Colors.darker}]}>

            </View>
        </ScrollView>
    </View>
  )
}

export default IndexDetailsContainer
