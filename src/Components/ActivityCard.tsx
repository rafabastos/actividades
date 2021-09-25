import React from 'react'
import { View, Image, TouchableOpacity,Text, StyleSheet } from 'react-native'
import {useTheme} from "@/Theme";

const ActivityCard = ({ id = 0, title = '', image = '', onPress = (() => {}) }) => {

    //console.log(title +' - '+id)
    const { Images, Colors, Layout, Gutters, Fonts } = useTheme();

    return (
        <View style={[Layout.fill, Layout.colCenter, {backgroundColor : Colors.darker}]}>
        <TouchableOpacity
            onPress={ () => onPress()}
            style={{
                backgroundColor: Colors.black,
                width: 100,
                height: 150,
                borderRadius: 10,
                overflow: 'hidden',
            }}
        >
            <Image {...(image.length>0 ? {source: {uri: image}} : {source: Images.logo} )} resizeMode='cover' style={{
                width: null,
                height: null,
                ...StyleSheet.absoluteFillObject,
                flex: 1, }} />
        </TouchableOpacity>

        </View>
    )
}

export default ActivityCard
