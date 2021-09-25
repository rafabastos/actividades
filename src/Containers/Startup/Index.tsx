import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import ChangeTheme from "@/Store/Theme/ChangeTheme";

const IndexStartupContainer = () => {

    const dispatch = useDispatch()
    dispatch(ChangeTheme.action({ theme: 'default_qhh' }))

    const { Layout, Gutters, Fonts, Colors } = useTheme()

  const { t } = useTranslation()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={[Layout.fill, Layout.colCenter, {backgroundColor : Colors.darker}]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={[Fonts.textCenter, {color: Colors.yellow}]}>{t('welcome')}</Text>
    </View>
  )
}

export default IndexStartupContainer
