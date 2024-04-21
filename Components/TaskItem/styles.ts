import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#333333',
    marginBottom:8,
    height:64,
    borderRadius:8,
    alignItems:'center',
    padding:12,
    justifyContent:'space-between'

  },
  text:{
    color: '#F2F2F2',
    fontSize: 14,
    margin: 10,
    textAlign:'left',
  },
  textDone:{
    color: '#808080',
    fontSize: 14,
    margin: 10,
    textAlign:'left',
    textDecorationLine:'line-through'
  },
  descriptionView:{
    flex:1,

  }
})