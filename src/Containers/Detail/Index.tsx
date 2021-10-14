import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { AllDataState } from '@/Store/AllData'
import { FontSize } from '@/Theme/Variables'
import MapView, { Marker, Region } from 'react-native-maps'
import { TopBar } from '@/Components'
import { color } from 'react-native-reanimated'
const { width, height } = Dimensions.get('window')

const screenWidth = width < height ? width : height

const IndexDetailsContainer = (route: any) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors, Images } = useTheme()
  const { id, type } = route.route.params
  const alldata = useSelector(
    (state: { alldata: AllDataState }) => state.alldata.item.data,
  )

  let activities

  switch (type) {
    case 'wtd': {
      activities = alldata.wtdactivities
      break
    }
    case 'wte': {
      activities = alldata.wteactivities
      break
    }
    case 'wts': {
      activities = alldata.wtsactivities
      break
    }
    default: {
      return
    }
  }
  const activity = activities.find((object: any) => object.id == id)

  console.log(' activity ===>>> ', activity)

  const scrollX = new Animated.Value(0) // localizacion del scroll
  const position = Animated.divide(scrollX, screenWidth)

  const styles = {
    titleStyle: { color: Colors.primary, marginTop: 20, fontWeight: '600' },
    carrouselImage: { width: screenWidth - 20, height: 250 },
    specImage: { width: 40, height: 40, borderRadius: 20, marginLeft: 10 },
    bannerImage: {
      width: (screenWidth - 50) / 3,
      height: 100,
      marginRight: 10,
      marginTop: 10,
    },
    dotsContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      bottom: 22,
      borderRadius: 10,
      opacity: 0.8,
      alignSelf: 'center',
      justifyContent: 'center',
      width: 25 * activity.images_poster.length,
    },
    dot: {
      height: 10,
      width: 10,
      backgroundColor: 'black',
      margin: 6,
      borderRadius: 5,
    },
  }

  const banners = (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {activity.images_banners.map((image: any, key: number) => (
        <Image
          key={key + '_banner'}
          style={styles.bannerImage}
          source={{ uri: image.url }}
        />
      ))}
    </View>
  )

  const carrousel = (
    <>
      <ScrollView
        style={{ marginTop: 20 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )} // mapea el scroll
        scrollEventThrottle={16} // evita multiplas llamadas
      >
        {activity.images_poster.map(
          (img: any, key: number) =>
            img.imagen !== null && (
              <Image
                key={key + '_poster'}
                style={styles.carrouselImage}
                source={{ uri: img.url }}
              />
            ),
        )}
      </ScrollView>
      {/* <View style={styles.dotsContainer}>
        {activity.images_poster.map((_: any, i: number) => {
          const o = position.interpolate({
            inputRange: [i - 1, i, i + 1], // opacidad 1 cuando la posicion es la mismas del indice
            outputRange: [0.3, 1, 0.3], // opacidad 0.3 cuando la posicion no es la mismas del indice
            extrapolate: 'clamp', // no deja que la opacidad salga del rango
          })
          return <Animated.View key={i} style={[styles.dot, { opacity: o }]} />
        })}
      </View> */}
    </>
  )

  const formatDate = (date) => {
    var datePart = date.match(/\d+/g),
  year = datePart[0].substring(2), // get only two digits
  month = datePart[1], day = datePart[2];

  return day+'/'+month+'/'+year;
  }

  const info = (
    <View>
      <Text
        style={[
          Layout.fill,
          Fonts.textCenter,
          Fonts.textRegular,
          styles.titleStyle,
        ]}
      >
        DESCRIPCIÓN
      </Text>
      <View style={{ marginBottom: 20}}>
        {/* WTD */}
        {activity.comment && (
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginHorizontal: 10,
              marginBottom: 5,
              textAlign: 'center',
            }}
          >
            {'     ' + activity.comment}
          </Text>
        )}
        {/* WTE */}
        {activity.comments && (
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginHorizontal: 10,
              marginBottom: 5,
              textAlign: 'center',
            }}
          >
            {'     ' + activity.comments}
          </Text>
        )}
        {/* WTS */}
        {activity.synopsis && (
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginHorizontal: 10,
              marginBottom: 5,
              textAlign: 'center',
            }}
          >
            {'     ' + activity.synopsis}
          </Text>
        )}
        {activity.name && (
          <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 10 }}>
            {'Nombre: ' + activity.name}
          </Text>
        )}
        {activity.phone && (
          <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 10 }}>
            {'Telefono: ' + activity.phone}
          </Text>
        )}
        {activity.address && (
          <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 10 }}>
            {'Dirección: ' + activity.address}
          </Text>
        )}
      </View>
      {activity.title && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10 }}>
          {'Título: ' + activity.title}
        </Text>
      )}
      {activity.actors && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10 }}>
          {'Telefono: ' + activity.actors}
        </Text>
      )}
      {activity.only_price && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10}}>
          {'Precio: ' + activity.only_price + '.000'}
        </Text>
      )}
      {activity.country && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10}}>
          {'País: ' + activity.country}
        </Text>
      )}
      {activity.directed_by && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10}}>
          {'Dirigida por: ' + activity.directed_by}
        </Text>
      )}
      {activity.release_date && (
        <Text style={{ color: '#F9E104', fontSize: 14, marginHorizontal: 10}}>
          {'Fecha de lanzamiento: ' + formatDate(activity.release_date)}
        </Text>
      )}
      {(activity.fb || activity.ig || activity.specs) && (
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          {activity.specs.map((spec: any, key: number) => {
            if (spec.images?.[0]?.thumbs?.thumb_200) {
              return (
                <Image
                  key={key + '_spec'}
                  style={styles.specImage}
                  source={{ uri: spec.images?.[0]?.thumbs?.thumb_200 }}
                />
              )
            }
          })}
           {activity.fb && (
            <TouchableOpacity onPress={() => Linking.openURL(activity.fb)}>
              <Image style={styles.specImage} source={Images.logoFacebook} />
            </TouchableOpacity>
          )}
            {activity.ig && (
            <TouchableOpacity onPress={() => Linking.openURL(activity.ig)}>
              <Image style={styles.specImage} source={Images.logoInstagram} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )

  const getRegion = async () => {
    let res = await fetch('http://maps.google.com/maps/api/geocode/json?address=' + activity.location)
    console.log('res ===>>> ', res)
    // return {
    //   latitude: 0,
    //   longitude: 0,
    //   latitudeDelta: 0.1,
    //   longitudeDelta: 0.09,
    // }
  }

  const map = <MapView
  style={{ width: '100%', borderRadius: 5, height: 300, marginTop: 10, marginBottom: 70 }}
  loadingEnabled
  zoomEnabled
  zoomControlEnabled
  // initialRegion={getRegion()}
  // onPress={(e) => [
  //   setLatitud(e.nativeEvent.coordinate.latitude),
  //   setLongitud(e.nativeEvent.coordinate.longitude)
  // ]}
>
  {/* <Marker
    coordinate={{
      latitude: latitud,
      longitude: longitud,
    }}
    pinColor={colors.support()}
  /> */}
</MapView>

  return (
    <View
      style={[
        Layout.fill,
        Gutters.smallHPadding,
        { backgroundColor: Colors.darker },
      ]}
    >
      <TopBar screen={'Inicio'} />
      <ScrollView>
        <View style={[{ backgroundColor: Colors.darker }]}>
          {activity.synopsis && carrousel}
          {banners}
          {info}
          {!activity.synopsis && carrousel}
          {/* {map} */}
        </View>
      </ScrollView>
    </View>
  )
}

export default IndexDetailsContainer
