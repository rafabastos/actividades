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
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'
import { IndexHomeContainer, IndexWTDContainer, IndexWTEContainer, IndexWTSContainer, IndexDetailsContainer } from '@/Containers'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const styles = {
  main: {
    backgroundColor: 'purple',
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
    backgroundColor: 'white',
    borderRadius: 5,
  },
}

const ActivityCard = ({
  id = 0,
  onPress = () => {},
  screen = 'Inicio',
}) => {
  //console.log(title +' - '+id)
  const { Images, Colors, Layout, Gutters, Fonts } = useTheme()
  const navigation = useNavigation()
  const [showMenu, setShowMenu] = React.useState(false)
  const [search, setSearch] = React.useState('')

  return (
    <>
      <View style={styles.main}>
        <TouchableOpacity children style={styles.drawerButton} onPress={() => setShowMenu(!showMenu)}>
          <View style={[styles.buttonView, { marginBottom: 4 }]} />
          <View style={[styles.buttonView, { marginBottom: 4 }]} />
          <View style={styles.buttonView} />
        </TouchableOpacity>
        { screen === 'Inicio' 
          ? <Image
            style={[{ marginTop: 0, width: '80%', height: 40 }]}
            source={Images.logoH}
            resizeMode="contain"
          />
          : <TextInput
              style={{height: 40, width: 130, borderBottomColor: 'white', borderBottomWidth: 0.7 }}
              onChangeText={t => [onPress(), setSearch(t)]}
              value={search}
              placeholderTextColor={'white'}
              placeholder="Buscar..."
            />
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
