import React from 'react'
import { Image, Alert, ScrollView, SafeAreaView, Text } from 'react-native'
import styles from './styles'
import sidebar_top_img from '../../Assets/Images/logo-full.png'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

const SideBar= ({}) => {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                    <Image source={sidebar_top_img} style={styles.sidebar_top_img} />


                            <Text>Version:</Text>
                            <Text>Build:</Text>
            </SafeAreaView>
        )
}

export default SideBar
