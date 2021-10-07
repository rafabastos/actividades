import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/core'
import { IndexHomeContainer, IndexWTDContainer, IndexWTEContainer, IndexWTSContainer, IndexDetailsContainer } from '@/Containers'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const styles = {
  main: {
    height: 60,
    width: ScreenWidth,
    right: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  drawerButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
  },
  buttonView: {
    height: 3,
    width: 25,
    borderRadius: 5,
  },
}

const ActivityCard = ({
  id = 0,
  title = '',
  customFunction = () => {},
  screen = 'Inicio',
}) => {
  //console.log(title +' - '+id)
  const { Images, Colors, Layout, Gutters, Fonts } = useTheme()
  const navigation = useNavigation()
  const [search, setSearch] = React.useState('')
  const [showMenu, setShowMenu] = React.useState(false)
  const [searchVisible, setSearchVisible] = React.useState(false)
  let refSearch

  // const [color, setColor] = React.useState('white')
  let color = 'white'
  if (screen === 'Ver') color = '#F9E104'
  if (screen === 'Comer') color = '#D9444D'


  return (
    <>
      <View style={[styles.main, { backgroundColor: screen === 'Inicio' ? '#563391' : 'black' }]}>
        <TouchableOpacity children style={styles.drawerButton} onPress={() => setShowMenu(!showMenu)}>
          <View style={[styles.buttonView, { marginBottom: 4, backgroundColor: color }]} />
          <View style={[styles.buttonView, { marginBottom: 4, backgroundColor: color }]} />
          <View style={[styles.buttonView, { backgroundColor: color }]} />
        </TouchableOpacity>
        { (screen === 'Inicio' || screen === 'Detail')
          ? <Image
            style={[{ marginTop: 0, width: '80%', height: 40 }]}
            source={Images.logoH}
            resizeMode="contain"
          />
          : <>
            <Text
                style={[
                Layout.fill,
                Fonts.textCenter,
                Fonts.textRegular,
                { color: color, fontWeight: '600', marginLeft: 10 },
              ]}
            >
              {title}
            </Text>
            <View style={{ width: 120, display: !searchVisible ? 'flex' : 'none' }} />
            <TextInput
              ref={ref => refSearch = ref}
              style={{ 
                height: 35,
                width: 120, 
                marginRight: 5, 
                borderColor: color, 
                borderWidth: 1, 
                borderRadius: 20, 
                fontSize: 12, 
                letterSpacing: 1, 
                color: color,
                display: searchVisible ? 'flex' : 'none'
              }}
              onChangeText={t => [customFunction(t), setSearch(t)]}
              value={search}
              placeholderTextColor={color}
              placeholderStyle={{ backgroundColor: 'blue'}}
              placeholder="  Buscar..."
              onBlur={() => { if (search === '') setSearchVisible(false) }}
            />
            <TouchableOpacity onPress={() => [setSearchVisible(true), refSearch.focus()]}>
              <Image
                style={[{  width: 20, height: 20 }]}
                source={ (screen === 'Hacer') ? Images.search : (screen === 'Comer') ? Images.search_primary : Images.search_yellow}
                // source={Images.search}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        }
        <View style={{ width: 30 }} />
      </View>
      {showMenu &&
      <View style={{
        height: 50,
        backgroundColor: 'black',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Text onPress={() => navigation.navigate('Inicio')} style={{fontSize: 15, color: screen === 'Inicio' ?"#D9444D" : "#F9E104"}}>Inicio</Text>
        <Text onPress={() => navigation.navigate('Hacer')} style={{fontSize: 15, color: screen === 'Hacer' ? "#D9444D" : "#F9E104"}}>Hacer</Text>
        <Text onPress={() => navigation.navigate('Ver')} style={{fontSize: 15, color: screen === 'Ver' ? "#D9444D" : "#F9E104"}}>Ver</Text>
        <Text onPress={() => navigation.navigate('Comer')} style={{fontSize: 15, color: screen === 'Comer' ? "#D9444D" : "#F9E104"}}>Comer</Text>
        </View>
        }
    </>
  )
}

export default ActivityCard
